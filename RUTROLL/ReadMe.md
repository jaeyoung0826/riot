
# FindMe.GG

## 개발 목표

- `Riot Games Api`를 통한 리그오브레전드 정보 사이트 만들기

## 활용 가능한 데이터 `(API_KEY Required.)`

### `SUMMONER-V4`

> https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/

- 소환사 puuid - `puuid`


### `TFT MATCH-V1`

> https://asia.api.riotgames.com/tft/match/v1/matches/by-puuid/

- 매치 이름 

https://asia.api.riotgames.com/tft/match/v1/matches/
- 매치 정보 
-게임 정보의 참여자 정보 ["info"]["participants"]
-참여자의 등수 ["info"]["participants"][placement]


```python

```
