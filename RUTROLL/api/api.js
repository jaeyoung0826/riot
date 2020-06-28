var request = require('request');
const result = require('../user/userinfo');
var search = {};
var apikey="RGAPI-4ccc267c-4dba-46f4-b705-bdb224f15ac2"
//사용자 정보 api
search.getPuuid = function(name){
    return new Promise(function(resolve,reject){
        request({
            url : "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + name+"?api_key="+ apikey,
            method: 'GET'
        },function(err,res,body){

            resolve(JSON.parse(body).puuid);
        });
    });
};

//ppuid를 이용한 게임링크 api
search.getGamename = function(puuid){
    return new Promise(function(resolve,reject){
        request({
            uri : "https://asia.api.riotgames.com/tft/match/v1/matches/by-puuid/"+puuid+"/ids?count=20&api_key="+apikey,
            method: 'GET'
        },function(err,res,body){
           // console.log(JSON.parse(body).link);
            resolve(JSON.parse(body));
        });
    });
};

search.getGametrait = function(game_id){
    return new Promise(function(resolve,reject){
        request({
            url : "https://asia.api.riotgames.com/tft/match/v1/matches/"+game_id+"?api_key="+apikey,
            method: 'GET'
        },function(err,res,body){
           // console.log(JSON.parse(body).link);
            resolve(JSON.parse(body).info);
        });
    });
};



module.exports = search;