import { ProductItem } from '../types';

export const NATIONS_LOGO_URL = '/nations-logo-white.png';
export const NATIONS_LOGO_ORIG_URL = '/nations-logo-orig.png';

export const VIDEO_EMBED_URL =
  'https://drive.google.com/file/d/14onR-HCKmJn3N_QuKiH4O5jY5G3vpOpH/preview';

export const HERO_VIDEO_MP4 = '/hero-video.mp4';

export const VIDEO_WATCH_URL =
  'https://drive.google.com/file/d/14onR-HCKmJn3N_QuKiH4O5jY5G3vpOpH/view?usp=sharing';

export const CORE_POINT_IMAGES = {
  // Point 01: 시간과 재정을 아끼는 사역 효율 (현장 상황실 실시간 집계 태블릿)
  point1: '/Gemini_Generated_Image_nrt3w0nrt3w0nrt3.png',
  point1Alt: '/core-point-1.png',

  // Point 02: 어르신부터 청년까지 탄탄한 접근성 (스마트폰 직관적 투표 확인 화면)
  point2: '/Gemini_Generated_Image_5a62ji5a62ji5a62.png',
  point2Alt: '/core-point-2.png',

  // Point 03: 교회의 안전을 지키는 데이터 보안 (선거관리위원회 일정 및 투표 절차 회의실)
  point3: '/Gemini_Generated_Image_p5sxyop5sxyop5sx.png',
  point3Alt: '/core-point-3.png',

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
        desc: '앱 설치 없이 QR코드나 문자로 즉시 접속하며, 디지털 기기가 익숙지 않은 어르신을 위한 도우미를 통한 대리인증,종이투표 연동을 함께 지원합니다.',
      },
      {
        title: '대형 본당 스크린 실시간 결과 송출',
        desc: '투표 개표 시작 즉시 본당 프로젝터 및 스크린에 그래프와 집계 현황을 투명하게 라이브 중계합니다.',
      },
      {
        title: '교단 헌법 및 교회 정관 맞춤 룰',
        desc: '장로/권사/안수집사 피택 기준(2/3 이상 득표, 다득표 순, 2차 결선 투표 등) 교단별 다양한 규칙을 오차 없이 적용합니다.',
      },
    ],
    targetUseCase: '공동의회, 임직자 선거, 당회/제직회 투표, 총회 표결등.',
  },
  {
    id: 'score',
    number: '02',
    name: '네이션스 악보',
    badge: '예배 찬양 스마트 라이브러리',
    badgeColor: 'secondary',
    description:
      '자신만의 악보 라이브러리 관리부터 악보 편집, 콘티 생성·프린트, 그리고 찬양팀 태블릿 실시간 동기화 및 회중용 PDF 공유까지 지원하는 찬양사역 전용 에디터 & 뷰어 시스템.',
    icon: 'queue_music',
    highlights: ['찬양 악보 라이브러리 & 유튜브 연동', '악보 편집·콘티 생성 & 프린트', '찬양팀 실시간 뷰어 & 회중용 PDF'],
    keyFeatures: [
      {
        title: '찬양 악보 라이브러리',
        desc: '자신만의 악보 라이브러리를 폴더별 관리, 악보정보편집(조, 박자, 주제, 장르 등), 검색, 악보와 연동해 여러 장르의 유튜브 카피곡이 저장됩니다.',
      },
      {
        title: '악보 편집 & 콘티 생성, 프린트, 콘티 목록 관리',
        desc: '악보 자르기, 확대 기능으로 편집하고 A4, A3사이즈로 콘티를 정렬, 찬양연습을 위해 프린트 기능제공, 콘티는 저장할 수 있습니다.',
      },
      {
        title: '인도자용, 찬양팀용 뷰어, 회중용 pdf 제공',
        desc: '악보 콘티와 멘트, 메모등을 콘티순서로 볼수 있는 뷰어URL 제공, 폼송 메모를 찬양팀의 태블릿/스마트폰에 즉시 동기화, 회중용 콘티악보 pdf 생성후 카톡등으로 보낼 수 있는 링크전송을 제공합니다.',
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
    highlights: ['직관적인 미니멀 교적 관리', '모바일 심방 보고서 작성', '출결 체크 및 심방보고'],
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
        title: '출결 체크 및 심방보고',
        desc: '주일학교, 청년부, 장년 구역 출결과 심방을 쉽고 완벽하게 지원합니다.',
      },
    ],
    targetUseCase:
      '간단하고 직관적인 성도관리, 출결관리를 원하는 교회, 네이션스 소그룹앱과 연동해 스마트한 교적 및 보고를 원하는 교회',
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
    highlights: ['삶의 나눔 & 기도제목 안심 공유', '개인 경건 & 리더 보고서 제출', '교회 맞춤 양육 과제 디지털화'],
    keyFeatures: [
      {
        title: '삶의 나눔과 기도제목 안심 공유',
        desc: '일반 메신저의 피로도와 사생활 노출 없이, 공동체 구성원끼리 영적 교제와 긴급 중보기도를 정갈하게 나눕니다.',
      },
      {
        title: '개인 경건보고, 리더 보고서 간편 제출 & 교구장 피드백',
        desc: '개인의 경건보고를 손쉽게 보고하며 소그룹 리더가 피드백, 특별 심방 요청 사항을 직관적으로 교구 담당 교역자에게 전달합니다.',
      },
      {
        title: '교회 맞춤형 양육 교재 디지털화',
        desc: '새신자 양육, 제자훈련 과제를 제출하고 리더와 피드백을 주고받을 수 있습니다.',
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
      '빠르고 정확한 성경 검색, 나만의 주석, 관주, 다중 역본 대조, 교회 공동체 말씀 나눔 연동으로 성도들의 영적 성장을 돕는 스마트 말씀 도구.',
    icon: 'menu_book',
    highlights: [
      '설교 준비 & 나만의 노트 지원',
      '설교자를 위한 다중 역본 동시 대조',
      '설교 노트 & 공동체 묵상 연동',
      '역본사용법은 네이션스로 문의 바랍니다.',
    ],
    keyFeatures: [
      {
        title: '설교 준비 & 나만의 노트 지원',
        desc: '성경역본, 주석등의 데이터가 없는 설교준비 & 나만의 노트를 강력하게 지원하는 도구입니다.',
      },
      {
        title: '설교자를 위한 다중 역본 동시 대조',
        desc: '앱만 제공합니다. 각 역본 data 자료는 개인이 준비, 역본사용법은 네이션스로 문의 바랍니다.',
      },
      {
        title: '나만의 절별 노트, 주석, 관주 링크 만들기',
        desc: '한번 참조하면 잊어버리는 주해, 해석을 설교나 성경연구때마다 절별로 저장하여 나만의 신학 주석이 완성됩니다.',
      },
    ],
    targetUseCase:
      '나만의 설교 준비 데스크, 소그룹앱과 연동하여 목회자의 묵상나눔등 동기화',
  },
];
