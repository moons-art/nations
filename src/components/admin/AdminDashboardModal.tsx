import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  PageKey,
  PointIndex,
  PAGE_TITLES,
  POINT_LABELS,
  compressImage,
  saveImage,
  removeImage,
  resetAllImages,
  usePageImages,
  exportDataJSON,
  importDataJSON,
} from '../../services/imageStorage';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ADMIN_PASSWORD = '83950660';

// Gradients matching each point card on the live site
const CARD_GRADIENTS: Record<PointIndex, string> = {
  0: 'bg-gradient-to-br from-[#EAE6F5] via-[#E4E8F7] to-[#D5DCF5]',
  1: 'bg-gradient-to-br from-[#E3F5EC] via-[#E8F3EE] to-[#D6EBE0]',
  2: 'bg-gradient-to-br from-[#FFF3E6] via-[#FCEEE2] to-[#F7DFCD]',
};

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPage, setSelectedPage] = useState<PageKey>('sermon');
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmResetAll, setConfirmResetAll] = useState(false);

  // Single reliable top-level file input ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [targetSlot, setTargetSlot] = useState<PointIndex>(0);

  // Subscribe to images of current page
  const sermonImages = usePageImages('sermon');
  const voteImages = usePageImages('vote');
  const scoreImages = usePageImages('score');
  const bibleImages = usePageImages('bible');

  const currentImages = {
    sermon: sermonImages,
    vote: voteImages,
    score: scoreImages,
    bible: bibleImages,
  }[selectedPage];

  // JSON backup file input ref
  const jsonFileInputRef = useRef<HTMLInputElement>(null);

  // Count total registered images across all pages
  const totalUploadedCount = [
    ...sermonImages,
    ...voteImages,
    ...scoreImages,
    ...bibleImages,
  ].filter(Boolean).length;

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setFeedback({ message, type });
    setTimeout(() => {
      setFeedback(null);
    }, 3500);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError(false);
      setPasswordInput('');
      showToast('관리자 인증이 완료되었습니다.', 'success');
    } else {
      setPasswordError(true);
    }
  };

  const triggerUpload = (index: PointIndex) => {
    setTargetSlot(index);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('이미지 파일(PNG, JPG, WebP 등)만 업로드할 수 있습니다.', 'error');
      return;
    }

    try {
      setIsProcessing(true);
      showToast(`Point 0${targetSlot + 1} 사진 최적화 및 영구 저장 중...`, 'info');

      // Smart auto-compress: 1000px, 0.78 quality (crisp on Retina, ultra-light ~80KB)
      const compressedDataUrl = await compressImage(file, 1000, 0.78);
      await saveImage(selectedPage, targetSlot, compressedDataUrl);

      showToast(`Point 0${targetSlot + 1} 사진이 영구 저장되었습니다! (새로고침 시 유지)`, 'success');
    } catch (err) {
      console.error(err);
      showToast('사진 등록에 실패했습니다. 다시 시도해 주세요.', 'error');
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDrop = async (e: React.DragEvent, index: PointIndex) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith('image/')) {
      showToast('이미지 파일만 드롭해주세요.', 'error');
      return;
    }

    try {
      setIsProcessing(true);
      showToast(`Point 0${index + 1} 사진 최적화 및 영구 저장 중...`, 'info');
      const compressedDataUrl = await compressImage(file, 1000, 0.78);
      await saveImage(selectedPage, index, compressedDataUrl);
      showToast(`Point 0${index + 1} 사진이 영구 저장되었습니다! (새로고침 시 유지)`, 'success');
    } catch {
      showToast('사진 등록 중 오류가 발생했습니다.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDirectRemove = async (index: PointIndex) => {
    try {
      await removeImage(selectedPage, index);
      showToast(`Point 0${index + 1} 이미지가 삭제되어 비워졌습니다.`, 'info');
    } catch (err) {
      console.error(err);
      showToast('이미지 삭제에 실패했습니다.', 'error');
    }
  };

  // Export JSON Backup
  const handleExportBackup = () => {
    try {
      const json = exportDataJSON();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nations-images-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('전체 이미지 데이터가 백업 파일(.json)로 저장되었습니다!', 'success');
    } catch (err) {
      console.error(err);
      showToast('백업 파일 생성에 실패했습니다.', 'error');
    }
  };

  // Import JSON Backup
  const handleImportFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      showToast('백업 파일에서 이미지를 복원하는 중...', 'info');
      const text = await file.text();
      const success = await importDataJSON(text);
      if (success) {
        showToast('백업 데이터가 성공적으로 전체 복원되었습니다!', 'success');
      } else {
        showToast('유효하지 않은 백업 파일 형식입니다.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('백업 복원 중 오류가 발생했습니다.', 'error');
    } finally {
      setIsProcessing(false);
      if (jsonFileInputRef.current) {
        jsonFileInputRef.current.value = '';
      }
    }
  };

  const handleResetAllClick = async () => {
    if (!confirmResetAll) {
      setConfirmResetAll(true);
      setTimeout(() => setConfirmResetAll(false), 4000);
      return;
    }

    try {
      await resetAllImages();
      setConfirmResetAll(false);
      showToast('모든 페이지의 이미지가 초기화되었습니다.', 'info');
    } catch (err) {
      console.error(err);
      showToast('초기화 중 오류가 발생했습니다.', 'error');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    setPasswordError(false);
    showToast('관리자 세션이 잠겼습니다.', 'info');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-fadeIn">
      {/* Hidden Global Native File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      {/* Hidden JSON Backup File Input */}
      <input
        ref={jsonFileInputRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={handleImportFileChange}
      />

      {/* Container Dialog */}
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-[16px] sm:text-[18px] font-bold tracking-tight">
              네이션스 관리자 대시보드
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="px-2.5 py-1 text-[12px] rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                잠금
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="닫기"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Global Toast Notification */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`absolute top-16 left-1/2 -translate-x-1/2 z-50 text-[13px] font-semibold px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 text-white ${
                feedback.type === 'error'
                  ? 'bg-red-600'
                  : feedback.type === 'info'
                  ? 'bg-blue-600'
                  : 'bg-emerald-600'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {feedback.type === 'error'
                  ? 'error'
                  : feedback.type === 'info'
                  ? 'info'
                  : 'check_circle'}
              </span>
              <span>{feedback.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          {!isAuthenticated ? (
            /* 1. Password Verification Form */
            <div className="max-w-md mx-auto my-12 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 mb-4">
                <span className="material-symbols-outlined text-3xl">lock</span>
              </div>
              <h3 className="text-[20px] font-bold text-slate-900 mb-1">
                관리자 비밀번호 입력
              </h3>
              <p className="text-[13px] text-slate-500 mb-6">
                대시보드에 접근하려면 관리자 8자리 비밀번호를 입력해주세요.
              </p>

              <form onSubmit={handlePasswordSubmit} className="w-full flex flex-col gap-3">
                <div className="relative w-full">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setPasswordError(false);
                    }}
                    placeholder="비밀번호 8자리 입력"
                    autoFocus
                    className={`w-full px-4 py-3 rounded-xl border text-[15px] text-center font-mono tracking-widest focus:outline-none transition-colors ${
                      passwordError
                        ? 'border-red-500 bg-red-50 text-red-900 focus:border-red-600'
                        : 'border-slate-300 focus:border-slate-900 bg-slate-50 focus:bg-white text-slate-900'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label="비밀번호 표시/숨기기"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>

                {passwordError && (
                  <p className="text-[12px] text-red-600 font-medium">
                    비밀번호가 일치하지 않습니다. 다시 입력해주세요.
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[14px] shadow-sm hover:shadow transition-all cursor-pointer mt-2"
                >
                  대시보드 로그인
                </button>
              </form>
            </div>
          ) : (
            /* 2. Admin Content Management Dashboard */
            <div className="w-full flex flex-col gap-6">
              {/* Page Tabs */}
              <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-200/80 rounded-2xl">
                {(['sermon', 'vote', 'score', 'bible'] as PageKey[]).map((pageKey) => (
                  <button
                    key={pageKey}
                    type="button"
                    onClick={() => setSelectedPage(pageKey)}
                    className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-[13px] font-bold transition-all cursor-pointer text-center ${
                      selectedPage === pageKey
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                    }`}
                  >
                    {PAGE_TITLES[pageKey]}
                  </button>
                ))}
              </div>

              {/* Storage Status & Backup Toolbar Banner */}
              <div className="px-4 py-3 rounded-2xl bg-slate-900 text-white text-[12.5px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className="font-semibold text-white">
                      Firebase 클라우드 실시간 연동 (모든 방문자에게 자동 노출)
                    </span>
                    <span className="text-[11.5px] text-slate-300">
                      총 등록: <strong className="text-emerald-400">{totalUploadedCount}</strong> / 12개 슬롯
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
                  <button
                    type="button"
                    onClick={handleExportBackup}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11.5px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
                    title="등록된 모든 사진과 데이터를 JSON 파일로 다운로드 백업"
                  >
                    <span className="material-symbols-outlined text-[15px]">download</span>
                    <span>데이터 백업</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => jsonFileInputRef.current?.click()}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11.5px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
                    title="백업한 JSON 파일에서 모든 사진과 데이터 복원"
                  >
                    <span className="material-symbols-outlined text-[15px]">upload_file</span>
                    <span>데이터 복원</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetAllClick}
                    className={`text-[11.5px] px-2.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                      confirmResetAll
                        ? 'bg-red-600 text-white animate-pulse'
                        : 'bg-red-950/70 hover:bg-red-900 text-red-300'
                    }`}
                  >
                    {confirmResetAll ? '한 번 더 누르면 전체 비움' : '전체 비움'}
                  </button>
                </div>
              </div>

              {/* 3 Core Point Image Upload Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {([0, 1, 2] as PointIndex[]).map((index) => {
                  const imageSrc = currentImages[index];
                  const label = POINT_LABELS[selectedPage][index];
                  const gradient = CARD_GRADIENTS[index];

                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col justify-between gap-4"
                    >
                      {/* Slot Header */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-bold text-slate-500 font-mono">
                          POINT 0{index + 1}
                        </span>
                        <h4 className="text-[14px] font-bold text-slate-900 leading-snug break-keep-all line-clamp-2">
                          {label}
                        </h4>
                      </div>

                      {/* Live Preview Container (Matches the live site container aspect & card background!) */}
                      <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDrop(e, index)}
                        className={`w-full rounded-2xl p-3 ${gradient} border border-slate-200/80 shadow-inner flex items-center justify-center min-h-[190px] max-h-[220px] relative overflow-hidden group`}
                      >
                        {imageSrc ? (
                          <div className="relative w-full h-[170px] rounded-xl flex items-center justify-center overflow-hidden">
                            <img
                              src={imageSrc}
                              alt={label}
                              className="w-full h-full object-contain drop-shadow-sm rounded-lg"
                            />
                            <span className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-medium shadow-xs">
                              등록 완료
                            </span>
                          </div>
                        ) : (
                          <div
                            onClick={() => triggerUpload(index)}
                            className="w-full h-[170px] rounded-xl border-2 border-dashed border-slate-400/40 hover:border-slate-500/70 flex flex-col items-center justify-center text-slate-500 gap-1.5 p-3 text-center cursor-pointer transition-colors"
                          >
                            <span className="material-symbols-outlined text-2xl opacity-40">
                              add_photo_alternate
                            </span>
                            <span className="text-[11.5px] font-semibold text-slate-700">
                              이미지 비워짐
                            </span>
                            <span className="text-[10.5px] text-slate-400">
                              클릭하거나 사진을 드롭하여 등록
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Upload / Action Buttons */}
                      <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                        <button
                          type="button"
                          disabled={isProcessing}
                          onClick={() => triggerUpload(index)}
                          className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white text-[12px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {imageSrc ? 'change_circle' : 'upload'}
                          </span>
                          <span>{imageSrc ? '사진 변경' : '사진 업로드'}</span>
                        </button>

                        {imageSrc && (
                          <button
                            type="button"
                            disabled={isProcessing}
                            onClick={() => handleDirectRemove(index)}
                            className="py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-[12px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                            title="사진 즉시 삭제"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                            <span className="text-[11.5px]">삭제</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Quick Help */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-600 text-[12px] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="material-symbols-outlined text-emerald-600 text-[18px]">
                    cloud_done
                  </span>
                  등록된 모든 사진은 Firebase Cloud에 자동 저장되어, 새로고침은 물론 앱에 접속하는 모든 방문자 화면에 즉시 딱 박혀서 나타납니다.
                </span>
                <span className="text-slate-400 font-mono text-[11px] shrink-0">
                  Cloud Sync: Firebase Firestore + Local Cache
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
