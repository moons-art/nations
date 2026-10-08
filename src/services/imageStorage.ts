/**
 * Real-Time Cloud + Local Triple Persistence Image Storage Service
 * Synchronizes with Google Firebase Cloud Firestore (for all public visitors)
 * with instant LocalStorage & IndexedDB offline caching.
 */
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, onSnapshot, collection } from 'firebase/firestore';
import { db } from './firebase';

export type PageKey = 'sermon' | 'vote' | 'score' | 'bible';
export type PointIndex = 0 | 1 | 2;

export type PageImagesMap = Record<PageKey, [string | null, string | null, string | null]>;

const DB_NAME = 'NationsImagesDB';
const DB_VERSION = 1;
const STORE_NAME = 'images';
const UPDATE_EVENT = 'nations-images-updated';

export const PAGE_TITLES: Record<PageKey, string> = {
  sermon: '네이션스 설교 (Sermon AI)',
  vote: '네이션스 투표 (Vote)',
  score: '네이션스 악보 (Studio)',
  bible: '네이션스 성경 (Bible)',
};

export const POINT_LABELS: Record<PageKey, [string, string, string]> = {
  sermon: [
    '01. 유튜브 링크 하나로 은혜로운 숏폼 5개 완성',
    '02. 목사님 고유의 설교톤 학습',
    '03. 인스타, 카카오톡 카드뉴스',
  ],
  vote: [
    '01. 시간과 재정을 아끼는 명확한 사역 효율',
    '02. 어르신부터 청년까지 탄탄한 접근성',
    '03. 교회의 안전을 지키는 철저한 데이터 보안',
  ],
  score: [
    '01. 직관적인 사역에 집중하다',
    '02. 하나의 영으로 예배하다',
    '03. 음악적 한계를 뛰어넘다',
  ],
  bible: [
    '01. 설교자를 위한 맞춤 설교데스크',
    '02. 다중 역본 동시 대조 & 원어 사전',
    '03. 기억에 남는 설교 아카이빙',
  ],
};

const PAGES: PageKey[] = ['sermon', 'vote', 'score', 'bible'];

// Global in-memory cache for instant synchronous access
const memoryCache: PageImagesMap = {
  sermon: [null, null, null],
  vote: [null, null, null],
  score: [null, null, null],
  bible: [null, null, null],
};

/**
 * 1. Synchronously load from LocalStorage on initial script load.
 * Guarantees 0ms immediate rendering upon page refresh without layout shift.
 */
function loadFromLocalStorage(): void {
  if (typeof window === 'undefined' || !window.localStorage) return;

  for (const page of PAGES) {
    for (let i = 0; i < 3; i++) {
      try {
        const val = localStorage.getItem(`nations_img_${page}_${i}`);
        if (val) {
          memoryCache[page][i as PointIndex] = val;
        }
      } catch (e) {
        console.warn(`LocalStorage read error for ${page}_${i}:`, e);
      }
    }
  }
}
loadFromLocalStorage();

/**
 * Safely open IndexedDB instance
 */
function openDB(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      resolve(null);
      return;
    }
    try {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);
      request.onerror = () => resolve(null);
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = (event) => {
        const dbInstance = (event.target as IDBOpenDBRequest).result;
        if (!dbInstance.objectStoreNames.contains(STORE_NAME)) {
          dbInstance.createObjectStore(STORE_NAME);
        }
      };
    } catch {
      resolve(null);
    }
  });
}

/**
 * 2. Hydrate from IndexedDB on startup (IndexedDB offline backup)
 */
async function initLocalIndexedDB(): Promise<void> {
  const localDb = await openDB();
  if (!localDb) return;

  try {
    await new Promise<void>((resolve) => {
      const tx = localDb.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);

      for (const page of PAGES) {
        for (let i = 0; i < 3; i++) {
          const key = `${page}_${i}`;
          const req = store.get(key);
          req.onsuccess = () => {
            if (req.result && !memoryCache[page][i as PointIndex]) {
              memoryCache[page][i as PointIndex] = req.result;
              try {
                if (window.localStorage) {
                  localStorage.setItem(`nations_img_${key}`, req.result);
                }
              } catch {
                // ignore
              }
            }
          };
        }
      }

      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(UPDATE_EVENT));
    }
  } catch (e) {
    console.warn('IndexedDB initial sync error:', e);
  }
}

/**
 * 3. Real-Time Cloud Firestore Sync (Ensures ALL visitors see the images everywhere)
 */
let isFirestoreListening = false;
function initFirestoreSync(): void {
  if (isFirestoreListening || typeof window === 'undefined') return;
  isFirestoreListening = true;

  try {
    const colRef = collection(db, 'site_images');

    // Realtime listener on collection so any changes by admin reflect instantly on all clients
    onSnapshot(colRef, (snapshot) => {
      let changed = false;

      snapshot.forEach((docSnap) => {
        const pageKey = docSnap.id as PageKey;
        if (PAGES.includes(pageKey)) {
          const data = docSnap.data();
          if (data && Array.isArray(data.images)) {
            for (let i = 0; i < 3; i++) {
              const cloudVal = data.images[i] ?? null;
              if (memoryCache[pageKey][i as PointIndex] !== cloudVal) {
                memoryCache[pageKey][i as PointIndex] = cloudVal;
                changed = true;

                // Sync to local storages for offline survival
                const key = `${pageKey}_${i}`;
                try {
                  if (cloudVal) {
                    localStorage.setItem(`nations_img_${key}`, cloudVal);
                  } else {
                    localStorage.removeItem(`nations_img_${key}`);
                  }
                } catch {
                  // ignore
                }

                // Write to IndexedDB
                openDB().then((idb) => {
                  if (idb) {
                    try {
                      const tx = idb.transaction(STORE_NAME, 'readwrite');
                      if (cloudVal) {
                        tx.objectStore(STORE_NAME).put(cloudVal, key);
                      } else {
                        tx.objectStore(STORE_NAME).delete(key);
                      }
                    } catch {
                      // ignore
                    }
                  }
                });
              }
            }
          }
        }
      });

      if (changed) {
        window.dispatchEvent(new CustomEvent(UPDATE_EVENT));
      }
    }, (err) => {
      console.warn('Firestore real-time subscription error:', err);
    });
  } catch (e) {
    console.warn('Failed to initialize Firestore listener:', e);
  }
}

// Start local & cloud hydrations
if (typeof window !== 'undefined') {
  initLocalIndexedDB().then(() => {
    initFirestoreSync();
  });
}

/**
 * Smart image compression:
 * - Resizes to max 1000px dimension.
 * - Enforces WebP with JPEG fallback.
 * - Target file size is 50KB ~ 100KB, perfect for Firestore documents (<1MB doc limit).
 */
export function compressImage(file: File, maxDim = 1000, initialQuality = 0.78): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('파일을 읽는 데 실패했습니다.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('이미지를 불러올 수 없습니다.'));
      img.onload = () => {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        const encode = (quality: number): string => {
          try {
            const webp = canvas.toDataURL('image/webp', quality);
            if (webp.startsWith('data:image/webp')) {
              return webp;
            }
          } catch {
            // ignore
          }
          try {
            return canvas.toDataURL('image/jpeg', quality);
          } catch {
            return reader.result as string;
          }
        };

        let result = encode(initialQuality);
        if (result.length > 220000) {
          result = encode(0.65);
        }
        if (result.length > 220000) {
          result = encode(0.50);
        }

        resolve(result);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export function getAllImages(): PageImagesMap {
  return {
    sermon: [...memoryCache.sermon],
    vote: [...memoryCache.vote],
    score: [...memoryCache.score],
    bible: [...memoryCache.bible],
  };
}

/**
 * Persist an image to:
 * 1. Memory Cache (0ms synchronous UI update)
 * 2. LocalStorage (Instant page refresh survival)
 * 3. IndexedDB (Local disk safety)
 * 4. Google Firebase Cloud Firestore (Published to ALL public visitors in real-time!)
 */
export async function saveImage(page: PageKey, index: PointIndex, dataUrl: string | null): Promise<void> {
  const key = `${page}_${index}`;

  // 1. Update in-memory cache
  memoryCache[page][index] = dataUrl;

  // 2. Persist to LocalStorage
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (dataUrl) {
        localStorage.setItem(`nations_img_${key}`, dataUrl);
      } else {
        localStorage.removeItem(`nations_img_${key}`);
      }
    }
  } catch (e) {
    console.warn(`LocalStorage write warning for ${key}:`, e);
  }

  // 3. Persist to IndexedDB
  const localDb = await openDB();
  if (localDb) {
    await new Promise<void>((resolve) => {
      try {
        const tx = localDb.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        if (dataUrl) {
          store.put(dataUrl, key);
        } else {
          store.delete(key);
        }
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      } catch {
        resolve();
      }
    });
  }

  // 4. Persist to Google Cloud Firestore (Broadcasts to EVERY visitor)
  try {
    const pageDocRef = doc(db, 'site_images', page);
    await setDoc(pageDocRef, {
      images: [
        memoryCache[page][0],
        memoryCache[page][1],
        memoryCache[page][2],
      ],
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (err) {
    console.error('Firebase Firestore save error:', err);
  }

  // 5. Broadcast UI event
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT));
  }
}

export async function removeImage(page: PageKey, index: PointIndex): Promise<void> {
  await saveImage(page, index, null);
}

export async function resetAllImages(): Promise<void> {
  for (const page of PAGES) {
    for (let i = 0; i < 3; i++) {
      memoryCache[page][i as PointIndex] = null;
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.removeItem(`nations_img_${page}_${i}`);
        }
      } catch {
        // ignore
      }
    }

    // Reset on Firestore too
    try {
      const pageDocRef = doc(db, 'site_images', page);
      await setDoc(pageDocRef, {
        images: [null, null, null],
        updatedAt: new Date().toISOString(),
      }, { merge: true });
    } catch {
      // ignore
    }
  }

  const localDb = await openDB();
  if (localDb) {
    await new Promise<void>((resolve) => {
      try {
        const tx = localDb.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).clear();
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      } catch {
        resolve();
      }
    });
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT));
  }
}

/**
 * Export all stored images/data as JSON for backup
 */
export function exportDataJSON(): string {
  const data = getAllImages();
  return JSON.stringify(data, null, 2);
}

/**
 * Import images/data from a JSON string and persist to both local and Firestore
 */
export async function importDataJSON(jsonString: string): Promise<boolean> {
  try {
    const parsed = JSON.parse(jsonString) as Partial<PageImagesMap>;
    for (const page of PAGES) {
      const arr = parsed[page];
      if (Array.isArray(arr)) {
        for (let i = 0; i < 3; i++) {
          const val = arr[i] ?? null;
          await saveImage(page, i as PointIndex, val);
        }
      }
    }
    return true;
  } catch (err) {
    console.error('Failed to import JSON data:', err);
    return false;
  }
}

/**
 * Custom React hook to subscribe to image changes for a specific page.
 * Synchronizes with Cloud Firestore in real-time and updates immediately.
 */
export function usePageImages(page: PageKey): [string | null, string | null, string | null] {
  const [images, setImages] = useState<[string | null, string | null, string | null]>(() => [
    memoryCache[page][0],
    memoryCache[page][1],
    memoryCache[page][2],
  ]);

  useEffect(() => {
    const handleUpdate = () => {
      setImages([
        memoryCache[page][0],
        memoryCache[page][1],
        memoryCache[page][2],
      ]);
    };

    // Immediate sync on mount
    handleUpdate();

    // Event listener for local updates & Firestore updates
    window.addEventListener(UPDATE_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(UPDATE_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [page]);

  return images;
}
