import React, { useState } from 'react';

interface PolicyModalProps {
  isOpen: boolean;
  type: 'terms' | 'privacy';
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  isOpen,
  type: initialType,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>(initialType);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl z-10 max-h-[80vh] flex flex-col overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        {/* Header Tabs */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('terms')}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-colors ${
                activeTab === 'terms'
                  ? 'bg-white text-[#006948] shadow-xs border border-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              서비스 이용약관
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-colors ${
                activeTab === 'privacy'
                  ? 'bg-white text-[#006948] shadow-xs border border-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              개인정보처리방침
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-200/60 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 text-[13px] text-slate-600 leading-relaxed">
          {activeTab === 'terms' ? (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-[15px]">네이션스 솔루션 이용약관</h4>
              <p>
                본 약관은 NATIONS(이하 "회사")이 제공하는 스마트 미니스트리 제반 서비스(교회투표, 악보, 교회행정 ERP, 소그룹, 성경 등)의 이용과 관련하여 회사와 교회 및 회원의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
              <h5 className="font-bold text-slate-800 text-[13px]">제 1 조 (목적 및 정의)</h5>
              <p>
                1. "서비스"란 교회의 사역 효율화와 복음 전파를 위해 회사가 제공하는 모든 디지털 플랫폼을 말합니다.
                <br />
                2. "교회 회원"이란 서비스 도입을 승인한 개체 교회 및 당회, 총회 조직을 의미합니다.
              </p>
              <h5 className="font-bold text-slate-800 text-[13px]">제 2 조 (투표 및 데이터의 공정성)</h5>
              <p>
                1. 회사는 교회투표 솔루션 제공 시 선거의 비밀성과 투명성을 기술적으로 철저히 보장합니다.
                <br />
                2. 선거 결과 및 명부는 암호화되어 안전한 클라우드 데이터베이스에 보관되며 임의로 변조될 수 없습니다.
              </p>
              <h5 className="font-bold text-slate-800 text-[13px]">제 3 조 (책임의 한계)</h5>
              <p>
                회사는 천재지변, 불가항력적 네트워크 장애 등에 의한 일시적 중단에 대해 합리적 복구 조치를 다하며, 사역에 지장이 없도록 전담 핫라인을 지원합니다.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-[15px]">개인정보 처리방침</h4>
              <p>
                NATIONS(네이션스 솔루션)은 개인정보보호법에 따라 성도와 교회의 소중한 개인정보를 안전하게 보호하며, 권익을 보호하기 위해 다음과 같은 방침을 두고 있습니다.
              </p>
              <h5 className="font-bold text-slate-800 text-[13px]">1. 수집하는 개인정보 항목</h5>
              <p>
                - 도입 상담 및 데모 신청 시: 교회명, 담당자명, 직분, 휴대전화번호, 이메일
                <br />
                - 투표 및 ERP 서비스 이용 시: 본인확인 정보, 교인 식별 코드, 선거권 자격 플래그 (암호화 처리)
              </p>
              <h5 className="font-bold text-slate-800 text-[13px]">2. 개인정보의 수집 및 이용목적</h5>
              <p>
                - 스마트 선거 본인 인증 및 투표 참여 자격 확인
                <br />
                - 교회 행정 ERP 교적부 관리 및 맞춤형 심방 지원
                <br />
                - 서비스 상담 및 긴급 기술 지원 안내
              </p>
              <h5 className="font-bold text-slate-800 text-[13px]">3. 개인정보의 안전성 확보 조치</h5>
              <p>
                회사는 모든 개인정보를 AES-256 등 표준 암호화 알고리즘으로 안전하게 저장 및 전송하며, 교회의 승인 없이 제3자에게 제공하거나 상업적으로 활용하지 않습니다.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#006948] text-white rounded-xl text-[13px] font-semibold hover:bg-[#00855d] transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
