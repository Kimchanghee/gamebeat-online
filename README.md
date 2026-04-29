# gamebeat.io — e스포츠 + MMORPG 통합 (A-3)

> 경기 일정·결과 + MMO 인게임 시세를 한 사이트에서.

| 항목 | 값 |
|---|---|
| 도메인 | gamebeat.io |
| 카테고리 | 게임 (A-3) |
| 지원 언어 | ko, en, ja, zh (4개) |
| AWS 비용 | $30~$50/월 |
| 예상 RPM | $4~$7 |
| Stage 3 월 PV | 약 1,000K |
| Stage 3 월 수익 | $5,000~$9,000 |

## 데이터 소스

- **로스트아크 / 던파 / 메이플 OpenAPI** (공식, 무료)
- **Riot API** (LoL, TFT, Valorant)
- **Liquipedia API** (e스포츠 일정)
- **HLTV** (CS2, 스크래핑)
- **Steam Web API** (DOTA2 등)

## 자동화 흐름

1. 게임별 시간당 시세·랭킹 폴링
2. e스포츠 경기 시작 30분 전 자동 페이지 생성
3. 경기 종료 후 5분 내 결과 + 통계 업데이트

## SEO 페이지

- 게임별 / 팀별 / 선수별 / 경기별
- 인게임 아이템 시세 그래프
- 토너먼트 일정 (×4 언어)

## 광고 배치

- 경기 라이브 페이지 Native Banner ×3 (refresh on update)
- "공식 중계 보기" → Direct Link
- Popunder 활성
- Social Bar 활성
