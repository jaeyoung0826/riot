const searchGameInfo = require('../api/api');
var result = {};
var urlencode=require("urlencode");
const search = require('../api/api');
var local_puuid;
var need_data;
result.userInfo = function(name,callback) {
    var encode_name=urlencode(name)
    searchGameInfo.getPuuid(encode_name).then(puuid => {
        local_puuid=puuid
        return searchGameInfo.getGamename(puuid);
    }).then(gamenames => {
        //console.log(gamenames);
        async function loop(gamenames) {
            let gametraits = []
            for(var game_name_Index = 0 ; game_name_Index < gamenames.length ; game_name_Index++ ){
                    await searchGameInfo.getGametrait(gamenames[game_name_Index]).then(gametrait =>{
                        gametraits.push(gametrait);
                    })
            }
            return gametraits;
        }
        return loop(gamenames);
    }).then(data => {
        var top_game_map=[]
        var all_game_map=[]
        for (var data_index=0;data_index<data.length;data_index++)
        {
            for(var participants_num=0;participants_num<8;participants_num++)
            {
            
                if(data[data_index].participants[participants_num].puuid==local_puuid&&data[data_index].participants[participants_num].placement<=4)
                {
                top_game_map.push(data[data_index].game_variation)
                }
            }
            all_game_map.push(data[data_index].game_variation)
            
         
        }
        var all_map_count = {};
        var top_map_count = {};
        for (var i = 0; i < all_game_map.length; ++i) 
        {
            
            if (!all_map_count[all_game_map[i]])
            {
                all_map_count[all_game_map[i]] = 0;
            }

            ++all_map_count[all_game_map[i]];
              
        }
        for (var i = 0; i < top_game_map.length; ++i) 
        {
            
            if (!top_map_count[top_game_map[i]])
            {
                top_map_count[top_game_map[i]] = 0;
            }
            
            ++top_map_count[top_game_map[i]];
              
        }
        
        var result=[]
        rest_dic=all_map_count
        for (key in all_map_count)
        {
            for(key2 in top_map_count)
            {
                if(key==key2)
                {
                    a=key+" 승률: "+top_map_count[key]/all_map_count[key]+" 판 수: ("+top_map_count[key]+"/"+all_map_count[key]+")"
                    result.push(a)

                    delete rest_dic[key]
                    
                }  
            }
        }
        for (key in rest_dic)
        {
            b=key+" 승률: 0  판 수: (0/"+all_map_count[key]+")"
            result.push(b)
        }

        /*
        *  result에 담을 데이터를 json형식으로 담는게 좋을거 같네요.
        *
        *  var result = {
        *       [
        *           {
        *               'map' : 'TFT3_GameVariation_Bonanza',
        *               'winRate' : '100%',
        *               'gameCount' : '1/3'
        *           },
        *           {
        *               'map' : 'TFT3_GameVariation_Bonanza',
        *               'winRate' : '100%',
        *               'gameCount' : '1/3'
        *           },
        *       ]
        *   }
        *
        *
        * */

        callback(result);
    });
    
};
module.exports = result;