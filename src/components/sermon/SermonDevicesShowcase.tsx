import React, { useState } from 'react';
import { motion } from 'motion/react';

interface SermonDevicesShowcaseProps {
  onExploreClick?: () => void;
}

export const SermonDevicesShowcase: React.FC<SermonDevicesShowcaseProps> = ({ onExploreClick }) => {
  const [activeTab, setActiveTab] = useState<'reels' | 'tone' | 'voice' | 'cards'>('reels');
  const [selectedTemplate, setSelectedTemplate] = useState<'dark' | 'light' | 'typo' | 'warm'>('dark');
  const [selectedBgm, setSelectedBgm] = useState<'piano' | 'cello' | 'acoustic' | 'voice'>('piano');
  const [selectedDay, setSelectedDay] = useState<'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'>('sun');
  const [selectedVoiceTone, setSelectedVoiceTone] = useState<'warm' | 'solemn' | 'passion'>('warm');
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);

  // Sunday sermon summary + full week meditation data
  const meditationCards: Record<
    'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat',
    { title: string; dayLabel: string; verse: string; content: string; prayer: string }
  > = {
    sun: {
      dayLabel: '주일 설교 요약카드',
      title: '광야에서 피어나는 하나님의 은혜',
      verse: '신명기 8:2-3',
      content:
        '우리가 지나온 광야는 실패의 자리가 아닙니다. 하나님께서 우리를 낮추시고 겸손케 하사 오직 말씀으로 살게 하시는 생명의 훈련장입니다.',
      prayer: '주님, 메마른 광야에서도 주님의 신실하신 인도하심만을 바라보게 하소서.',
    },
    mon: {
      dayLabel: '월요일 묵상',
      title: '낮아짐의 축복을 기억하는 하루',
      verse: '야고보서 4:10',
      content:
        '세상은 높아지라 말하지만, 주님은 주 앞에서 낮추라 말씀하십니다. 나의 한계를 인정할 때 주님의 능력이 시작됩니다.',
      prayer: '오늘 하루, 내 힘을 내려놓고 주님의 선하신 손길에 온전히 의지합니다.',
    },
    tue: {
      dayLabel: '화요일 묵상',
      title: '말씀으로 채우는 영의 양식',
      verse: '마태복음 4:4',
      content:
        '사람이 떡으로만 사는 것이 아닙니다. 눈앞의 염려보다 영원하신 하나님의 입에서 나오는 생명의 말씀을 마음에 품으세요.',
      prayer: '세상의 소음에 흔들리지 않고 하나님의 세미한 음성에 귀 기울이게 하소서.',
    },
    wed: {
      dayLabel: '수요일 묵상',
      title: '메마른 땅에 길을 내시는 분',
      verse: '이사야 43:19',
      content:
        '하나님은 보라 내가 새 일을 행하리라 선포하십니다. 사막에 강을 내시는 주님의 기적이 오늘 당신의 일터와 가정에 임합니다.',
      prayer: '막힌 담을 허무시고 새로운 길을 여시는 하나님을 찬양합니다.',
    },
    thu: {
      dayLabel: '목요일 묵상',
      title: '시험을 이기는 믿음의 인내',
      verse: '고린도전서 10:13',
      content:
        '사람이 감당할 시험 밖에는 당한 것이 없습니다. 시험당할 즈음에 피할 길을 내사 능히 감당케 하시는 하나님이 당신 곁에 계십니다.',
      prayer: '낙심될 때 피할 바위 되시는 주 예수 그리스도를 굳게 붙잡습니다.',
    },
    fri: {
      dayLabel: '금요일 묵상',
      title: '결국에 복을 주시려는 아버지의 마음',
      verse: '신명기 8:16',
      content:
        '광야를 통과하게 하신 궁극적인 목적은 마침내 네게 복을 주려 하심이었습니다. 고난의 터널 끝에 예비된 영광을 바라보세요.',
      prayer: '모든 연단을 통해 나를 정금같이 빚으실 주님께 감사와 찬양을 올립니다.',
    },
    sat: {
      dayLabel: '토요일 묵상',
      title: '거룩한 주일을 준비하는 감사와 쉼',
      verse: '시편 23:1-3',
      content:
        '여호와는 나의 목자시니 내게 부족함이 없으리로다. 한 주간의 모든 걸음을 지켜주신 하나님께 감사하며 내일의 거룩한 주일 예배를 기도로 준비합니다.',
      prayer: '지친 영혼을 푸른 풀밭으로 인도하시고 새 힘을 주시는 목자 되신 주님을 찬양합니다.',
    },
  };

  const currentMeditation = meditationCards[selectedDay];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center select-none">
      {/* 1. Feature Mode Switcher Bar - 배경 카드 없이 깔끔한 텍스트 & 아이콘 배치 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-3xl mb-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-8 text-[13px] sm:text-[14.5px] border-b border-slate-200/90 pb-3"
      >
        {[
          {
            id: 'reels' as const,
            label: '설교숏폼 생성',
            icon: 'movie_filter',
            color: 'text-[#C15F3C]',
          },
          {
            id: 'tone' as const,
            label: '목회자 어투 학습 튜닝',
            icon: 'psychology',
            color: 'text-[#006948]',
          },
          {
            id: 'voice' as const,
            label: 'AI 설교음성 제공',
            icon: 'record_voice_over',
            color: 'text-amber-500',
          },
          {
            id: 'cards' as const,
            label: '설교카드&묵상카드 제작',
            icon: 'style',
            color: 'text-blue-500',
          },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 py-1.5 px-2 font-bold transition-all cursor-pointer relative ${
                isActive ? 'text-[#0F172A]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className={`material-symbols-outlined text-[19px] ${tab.color} bg-transparent`}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
              {isActive && (
                <motion.span
                  layoutId="activeTabUnderline"
                  className="absolute bottom-[-13px] left-0 right-0 h-[2.5px] bg-[#C15F3C] rounded-full"
                />
              )}
            </button>
          );
        })}
      </motion.div>

      {/* 2. Interactive Feature Display Area */}
      <div className="relative w-full flex items-center justify-center pt-1 pb-4">
        {/* Main Central Container */}
        <motion.div
          initial={{ opacity: 0, y: 90 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 w-full max-w-3xl bg-[#0f172a] rounded-[28px] p-3 sm:p-5 shadow-[0_24px_50px_rgba(15,23,42,0.24)] border-[5px] border-slate-800 text-slate-100 transition-all duration-300 hover:-translate-y-4 hover:shadow-[0_36px_70px_rgba(15,23,42,0.34)] cursor-default"
        >
          {/* TAB 1: 쇼츠 & 릴스 생성 인터랙션 */}
          {activeTab === 'reels' && (
            <div className="flex flex-col lg:flex-row gap-5 items-stretch min-h-[440px]">
              {/* Left: 9:16 Vertical Smartphone Shorts Frame */}
              <div className="w-full lg:w-[280px] shrink-0 bg-slate-950 rounded-[22px] border-[3px] border-slate-700/80 p-2.5 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                {/* Simulated Reel Background Ambient */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    selectedTemplate === 'dark'
                      ? 'bg-gradient-to-b from-slate-900 via-black to-slate-950'
                      : selectedTemplate === 'light'
                      ? 'bg-gradient-to-b from-emerald-950 via-slate-900 to-black'
                      : selectedTemplate === 'typo'
                      ? 'bg-gradient-to-b from-neutral-900 via-black to-zinc-950'
                      : 'bg-gradient-to-b from-amber-950/60 via-slate-900 to-black'
                  }`}
                />

                {/* Top Badge: Platform Pill */}
                <div className="relative z-10 flex items-center justify-between text-[11px] px-1 pt-1">
                  <span className="px-2 py-0.5 rounded-full bg-red-600/90 text-white font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">play_arrow</span>
                    <span>SHORTS / REELS</span>
                  </span>
                  <span className="text-white/60 font-mono text-[10px]">00:48 / 00:59</span>
                </div>

                {/* Preacher Video Silhouette & Animated Audio */}
                <div className="relative z-10 my-auto flex flex-col items-center text-center px-3 py-6">
                  {/* Pastor Video Avatar Frame */}
                  <div className="w-20 h-20 rounded-full border-2 border-emerald-400/80 p-1 mb-4 shadow-[0_0_20px_rgba(16,185,129,0.3)] relative">
                    <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                      <span className="material-symbols-outlined text-emerald-300 text-[42px]">
                        account_circle
                      </span>
                    </div>
                    <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#C15F3C] flex items-center justify-center text-[10px] text-white font-bold">
                      AI
                    </span>
                  </div>

                  {/* Dynamic Subtitle Box with Highlight Keywords */}
                  <div className="bg-black/75 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 shadow-xl w-full">
                    <p className="text-[12px] text-amber-300 font-bold mb-1 font-mono tracking-wider">
                      [주일말씀 하이라이트]
                    </p>
                    <p className="text-[14px] font-black text-white leading-snug tracking-tight break-keep-all">
                      "광야의 시간은 버려진 시간이 아닙니다.{' '}
                      <span className="text-[#85f8c4] bg-[#006948]/50 px-1 rounded">하나님께서 나를 빚어가시는</span>{' '}
                      가장 찬란한 축복의 통로입니다!"
                    </p>
                  </div>

                  {/* Audio Equalizer Waveform Simulation */}
                  <div className="flex items-center gap-1 mt-4">
                    <span className="w-1 h-3 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="w-1 h-6 bg-emerald-300 rounded-full animate-pulse delay-75" />
                    <span className="w-1 h-4 bg-emerald-400 rounded-full animate-pulse delay-150" />
                    <span className="w-1 h-7 bg-emerald-200 rounded-full animate-pulse delay-100" />
                    <span className="w-1 h-5 bg-emerald-300 rounded-full animate-pulse delay-200" />
                    <span className="w-1 h-3 bg-emerald-400 rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Bottom Video Meta Bar */}
                <div className="relative z-10 px-2 py-1.5 bg-black/60 backdrop-blur-xs rounded-xl flex items-center justify-between text-[10.5px] text-slate-300">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="material-symbols-outlined text-amber-400 text-[14px]">music_note</span>
                    <span className="truncate">
                      BGM: {selectedBgm === 'piano' ? '은혜의 피아노' : selectedBgm === 'cello' ? '깊은 묵상 첼로' : selectedBgm === 'acoustic' ? '어쿠스틱 워십' : '음성 전용'}
                    </span>
                  </div>
                  <span className="text-emerald-400 font-bold shrink-0">1080p FHD</span>
                </div>
              </div>

              {/* Right: Controller & Options */}
              <div className="flex-1 flex flex-col justify-between gap-4 p-2 sm:p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
                {/* Header Feature Description */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-[#85f8c4] text-[11px] font-bold">
                      유튜브 링크 입력 & 숏폼 변환
                    </span>
                    <span className="text-slate-400 text-[12px]">링크 1개로 5개 숏츠·릴스 생성</span>
                  </div>
                  <h4 className="text-[17px] sm:text-[19px] font-bold text-white leading-tight">
                    영상 편집 수고 없이 숏폼 생성
                  </h4>
                  <p className="text-[12.5px] sm:text-[13px] text-slate-300 mt-1 leading-relaxed break-keep-all">
                    예배 전체영상의 유튜브 링크만 입력해도 AI가 찬양과 광고를 건너뛰고 설교 중 가장 은혜롭고 전달력 높은 60초 핵심 구간을 자동 분석하여 5개의 세로형 유튜브 쇼츠와 인스타그램 릴스로 생성해 줍니다. 설교문을 업로드 하면 ai 음성과 자막으로 된 영상을 생성해 줍니다.
                  </p>
                </div>

                {/* Input Mode Simulation: YouTube link / 설교문 */}
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 font-semibold text-slate-200">
                      <span className="material-symbols-outlined text-slate-300 text-[14px]">smart_display</span>
                      <span>유튜브 링크 / 설교문 입력</span>
                    </span>
                    <span className="text-[#85f8c4] font-mono text-[10px]">AI 자동 분석 준비 완료</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-700/70 text-[11.5px] text-slate-300">
                    <span className="text-slate-300 font-mono text-[11px] truncate">https://youtube.com/watch?v=sermon-live</span>
                    <span className="ml-auto px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[10px] shrink-0">
                      5개 클립 생성
                    </span>
                  </div>
                </div>

                {/* Subtitle / Visual Template Selection */}
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-slate-300 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#C15F3C] text-[16px]">palette</span>
                    <span>자막 비주얼 템플릿 선택:</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'dark', label: '모던 다크', badge: '인기' },
                      { id: 'light', label: '은혜의 빛', badge: '추천' },
                      { id: 'typo', label: '워십 타이포', badge: '깔끔' },
                      { id: 'warm', label: '감성 웜', badge: '부드러움' },
                    ].map((tpl) => (
                      <button
                        key={tpl.id}
                        type="button"
                        onClick={() => setSelectedTemplate(tpl.id as any)}
                        className={`p-2 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          selectedTemplate === tpl.id
                            ? 'bg-slate-800 border-[#C15F3C] ring-2 ring-[#C15F3C]/40 text-white'
                            : 'bg-slate-950/60 border-slate-700/80 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span className="text-[11.5px] font-bold">{tpl.label}</span>
                        <span className="text-[10px] text-[#C15F3C] mt-0.5">{tpl.badge}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Background Music (BGM) Selection */}
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-slate-300 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-amber-400 text-[16px]">volume_up</span>
                    <span>배경음악(BGM) 자동 믹싱:</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'piano', label: '잔잔한 피아노' },
                      { id: 'cello', label: '깊은 묵상 첼로' },
                      { id: 'acoustic', label: '어쿠스틱 워십' },
                      { id: 'voice', label: '목소리 전용(무음)' },
                    ].map((bgm) => (
                      <button
                        key={bgm.id}
                        type="button"
                        onClick={() => setSelectedBgm(bgm.id as any)}
                        className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedBgm === bgm.id
                            ? 'bg-slate-800 border-amber-400 ring-2 ring-amber-400/30 text-white'
                            : 'bg-slate-950/60 border-slate-700/80 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span className="text-[11.5px] font-medium block truncate">{bgm.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Instant Output Spec Bar */}
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="material-symbols-outlined text-emerald-400 text-[16px]">check_circle</span>
                    <span>5개 세로형 숏츠·릴스 자동 생성 & 설교문 AI 음성·자막 연동</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 font-mono font-bold">
                    EXPORT: 5 CLIPS MP4
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 어투 학습 설교문 AI 인터랙션 */}
          {activeTab === 'tone' && (
            <div className="flex flex-col gap-4 min-h-[440px]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-[#C15F3C]/20 text-[#FB923C] text-[11px] font-bold">
                    목회자 특화 LLM 튜닝
                  </span>
                  <span className="text-slate-400 text-[12px]">어투, 문법, 자주 쓰는 표현 심층 학습</span>
                </div>
                <h4 className="text-[17px] sm:text-[19px] font-bold text-white">
                  목회자 고유 어투 맞춤 튜닝
                </h4>
                <p className="text-[12.5px] sm:text-[13px] text-slate-300 mt-1 leading-relaxed break-keep-all">
                  교정이 안 된 거친 녹취문이나 메모도 목사님이 자주 쓰시는 어휘, 문법, 감동적인 표현 방식을 AI가 심층 학습합니다. 번역투가 아닌 강단에서 전하시던 고유의 따스한 어투를 그대로 재현하여 설교문을 완성해 드립니다.
                </p>
              </div>

              {/* Side-by-Side Comparison Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 flex-1">
                {/* Left: 투박한 초안 녹취문 */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                      <span className="text-[12px] font-bold text-slate-400 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[15px] text-slate-500">mic</span>
                        <span>강단 구두 녹취문 (교정 전)</span>
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">초안</span>
                    </div>
                    <p className="text-[12.5px] sm:text-[13px] text-slate-400 leading-relaxed font-sans italic">
                      "그러니까 성도님들... 살다 보면 광야 만날 때 있잖아요. 다들 왜 나만 이러나 싶고... 근데 성경 신명기 보면 하나님이 낮추시려고 훈련시키신 거거든요. 힘들어도 기도 놓지 맙시다. 결국 복 주시려는 거니까요..."
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-850 flex items-center gap-2 text-[10.5px] text-slate-500">
                    <span>중복 표현 및 구어체 음절 다수 포함</span>
                  </div>
                </div>

                {/* Right: 목사님 어투 학습 완성 설교문 */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 flex flex-col justify-between shadow-lg relative overflow-hidden">
                  <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-500/30">
                      <span className="text-[12px] font-bold text-[#85f8c4] flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-emerald-400">auto_awesome</span>
                        <span>목사님 맞춤 완성 설교문 (AI 학습 반영)</span>
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[#85f8c4] text-[10px] font-bold">
                        AI 완성
                      </span>
                    </div>
                    <p className="text-[12.5px] sm:text-[13px] text-slate-100 leading-relaxed font-sans font-medium">
                      "사랑하는 성도 여러분, 우리의 삶에 찾아오는 광야는 결코 실패의 자리가 아닙니다.{' '}
                      <strong className="text-white bg-emerald-950/80 px-1 rounded">
                        하나님께서 우리의 교만을 낮추시고, 오직 생명의 말씀으로만 살게 하시는 거룩한 훈련의 장소입니다.
                      </strong>{' '}
                      눈앞의 고난에 낙심치 마십시오. 하나님께서는 광야를 지나 마침내 당신에게 하늘의 복을 주실 것입니다."
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-emerald-900/40 flex flex-wrap items-center gap-2 text-[10.5px]">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      목사님 고유 어휘 99% 일치
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300">
                      3대 대지 구조화 지원
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Feature Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-[11.5px] text-slate-300">
                <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#C15F3C] text-[18px]">spellcheck</span>
                  <span>비문·반복 구두어 자연스러운 정제</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-400 text-[18px]">history_edu</span>
                  <span>과거 3년간의 설교 데이터 스타일 학습</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[18px]">send_to_mobile</span>
                  <span>설교문 → 쇼츠 영상 스크립트 즉각 연동</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AI 설교음성 제공 인터랙션 */}
          {activeTab === 'voice' && (
            <div className="flex flex-col gap-4 min-h-[440px]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[11px] font-bold">
                    목회자 보이스 합성 AI
                  </span>
                  <span className="text-slate-400 text-[12px]">설교문 업로드 → AI 음성 & 자막 영상 생성</span>
                </div>
                <h4 className="text-[17px] sm:text-[19px] font-bold text-white">
                  AI 설교음성 제공
                </h4>
                <p className="text-[12.5px] sm:text-[13px] text-slate-300 mt-1 leading-relaxed break-keep-all">
                  설교문 원고만 업로드하면, AI가 목회자 특유의 은혜롭고 따스한 음성으로 낭독하는 오디오 음원과 함께 배경음악과 자막이 입혀진 고화질 영상을 자동으로 생성해 줍니다.
                </p>
              </div>

              {/* Voice Generation Interactive UI */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 flex-1">
                {/* Left: 설교문 업로드 & 텍스트 프롬프트 */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                      <span className="text-[12px] font-bold text-slate-300 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[15px] text-amber-400">description</span>
                        <span>업로드된 설교문 원고</span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold">
                        TXT · HWP · DOCX
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[12.5px] text-slate-200 leading-relaxed font-sans">
                      <p className="text-amber-300 font-bold mb-1 text-[11.5px]">[주일 설교 본문 발췌]</p>
                      "비바람이 몰아치는 인생의 밤에도 하나님은 당신을 놓지 않으십니다. 폭풍 한가운데서 주님의 손을 꼭 잡으십시오. 새벽빛 같은 은혜가 곧 임할 것입니다."
                    </div>
                  </div>

                  {/* 목소리 톤 선택 */}
                  <div className="mt-3 pt-2.5 border-t border-slate-800 flex flex-col gap-2">
                    <span className="text-[11px] font-bold text-slate-400">목회자 보이스 톤 선택:</span>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedVoiceTone('warm')}
                        className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                          selectedVoiceTone === 'warm'
                            ? 'bg-slate-800 border-amber-400 text-white'
                            : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span className="text-[11px] font-bold block">따스한 목소리</span>
                        <span className="text-[9.5px] text-amber-400">권면·위로</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedVoiceTone('solemn')}
                        className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                          selectedVoiceTone === 'solemn'
                            ? 'bg-slate-800 border-amber-400 text-white'
                            : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span className="text-[11px] font-bold block">깊은 묵상</span>
                        <span className="text-[9.5px] text-amber-400">차분한 신뢰</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedVoiceTone('passion')}
                        className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                          selectedVoiceTone === 'passion'
                            ? 'bg-slate-800 border-amber-400 text-white'
                            : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span className="text-[11px] font-bold block">열정적 선포</span>
                        <span className="text-[9.5px] text-amber-400">강단 설교</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: AI 음성 재생 & 오디오 파형 */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-950/20 border border-amber-500/40 flex flex-col justify-between shadow-lg">
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-500/30">
                      <span className="text-[12px] font-bold text-amber-300 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-amber-400">graphic_eq</span>
                        <span>AI 목회자 음성 오디오 플레이어</span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                        AI 음성 완성
                      </span>
                    </div>

                    {/* Audio Player Card */}
                    <div className="p-4 rounded-xl bg-black/60 border border-amber-500/20 flex flex-col gap-3 my-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                            className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold hover:scale-105 transition-all shadow-md cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[24px]">
                              {isAudioPlaying ? 'pause' : 'play_arrow'}
                            </span>
                          </button>
                          <div>
                            <span className="text-[12px] font-bold text-white block">목회자 맞춤 AI 음성 낭독</span>
                            <span className="text-[10px] text-slate-400 font-mono">01:24 / 02:45 · 48kHz HD</span>
                          </div>
                        </div>
                        <span className="text-amber-400 font-bold text-[11px] flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                          <span>생성 완료</span>
                        </span>
                      </div>

                      {/* Animated Audio Waveform */}
                      <div className="h-10 flex items-center justify-between gap-1 px-1 bg-slate-950/70 rounded-lg">
                        {[40, 65, 85, 45, 95, 75, 55, 30, 80, 100, 60, 45, 90, 70, 40, 85, 60, 95, 50, 75, 35, 80, 65, 50].map((h, i) => (
                          <span
                            key={i}
                            className={`flex-1 rounded-full ${
                              isAudioPlaying ? 'bg-amber-400 animate-pulse' : 'bg-amber-600/70'
                            }`}
                            style={{
                              height: `${isAudioPlaying ? Math.max(15, (h * (0.6 + 0.4 * Math.sin(i)))) : h * 0.4}%`,
                              transition: 'height 0.2s ease',
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-[12px] text-slate-300 leading-relaxed font-sans">
                      어색한 기계음이 아닌, 강단의 호흡과 쉼표, 영적인 무게감까지 담아낸 자연스러운 고품질 목회자 AI 음성이 생성됩니다.
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-amber-900/40 flex flex-wrap items-center justify-between gap-2 text-[10.5px]">
                    <div className="flex items-center gap-1.5 text-amber-300">
                      <span className="material-symbols-outlined text-[15px]">check_circle</span>
                      <span>자막 싱크 & 배경음악 자동 합성</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold">
                      MP3 / MP4 내보내기 지원
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Feature Spec Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-[11.5px] text-slate-300">
                <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-400 text-[18px]">record_voice_over</span>
                  <span>설교문 원고 업로드 즉시 AI 음성 합성</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[18px]">subtitles</span>
                  <span>단어별 음성 자막 싱크 자동 생성</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-400 text-[18px]">video_file</span>
                  <span>BGM + 자막 + AI 음성 고화질 영상 변환</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: 설교카드 & 묵상카드 인터랙션 */}
          {activeTab === 'cards' && (
            <div className="flex flex-col gap-4 min-h-[440px]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[11px] font-bold">
                    주일 말씀의 은혜를 한 주 내내
                  </span>
                  <span className="text-slate-400 text-[12px]">주일 설교 요약카드 + 일주일치 묵상</span>
                </div>
                <h4 className="text-[17px] sm:text-[19px] font-bold text-white">
                  설교카드 & 묵상카드
                </h4>
                <p className="text-[12.5px] sm:text-[13px] text-slate-300 mt-1 leading-relaxed break-keep-all">
                  성도들이 한 주 내내 살아낼 수 있도록, 주일설교 요약카드뉴스와 일주일치 묵상카드를 자동 제작하여 성도 카카오톡 전송과 교회 홈페이지에 게시하실 수 있습니다.
                </p>
              </div>

              {/* Day Selector Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {[
                  { id: 'sun', label: '주일 설교카드' },
                  { id: 'mon', label: '월요일' },
                  { id: 'tue', label: '화요일' },
                  { id: 'wed', label: '수요일' },
                  { id: 'thu', label: '목요일' },
                  { id: 'fri', label: '금요일' },
                  { id: 'sat', label: '토요일' },
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setSelectedDay(d.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-[12px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedDay === d.id
                        ? 'bg-[#C15F3C] text-white shadow-xs'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>

              {/* Meditation Card Preview Frame */}
              <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 border border-slate-700 shadow-xl flex flex-col justify-between gap-4">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-700/80">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#C15F3C]/20 text-[#FB923C] text-[11px] font-bold">
                      {currentMeditation.dayLabel}
                    </span>
                    <span className="text-[12px] text-slate-400 font-mono flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-[#85f8c4]">book</span>
                      <span>{currentMeditation.verse}</span>
                    </span>
                  </div>

                  <h5 className="text-[17px] sm:text-[20px] font-bold text-white tracking-tight mb-2">
                    {currentMeditation.title}
                  </h5>

                  <p className="text-[13px] sm:text-[14.5px] text-slate-200 leading-relaxed font-sans break-keep-all">
                    {currentMeditation.content}
                  </p>
                </div>

                {/* Prayer Section */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#FEE500] text-[18px] shrink-0 mt-0.5">
                    volunteer_activism
                  </span>
                  <div>
                    <span className="text-[11px] font-bold text-amber-300 block mb-0.5">오늘의 한 줄 기도:</span>
                    <p className="text-[12px] sm:text-[13px] text-slate-300 font-medium italic">
                      "{currentMeditation.prayer}"
                    </p>
                  </div>
                </div>

                {/* Kakao Share & Homepage Publish Action Simulation */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-[11px]">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>성도용 카카오톡 알림톡 규격 완벽 대응</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-[#FEE500] text-[#371D1E] font-bold flex items-center gap-1 shadow-xs">
                      <span>카카오톡 전송</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 font-bold border border-slate-700">
                      교회 홈페이지 게시
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {onExploreClick && (
        <button
          type="button"
          onClick={onExploreClick}
          className="mt-2 text-[12px] font-bold text-[#006948] hover:text-[#00855d] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>네이션스 sermon AI 기능 더 알아보기</span>
          <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
        </button>
      )}
    </div>
  );
};
