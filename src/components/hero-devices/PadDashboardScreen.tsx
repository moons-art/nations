import React, { useState } from 'react';

interface PadDashboardScreenProps {
  className?: string;
}

export const PadDashboardScreen: React.FC<PadDashboardScreenProps> = ({ className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');

  const groups = [
    { id: 'all', name: '전체 보기', leader: '', badge: 'ALL', total: 760, auth: 550, unvoted: 50, isAll: true },
    { id: 'm1', name: '믿음 1목장', leader: '박박박', badge: '완료', total: 10, auth: 9, unvoted: 0 },
    { id: 'm2', name: '믿음 2목장', leader: '이이이', badge: '완료', total: 10, auth: 9, unvoted: 0 },
    { id: 'l2', name: '사랑 2목장', leader: '김김김', badge: '완료', total: 10, auth: 9, unvoted: 0 },
    { id: 's1', name: '소망 1목장', leader: '정정정', badge: '완료', total: 10, auth: 9, unvoted: 0 },
    { id: 'g1', name: '은혜 1목장', leader: '최최최', badge: '완료', total: 10, auth: 9, unvoted: 0 },
    { id: 'gen', name: '일반 구역', leader: '본당', badge: '진행중', total: 710, auth: 505, unvoted: 50 },
  ];

  const filteredGroups = groups.filter((g) =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.leader.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`relative mx-auto bg-slate-900 rounded-[26px] p-2 sm:p-2.5 shadow-2xl ring-1 ring-slate-800/90 select-none ${className}`}
    >
      {/* Pad Screen Glass Frame */}
      <div className="relative w-full bg-[#f8fafc] rounded-[20px] overflow-hidden flex flex-col border border-slate-300/60 shadow-inner">
        {/* Top Navbar */}
        <div className="bg-white px-3.5 sm:px-4 py-2 border-b border-slate-200/90 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <div className="w-6.5 h-6.5 rounded-lg bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-[#006948] shrink-0">
              <span className="material-symbols-outlined text-[17px]">church</span>
            </div>
            <span className="font-extrabold text-[13.5px] sm:text-[14.5px] text-slate-900 tracking-tight whitespace-nowrap">
              현장 상황실 데스크
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100/80 text-[#006948] text-[10.5px] sm:text-[11.5px] font-bold flex items-center gap-1 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              1차 투표 중
            </span>
            <span className="text-[11.5px] sm:text-[12px] text-slate-500 font-medium whitespace-nowrap">
              · 서울교회 장로 피택
            </span>
          </div>

          <div className="font-black text-[#006948] text-[15px] sm:text-[16px] tracking-wider shrink-0 font-sans whitespace-nowrap">
            NATIONS
          </div>
        </div>

        {/* Natural Content Body (Low vertical height, wide horizontal space) */}
        <div className="p-2.5 sm:p-3 flex flex-col gap-2.5">
          {/* Card 1: 선거 전체 현황 */}
          <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-200/80 shadow-xs flex flex-col gap-2">
            {/* Header */}
            <div className="flex items-center justify-between whitespace-nowrap">
              <div className="flex items-center gap-1.5 text-slate-900 font-extrabold text-[12.5px] sm:text-[13.5px] whitespace-nowrap">
                <span className="material-symbols-outlined text-[#006948] text-[17px]">
                  monitoring
                </span>
                <span>선거 전체 현황</span>
              </div>
              <span className="px-2 py-0.5 rounded-full border border-emerald-300 text-[#006948] bg-emerald-50/50 text-[10px] font-semibold whitespace-nowrap">
                실시간 자동 동기화
              </span>
            </div>

            {/* Progress Bar Row */}
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center justify-between text-[11.5px] sm:text-[12px] whitespace-nowrap">
                <span className="text-slate-700 font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-emerald-600 text-[14px]">
                    trending_up
                  </span>
                  전체 진행률 (인증자 대비 투표율)
                </span>
                <span className="font-black text-emerald-600 text-[13px] sm:text-[14px]">
                  90.9% <span className="text-[11px] font-medium text-slate-500">(500명 / 550명)</span>
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '90.9%' }}></div>
              </div>
            </div>

            {/* Line Chart Box */}
            <div className="bg-slate-50/80 border border-slate-200/70 rounded-lg p-2 flex flex-col gap-1">
              <div className="flex items-center justify-between whitespace-nowrap">
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="text-[10.5px] sm:text-[11.5px] font-bold text-slate-800">
                    선거 진행 현황 추이
                  </span>
                  <span className="px-1.5 py-0.2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[8.5px] sm:text-[9px] font-semibold">
                    인증 550명 · 투표 500명
                  </span>
                </div>
                <span className="px-2 py-0.2 rounded bg-white border border-slate-200 text-slate-700 text-[9.5px] font-semibold shadow-2xs whitespace-nowrap">
                  전체 명부: <strong className="text-slate-900">760명</strong>
                </span>
              </div>

              {/* SVG Curve Chart */}
              <div className="relative w-full h-20 sm:h-22 pt-0.5">
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 500 95"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* 100% Guide Line */}
                  <line
                    x1="40"
                    y1="18"
                    x2="465"
                    y2="18"
                    stroke="#cbd5e1"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <text x="36" y="14" textAnchor="end" fill="#64748b" fontSize="8" fontWeight="bold">
                    760명
                  </text>
                  <text x="36" y="48" textAnchor="end" fill="#94a3b8" fontSize="7.5">
                    380명
                  </text>
                  <text x="36" y="80" textAnchor="end" fill="#94a3b8" fontSize="7.5">
                    0명
                  </text>

                  {/* Area fill */}
                  <path
                    d="M 55 18 L 100 18 C 145 18, 160 34, 190 34 C 240 34, 280 42, 320 42 C 370 42, 410 78, 450 78 L 450 80 L 55 80 Z"
                    fill="url(#curveGradient)"
                  />

                  {/* Stroke line */}
                  <path
                    d="M 55 18 L 100 18 C 145 18, 160 34, 190 34 C 240 34, 280 42, 320 42 C 370 42, 410 78, 450 78"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Milestone 1: 760명 (전체 명부) */}
                  <g transform="translate(55, 18)">
                    <rect x="-20" y="-17" width="40" height="14" rx="3" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
                    <text x="0" y="-6" textAnchor="middle" fill="#1e293b" fontSize="8" fontWeight="bold">760명</text>
                    <circle r="3.5" fill="#64748b" />
                    <text x="0" y="19" textAnchor="middle" fill="#64748b" fontSize="8">전체 명부</text>
                  </g>

                  {/* Milestone 2: 550명 (72.4%) 인증완료(출석) */}
                  <g transform="translate(190, 34)">
                    <text x="0" y="-10" textAnchor="middle" fill="#047857" fontSize="8.5" fontWeight="bold">
                      550명 (72%)
                    </text>
                    <circle r="5" fill="#10b981" />
                    <circle r="2.5" fill="#ffffff" />
                    <text x="0" y="19" textAnchor="middle" fill="#047857" fontSize="8">
                      인증완료(출석)
                    </text>
                  </g>

                  {/* Milestone 3: 500명 (90.9%) 투표 완료 */}
                  <g transform="translate(320, 42)">
                    <text x="0" y="-10" textAnchor="middle" fill="#0369a1" fontSize="8.5" fontWeight="bold">
                      500명 (91%)
                    </text>
                    <circle r="5" fill="#0284c7" />
                    <circle r="2.5" fill="#ffffff" />
                    <text x="0" y="19" textAnchor="middle" fill="#0369a1" fontSize="8">
                      투표 완료
                    </text>
                  </g>

                  {/* Milestone 4: 50명 (9.1%) 미투표(기권) */}
                  <g transform="translate(450, 78)">
                    <text x="0" y="-9" textAnchor="middle" fill="#d97706" fontSize="8.5" fontWeight="bold">
                      50명 (9%)
                    </text>
                    <circle r="5" fill="#f59e0b" />
                    <circle r="2.5" fill="#ffffff" />
                    <text x="0" y="15" textAnchor="middle" fill="#d97706" fontSize="8">
                      미투표(기권)
                    </text>
                  </g>
                </svg>
              </div>

              {/* Chart Legend: Single line with whitespace-nowrap */}
              <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 text-[9px] sm:text-[9.5px] text-slate-600 pt-1 border-t border-slate-200/60 font-medium whitespace-nowrap">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-500 shrink-0"></span>
                  <span>전체 명부 (760명)</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                  <span>인증완료(출석) (550명, 72%)</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-sky-600 shrink-0"></span>
                  <span>투표완료 (500명, 91%)</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                  <span>미투표(기권) (50명, 9%)</span>
                </span>
              </div>
            </div>

            {/* 4 Metric Stats Cards: Always 4 columns */}
            <div className="grid grid-cols-4 gap-2">
              <div className="p-2 sm:p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs flex flex-col justify-between whitespace-nowrap">
                <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium">전체 명부</span>
                <div className="mt-0.5 flex items-baseline gap-0.5">
                  <span className="text-[17px] sm:text-[19px] font-black text-slate-900 leading-tight">760</span>
                  <span className="text-[11px] text-slate-500">명</span>
                </div>
              </div>

              <div className="p-2 sm:p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs flex flex-col justify-between whitespace-nowrap">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate">인증완료(출석)</span>
                  <span className="px-1 py-0.2 rounded bg-emerald-50 text-emerald-700 text-[8.5px] font-bold">72%</span>
                </div>
                <div className="mt-0.5 flex items-baseline gap-0.5">
                  <span className="text-[17px] sm:text-[19px] font-black text-slate-900 leading-tight">550</span>
                  <span className="text-[11px] text-slate-500">명</span>
                </div>
              </div>

              <div className="p-2 sm:p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs flex flex-col justify-between whitespace-nowrap">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium">투표완료</span>
                  <span className="px-1 py-0.2 rounded bg-sky-50 text-sky-700 text-[8.5px] font-bold">91%</span>
                </div>
                <div className="mt-0.5 flex items-baseline gap-0.5">
                  <span className="text-[17px] sm:text-[19px] font-black text-slate-900 leading-tight">500</span>
                  <span className="text-[11px] text-slate-500">명</span>
                </div>
              </div>

              <div className="p-2 sm:p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs flex flex-col justify-between whitespace-nowrap">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate">미투표(기권)</span>
                  <span className="px-1 py-0.2 rounded bg-amber-50 text-amber-700 text-[8.5px] font-bold">대기</span>
                </div>
                <div className="mt-0.5 flex items-baseline gap-0.5">
                  <span className="text-[17px] sm:text-[19px] font-black text-amber-600 leading-tight">50</span>
                  <span className="text-[11px] text-slate-500">명</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: 구역별 현황 */}
          <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-200/80 shadow-xs flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2 whitespace-nowrap">
              <div className="flex items-center gap-1.5 text-slate-900 font-extrabold text-[12.5px] sm:text-[13.5px] whitespace-nowrap">
                <span className="material-symbols-outlined text-[#006948] text-[18px]">
                  view_in_ar
                </span>
                <span>구역별 현황</span>
              </div>

              <div className="flex items-center gap-2 whitespace-nowrap">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 text-[13px]">
                    search
                  </span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="구역 검색..."
                    className="pl-6 pr-2 py-0.5 bg-slate-50 border border-slate-200 rounded-md text-[10.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-28 sm:w-36"
                  />
                </div>
                <span className="text-[10.5px] text-slate-500 font-medium shrink-0 whitespace-nowrap">
                  선택: 전체
                </span>
              </div>
            </div>

            {/* Grid of Chips - 3 columns, all content whitespace-nowrap */}
            <div className="grid grid-cols-3 gap-1.5">
              {filteredGroups.map((g) => {
                const isSelected = selectedGroup === g.id;

                return (
                  <div
                    key={g.id}
                    onClick={() => setSelectedGroup(g.id)}
                    className={`p-1.5 sm:p-2 rounded-lg border transition-all cursor-pointer flex flex-col gap-0.5 shadow-2xs whitespace-nowrap ${
                      isSelected
                        ? 'border-blue-400 bg-blue-50/40 ring-2 ring-blue-300/40'
                        : 'border-slate-200/90 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1 min-w-0">
                        <span className="font-bold text-[11px] sm:text-[11.5px] text-slate-900 truncate">
                          {g.name}
                        </span>
                        {g.leader && (
                          <span className="text-[8.5px] sm:text-[9px] px-1 py-0.2 rounded bg-slate-100 text-slate-600 shrink-0">
                            {g.leader}
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-[8.5px] sm:text-[9px] font-bold px-1 py-0.2 rounded shrink-0 ${
                          g.badge === 'ALL'
                            ? 'bg-slate-100 text-slate-700'
                            : g.badge === '완료'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        {g.badge === '완료' ? '✓ 완료' : g.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 text-[9.5px] sm:text-[10px] text-slate-500 whitespace-nowrap">
                      <span>
                        명부 <strong className="text-slate-800">({g.total})</strong>
                      </span>
                      <span>
                        인증 <strong className="text-slate-800">({g.auth}명)</strong>
                      </span>
                      <span>
                        미투표 <strong className="text-slate-800">({g.unvoted}명)</strong>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
