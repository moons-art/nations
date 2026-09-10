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
  const isFreeUnder100 = preset?.type === 'free_under_100';

  const [churchName, setChurchName] = useState('');
  const [contactName, setContactName] = useState('');
  const [position, setPosition] = useState('담임목사');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [churchSize, setChurchSize] = useState(isFreeUnder100 ? '100명 미만' : '100~300명');
  const [selectedProducts, setSelectedProducts] = useState<string[]>(
    preset?.product ? [preset.product] : ['네이션스 교회투표']
  );
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (preset?.type === 'free_under_100') {
      setChurchSize('100명 미만');
    }
    if (preset?.product) {
      setSelectedProducts([preset.product]);
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
                {isFreeUnder100 ? 'volunteer_activism' : 'calendar_month'}
              </span>
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#0F172A]">
                {isFreeUnder100
                  ? '100명 미만 교회 무료 도입 신청'
                  : '도입 컨설팅 및 데모 시연 예약'}
              </h3>
              <p className="text-[12px] text-slate-500">
                {isFreeUnder100
                  ? '작은 교회를 위한 네이션스의 사역 지원 프로젝트'
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
          {isSubmitted ? (
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
              {isFreeUnder100 && (
                <div className="p-3 bg-[#ECFDF5] rounded-xl border border-[#006948]/20 flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-[#006948] shrink-0 mt-0.5">
                    card_giftcard
                  </span>
                  <div className="text-[12px] text-slate-700 leading-relaxed">
                    <strong className="text-[#006948] block text-[13px]">
                      100명 미만 교회 전액 무료 혜택 안내
                    </strong>
                    개척교회 및 미자립 교회의 디지털 전환을 위해 초기 세팅비 및 기본 이용료를 무료로 지원합니다.
                  </div>
                </div>
              )}

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
              <div className="pt-2">
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
                      <span>
                        {isFreeUnder100 ? '무료 도입 혜택 신청하기' : '상담 및 데모 예약하기'}
                      </span>
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-slate-400 mt-2">
                  접수해주신 정보는 상담 및 일정 조율 목적으로만 안전하게 사용됩니다.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
