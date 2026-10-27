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
import {
  useSiteIntro,
  saveSiteIntro,
  resetSiteIntro,
  SiteIntroData,
  CorePointText,
  DEFAULT_SITE_INTROS,
} from '../../services/siteIntroStorage';

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

  // Management Mode: 'texts' (문구 관리) vs 'images' (대표 이미지 관리)
  const [activeTabType, setActiveTabType] = useState<'texts' | 'images'>('texts');

  // Real-time Site Intro for selected page
  const liveIntro = useSiteIntro(selectedPage);
  const [introForm, setIntroForm] = useState<SiteIntroData>(liveIntro);
  const [isSavingIntro, setIsSavingIntro] = useState(false);
  const [confirmResetIntro, setConfirmResetIntro] = useState(false);

  React.useEffect(() => {
    if (liveIntro) {
      setIntroForm(liveIntro);
    }
  }, [liveIntro, selectedPage]);

  const handleSaveIntro = async () => {
    try {
      setIsSavingIntro(true);
      await saveSiteIntro(selectedPage, introForm);
      showToast(
        `${PAGE_TITLES[selectedPage]} 문구가 저장되었습니다! (sermon 앱에 즉시 스트리밍 반영)`,
        'success'
      );
    } catch (err) {
      console.error(err);
      showToast('문구 저장에 실패했습니다. 다시 시도해 주세요.', 'error');
    } finally {
      setIsSavingIntro(false);
    }
  };

  const handleResetIntro = async () => {
    if (!confirmResetIntro) {
      setConfirmResetIntro(true);
      setTimeout(() => setConfirmResetIntro(false), 3500);
      return;
    }
    try {
      setIsSavingIntro(true);
      await resetSiteIntro(selectedPage);
      setConfirmResetIntro(false);
      showToast(`${PAGE_TITLES[selectedPage]} 문구가 기본값으로 복원되었습니다.`, 'info');
    } catch (err) {
      console.error(err);
      showToast('초기화에 실패했습니다.', 'error');
    } finally {
      setIsSavingIntro(false);
    }
  };

  const handleFaqChange = (index: number, field: 'q' | 'preview' | 'a', value: string) => {
    setIntroForm((prev) => {
      const updated = [...(prev.faqs || [])];
      if (updated[index]) {
        updated[index] = { ...updated[index], [field]: value };
      }
      return { ...prev, faqs: updated };
    });
  };

  const handleAddFaq = () => {
    setIntroForm((prev) => ({
      ...prev,
      faqs: [
        ...(prev.faqs || []),
        {
          q: '새로운 질문을 입력하세요',
          preview: '답변 미리보기/요약 문구',
          a: '상세 답변 내용을 입력하세요.',
        },
      ],
    }));
  };

  const handleRemoveFaq = (index: number) => {
    setIntroForm((prev) => {
      const updated = [...(prev.faqs || [])];
      updated.splice(index, 1);
      return { ...prev, faqs: updated };
    });
  };

  const handleMoveFaq = (index: number, direction: 'up' | 'down') => {
    setIntroForm((prev) => {
      const updated = [...(prev.faqs || [])];
      const targetIdx = direction === 'up' ? index - 1 : index + 1;
      if (targetIdx < 0 || targetIdx >= updated.length) return prev;
      const temp = updated[index];
      updated[index] = updated[targetIdx];
      updated[targetIdx] = temp;
      return { ...prev, faqs: updated };
    });
  };

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

              {/* Sub-navigation: Texts vs Images */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTabType('texts')}
                    className={`px-4 py-2 rounded-xl text-[13px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeTabType === 'texts'
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[17px]">edit_note</span>
                    <span>페이지 문구 실시간 관리</span>
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-500 text-white font-mono">
                      LIVE
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTabType('images')}
                    className={`px-4 py-2 rounded-xl text-[13px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeTabType === 'images'
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[17px]">image</span>
                    <span>대표 사진 관리 (Point 01~03)</span>
                  </button>
                </div>

                <div className="text-[12px] text-slate-500 flex items-center gap-1 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>수정 즉시 sermon 앱에 실시간 스트리밍 반영</span>
                </div>
              </div>
              {activeTabType === 'texts' ? (
                /* ── 문구 관리 폼 ── */
                <div className="flex flex-col gap-6">
                  {/* 안내 배너 */}
                  <div className="px-4 py-3 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white text-[12.5px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                      <div>
                        <span className="font-semibold text-white">
                          [{PAGE_TITLES[selectedPage]}] 페이지 문구 편집
                        </span>
                        <span className="text-slate-300 ml-2 text-[11.5px]">
                          아래 문구를 수정하고 저장하면 홈페이지와 sermon 앱 화면에 즉각 실시간 스트리밍 반영됩니다.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 1. 히어로 영상 상단 문구 & 순환 멘트 */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col gap-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                      <span className="material-symbols-outlined text-indigo-600 text-[20px]">movie</span>
                      <h4 className="text-[15px] font-bold text-slate-900">
                        1. 최상단 히어로 영상 문구
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12px] font-bold text-slate-700">
                          히어로 상단 고정 문구
                        </label>
                        <input
                          type="text"
                          value={introForm.heroTopText || ''}
                          onChange={(e) =>
                            setIntroForm((prev) => ({ ...prev, heroTopText: e.target.value }))
                          }
                          placeholder="예: 목사님의 설교를 모든 성도에게"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-slate-900 focus:outline-none text-[13.5px] bg-slate-50 focus:bg-white transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12px] font-bold text-slate-700">
                          히어로 타이핑/순환 문구 (줄바꿈으로 구분)
                        </label>
                        <textarea
                          rows={2}
                          value={(introForm.heroPhrases || []).join('\n')}
                          onChange={(e) =>
                            setIntroForm((prev) => ({
                              ...prev,
                              heroPhrases: e.target.value
                                .split('\n')
                                .map((s) => s.trim())
                                .filter(Boolean),
                            }))
                          }
                          placeholder="설교숏츠, 릴스 네이션스가 해결해 드릴게요&#10;교회를 돕는 모든 것 네이션스"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-slate-900 focus:outline-none text-[13px] bg-slate-50 focus:bg-white transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 2. 목사님의 고민 (질문 카드) */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col gap-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                      <span className="material-symbols-outlined text-amber-600 text-[20px]">help</span>
                      <h4 className="text-[15px] font-bold text-slate-900">
                        2. 목사님의 고민 (질문 카드)
                      </h4>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12px] font-bold text-slate-700">
                          질문 카드 상단 제목
                        </label>
                        <input
                          type="text"
                          value={introForm.questionHeading || ''}
                          onChange={(e) =>
                            setIntroForm((prev) => ({ ...prev, questionHeading: e.target.value }))
                          }
                          placeholder="예: 숏폼 세대에게 설교를 전달하고 싶어하는 목사님의 고민"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-slate-900 focus:outline-none text-[13.5px] bg-slate-50 focus:bg-white transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12px] font-bold text-slate-700">
                          질문 카드 내부 문구 (타이핑 애니메이션 텍스트)
                        </label>
                        <textarea
                          rows={3}
                          value={introForm.questionText || ''}
                          onChange={(e) =>
                            setIntroForm((prev) => ({ ...prev, questionText: e.target.value }))
                          }
                          placeholder="목사님들의 고민 질문 내용을 입력해주세요."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-slate-900 focus:outline-none text-[13px] bg-slate-50 focus:bg-white transition-colors leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3. 기능소개 카드 상단의 메인 문구와 보조 문구 */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col gap-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                      <span className="material-symbols-outlined text-emerald-600 text-[20px]">title</span>
                      <h4 className="text-[15px] font-bold text-slate-900">
                        3. 기능소개 섹션 상단 헤딩 문구
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12px] font-bold text-slate-700">
                          상단 메인 문구 1행 (sermon 로그인 카드 헤딩)
                        </label>
                        <input
                          type="text"
                          value={introForm.mainHeadingLine1 || ''}
                          onChange={(e) =>
                            setIntroForm((prev) => ({ ...prev, mainHeadingLine1: e.target.value }))
                          }
                          placeholder="예: 목사님의 은혜로운 설교를"
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-slate-900 focus:outline-none text-[13px] bg-slate-50 focus:bg-white"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12px] font-bold text-slate-700">
                          상단 메인 문구 2행 (sermon 로그인 카드 헤딩)
                        </label>
                        <input
                          type="text"
                          value={introForm.mainHeadingLine2 || ''}
                          onChange={(e) =>
                            setIntroForm((prev) => ({ ...prev, mainHeadingLine2: e.target.value }))
                          }
                          placeholder="예: 숏폼세대와 모든 성도에게"
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-slate-900 focus:outline-none text-[13px] bg-slate-50 focus:bg-white"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12px] font-bold text-slate-700">
                          기능소개 상단 보조 문구 1행 (메인 타이틀)
                        </label>
                        <input
                          type="text"
                          value={introForm.subHeadingLine1 || ''}
                          onChange={(e) =>
                            setIntroForm((prev) => ({ ...prev, subHeadingLine1: e.target.value }))
                          }
                          placeholder="예: AI 매니저가 알아서 만듭니다."
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-slate-900 focus:outline-none text-[13px] bg-slate-50 focus:bg-white"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12px] font-bold text-slate-700">
                          기능소개 상단 보조 문구 2행 (서브 카피)
                        </label>
                        <input
                          type="text"
                          value={introForm.subHeadingLine2 || ''}
                          onChange={(e) =>
                            setIntroForm((prev) => ({ ...prev, subHeadingLine2: e.target.value }))
                          }
                          placeholder="예: 링크 하나로 끝나요"
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-slate-900 focus:outline-none text-[13px] bg-slate-50 focus:bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 4. 기능소개 카드 3개 내부의 제목과 설명글 */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col gap-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                      <span className="material-symbols-outlined text-purple-600 text-[20px]">view_column</span>
                      <h4 className="text-[15px] font-bold text-slate-900">
                        4. 핵심 기능 3개 카드 내부 문구 (POINT 01, 02, 03)
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {([0, 1, 2] as PointIndex[]).map((idx) => {
                        const point = introForm.corePoints?.[idx] || { title: '', desc: '' };
                        return (
                          <div
                            key={idx}
                            className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col gap-3"
                          >
                            <span className="text-[11px] font-bold text-slate-500 font-mono">
                              POINT 0{idx + 1}
                            </span>

                            <div className="flex flex-col gap-1">
                              <label className="text-[11.5px] font-bold text-slate-700">
                                카드 제목 (줄바꿈 가능)
                              </label>
                              <textarea
                                rows={2}
                                value={point.title || ''}
                                onChange={(e) => {
                                  const updated = [...(introForm.corePoints || [])] as [
                                    CorePointText,
                                    CorePointText,
                                    CorePointText
                                  ];
                                  updated[idx] = { ...updated[idx], title: e.target.value };
                                  setIntroForm((prev) => ({ ...prev, corePoints: updated }));
                                }}
                                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:border-slate-900 focus:outline-none text-[12.5px] bg-white font-medium"
                              />
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-[11.5px] font-bold text-slate-700">
                                카드 설명글
                              </label>
                              <textarea
                                rows={4}
                                value={point.desc || ''}
                                onChange={(e) => {
                                  const updated = [...(introForm.corePoints || [])] as [
                                    CorePointText,
                                    CorePointText,
                                    CorePointText
                                  ];
                                  updated[idx] = { ...updated[idx], desc: e.target.value };
                                  setIntroForm((prev) => ({ ...prev, corePoints: updated }));
                                }}
                                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:border-slate-900 focus:outline-none text-[12px] bg-white leading-relaxed text-slate-600"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 5. 질문과 답변 (Q&A / FAQ 관리) */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col gap-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-blue-600 text-[20px]">quiz</span>
                        <h4 className="text-[15px] font-bold text-slate-900">
                          5. 자주 묻는 질문(FAQ) 및 답변 관리
                        </h4>
                        <span className="text-[12px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                          {(introForm.faqs || []).length}개 항목
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddFaq}
                        className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-[12px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span>
                        <span>질문 추가</span>
                      </button>
                    </div>

                    <p className="text-[12px] text-slate-500 leading-relaxed -mt-1">
                      각 페이지 하단의 Q&A 섹션에 노출되는 질문, 한 줄 요약(미리보기), 상세 답변을 수정할 수 있습니다.
                    </p>

                    <div className="flex flex-col gap-4">
                      {(introForm.faqs || []).map((faq, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col gap-3 transition-colors hover:border-slate-300"
                        >
                          {/* Item Header & Controls */}
                          <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200/80">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center">
                                {idx + 1}
                              </span>
                              <span className="text-[12px] font-bold text-slate-700">
                                질문 #{idx + 1}
                              </span>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => handleMoveFaq(idx, 'up')}
                                title="위로 이동"
                                className="w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-white text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
                              >
                                <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                              </button>
                              <button
                                type="button"
                                disabled={idx === (introForm.faqs?.length || 0) - 1}
                                onClick={() => handleMoveFaq(idx, 'down')}
                                title="아래로 이동"
                                className="w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-white text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
                              >
                                <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveFaq(idx)}
                                title="질문 삭제"
                                className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 flex items-center justify-center cursor-pointer transition-colors ml-1"
                              >
                                <span className="material-symbols-outlined text-[16px]">delete</span>
                              </button>
                            </div>
                          </div>

                          {/* 1. 질문 (Q) */}
                          <div className="flex flex-col gap-1">
                            <label className="text-[11.5px] font-bold text-slate-700 flex items-center gap-1">
                              <span className="text-blue-600 font-extrabold">Q.</span>
                              <span>질문 문구</span>
                            </label>
                            <input
                              type="text"
                              value={faq.q || ''}
                              onChange={(e) => handleFaqChange(idx, 'q', e.target.value)}
                              placeholder="예: 가입 및 이용은 무료인가요?"
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-slate-900 focus:outline-none text-[13px] bg-white font-medium"
                            />
                          </div>

                          {/* 2. 한 줄 요약 프리뷰 (Preview) */}
                          <div className="flex flex-col gap-1">
                            <label className="text-[11.5px] font-bold text-slate-700 flex items-center gap-1">
                              <span className="text-slate-500 font-bold">Preview.</span>
                              <span>한 줄 요약 (목록에서 기본 노출되는 회색 텍스트)</span>
                            </label>
                            <input
                              type="text"
                              value={faq.preview || ''}
                              onChange={(e) => handleFaqChange(idx, 'preview', e.target.value)}
                              placeholder="예: 네 무료로 가입하여도 기본 기능을 충분히 이용하실 수 있습니다."
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-slate-900 focus:outline-none text-[12.5px] bg-white text-slate-600"
                            />
                          </div>

                          {/* 3. 상세 답변 (A) */}
                          <div className="flex flex-col gap-1">
                            <label className="text-[11.5px] font-bold text-slate-700 flex items-center gap-1">
                              <span className="text-emerald-600 font-extrabold">A.</span>
                              <span>상세 답변 (펼쳤을 때 나타나는 전체 내용)</span>
                            </label>
                            <textarea
                              rows={3}
                              value={faq.a || ''}
                              onChange={(e) => handleFaqChange(idx, 'a', e.target.value)}
                              placeholder="질문을 클릭했을 때 펼쳐지는 상세 답변 내용을 입력하세요."
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-slate-900 focus:outline-none text-[12.5px] bg-white leading-relaxed text-slate-700"
                            />
                          </div>
                        </div>
                      ))}

                      {(!introForm.faqs || introForm.faqs.length === 0) && (
                        <div className="p-8 rounded-xl border border-dashed border-slate-300 text-center flex flex-col items-center justify-center gap-2">
                          <span className="material-symbols-outlined text-slate-400 text-[32px]">help_outline</span>
                          <p className="text-[13px] text-slate-500 font-medium">등록된 질문이 없습니다.</p>
                          <button
                            type="button"
                            onClick={handleAddFaq}
                            className="mt-1 px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-[12px] font-bold hover:bg-black transition-colors cursor-pointer"
                          >
                            첫 번째 질문 추가하기
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 하단 액션 버튼 바 */}
                  <div className="sticky bottom-0 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="button"
                      disabled={isSavingIntro}
                      onClick={handleResetIntro}
                      className={`text-[12px] px-3.5 py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                        confirmResetIntro
                          ? 'bg-red-600 text-white animate-pulse'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      }`}
                    >
                      {confirmResetIntro ? '한 번 더 누르면 기본 문구로 복원' : '기본 문구로 초기화'}
                    </button>

                    <button
                      type="button"
                      disabled={isSavingIntro}
                      onClick={handleSaveIntro}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-black disabled:bg-slate-400 text-white font-bold text-[13.5px] flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {isSavingIntro ? 'sync' : 'cloud_upload'}
                      </span>
                      <span>
                        {isSavingIntro
                          ? 'Firebase 클라우드 저장 중...'
                          : `[${PAGE_TITLES[selectedPage]}] 문구 저장 및 즉각 스트리밍 반영`}
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                /* ── 대표 이미지 관리 화면 ── */
                <div className="flex flex-col gap-6">
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
                      const dynamicTitle = introForm.corePoints?.[index]?.title?.replace(/\n/g, ' ') || POINT_LABELS[selectedPage][index];
                      const label = dynamicTitle;

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

                          {/* Live Preview Container (배경색 카드 없이 이미지 바로 부드럽게 노출) */}
                          <div
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleDrop(e, index)}
                            className="w-full rounded-[22px] sm:rounded-[26px] p-2 bg-slate-50 border border-slate-200/60 flex items-center justify-center min-h-[190px] max-h-[220px] relative overflow-hidden group"
                          >
                            {imageSrc ? (
                              <div className="relative w-full h-[175px] rounded-[20px] sm:rounded-[24px] flex items-center justify-center overflow-hidden">
                                <img
                                  src={imageSrc}
                                  alt={label}
                                  className="w-full h-full object-contain rounded-[20px] sm:rounded-[24px] drop-shadow-sm"
                                />
                                <span className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-medium shadow-xs">
                                  등록 완료
                                </span>
                              </div>
                            ) : (
                              <div
                                onClick={() => triggerUpload(index)}
                                className="w-full h-[170px] rounded-[20px] sm:rounded-[24px] border-2 border-dashed border-slate-300 hover:border-slate-400 flex flex-col items-center justify-center text-slate-500 gap-1.5 p-3 text-center cursor-pointer transition-colors"
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
          )}
        </div>
      </div>
    </div>
  );
};
