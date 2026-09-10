import { ProductItem } from '../types';

export const NATIONS_LOGO_URL = '/nations-logo-white.png';
export const NATIONS_LOGO_ORIG_URL = '/nations-logo-orig.png';

export const VIDEO_EMBED_URL =
  'https://drive.google.com/file/d/14onR-HCKmJn3N_QuKiH4O5jY5G3vpOpH/preview';

export const HERO_VIDEO_MP4 = '/hero-video.mp4';

export const VIDEO_WATCH_URL =
  'https://drive.google.com/file/d/14onR-HCKmJn3N_QuKiH4O5jY5G3vpOpH/view?usp=sharing';

export const CORE_POINT_IMAGES = {
  point1:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCw6ycdnJOsXPNF348TtEBJ8BypHmDbWlZxLFoKU5FkVjjDFLo0zskvarCV4XfJTKr4M7cUNwqLN20oWA7bhVTz3GlECWgujvnEhNsZ8a3ksphl4pwzc8nyOVgubJDIz8qwSudprM2brnm-h4BhqFsungZk7KHRir6PzRDjG0u0cE2ycRol7s5I6dhnPUh8MvkNHaFf3NhnoCN_rY8-p2nGbkdDNQSHZfxvC0nOnR4SAOiIW_rC8Wtk',
  point2:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBQdPC5dC40SiudD5xPcuLcacOs4cmfTdvzn9Y_DvG0FqUG_g6waVH5ccxYsUcP03YPJH7HXs4USNuYCUj5xjVMua1iAy7B2PjUkXgjUjDtLeH6K7lclZKV8OHHcIGKLB00ph2shdMp4eIa9hnvQAkNH1YKMLT4UM4y4wBJZa741cY0AQj-Zcn6IRCIMvxu5p3xsg-sHToBMt2ueKc0A1SKQkNX23FqHUcdyDq2_oNXUV8FgwsIsDfA',
  point3:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDW1g7XdgRGkJSv9rDdX6Mm2TdKlsgX5Hyv24GH0kPR0fR-OMoHFmehLKtyl8Mn54NF2aRD0_pmj4hb8FmXR95u1fiS-4wtOsnu8zZIXVumTquC55OSbjH5fTeLoYzGqcPX3io2F7ydAIvBjwiCM46AVaInyGJ1YdAiYN1rbQ1tMDJa1b3fEBzAgbOpyW8zYeMzTcPt31XPsNc1dpx6kO6xClStKgmOjNZGjHntX5vl3AIAwF2Sqbe4',
  showcase:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBZqTvQZw2iHCcnqsFdrC9AGwdCL7JnYlt6AY4rCM2EdHEdmqhE7o6keNw45ffHRkaEJg7eYzezBRPQnT7HL28tHv-f-QHCYWa_4ogi-GCRs155OhE3A8RaHoTmQYvN2l_TisXbUGD1EcVSewqyUoPaW6Vdr2W0WoUV0I6VYm5Pu1IopuevwsEG5mw-pkB78vGgM4EPjsf5_MxgFobry_RZQAzupxSn__OxAM2QzeGzLRxiNvdqUyww',
};

export const PRODUCTS_LIST: ProductItem[] = [
  {
    id: 'vote',
    number: '01',
    name: '네이션스 교회투표',
    badge: '스마트 총회 & 선거',
    badgeColor: 'emerald',
    description:
      '90% 이상 단축되는 개표 시간, 실시간 본당 스크린 송출 및 자동 집계. 피로도 없는 은혜로운 선거를 만드는 스마트 투표 플랫폼.',
    icon: 'how_to_vote',
    highlights: ['90% 개표 시간 단축', '실시간 스크린 송출', '비밀 보장 블라인드 집계'],
    keyFeatures: [
      {
        title: '현장 모바일 & 종이투표 원스톱 병행',
        desc: '앱 설치 없이 QR코드나 문자로 즉시 접속하며, 디지털 기기가 익숙지 않은 어르신을 위한 OMR/종이투표 연동을 함께 지원합니다.',
      },
      {
        title: '대형 본당 스크린 실시간 결과 송출',
        desc: '투표 개표 시작 즉시 본당 프로젝터 및 온라인 방송 스크린에 그래프와 집계 현황을 투명하게 라이브 중계합니다.',
      },
      {
        title: '교단 헌법 및 교회 정관 맞춤 룰',
        desc: '장로/권사/안수집사 피택 기준(2/3 이상 득표, 다득표 순, 2차 결선 투표 등) 교단별 다양한 규칙을 오차 없이 적용합니다.',
      },
    ],
    targetUseCase: '공동의회, 임직자 선거, 당회/제직회 투표, 총회 안건 표결',
  },
  {
    id: 'score',
    number: '02',
    name: '네이션스 악보',
    badge: '예배 찬양 스마트 라이브러리',
    badgeColor: 'secondary',
    description:
      '악보 라이브러리, 콘티 설정, 악보 편집, 찬양팀 콘티 악보 공유까지 한 번에 지원하는 찬양사역 전용 에디터 & 뷰어 시스템.',
    icon: 'queue_music',
    highlights: ['조옮김(Key 변환) 1초 완성', '찬양팀 실시간 콘티 동기화', '무제한 디지털 악보고'],
    keyFeatures: [
      {
        title: '찬양팀 맞춤형 실시간 콘티 동기화',
        desc: '예배 인도자가 콘티 순서나 Key를 변경하면 찬양팀, 세션, 방송실 팀원들의 태블릿/스마트폰에 즉시 동기화됩니다.',
      },
      {
        title: '원클릭 즉석 Key 이조 & 코드 변환',
        desc: '보컬 음역대에 맞춘 C, D, E, F, G, A, Bb 등 모든 조옮김을 악보 깨짐 없이 선명한 벡터로 즉시 변환합니다.',
      },
      {
        title: '예배 곡목 히스토리 & 저작권 준수 관리',
        desc: '주일 예배, 수요/금요 예배별 찬양 선곡 통계를 분석하여 중복 선곡을 방지하고 균형 잡힌 예배 콘티를 제안합니다.',
      },
    ],
    targetUseCase: '주일 대예배 찬양팀, 청년부 워십팀, 성가대, 수요/금요 찬양기도회',
  },
  {
    id: 'erp',
    number: '03',
    name: '네이션스 교회관리',
    badge: '차세대 스마트 행정 ERP',
    badgeColor: 'emerald',
    description:
      '쉽고 직관적인 관리, 어렵고 불필요한 메뉴는 버리고 합리적 메뉴 구성. 교인 명부, 심방 기록, 출결 현황을 실시간 데이터로 체계화하는 올인원 스마트 교적 관리.',
    icon: 'church',
    highlights: ['직관적인 미니멀 교적 관리', '모바일 심방 보고서 작성', '헌금 영수증 원클릭 발급'],
    keyFeatures: [
      {
        title: '어려운 행정 용어를 덜어낸 간결한 UI',
        desc: '기존 복잡하고 느린 교회 관리 프로그램을 탈피해, 누구나 5분 만에 익히고 바로 사용하는 경량화 고성능 인터페이스를 제공합니다.',
      },
      {
        title: '현장 모바일 심방 기록 & 히스토리 열람',
        desc: '목회자가 심방 현장에서 스마트폰으로 성도 기도제목, 심방 일시, 상담 노트를 안전하게 기록하고 과거 심방 내역을 확인합니다.',
      },
      {
        title: '출결 체크 및 헌금 내역 철저 보안',
        desc: '주일학교, 청년부, 장년 구역 출결 통계와 기부금 영수증 국세청 간소화 제출 연동을 클릭 몇 번으로 완벽 처리합니다.',
      },
    ],
    targetUseCase: '교적 및 성도 관리, 교구/구역 심방 행정, 재정 및 헌금 관리, 교회 시설 예약',
  },
  {
    id: 'group',
    number: '04',
    name: '네이션스 소그룹',
    badge: '공동체 소통 & 양육 플랫폼',
    badgeColor: 'secondary',
    description:
      '구역, 셀, 목장 모임의 나눔과 기도제목 공유, 모임 보고서 작성까지 손끝에서 살아나는 교제와 양육 네트워크.',
    icon: 'diversity_3',
    highlights: ['셀/구역 모임 나눔 일지', '중보기도 리스트 실시간 업데이트', '영적 양육 진도율 체크'],
    keyFeatures: [
      {
        title: '삶의 나눔과 기도제목 안심 공유',
        desc: '일반 메신저의 피로도와 사생활 노출 없이, 공동체 구성원끼리 영적 교제와 긴급 중보기도를 정갈하게 나눕니다.',
      },
      {
        title: '모임 보고서 간편 제출 & 교구장 피드백',
        desc: '소그룹 리더가 모임 후 참석자, 공과 피드백, 특별 심방 요청 사항을 손쉽게 작성하여 교구 담당 교역자에게 전달합니다.',
      },
      {
        title: '교회 맞춤형 양육 교재 디지털화',
        desc: '새신자 양육, 제자훈련 교재를 모바일로 보며 묵상 과제를 제출하고 리더와 피드백을 주고받을 수 있습니다.',
      },
    ],
    targetUseCase: '구역 모임, 청년부 다락방/순/목장, 제자훈련 양육반, 새가족 정착 소그룹',
  },
  {
    id: 'bible',
    number: '05',
    name: '네이션스 성경',
    badge: '설교자를 위한 설교준비 노트',
    badgeColor: 'secondary',
    description:
      '빠르고 정확한 성경 검색, 나만의 주석, 관주, 다중 역본 대조, 교회 공동체 말씀 통독 플랜 연동으로 성도들의 영적 성장을 돕는 스마트 말씀 도구.',
    icon: 'menu_book',
    highlights: ['초고속 다중 역본 대조', '원어(히브리어/헬라어) 단어 분석', '설교 노트 & 공동체 통독 연동'],
    keyFeatures: [
      {
        title: '설교자를 위한 다중 역본 동시 대조',
        desc: '개역개정, 새번역, 공동번역, NIV, ESV 등을 한 화면에서 절 단위로 나란히 대조하여 깊이 있는 묵상을 돕습니다.',
      },
      {
        title: '원어 사전 및 교차 참조 관주 링크',
        desc: '클릭 한 번으로 원어 스트롱 코드, 원어 사전 정의, 관련 구절을 즉시 조회하여 설교 준비 시간을 획기적으로 줄여줍니다.',
      },
      {
        title: '전교인 말씀 통독 챌린지 캘린더',
        desc: '교회 전체가 함께 읽는 1년 1독 말씀 통독 표를 제공하며, 성도들의 통독 달성률을 실시간으로 격려합니다.',
      },
    ],
    targetUseCase: '목회자 설교 준비, 주일 강단 성경 낭독, 성도 개인 큐티 및 전교인 성경 통독',
  },
];
