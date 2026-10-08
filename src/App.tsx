/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ProductItem, ConsultationRequest, ActivePage } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CoreValuesSection } from './components/CoreValuesSection';
import { DifferentiationSection } from './components/DifferentiationSection';
import { ScoreHeroSection } from './components/score/ScoreHeroSection';
import { ScoreCoreValuesSection } from './components/score/ScoreCoreValuesSection';
import { ScoreDifferentiationSection } from './components/score/ScoreDifferentiationSection';
import { BibleHeroSection } from './components/bible/BibleHeroSection';
import { BibleCoreValuesSection } from './components/bible/BibleCoreValuesSection';
import { BibleDifferentiationSection } from './components/bible/BibleDifferentiationSection';
import { SermonHeroSection } from './components/sermon/SermonHeroSection';
import { SermonCoreValuesSection } from './components/sermon/SermonCoreValuesSection';
import { SermonDifferentiationSection } from './components/sermon/SermonDifferentiationSection';
import { EcosystemSection } from './components/EcosystemSection';
import { BottomCtaSection } from './components/BottomCtaSection';
import { SiteDirectorySection } from './components/SiteDirectorySection';
import { Footer } from './components/Footer';
import { FixedBottomBar } from './components/FixedBottomBar';
import { ConsultationModal } from './components/ConsultationModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { KakaoModal } from './components/KakaoModal';
import { PolicyModal } from './components/PolicyModal';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal';

export default function App() {
  // Active Page Routing ('sermon' | 'vote' | 'score' | 'bible') - 기본 진입 시 새로 생성된 sermon AI 페이지 활성화
  const [activePage, setActivePage] = useState<ActivePage>('sermon');

  // Admin Dashboard Modal
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Modals
  const [isKakaoOpen, setIsKakaoOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationPreset, setConsultationPreset] = useState<{
    type?: 'demo' | 'free_under_100' | 'consultation';
    product?: string;
  }>({ type: 'demo' });

  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [highlightedProductId, setHighlightedProductId] = useState<string | null>(null);

  // Policy Modal
  const [policyModal, setPolicyModal] = useState<{
    isOpen: boolean;
    type: 'terms' | 'privacy';
  }>({ isOpen: false, type: 'terms' });

  // Stored requests history in memory
  const [requestsList, setRequestsList] = useState<ConsultationRequest[]>([]);

  const handleOpenKakao = () => {
    setIsKakaoOpen(true);
  };

  const handleOpenDemoModal = (preset?: {
    type?: 'demo' | 'free_under_100' | 'consultation';
    product?: string;
  }) => {
    setConsultationPreset(preset || { type: 'free_under_100' });
    setIsConsultationOpen(true);
  };

  const handleOpenFreeModal = () => {
    setConsultationPreset({ type: 'free_under_100' });
    setIsConsultationOpen(true);
  };

  const handleOpenTerms = () => {
    setPolicyModal({ isOpen: true, type: 'terms' });
  };

  const handleOpenPrivacy = () => {
    setPolicyModal({ isOpen: true, type: 'privacy' });
  };

  const handleSearchQuery = (query: string) => {
    // Check if query corresponds to a product
    const clean = query.replace('?', '').trim();

    // If query contains vote/투표 or '네이션스'
    if (clean.includes('투표') || clean.includes('네이션스')) {
      const el = document.getElementById('differentiation');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (clean.includes('악보')) {
      setHighlightedProductId('score');
      const el = document.getElementById('product-score') || document.getElementById('ecosystem');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => setHighlightedProductId(null), 3500);
      return;
    }

    if (clean.includes('관리') || clean.includes('교적') || clean.includes('행정')) {
      setHighlightedProductId('erp');
      const el = document.getElementById('product-erp') || document.getElementById('ecosystem');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => setHighlightedProductId(null), 3500);
      return;
    }

    if (clean.includes('소그룹') || clean.includes('구역') || clean.includes('셀')) {
      setHighlightedProductId('group');
      const el = document.getElementById('product-group') || document.getElementById('ecosystem');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => setHighlightedProductId(null), 3500);
      return;
    }

    if (clean.includes('설교') || clean.includes('릴스') || clean.includes('쇼츠') || clean.includes('영상') || clean.includes('묵상') || clean.includes('sermon') || clean.includes('ai')) {
      setActivePage('sermon');
      setHighlightedProductId('sermon');
      const el = document.getElementById('core-values') || document.getElementById('differentiation');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => setHighlightedProductId(null), 3500);
      return;
    }

    if (clean.includes('성경') || clean.includes('말씀') || clean.includes('주석')) {
      setHighlightedProductId('bible');
      const el = document.getElementById('product-bible') || document.getElementById('ecosystem');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => setHighlightedProductId(null), 3500);
      return;
    }

    // Default scroll to differentiation or core points
    const targetEl = document.getElementById('differentiation') || document.getElementById('core-values');
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConsultationSuccess = (newReq: ConsultationRequest) => {
    setRequestsList((prev) => [newReq, ...prev]);
  };

  return (
    <div className="bg-[#f8f9ff] min-h-screen flex flex-col font-sans text-[#0F172A] selection:bg-[#85f8c4] selection:text-[#002114]">
      {/* Header */}
      <Header
        activePage={activePage}
        onSelectPage={(page) => setActivePage(page)}
        onOpenKakao={handleOpenKakao}
        onOpenDemoModal={() => handleOpenDemoModal({ type: 'free_under_100' })}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pb-20 flex flex-col items-center">
        {/* Conditional Page Rendering based on activePage: 'sermon' | 'vote' | 'score' | 'bible' */}
        {activePage === 'sermon' && (
          <>
            {/* 1. Sermon Hero Section with Hero Video (Nations Vote 영상 활용) */}
            <SermonHeroSection
              onOpenDemoModal={() => handleOpenDemoModal({ type: 'demo', product: '네이션스 sermon AI' })}
              onSearchQuery={handleSearchQuery}
            />

            {/* 2. Sermon Core Values: 3대 원칙 */}
            <div id="core-values" className="w-full scroll-mt-24 md:scroll-mt-28">
              <SermonCoreValuesSection />
            </div>

            {/* 3. Sermon Differentiation */}
            <div id="differentiation" className="w-full scroll-mt-24 md:scroll-mt-28">
              <SermonDifferentiationSection onOpenKakao={handleOpenKakao} />
            </div>
          </>
        )}

        {activePage === 'vote' && (
          <>
            {/* 1. Hero Section with Hero Video */}
            <HeroSection
              onOpenFreeModal={handleOpenFreeModal}
              onSearchQuery={handleSearchQuery}
            />

            {/* 2. Core Values: 3대 원칙 */}
            <div id="core-values" className="w-full scroll-mt-24 md:scroll-mt-28">
              <CoreValuesSection />
            </div>

            {/* 3. Differentiation: 네이션스만의 차별점 */}
            <div id="differentiation" className="w-full scroll-mt-24 md:scroll-mt-28">
              <DifferentiationSection onOpenKakao={handleOpenKakao} />
            </div>
          </>
        )}

        {activePage === 'score' && (
          <>
            {/* 1. Score Hero Section with Hero Video */}
            <ScoreHeroSection
              onOpenDemoModal={() => handleOpenDemoModal({ type: 'demo', product: '네이션스 악보' })}
              onSearchQuery={handleSearchQuery}
            />

            {/* 2. Score Core Values: 3대 원칙 */}
            <div id="core-values" className="w-full scroll-mt-24 md:scroll-mt-28">
              <ScoreCoreValuesSection />
            </div>

            {/* 3. Score Differentiation */}
            <div id="differentiation" className="w-full scroll-mt-24 md:scroll-mt-28">
              <ScoreDifferentiationSection onOpenKakao={handleOpenKakao} />
            </div>
          </>
        )}

        {activePage === 'bible' && (
          <>
            {/* 1. Bible Hero Section with Hero Video (영상과 문구 그대로 + 말씀 및 설교 구성) */}
            <BibleHeroSection
              onOpenDemoModal={() => handleOpenDemoModal({ type: 'demo', product: '네이션스 성경' })}
              onSearchQuery={handleSearchQuery}
            />

            {/* 2. Bible Core Values: 3대 원칙 */}
            <div id="core-values" className="w-full scroll-mt-24 md:scroll-mt-28">
              <BibleCoreValuesSection />
            </div>

            {/* 3. Bible Differentiation */}
            <div id="differentiation" className="w-full scroll-mt-24 md:scroll-mt-28">
              <BibleDifferentiationSection onOpenKakao={handleOpenKakao} />
            </div>
          </>
        )}

        {/* 4. All-in-One Ecosystem, Bottom CTA & Footer */}
        <div className="w-full max-w-6xl mx-auto flex flex-col px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 lg:pt-24 gap-12 sm:gap-16 lg:gap-20">
          {/* 4. All-in-One Ecosystem: 제품 라인업 */}
          <div id="ecosystem" className="scroll-mt-24 md:scroll-mt-28 w-full">
            <EcosystemSection
              onSelectProduct={(prod) => setSelectedProduct(prod)}
              highlightedProductId={highlightedProductId}
              isSermonPage={activePage === 'sermon'}
            />
          </div>

          {/* 5. Bottom CTA & Inquiry (서비스 안내) */}
          <div id="service-guide" className="scroll-mt-24 md:scroll-mt-28 w-full">
            <BottomCtaSection
              onOpenKakao={handleOpenKakao}
              onOpenDemoModal={() => handleOpenDemoModal({ type: 'free_under_100' })}
            />
          </div>

          {/* Submitted Inquiries Banner (if any submitted) */}
          {requestsList.length > 0 && (
            <div className="px-4 py-3 mx-4 mb-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-[12px] text-emerald-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#006948]">
                  mark_email_read
                </span>
                <span>
                  최근 <strong>{requestsList[0].churchName}</strong>님의 상담 신청이 정상 접수되었습니다.
                </span>
              </div>
              <span className="text-[11px] text-emerald-700 font-mono">
                {requestsList[0].createdAt.split(' ')[1]}
              </span>
            </div>
          )}

          {/* 6. Site Directory Section (간편한 스마트 목회 환경을 추구합니다 + 4개 열 디렉토리) */}
          <SiteDirectorySection
            onSelectProduct={(prod) => setSelectedProduct(prod)}
            onOpenKakao={handleOpenKakao}
            onOpenTerms={handleOpenTerms}
            onOpenPrivacy={handleOpenPrivacy}
          />

          {/* 7. Footer (검은색 카드) */}
          <Footer
            onOpenTerms={handleOpenTerms}
            onOpenPrivacy={handleOpenPrivacy}
            onOpenKakao={handleOpenKakao}
            onOpenAdmin={() => setIsAdminOpen(true)}
          />
        </div>
      </main>

      {/* Fixed Bottom Navigation Bar */}
      <FixedBottomBar
        onOpenKakao={handleOpenKakao}
        onOpenDemoModal={() => handleOpenDemoModal({ type: 'free_under_100' })}
      />

      {/* Modals */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        preset={consultationPreset}
        onSubmitSuccess={handleConsultationSuccess}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onRequestDemo={(productName) => handleOpenDemoModal({ type: 'demo', product: productName })}
        onOpenKakao={handleOpenKakao}
        onNavigateToPage={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <KakaoModal
        isOpen={isKakaoOpen}
        onClose={() => setIsKakaoOpen(false)}
        onOpenDemoForm={() => {
          setIsKakaoOpen(false);
          handleOpenDemoModal({ type: 'consultation' });
        }}
      />

      <PolicyModal
        isOpen={policyModal.isOpen}
        type={policyModal.type}
        onClose={() => setPolicyModal({ isOpen: false, type: 'terms' })}
      />

      {/* Admin Content Management Dashboard Modal */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
