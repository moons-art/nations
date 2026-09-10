/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ProductItem, ConsultationRequest } from './types';
import { Header } from './components/Header';
import { NavigationDrawer } from './components/NavigationDrawer';
import { HeroSection } from './components/HeroSection';
import { CoreValuesSection } from './components/CoreValuesSection';
import { DifferentiationSection } from './components/DifferentiationSection';
import { EcosystemSection } from './components/EcosystemSection';
import { BottomCtaSection } from './components/BottomCtaSection';
import { Footer } from './components/Footer';
import { FixedBottomBar } from './components/FixedBottomBar';
import { ConsultationModal } from './components/ConsultationModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { KakaoModal } from './components/KakaoModal';
import { PolicyModal } from './components/PolicyModal';

export default function App() {
  // Navigation & Drawer
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // Search toast notification
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null);

  // Stored requests history in memory
  const [requestsList, setRequestsList] = useState<ConsultationRequest[]>([]);

  const handleOpenKakao = () => {
    setIsKakaoOpen(true);
  };

  const handleOpenDemoModal = (preset?: {
    type?: 'demo' | 'free_under_100' | 'consultation';
    product?: string;
  }) => {
    setConsultationPreset(preset || { type: 'demo' });
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
    setSearchFeedback(`'${clean}' 관련 솔루션으로 이동합니다`);
    setTimeout(() => setSearchFeedback(null), 3000);

    // If query contains vote/투표
    if (clean.includes('투표')) {
      setHighlightedProductId('vote');
      const el = document.getElementById('product-vote') || document.getElementById('product-lineup');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      setTimeout(() => setHighlightedProductId(null), 3500);
      return;
    }

    if (clean.includes('악보')) {
      setHighlightedProductId('score');
      const el = document.getElementById('product-score') || document.getElementById('product-lineup');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => setHighlightedProductId(null), 3500);
      return;
    }

    if (clean.includes('관리') || clean.includes('교적') || clean.includes('행정')) {
      setHighlightedProductId('erp');
      const el = document.getElementById('product-erp') || document.getElementById('product-lineup');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => setHighlightedProductId(null), 3500);
      return;
    }

    if (clean.includes('소그룹') || clean.includes('구역') || clean.includes('셀')) {
      setHighlightedProductId('group');
      const el = document.getElementById('product-group') || document.getElementById('product-lineup');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => setHighlightedProductId(null), 3500);
      return;
    }

    if (clean.includes('성경') || clean.includes('설교') || clean.includes('말씀')) {
      setHighlightedProductId('bible');
      const el = document.getElementById('product-bible') || document.getElementById('product-lineup');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => setHighlightedProductId(null), 3500);
      return;
    }

    // Default scroll to core points or lineup
    const coreEl = document.getElementById('core-points');
    if (coreEl) {
      coreEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConsultationSuccess = (newReq: ConsultationRequest) => {
    setRequestsList((prev) => [newReq, ...prev]);
  };

  return (
    <div className="bg-[#f8f9ff] min-h-screen flex flex-col font-sans text-[#0F172A] selection:bg-[#85f8c4] selection:text-[#002114]">
      {/* Toast Feedback */}
      {searchFeedback && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#006948] text-white px-4 py-2 rounded-xl text-[13px] font-semibold shadow-lg flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{searchFeedback}</span>
        </div>
      )}

      {/* Header */}
      <Header
        onOpenKakao={handleOpenKakao}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenDemoModal={() => handleOpenDemoModal({ type: 'demo' })}
      />

      {/* Navigation Drawer */}
      <NavigationDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenKakao={handleOpenKakao}
        onOpenDemoModal={handleOpenDemoModal}
        onOpenTerms={handleOpenTerms}
        onOpenPrivacy={handleOpenPrivacy}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pb-20 flex flex-col items-center">
        {/* 1. Hero Section with Hero Video (Full Bleed, matching screenshots) */}
        <HeroSection
          onOpenFreeModal={handleOpenFreeModal}
          onSearchQuery={handleSearchQuery}
        />

        <div className="w-full max-w-xl mx-auto flex flex-col px-4">
          {/* 2. Core Values: 3대 원칙 */}
          <div id="core-values">
            <CoreValuesSection />
          </div>

          {/* 3. Differentiation: 네이션스만의 차별점 (Dark Inverted Module) */}
          <div id="differentiation">
            <DifferentiationSection onOpenKakao={handleOpenKakao} />
          </div>

          {/* 4. All-in-One Ecosystem: 제품 라인업 */}
          <div id="ecosystem">
            <EcosystemSection
              onSelectProduct={(prod) => setSelectedProduct(prod)}
              highlightedProductId={highlightedProductId}
            />
          </div>

          {/* 5. Bottom CTA & Inquiry */}
          <BottomCtaSection
            onOpenKakao={handleOpenKakao}
            onOpenDemoModal={() => handleOpenDemoModal({ type: 'demo' })}
          />

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

          {/* 6. Footer */}
          <Footer
            onOpenTerms={handleOpenTerms}
            onOpenPrivacy={handleOpenPrivacy}
            onOpenKakao={handleOpenKakao}
          />
        </div>
      </main>

      {/* Fixed Bottom Navigation Bar */}
      <FixedBottomBar
        onOpenKakao={handleOpenKakao}
        onOpenDemoModal={() => handleOpenDemoModal({ type: 'demo' })}
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
    </div>
  );
}
