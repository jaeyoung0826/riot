module.exports = function(app){

var request = require("request");
var urlenconde = require('urlencode');
var apikey = "RGAPI-4ccc267c-4dba-46f4-b705-bdb224f15ac2"//api
var my_grade
var profileIconId;  //아이콘 번호
var revisionDate; //수정날짜
var id; //소환사ID
var accountId; //계정Id
var name; //소환사 이름
var summonerLevel;  //소환사 레벨
var puuid; //소환서 puuid
var startIndex;
var endIndex;
var totalGames;
var matches=[];  //경기정보
var game_name;
  app.get('/', function(req, res) {
  	  res.render('main', { title: 'R U TROLL?' });
  });

  app.get('/search/:username/', function(req, res){
    //롤 api url
    name = req.params.username;
    var nameUrl = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + urlenconde(name)+"?api_key="+ apikey;
    request(nameUrl,function(error,response,body){
      var info_summoner_json = JSON.parse(body);
      accountId = info_summoner_json["accountId"];
      id = info_summoner_json["id"];
      summoner = info_summoner_json["name"];
      profileIconId = info_summoner_json["profileIconId"];
      summonerLevel = info_summoner_json["summonerLevel"];
      revisionDate = info_summoner_json["revisionDate"];
      puuid=info_summoner_json["puuid"]
      var option={
      url:"https://asia.api.riotgames.com/tft/match/v1/matches/by-puuid/"+puuid+"/ids?count=20",
      headers:{
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
      "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
      "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
      "Origin": "https://developer.riotgames.com",
      "X-Riot-Token": apikey
      }
      }
      request(option,function(error,response,body){
        var temp_game_name = JSON.parse(body);
        game_name=temp_game_name
        console.log(game_name)
      for (i=0;i<19;i++)
      {
        var game_url="https://asia.api.riotgames.com/tft/match/v1/matches/"+game_name[i]+"?api_key="+apikey
       
      request(game_url,function(error,response,body){
      
        var temp_game_trait = JSON.parse(body);
        console.log(temp_game_trait)
        var grade=temp_game_trait["info"]["participants"]
        for (j=0;j<8;j++)
        {
          if(grade[j]["puuid"]==puuid && grade[j]["placement"]>=4)
          {
              matches.push(temp_game_trait["info"]["game_variation"])
          }
        }

      });
      
      }

    });
  });
});
}
