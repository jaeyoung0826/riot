var user=require("../user/userinfo")
var express = require('express');
const search = require("../api/api");
var app = express.Router();
app.get('/', function(req, res) {
  res.render('main', { title: 'R U TROLL?' });
});

app.get('/api/search/:username/', function(req, res){
  var name=req.params.username;
  user.userInfo(name,function(result){
      console.log(result);
      res.json(result);
  });
});

module.exports=app;