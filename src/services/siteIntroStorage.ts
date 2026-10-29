import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { PageKey } from './imageStorage';

export interface CorePointText {
  title: string;
  desc: string;
}

export interface FaqItem {
  q: string;
  preview: string;
  a: string;
}

export interface SiteIntroData {
  heroTopText: string;
  heroPhrases: string[];
  questionHeading: string;
  questionText: string;
  mainHeadingLine1: string;
  mainHeadingLine2: string;
  subHeadingLine1: string;
  subHeadingLine2: string;
  corePoints: [CorePointText, CorePointText, CorePointText];
  faqs: FaqItem[];
  updatedAt?: string;
}

export const DEFAULT_SITE_INTROS: Record<PageKey, SiteIntroData> = {
  sermon: {
    heroTopText: '목사님의 설교를 모든 성도에게',
    heroPhrases: [
      '설교숏츠, 릴스 네이션스가 해결해 드릴게요',
      '교회를 돕는 모든 것 네이션스',
    ],
    questionHeading: '숏폼 세대에게 설교를 전달하고 싶어하는 목사님의 고민',
    questionText:
      '유튜브 링크만 넣어도 60초 가장 은혜로운 핵심 숏츠·릴스를 자동으로 만들 수 없을까요? 설교 영상이 없는 교회도 설교숏폼 영상을 만들수 있을까요? 주일 설교를 카드뉴스로 성도들에게 보내 한주간 묵상하게 하는 방법은 없을까? 대형교회처럼 주일광고 영상을 만들 순 없을까?',
    mainHeadingLine1: '목사님의 은혜로운 설교를',
    mainHeadingLine2: '숏폼세대와 모든 성도에게',
    subHeadingLine1: 'AI 매니저가 알아서 만듭니다.',
    subHeadingLine2: '링크 하나로 끝나요',
    corePoints: [
      {
        title: '유튜브 링크 하나로\n은혜로운 숏폼 5개 완성',
        desc: '예배 전체영상도 괜찮습니다. AI가 설교의 핵심 구간을 찾아냅니다. 설교문만 올려도 AI 음성으로 영상이 완성됩니다.',
      },
      {
        title: '목사님 고유의\n설교톤 학습',
        desc: '주보의 주일광고를 복사만 하면 됩니다. AI가 분석하여 배경이미지와 문구, AI 아나운서의 대본까지 멋진 영상 광고를 완성해 드립니다.',
      },
      {
        title: '인스타, 카카오톡\n카드뉴스',
        desc: '고된 편집의 수고 없이 목사님의 설교를 성도들이 한 주간 묵상하도록 주일설교 묵상카드, 6일치 묵상카드, 은혜로운 성경카드, 절기카드등을 완성해 드립니다.',
      },
    ],
    faqs: [
      {
        q: '가입 및 이용은 무료인가요?',
        preview: '네 무료로 가입하여도 기본 기능을 충분히 이용하실 수 있습니다.',
        a: '유료기능은 크레딧을 구매하여 사용한 만큼 차감하는 구조입니다. 심혈을 기울여 만든 고급기능을 유료로 결제하여 차원이 다른 편리함을 경험해 보세요.',
      },
      {
        q: '예배 전체 영상을 올려도 되나요?',
        preview: '네, 예배 전체 영상 유튜브 링크만 입력해도 됩니다.',
        a: 'AI가 찬양과 광고를 건너뛰고 설교 중 가장 은혜롭고 전달력 높은 60초 핵심 구간을 자동 분석하여 5개의 세로형 유튜브 쇼츠와 인스타그램 릴스로 생성해 줍니다.',
      },
      {
        q: '영상없이 설교문만 올려도 숏폼영상을 만들 수 있나요?',
        preview: '네 물론 입니다. 자막, 혹은 AI음성으로 영상을 만듭니다.',
        a: '교정이 안 된 메모설교도 목사님이 자주 쓰시는 어휘, 문법, 감동적인 표현 방식을 AI가 학습한 후, 자막+배경음악, AI음성+자막+배경음악 선택하여 가장 감동적인 5개의 설교숏폼 영상을 생성합니다.',
      },
      {
        q: '주일설교카드와 묵상카드는 무엇인가요?',
        preview: '목사님의 설교를 요약하여 성도들이 볼 수 있는 이미지 카드입니다.',
        a: '주일설교카드는 주일설교를 7장 정도의 이미지 카드로, 묵상카드는 주일설교를 성도들이 매일 기억하며 묵상할 수 있도록 6일치 분량의 묵상카드로 제작해 드립니다. 제작된 카드 이미지는 카톡이나 인스타 홈페이지에 올리시면 됩니다.',
      },
    ],
  },
  vote: {
    heroTopText: '투표의 공정성과 편리함을 하나로',
    heroPhrases: [
      '스마트한 교회선거 네이션스가 함께합니다',
      '교회를 돕는 모든 것 네이션스',
    ],
    questionHeading: '교회 공동체의 투표를 준비하는 사역자의 고민',
    questionText:
      '모든 성도가 손쉽게 참여할 수 있고, 개표의 정확성과 보안을 완벽히 보장하는 투표 시스템은 없을까요?',
    mainHeadingLine1: '공정하고 안전한 투표',
    mainHeadingLine2: '모든 성도가 함께하는 스마트 교회선거',
    subHeadingLine1: '쉽고 안전한 선거관리',
    subHeadingLine2: '링크 하나로 투표 완료',
    corePoints: [
      {
        title: '시간과 재정을 아끼는\n명확한 사역 효율',
        desc: '종이 인쇄와 개표 수고 없이 신속하고 투명하게 선거를 완료합니다.',
      },
      {
        title: '어르신부터 청년까지\n탄탄한 접근성',
        desc: '앱 설치 없이 카카오톡 링크로 본인인증 후 원클릭 투표가 가능합니다.',
      },
      {
        title: '교회의 안전을 지키는\n철저한 데이터 보안',
        desc: '암호화 블록체인급 검증 시스템으로 무결성을 완벽하게 보장합니다.',
      },
    ],
    faqs: [
      {
        q: '가입 및 이용은 무료인가요?',
        preview: '네 무료로 가입하여도 기본 기능을 충분히 이용하실 수 있습니다.',
        a: '유료기능은 크레딧을 구매하여 사용한 만큼 차감하는 구조입니다. 심혈을 기울여 만든 고급기능을 유료로 결제하여 차원이 다른 편리함을 경험해 보세요.',
      },
      {
        q: '스마트 투표 시스템 도입시 어르신들이 어려워하지 않을까요?',
        preview: '네이션스 투표앱은 현장 중심으로 설계되었습니다.',
        a: '직관적인 화면 구성은 물론, 대리 인증 및 종이 투표 병행 가이드 등 현장 맞춤형 매뉴얼을 함께 제공하여 단 한 명의 성도도 소외되지 않도록 돕습니다.',
      },
      {
        q: '스마트 투표의 운영이 비전문 선거 관리자(목회자)가 쓰기에 어렵지 않을까요?',
        preview: '네이션스 투표앱은 불필요한 행정을 혁신적으로 줄여드립니다.',
        a: 'IT 전문 지식이 없는 목회자와 성도님도 별도의 교육 없이 바로 쓸 수 있는 단순함이 네이션스의 원칙입니다.',
      },
    ],
  },
  score: {
    heroTopText: '찬양팀을 위한 스마트 악보 관리',
    heroPhrases: [
      '찬양팀 콘티와 악보를 한눈에',
      '교회를 돕는 모든 것 네이션스',
    ],
    questionHeading: '매주 찬양 콘티와 악보를 준비하는 찬양인도자의 고민',
    questionText:
      '조옮김(Key Change)과 파트보 공유를 손쉽게 해결할 수는 없을까요? 연습 음원과 악보를 한 화면에서 다룰 수 없을까요?',
    mainHeadingLine1: '찬양팀의 완벽한 하모니',
    mainHeadingLine2: '스마트 찬양대스크',
    subHeadingLine1: '직관적인 사역에 집중하다',
    subHeadingLine2: '하나의 영으로 예배하다',
    corePoints: [
      {
        title: '직관적인 사역에 집중하다',
        desc: '원클릭 조옮김과 실시간 파트보 생성으로 준비 시간을 혁신적으로 단축합니다.',
      },
      {
        title: '하나의 영으로 예배하다',
        desc: '찬양팀 전원에게 실시간으로 콘티와 악보가 동기화되어 일치된 예배를 섬깁니다.',
      },
      {
        title: '음악적 한계를 뛰어넘다',
        desc: '다양한 악기 파트별 편곡 지원과 가상 합주로 완성도 높은 찬양을 준비합니다.',
      },
    ],
    faqs: [
      {
        q: '가입 및 이용은 무료인가요?',
        preview: '네 무료로 가입하여도 기본 기능을 충분히 이용하실 수 있습니다.',
        a: '유료기능은 크레딧을 구매하여 사용한 만큼 차감하는 구조입니다. 심혈을 기울여 만든 고급기능을 유료로 결제하여 차원이 다른 편리함을 경험해 보세요.',
      },
      {
        q: '악보와 콘티는 어디서나 볼수 있나요?',
        preview: "네이션스의 모든 솔루션은 '현장 중심'으로 설계됩니다.",
        a: '네이션스 악보의 모든 데이터는 안전하게 클라우드에 저장되어 전세계 어디에서든 접속이 가능합니다. 또한 찬양팀 플랫폼, 회중용 플랫폼이 따로 제공되어 모든 기기에서 접속이 가능합니다.',
      },
      {
        q: '악보는 어떻게 구할수 있나요?',
        preview: '네이션스 악보앱은 악보를 판매하지 않습니다.',
        a: '사용자 개인이 정상적으로 구입한 악보를 관리하는 라이브러리와 뷰어를 제공합니다.',
      },
      {
        q: '찬양팀과 어떻게 공유하나요?',
        preview: '매주 악보와 송품을 보내던 번거로움은 잊으세요.',
        a: '네이션스 악보앱은 찬양인도자가 앱에 저장한 콘티와 송폼, 카피를 위한 유튜브 영상까지 한번에 공유할 수 있습니다. 찬양팀 전용 페이지를 통해 실시간 송폼 수정과 소통, 교제가 가능합니다.',
      },
    ],
  },
  bible: {
    heroTopText: '설교자를 위한 나만의 디지털 성경 서재',
    heroPhrases: [
      '성경 원어 대조와 맞춤 설교데스크',
      '교회를 돕는 모든 것 네이션스',
    ],
    questionHeading: '깊이 있는 말씀 연구와 설교 준비를 위한 목회자의 고민',
    questionText:
      '여러 역본을 한눈에 대조하고 원어 사전과 주석을 빠르게 찾아볼 수 있는 스마트한 연구 도구는 없을까요?',
    mainHeadingLine1: '깊이 있는 말씀 묵상과 설교',
    mainHeadingLine2: '설교자를 위한 맞춤 설교데스크',
    subHeadingLine1: '말씀 연구의 새로운 지평',
    subHeadingLine2: '원어와 주석을 한 화면에',
    corePoints: [
      {
        title: '설교자를 위한\n맞춤 설교데스크',
        desc: '성경 본문과 개인 설교노트를 나란히 배치하여 집중력 있는 설교 작성을 지원합니다.',
      },
      {
        title: '다중 역본 동시 대조 &\n원어 사전',
        desc: '개역개정, 새번역, NIV, 원어 스트롱코드 분해까지 클릭 한 번으로 대조합니다.',
      },
      {
        title: '기억에 남는\n설교 아카이빙',
        desc: '지난 설교와 본문별 묵상 기록을 체계적으로 검색하고 재활용할 수 있습니다.',
      },
    ],
    faqs: [
      {
        q: '가입 및 이용은 무료인가요?',
        preview: '네 무료로 가입하여도 기본 기능을 충분히 이용하실 수 있습니다.',
        a: '유료기능은 크레딧을 구매하여 사용한 만큼 차감하는 구조입니다. 심혈을 기울여 만든 고급기능을 유료로 결제하여 차원이 다른 편리함을 경험해 보세요.',
      },
      {
        q: '기존에 사용하던 무거운 PC 성경 프로그램에 비해 어떤 실질적 장점이 있나요?',
        preview: '네이션스 성경은 무겁지 않으며 언제 어디서나 즉시 이어집니다.',
        a: '복잡하고 난해한 메뉴 대신 목회자가 가장 자주 쓰는 역본 대조와 절별 메모를 직관적으로 배치했습니다. 서재의 PC, 이동 중 스마트폰, 강단 위의 태블릿까지 실시간 클라우드로 완벽 동기화됩니다.',
      },
      {
        q: 'AI 원어 주석과 개인 주석기능은 어떻게 활용하나요?',
        preview: '네이션스 성경은 완벽한 나만의 주석을 추구합니다.',
        a: 'AI원어 주석을 통해 구절별, 단어별, 심층 주석을 제공받고, 사용자가 메모해둔 주석과 관주, 설교등이 모두 성경텍스트 안에 구절마다 담겨져 있습니다. 기존의 흩어져 있던 자료들을 찾느라 시간낭비 없이 나만의 주석이 완성됩니다.',
      },
    ],
  },
};

const INTRO_UPDATE_EVENT = 'nations-site-intro-updated';

// In-Memory cache for 0ms rendering
const introMemoryCache: Record<PageKey, SiteIntroData> = {
  sermon: { ...DEFAULT_SITE_INTROS.sermon },
  vote: { ...DEFAULT_SITE_INTROS.vote },
  score: { ...DEFAULT_SITE_INTROS.score },
  bible: { ...DEFAULT_SITE_INTROS.bible },
};

export function getSiteIntroCached(page: PageKey): SiteIntroData {
  return introMemoryCache[page] || DEFAULT_SITE_INTROS[page];
}

// 1. LocalStorage Synchronous Hydration
function loadIntroFromLocalStorage(): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  const pages: PageKey[] = ['sermon', 'vote', 'score', 'bible'];
  for (const p of pages) {
    try {
      const raw = localStorage.getItem(`nations_intro_${p}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        introMemoryCache[p] = {
          ...DEFAULT_SITE_INTROS[p],
          ...parsed,
          corePoints: [
            parsed.corePoints?.[0] || DEFAULT_SITE_INTROS[p].corePoints[0],
            parsed.corePoints?.[1] || DEFAULT_SITE_INTROS[p].corePoints[1],
            parsed.corePoints?.[2] || DEFAULT_SITE_INTROS[p].corePoints[2],
          ],
          faqs: Array.isArray(parsed.faqs) ? parsed.faqs : DEFAULT_SITE_INTROS[p].faqs,
        };
      }
    } catch (e) {
      console.warn(`LocalStorage read error for intro ${p}:`, e);
    }
  }
}
loadIntroFromLocalStorage();

// 2. Real-time Firestore Listeners
let isIntroListening = false;
export function initSiteIntroListeners(): void {
  if (isIntroListening || typeof window === 'undefined') return;
  isIntroListening = true;

  const pages: PageKey[] = ['sermon', 'vote', 'score', 'bible'];
  pages.forEach((p) => {
    try {
      const docRef = doc(db, 'site_intro', p);
      onSnapshot(docRef, (snap) => {
        if (snap.exists()) {
          const data = snap.data() as Partial<SiteIntroData>;
          introMemoryCache[p] = {
            ...DEFAULT_SITE_INTROS[p],
            ...data,
            corePoints: [
              data.corePoints?.[0] || DEFAULT_SITE_INTROS[p].corePoints[0],
              data.corePoints?.[1] || DEFAULT_SITE_INTROS[p].corePoints[1],
              data.corePoints?.[2] || DEFAULT_SITE_INTROS[p].corePoints[2],
            ],
            faqs: Array.isArray(data.faqs) ? data.faqs : DEFAULT_SITE_INTROS[p].faqs,
          };
          try {
            localStorage.setItem(`nations_intro_${p}`, JSON.stringify(introMemoryCache[p]));
          } catch {}
          window.dispatchEvent(new CustomEvent(INTRO_UPDATE_EVENT));
        }
      });
    } catch (err) {
      console.warn(`Firestore site_intro listener error for ${p}:`, err);
    }
  });
}

// 3. React Hook for subscribing to intro of a page
export function useSiteIntro(page: PageKey): SiteIntroData {
  const [intro, setIntro] = useState<SiteIntroData>(() => introMemoryCache[page]);

  useEffect(() => {
    initSiteIntroListeners();

    // Immediately sync state with memory cache when page changes
    setIntro({ ...introMemoryCache[page] });

    const handleUpdate = () => {
      setIntro({ ...introMemoryCache[page] });
    };

    window.addEventListener(INTRO_UPDATE_EVENT, handleUpdate);
    return () => window.removeEventListener(INTRO_UPDATE_EVENT, handleUpdate);
  }, [page]);

  return intro;
}

// 4. Save Site Intro to Firestore (Admin Action)
export async function saveSiteIntro(page: PageKey, data: Partial<SiteIntroData>): Promise<void> {
  const docRef = doc(db, 'site_intro', page);
  const payload = {
    ...data,
    updatedAt: new Date().toISOString(),
  };

  await setDoc(docRef, payload, { merge: true });

  // Update local memory and localStorage immediately
  introMemoryCache[page] = {
    ...introMemoryCache[page],
    ...payload,
  };
  try {
    localStorage.setItem(`nations_intro_${page}`, JSON.stringify(introMemoryCache[page]));
  } catch {}
  window.dispatchEvent(new CustomEvent(INTRO_UPDATE_EVENT));
}

// 5. Reset to default values
export async function resetSiteIntro(page: PageKey): Promise<void> {
  await saveSiteIntro(page, DEFAULT_SITE_INTROS[page]);
}
