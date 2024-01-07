export type CellType = (
  | 'start'
  | 'city'
  | 'airport'
  | 'island'
  | 'card'
  | 'fund'
  | 'space'
  | 'tax'
);

type CityCell = {
  name: string;
  type: 'city';
  prices: number[];
  fees: number[];
}

type AirportCell = {
  name: string;
  type: 'airport';
  prices: number[];
  fees: number[];
}

type TaxCell = {
  name: string;
  type: 'tax';
  fee: number;
}

type GeneralCell = {
  name: string;
  type: (
    | 'start'
    | 'island'
    | 'card'
    | 'fund'
    | 'space'
  );
};

export type MarbleCell = (
  | CityCell
  | AirportCell
  | TaxCell
  | GeneralCell
);

export const board: MarbleCell[][] = [
  [
    {
      name: '출발',
      type: 'start',
    },
    {
      name: '타이베이',
      type: 'city',
      prices: [5, 25, 15, 5],
      fees: [2, 25, 9, 1, 3]
    },
    {
      name: '황금열쇠',
      type: 'card',
    },
    {
      name: '베이징',
      type: 'city',
      prices: [8, 25, 15, 5],
      fees: [4, 45, 18, 2, 6],
    },
    {
      name: '마닐라',
      type: 'city',
      prices: [8, 25, 15, 5],
      fees: [4, 45, 18, 2, 6],
    },
    {
      name: '제주도',
      type: 'city',
      prices: [20],
      fees: [30],
    },
    {
      name: '싱가포르',
      type: 'city',
      prices: [10, 25, 15, 5],
      fees: [6, 55, 27, 3, 9],
    },
    {
      name: '황금열쇠',
      type: 'card',
    },
    {
      name: '카이로',
      type: 'city',
      prices: [10, 25, 15, 5],
      fees: [6, 44, 27, 3, 9],
    },
    {
      name: '이스탄불',
      type: 'city',
      prices: [12, 25, 15, 5],
      fees: [8, 60, 30, 4, 10],
    },
  ],
  [
    {
      name: '무인도',
      type: 'island',
    },
    {
      name: '아테네',
      type: 'city',
      prices: [14, 50, 30, 10],
      fees: [1, 75, 45, 5, 15],
    },
    {
      name: '황금열쇠',
      type: 'card',
    },
    {
      name: '코펜하겐',
      type: 'city',
      prices: [16, 50, 30, 10],
      fees: [1, 90, 50, 6, 18],
    },
    {
      name: '스톡홀름',
      type: 'city',
      prices: [16, 50, 30, 10],
      fees: [1, 90, 50, 6, 18],
    },
    {
      name: '콩코드 여객기',
      type: 'airport',
      prices: [20],
      fees: [30],
    },
    {
      name: '베른',
      type: 'city',
      prices: [18, 50, 30, 10],
      fees: [1, 95, 55, 7, 20],
    },
    {
      name: '황금열쇠',
      type: 'card',
    },
    {
      name: '베를린',
      type: 'city',
      prices: [18, 50, 30, 10],
      fees: [1, 95, 55, 7, 20],
    },
    {
      name: '오타와',
      type: 'city',
      prices: [20, 50, 30, 10],
      fees: [1, 100, 60, 8, 22],
    },
  ],
  [
    {
      name: '사회복지기금 접수',
      type: 'fund',
    },
    {
      name: '부에노스 아이레스',
      type: 'city',
      prices: [22, 75, 40, 15],
      fees: [2, 105, 70, 9, 25],
    },
    {
      name: '황금열쇠',
      type: 'card',
    },
    {
      name: '상파울루',
      type: 'city',
      prices: [24, 75, 45, 15],
      fees: [2, 110, 75, 10, 30],
    },
    {
      name: '시드니',
      type: 'city',
      prices: [24, 75, 45, 15],
      fees: [2, 110, 75, 10, 30],
    },
    {
      name: '부산',
      type: 'city',
      prices: [50],
      fees: [60],
    },
    {
      name: '하와이',
      type: 'city',
      prices: [26, 75, 45, 15],
      fees: [2, 115, 80, 11, 33],
    },
    {
      name: '리스본',
      type: 'city',
      prices: [26, 75, 45, 15],
      fees: [2, 115, 80, 11, 33],
    },
    {
      name: '황금열쇠',
      type: 'card',
    },
    {
      name: '마드리드',
      type: 'city',
      prices: [28, 75, 45, 15],
      fees: [2, 120, 85, 12, 36],
    },
  ],
  [
    {
      name: '우주여행',
      type: 'space',
    },
    {
      name: '도쿄',
      type: 'city',
      prices: [30, 100, 60, 20],
      fees: [3, 127, 90, 13, 39],
    },
    {
      name: '컬럼비아호',
      type: 'city',
      prices: [45],
      fees: [30],
    },
    {
      name: '파리',
      type: 'city',
      prices: [32, 100, 60, 20],
      fees: [3, 140, 100, 15, 45],
    },
    {
      name: '로마',
      type: 'city',
      prices: [32, 100, 60, 20],
      fees: [3, 140, 100, 15, 45],
    },
    {
      name: '황금열쇠',
      type: 'card',
    },
    {
      name: '런던',
      type: 'city',
      prices: [35, 100, 60, 20],
      fees: [4, 150, 110, 17, 50],
    },
    {
      name: '뉴욕',
      type: 'city',
      prices: [35, 100, 60, 20],
      fees: [4, 150, 110, 17, 50],
    },
    {
      name: '사회복지기금 접수',
      type: 'tax',
      fee: 15,
    },
    {
      name: '서울',
      type: 'city',
      prices: [100],
      fees: [200],
    },
  ],
] as const;

export const cards = [
  {
    name: '반액대매출',
    type: 'sell_half'
  },
  {
    name: '정기종합소득세',
    type: 'tax',
    prices: [15, 10, 3],
  },
  {
    name: '건물수리비 지불',
    type: 'tax',
    prices: [10, 6, 3],
  },
  {
    name: '방범비',
    type: 'tax',
    prices: [5, 3, 1],
  },
  {
    name: '무인도 탈출권',
    type: 'escape',
  },
  {
    name: '우대권',
    type: 'free',
  },
  {
    name: '뒤로 이동',
    type: 'back',
  },
  {
    name: '관광 여행',
    type: 'move',
    to: '제주',
  },
  {
    name: '관광 여행',
    type: 'move',
    to: '부산',
  },
  {
    name: '관광 여행',
    type: 'move',
    to: '서울',
  },
  {
    name: '무인도',
    type: 'move',
    to: '무인도',
  },
  {
    name: '사회복지기금배당',
    type: 'move',
    to: '사회복지기금 접수',
  },
  {
    name: '세계일주 초대권',
    type: 'round',
  },
  {
    name: '우주여행 초대권',
    type: 'move_from',
    from: '컬럼비아호',
    to: '우주여행',
  },
  {
    name: '우주여행 초대권',
    type: 'move',
    to: '우주여행',
  },
  {
    name: '항공여행',
    type: 'move_from',
    from: '콩코드 여객기',
    to: '타이베이',
  },
  {
    name: '고속도로',
    type: 'move',
    to: '출발',
  },
  {
    name: '노벨평화상 수상',
    type: 'reward',
    amount: 30,
  },
  {
    name: '복권 당첨',
    type: 'reward',
    amount: 20,
  },
  {
    name: '자동차 경주에서의 우승',
    type: 'reward',
    amount: 10,
  },
  {
    name: '장학금 혜택',
    type: 'reward',
    amount: 10,
  },
  {
    name: '연금 혜택',
    type: 'reward',
    amount: 5,
  },
  {
    name: '해외유학',
    type: 'tax',
    amount: 10,
  },
  {
    name: '병원비',
    type: 'tax',
    amount: 5,
  },
  {
    name: '과속운전 벌금',
    type: 'tax',
    amount: 5,
  },
  {
    name: '기지 강탈',
    type: 'hijack',
  },
  {
    name: '생일축사',
    type: 'birthday',
    amount: 1,
  },
] as const;

export const startMoney = 300;