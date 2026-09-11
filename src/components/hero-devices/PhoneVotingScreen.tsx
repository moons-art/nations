import React, { useState } from 'react';

interface PhoneVotingScreenProps {
  className?: string;
}

interface Candidate {
  id: string;
  name: string;
  title: string;
  birth: string;
  roles?: string;
  group?: string;
  course?: string;
  avatarSeed: string;
}

const CANDIDATES_DATA: Candidate[] = [
  {
    id: 'c1',
    name: '김은혜',
    title: '안수집사',
    birth: '1965.03.15',
    roles: '교사 · 성가대',
    group: '믿음 1목장',
    course: '제자훈련 1기 수료',
    avatarSeed: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
  },
  {
    id: 'c2',
    name: '박충성',
    title: '안수집사',
    birth: '1968.11.02',
    group: '소망 2목장',
    avatarSeed: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces',
  },
  {
    id: 'c3',
    name: '이사랑',
    title: '안수집사',
    birth: '1970.07.24',
    group: '사랑 3목장',
    avatarSeed: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
  },
  {
    id: 'c4',
    name: '정온유',
    title: '안수집사',
    birth: '1969.12.05',
    group: '은혜 1목장',
    avatarSeed: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=faces',
  },
  {
    id: 'c5',
    name: '최믿음',
    title: '안수집사',
    birth: '1972.04.18',
    group: '믿음 2목장',
    avatarSeed: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces',
  },
  {
    id: 'c6',
    name: '한소망',
    title: '안수집사',
    birth: '1971.09.30',
    group: '소망 1목장',
    avatarSeed: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop&crop=faces',
  },
];

export const PhoneVotingScreen: React.FC<PhoneVotingScreenProps> = ({ className = '' }) => {
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>([]);
  const [sortMode, setSortMode] = useState<'name' | 'age'>('name');
  const [hasVoted, setHasVoted] = useState(false);

  const sortedCandidates = [...CANDIDATES_DATA].sort((a, b) => {
    if (sortMode === 'name') {
      return a.name.localeCompare(b.name, 'ko');
    }
    return a.birth.localeCompare(b.birth);
  });

  const handleToggleSelect = (id: string) => {
    if (hasVoted) return;
    setSelectedCandidateIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 5) {
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedCandidateIds.length === 0) return;
    setHasVoted(true);
  };

  const handleResetVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHasVoted(false);
    setSelectedCandidateIds([]);
  };

  return (
    <div
      className={`relative mx-auto w-full bg-slate-900 rounded-[30px] p-2 shadow-2xl ring-1 ring-slate-800/80 select-none ${className}`}
    >
      {/* Screen Frame */}
      <div className="relative w-full bg-[#f8fafc] rounded-[24px] overflow-hidden flex flex-col h-[475px] border border-slate-300/60 shadow-inner">
        {/* Status Bar */}
        <div className="pt-2 px-4 pb-1 flex items-center justify-between text-slate-800 text-[10.5px] font-semibold tracking-tight shrink-0 bg-[#f8fafc]">
          <span>9:41</span>
          <div className="w-16 h-2.5 bg-slate-900 rounded-full mx-auto -mt-0.5 opacity-90"></div>
          <div className="flex items-center gap-1 text-slate-700">
            <span className="text-[9.5px] font-bold">5G</span>
            <span className="material-symbols-outlined text-[12px]">battery_full</span>
          </div>
        </div>

        {/* Voter Title Header */}
        <div className="px-3.5 pt-1 pb-1 shrink-0">
          <div className="flex items-center gap-1.5 text-[13.5px] whitespace-nowrap">
            <span className="font-extrabold text-[#0e3a7c]">홍길동</span>
            <span className="text-slate-700 font-semibold text-[12px]">선거인 투표화면</span>
          </div>
        </div>

        {/* Voting Info Dark Navy Card */}
        <div className="mx-2 rounded-xl bg-[#101c33] p-2 text-white shadow-md shrink-0 overflow-hidden">
          <div className="flex items-center justify-between mb-1 whitespace-nowrap">
            <h4 className="font-extrabold text-[12px] tracking-tight whitespace-nowrap">서울교회 장로 피택</h4>
            <span className="px-1.5 py-0.5 rounded-full bg-[#f59e0b] text-slate-950 font-extrabold text-[8.5px] whitespace-nowrap">
              1차 투표 진행 중
            </span>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-300 mt-0.5 whitespace-nowrap">
            <span className="whitespace-nowrap">
              후보자 중 <strong className="text-white font-bold">5명</strong> 선택
            </span>
            <span className="text-[#f59e0b] font-extrabold text-[11px] whitespace-nowrap">
              {selectedCandidateIds.length} / 5명
            </span>
          </div>

          {/* Progress track */}
          <div className="w-full bg-slate-800/90 h-1 rounded-full mt-1.5 overflow-hidden">
            <div
              className="h-full transition-all duration-300 bg-emerald-400"
              style={{ width: `${(selectedCandidateIds.length / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Sort Segmented Control */}
        <div className="mx-2.5 mt-1.5 p-0.5 bg-slate-200/80 rounded-lg flex items-center text-[10.5px] font-semibold shrink-0">
          <button
            onClick={() => setSortMode('name')}
            className={`flex-1 py-0.5 rounded-md text-center transition-all cursor-pointer whitespace-nowrap ${
              sortMode === 'name'
                ? 'bg-[#0e3a7c] text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            가나다순
          </button>
          <button
            onClick={() => setSortMode('age')}
            className={`flex-1 py-0.5 rounded-md text-center transition-all cursor-pointer whitespace-nowrap ${
              sortMode === 'age'
                ? 'bg-[#0e3a7c] text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            나이순
          </button>
        </div>

        {/* Candidate List (Compact items) */}
        <div className="px-2.5 py-1 flex-1 space-y-1 overflow-y-auto no-scrollbar">
          {sortedCandidates.map((candidate) => {
            const isSelected = selectedCandidateIds.includes(candidate.id);

            return (
              <div
                key={candidate.id}
                onClick={() => handleToggleSelect(candidate.id)}
                className={`p-1 sm:p-1.5 rounded-lg bg-white border transition-all cursor-pointer flex items-center justify-between gap-1.5 shadow-2xs ${
                  isSelected
                    ? 'border-[#0e3a7c] ring-2 ring-[#0e3a7c]/20 bg-blue-50/20'
                    : 'border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <img
                    src={candidate.avatarSeed}
                    alt={candidate.name}
                    className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-slate-200"
                    loading="lazy"
                  />
                  <div className="min-w-0 whitespace-nowrap">
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <span className="font-extrabold text-[11px] text-slate-900 tracking-tight whitespace-nowrap">
                        {candidate.name}
                      </span>
                      <span className="text-[9px] text-slate-500 font-medium whitespace-nowrap">
                        {candidate.title}
                      </span>
                    </div>
                    <p className="text-[8.5px] text-slate-500 truncate whitespace-nowrap leading-tight">
                      {candidate.birth}
                      {candidate.group && ` · ${candidate.group}`}
                    </p>
                  </div>
                </div>

                {/* Checkbox */}
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'border-[#0e3a7c] bg-[#0e3a7c] text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {isSelected && (
                    <span className="material-symbols-outlined text-[12px] font-bold">check</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Submission Bar */}
        <div className="p-2 bg-white border-t border-slate-200/80 shrink-0">
          {hasVoted ? (
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-full py-1.5 px-2 rounded-lg bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center gap-1 shadow-sm whitespace-nowrap">
                <span className="material-symbols-outlined text-[13px]">check_circle</span>
                <span>투표가 정상 제출되었습니다</span>
              </div>
              <button
                onClick={handleResetVote}
                className="text-[9px] text-slate-500 hover:text-slate-800 underline cursor-pointer whitespace-nowrap"
              >
                다시 선택해보기
              </button>
            </div>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={selectedCandidateIds.length === 0}
              className={`w-full py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center shadow-xs cursor-pointer whitespace-nowrap ${
                selectedCandidateIds.length > 0
                  ? 'bg-[#0e3a7c] text-white hover:bg-[#0b2956] active:scale-[0.98]'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {selectedCandidateIds.length > 0
                ? `${selectedCandidateIds.length}명 선택 · 투표 제출`
                : '후보자 선택 (최대 5명)'}
            </button>
          )}
        </div>

        {/* Home Indicator */}
        <div className="pb-1 pt-0.5 flex justify-center bg-white">
          <div className="w-24 h-1 bg-slate-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
