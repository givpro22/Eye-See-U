import { AdminProduct } from "../services/admin/productService";

export const mockProducts: AdminProduct[] = [
  {
    id: 1,
    categoryId: 1,
    optionGroups: [1, 2],
    name: '불고기버거',
    description: '특제 불고기 소스로 입맛 돋우는 부드러운 버거',
    price: 6000,
    state: 'AVAILABLE',
    picture: null
  },
  {
    id: 2,
    categoryId: 1,
    optionGroups: [1, 2],
    name: '더블치즈버거',
    description: '두 장의 육즙 가득한 패티와 고소한 치즈 두 장이 어우러진 풍성한 버거',
    price: 6000,
    state: 'AVAILABLE',
    picture: 'https://i.namu.wiki/i/SnqC4khMj78vcWzlLtBoycGdQQcnMbsgbM-qVeS4ShTp51wUEbD3ZadPxs2vIeldNDub45dCGulMLZU-NqBS_uc8JpOvAaUPN9kxO-go2b1mCMBmDpjfexDMB9E93Iam-1tCylmLxkPMKp2Pv6gILQ.webp'
  }
];