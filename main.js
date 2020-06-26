module.exports = function(app){
  //프로젝트 주제 : 나에게 맞는 게임 맵 찾기
  var request = require("request");
  var urlenconde = require('urlencode');
  var apikey = "RGAPI-b69c36b5-e5c6-4698-af93-4be17fc8a7e4"//api 키
  var profileIconId;  //아이콘 번호
  var revisionDate; //수정날짜
  var id; //소환사ID
  var accountId; //계정Id
  var name; //소환사 이름
  var summonerLevel;  //소환사 레벨
  var puuid; //소환서 puuid
  var matches=[];  //경기정보
  var game_name;
    app.get('/', function(req, res) {
        res.render('main', { title: 'TFT DUDUDUGA!' });
    });
  
    app.get('/search/:username/', function(req, res){
      //request 1
      name = req.params.username;
      var nameUrl = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + urlenconde(name)+"?api_key="+ apikey;
      request(nameUrl,function(error,response,body){ // 사용자 실제 게임아이디를 이용하여 사용자 PUUID (암호된 아이디) 정보 획득
        var info_summoner_json = JSON.parse(body);
        puuid=info_summoner_json["puuid"]


        //request 2 (puuid 를 이용하여 게임 정보를 담고 있는 게임 명 가져오기)
        var option={
        url:"https://asia.api.riotgames.com/tft/match/v1/matches/by-puuid/"+puuid+"/ids?count=20",
        headers:{
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
        "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com",
        "X-Riot-Token": apikey
        }  // url 방식으로 api 키 값 입력을 할 때 오류가 생겨서 header의 정보로 api 키 값 전달
        }
        request(option,function(error,response,body){
          var temp_game_name = JSON.parse(body);
          game_name=temp_game_name
          console.log(game_name)
        //문제 x


         //request 3 (게임 이름을 통한 게임 정보가져오기) 
        for (i=0;i<19;i++)
        {
          var game_url="https://asia.api.riotgames.com/tft/match/v1/matches/"+game_name[i]+"?api_key="+apikey
         
        request(game_url,function(error,response,body){ // 이 부분에서 더 많은 데이터를 가져오고 싶은데 1초의 20개의 request 제한이 걸려서 19개만 일단 받아왔습니다.
        
          var temp_game_trait = JSON.parse(body);
          console.log(temp_game_trait)
          var grade=temp_game_trait["info"]["participants"] // 게임의 참가자를 뜻함
          for (j=0;j<8;j++)
          {
            if(grade[j]["puuid"]==puuid && grade[j]["placement"]>=4) // 만약 게임 참가자의 그 게임 등수가 4등 이상(1,2,3,4) 일때
            {
                matches.push(temp_game_trait["info"]["game_variation"]) // 그 맵의 형태를 가져와라  ex) 스타크래프트의 황혼, 파이썬 같은 서로 다른맵
            }
          }
  
        });
        
        }
        //matches 의 중복값중 최대값을 찾아내는 코드작성을 해야하나 function(match) 를 할경우 match 가 제대로 담기지 않음
        // 이 부분을 위해 request 3부분을 settime 을 주고 여기서 then 을 하려고 했는데 이 역시도 then안의 내용이 먼저 실행되는 문제가 발생합니다.
      });
    });
  });
  }