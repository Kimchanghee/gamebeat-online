/**
 * 로스트아크 OpenAPI 래퍼 (스마일게이트 공식, 무료)
 * https://developers.smilegate.com/lostark
 */

const BASE = 'https://developer-lostark.game.onstove.com';

interface LostArkConfig {
  apiKey: string;
}

function cfg(): LostArkConfig {
  return { apiKey: process.env.LOSTARK_API_KEY || '' };
}

async function la<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      authorization: `Bearer ${cfg().apiKey}`,
      accept: 'application/json',
      'content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`LostArk ${res.status}`);
  return res.json();
}

/* ----- Public ----- */

export interface AuctionItem {
  name: string;
  grade: string;
  level: number;
  buyPrice: number;
  bidPrice: number;
  averagePrice: number;
  recentPrice: number;
  yDayAvgPrice: number;
}

export async function searchAuction(itemName: string, page = 1): Promise<AuctionItem[]> {
  try {
    const data = await la<{ Items: any[] }>('/auctions/items', {
      method: 'POST',
      body: JSON.stringify({
        ItemName: itemName,
        Sort: 'BUY_PRICE',
        SortCondition: 'ASC',
        PageNo: page,
      }),
    });
    return (data.Items || []).map((i) => ({
      name: i.Name,
      grade: i.Grade,
      level: i.Level,
      buyPrice: i.AuctionInfo?.BuyPrice ?? 0,
      bidPrice: i.AuctionInfo?.BidStartPrice ?? 0,
      averagePrice: i.AuctionInfo?.AveragePrice ?? 0,
      recentPrice: i.AuctionInfo?.RecentPrice ?? 0,
      yDayAvgPrice: i.AuctionInfo?.YDayAvgPrice ?? 0,
    }));
  } catch {
    return [];
  }
}

export async function getMarketTopItems(): Promise<any[]> {
  try {
    return await la('/markets/items', {
      method: 'POST',
      body: JSON.stringify({ Sort: 'GRADE', CategoryCode: 50000, Sort_Condition: 'ASC' }),
    });
  } catch {
    return [];
  }
}

export async function getCharacterProfile(name: string): Promise<any> {
  try {
    return await la(`/armories/characters/${encodeURIComponent(name)}/profiles`);
  } catch {
    return null;
  }
}

/* 골드 인플레이션 지표: 핵심 재화의 일별 평균가 추적 */
export const TRACKED_ITEMS = [
  '명예의 파편 주머니(소)',
  '명예의 파편 주머니(중)',
  '명예의 파편 주머니(대)',
  '돌파석',
  '파괴석',
  '수호석',
  '명예의 돌파석',
  '운명의 돌파석',
];
