import React, { useState, useEffect } from 'react';
import { ConsultationRequest } from '../types';
import { PRODUCTS_LIST } from '../data/products';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preset?: {
    type?: 'demo' | 'free_under_100' | 'consultation';
    product?: string;
  };
  onSubmitSuccess: (data: ConsultationRequest) => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  preset,
  onSubmitSuccess,
}) => {
  // Default to true so all "문의하기", "도입 및 데모신청" buttons show this requested screen
  const isFreeUnder100 = preset?.type !== 'legacy_demo';

  const [churchName, setChurchName] = useState('');
  const [contactName, setContactName] = useState('');
  const [position, setPosition] = useState('담임목사');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [churchSize, setChurchSize] = useState('100명 미만');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([
    '네이션스 교회투표',
    '네이션스 악보',
    '네이션스 성경',
  ]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (preset?.product && !selectedProducts.includes(preset.product)) {
      setSelectedProducts((prev) => [...prev, preset.product!]);
    }
  }, [preset]);

  if (!isOpen) return null;

  const toggleProduct = (productName: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productName)
        ? prev.filter((p) => p !== productName)
        : [...prev, productName]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!churchName.trim() || !contactName.trim() || !phone.trim()) {
      alert('교회명, 담당자 성함, 연락처를 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newRequest: ConsultationRequest = {
        id: 'REQ-' + Date.now(),
        churchName: churchName.trim(),
        contactName: contactName.trim(),
        position,
        phone: phone.trim(),
        email: email.trim() || undefined,
        churchSize,
        selectedProducts,
        inquiryType: isFreeUnder100 ? 'free_under_100' : 'demo',
        notes: notes.trim() || undefined,
        createdAt: new Date().toLocaleString('ko-KR'),
      };

      onSubmitSuccess(newRequest);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={handleResetAndClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl z-10 max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 bg-[#eff4ff] border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#006948] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">
                {isFreeUnder100 ? 'how_to_vote' : 'calendar_month'}
              </span>
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#0F172A]">
                {isFreeUnder100
                  ? '네이션스 교회투표 무료 도입 및 신청 하기'
                  : '도입 컨설팅 및 데모 시연 예약'}
              </h3>
              <p className="text-[12px] text-slate-500">
                {isFreeUnder100
                  ? '100명 미만 개척교회 및 미자립 교회의 사역을 위한 무료 지원'
                  : '전문 상담사가 교회의 일정과 상황에 맞춰 안내해 드립니다'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-200/60 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {isFreeUnder100 ? (
            /* Free Under 100 / Church Vote Free Offer Flow */
            isSubmitted ? (
              <div className="py-6 flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[#ECFDF5] text-[#006948] flex items-center justify-center ring-8 ring-[#ECFDF5]/50">
                  <span className="material-symbols-outlined text-[36px]">check_circle</span>
                </div>
                <h4 className="text-[18px] font-bold text-[#0F172A] mt-1">
                  무료도입 혜택 안내
                </h4>

                <div className="w-full mt-2 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[14px] font-bold text-[#006948]">
                      <span className="px-2 py-0.5 rounded bg-[#ECFDF5] border border-[#006948]/20 text-[12px]">
                        [네이션스 악보]
                      </span>
                      <span>무료사용</span>
                    </div>
                    <div className="flex items-center gap-2 text-[14px] font-bold text-[#006948]">
                      <span className="px-2 py-0.5 rounded bg-[#ECFDF5] border border-[#006948]/20 text-[12px]">
                        [네이션스 성경]
                      </span>
                      <span>무료사용</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-[13px] text-slate-800 leading-relaxed font-medium">
                    <strong className="text-[#006948]">[네이션스 교회투표]</strong> 앱에서 회원가입 후 로그인 하시면 연동 됩니다.
                  </div>

                  <p className="text-[12px] text-slate-500">
                    (네이션스 교회관리, 소그룹은 연동준비 중입니다)
                  </p>
                </div>

                <div className="mt-3 flex flex-col w-full gap-2">
                  <a
                    href="https://vote.thenations.kr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#006948] hover:bg-[#00855d] text-white rounded-xl text-[14px] font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                  >
                    <span>네이션스 교회투표 앱 접속하기</span>
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  </a>

                  <a
                    href="http://pf.kakao.com/_cxjBxaX/chat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-[#FEE500] hover:brightness-95 text-[#371D1E] rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px]">forum</span>
                    <span>카톡문의</span>
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-[13px] font-medium transition-colors"
                  >
                    닫기
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 text-[13px]">
                {/* Free Benefit Header Card with link to vote app */}
                <div className="p-4 bg-[#ECFDF5] rounded-2xl border border-[#006948]/20 flex flex-col gap-3">
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[20px] text-[#006948] shrink-0 mt-0.5">
                      volunteer_activism
                    </span>
                    <div className="text-[13px] text-slate-800 font-semibold leading-relaxed">
                      <span className="text-[#006948] font-bold block mb-0.5">100명 미만</span>
                      개척교회 및 미자립 교회의 사역을 위해 기본 이용료를 무료로 지원합니다.
                    </div>
                  </div>

                  <a
                    href="https://vote.thenations.kr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 bg-white hover:bg-slate-50 border border-[#006948]/30 rounded-xl text-[13px] font-bold text-[#006948] flex items-center justify-center gap-1.5 transition-all shadow-2xs hover:shadow-xs group"
                  >
                    <span>네이션스 교회 투표앱 접속하기</span>
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                      open_in_new
                    </span>
                  </a>
                </div>

                {/* 관심 솔루션 선택 (All deleted personal form fields removed) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block font-bold text-slate-900 text-[13px]">
                      관심 솔루션 (아래 내용 선택)
                    </label>
                    <span className="text-[11px] text-slate-500">중복 선택 가능</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PRODUCTS_LIST.map((prod) => {
                      const isChecked = selectedProducts.includes(prod.name);
                      const isFreeSupported =
                        prod.name.includes('악보') ||
                        prod.name.includes('성경') ||
                        prod.name.includes('투표');
                      return (
                        <div
                          key={prod.id}
                          onClick={() => toggleProduct(prod.name)}
                          className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                            isChecked
                              ? 'border-[#006948] bg-[#ECFDF5]/60 text-[#006948]'
                              : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">
                              {isChecked ? 'check_box' : 'check_box_outline_blank'}
                            </span>
                            <span className="text-[13px] font-medium">{prod.name}</span>
                          </div>
                          {isFreeSupported ? (
                            <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-[#ECFDF5] text-[#006948] border border-[#006948]/20">
                              무료사용
                            </span>
                          ) : (
                            <span className="text-[11px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                              준비중
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(true)}
                    className="w-full py-3.5 bg-[#006948] hover:bg-[#00855d] active:scale-[0.98] text-white rounded-xl text-[15px] font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
                    <span>무료도입 혜택 신청하기</span>
                  </button>

                  <a
                    href="http://pf.kakao.com/_cxjBxaX/chat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-[#FEE500] hover:brightness-95 active:scale-[0.98] text-[#371D1E] rounded-xl text-[13px] font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px]">forum</span>
                    <span>카톡문의</span>
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </a>
                </div>
              </div>
            )
          ) : (
            /* General Consultation / Demo Request Flow */
            isSubmitted ? (
              <div className="py-8 flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[#ECFDF5] text-[#006948] flex items-center justify-center ring-8 ring-[#ECFDF5]/50">
                  <span className="material-symbols-outlined text-[36px]">check_circle</span>
                </div>
                <h4 className="text-[18px] font-bold text-[#0F172A] mt-2">
                  신청이 성공적으로 접수되었습니다!
                </h4>
                <p className="text-[13px] text-slate-600 max-w-sm leading-relaxed">
                  <strong>{churchName}</strong> {contactName} {position}님,
                  접수해 주신 정보로 담당자가 24시간 이내에 친절하게 연락드리겠습니다.
                </p>

                <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-left text-[12px] text-slate-600 w-full space-y-1">
                  <div>
                    <span className="font-semibold text-slate-800">선택 솔루션:</span>{' '}
                    {selectedProducts.join(', ')}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">교회 규모:</span> {churchSize}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">연락처:</span> {phone}
                  </div>
                </div>

                <div className="mt-4 flex flex-col w-full gap-2">
                  <a
                    href="http://pf.kakao.com/_cxjBxaX/chat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-[#FEE500] hover:brightness-95 text-[#371D1E] rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px]">forum</span>
                    <span>카톡 실시간 문의</span>
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="w-full py-2.5 bg-[#006948] text-white rounded-xl text-[14px] font-semibold hover:bg-[#00855d] transition-colors"
                  >
                    확인
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-[13px]">
                {/* Church Name & Position */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      교회명 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="예: 은혜교회"
                      value={churchName}
                      onChange={(e) => setChurchName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#006948] focus:ring-1 focus:ring-[#006948] outline-none text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      직분 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#006948] focus:ring-1 focus:ring-[#006948] outline-none bg-white text-slate-900"
                    >
                      <option value="담임목사">담임목사</option>
                      <option value="부목사/전도사">부목사 / 전도사</option>
                      <option value="장로/당회원">장로 / 당회원</option>
                      <option value="선거관리위원장">선거관리위원장 / 위원</option>
                      <option value="행정간사/사무원">행정간사 / 사무원</option>
                      <option value="찬양팀/미디어팀장">찬양팀 / 미디어팀장</option>
                      <option value="성도/집사">성도 / 집사</option>
                    </select>
                  </div>
                </div>

                {/* Contact Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      담당자 성함 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="홍길동"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#006948] focus:ring-1 focus:ring-[#006948] outline-none text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      연락처 (휴대폰) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="010-0000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#006948] focus:ring-1 focus:ring-[#006948] outline-none text-slate-900"
                    />
                  </div>
                </div>

                {/* Church Size */}
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    교회 주일 출석 규모 <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['100명 미만', '100~300명', '300~1,000명', '1,000명 이상'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setChurchSize(size)}
                        className={`py-2 px-2 text-center rounded-lg border text-[12px] font-medium transition-all ${
                          churchSize === size
                            ? 'border-[#006948] bg-[#ECFDF5] text-[#006948] font-bold shadow-xs'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Products */}
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    관심 솔루션 (중복 선택 가능)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PRODUCTS_LIST.map((prod) => {
                      const isChecked = selectedProducts.includes(prod.name);
                      return (
                        <div
                          key={prod.id}
                          onClick={() => toggleProduct(prod.name)}
                          className={`p-2.5 rounded-lg border flex items-center gap-2 cursor-pointer transition-colors ${
                            isChecked
                              ? 'border-[#006948] bg-emerald-50/40 text-[#006948]'
                              : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {isChecked ? 'check_box' : 'check_box_outline_blank'}
                          </span>
                          <span className="text-[13px] font-medium">{prod.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    희망 상담 내용 및 요청 사항 (선택)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="예: 11월 총회 임직자 투표를 앞두고 현장 시연을 받아보고 싶습니다."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#006948] focus:ring-1 focus:ring-[#006948] outline-none text-slate-900 resize-none text-[13px]"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#006948] hover:bg-[#00855d] active:scale-[0.98] text-white rounded-xl text-[15px] font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span>접수 처리 중...</span>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[18px]">send</span>
                        <span>상담 및 데모 예약하기</span>
                      </>
                    )}
                  </button>

                  <a
                    href="http://pf.kakao.com/_cxjBxaX/chat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-[#FEE500] hover:brightness-95 text-[#371D1E] rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px]">forum</span>
                    <span>카톡문의</span>
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </a>

                  <p className="text-center text-[11px] text-slate-400 mt-1">
                    접수해주신 정보는 상담 및 일정 조율 목적으로만 안전하게 사용됩니다.
                  </p>
                </div>
              </form>
            )
          )}
        </div>
      </div>
    </div>
  );
};
