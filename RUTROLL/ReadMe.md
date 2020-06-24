
# FindMe.GG

## 개발 목표

- `Riot Games Api`를 통한 리그오브레전드 정보 사이트 만들기

## 활용 가능한 데이터 `(API_KEY Required.)`

### `SUMMONER-V4`

> https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/{summonerName}

- 소환사 닉네임 - `name`
- 소환사 레벨 - `summonerLevel`
- 소환사 정보 갱신 시각 - `revisionDate`
- 암호화된 소환사 아이디 - `id`
- 암호화된 계정 아이디 - `accountId`

### `CHAMPION-MASTERY-V4`

> https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}

- 챔피언 아이디 - `championId`
- 챔피언 숙련도 레벨 - `championLevel`
- 챔피언 숙련도 점수 - `championPoints`
- 챔피언 남은 숙련도 점수 - `championPointsUntilNextLevel` (5레벨에 0 고정)
- 마지막 플레이 시각 - `lastPlayTime`
- 챔피언 레벨 토큰 개수 - `tokensEarned` (5레벨 이후를 위한 토큰)
- 마지막 챔피언 레벨 이후의 숙련도 점수 - `championPointsSinceLastLevel`
- 소환사 아이디 - `summonerId` (암호화)

### `CHAMPION-V3`

> https://kr.api.riotgames.com/lol/platform/v3/champion-rotations

- 금주의 무료 챔피언 - `freeChampionIds`
- 뉴비를 위한 무료 챔피언 - `freeChampionIdsForNewPlayers`

## 개발 히스토리 
- 2019-11-17
  - 첫 미팅, 개발툴 및 환경 설정, 주제 선정

- 2019-11-23
  - 마더 프로젝트 오류 수정, API키 요청 -> 마더 프로젝트 실행가능

- 2019-11-28
  - css 수정, 챔피언 로테이션 API추가, 캐리력 MMR 추가

- 2019-12-04
  - 최종 미팅, 프로젝트 점검 및 발표자료 작성


```python

```
