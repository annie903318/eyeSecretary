// 引用linebot SDK
var linebot = require('linebot');
//引用request
var request = require('request');

// 用於辨識Line Channel的資訊
var bot = linebot({
  channelId: '1657027135',
  channelSecret: 'd5fdfd126ee88cb4b75fa59e6b5d91bb',
  channelAccessToken: '0qKgZBy1iaO/3HeYxjSVdNIvzfzkzTPHTBcUn7uRAvWZa4yA1XSRMRzulKb09C0ZPqBQYrgGM05vUK57ToAv0pN4O6UVms0IF0N3t7cIjbgjAPcobNxHSJIWNMKliq73Iwij8XINJrfc+cJ0V6tJ6wdB04t89/1O/w1cDnyilFU='
});

//web server與line notify驗證的套件
'use strict';
const express = require('express');
const line_notify = require('./line-notify');
const path = require('path');
const session = require('express-session'); //使用express-session作為middleware
const moment= require('moment'); //處理時間運算

//頁面渲染引擎設定、靜態檔案存取設定、session參數、line notify參數
//設定session參數
const session_options = {
    secret:process.env.LINE_NOTIFY_CHANNEL_SECRET,
    resave:false, //false表示不強制儲存沒有修改過的session內容
    saveUninitialized: false //false表示只儲存有修改過的session內容節省記憶體
};
//設定line notify參數
const notifyConfig = {
    channel_id: process.env.LINE_NOTIFY_CHANNEL_ID, //line notify編號
    channel_secret: process.env.LINE_NOTIFY_CHANNEL_SECRET, //line notify密鑰
    callback_url:process.env.LINE_NOTIFY_CALLBACK_URL, //line notify授權成功時跳轉的網址，一定要跟LIFF網頁的伺服器網址相同
};
const lineNotify = new line_notify(notifyConfig);
const app = express();
app.set('views', path.join(__dirname, 'views'));  //設定Template目錄，畫面樣板
app.set('view engine', 'pug');  //設定Template引擎，用於產生畫面
app.use(session(session_options));  //設定使用Session
app.use(express.static(path.join(__dirname, 'public'))); //設定可以取得的檔案

//自訂兩個登入畫面(尚未登入、成功登入)
//自訂的畫面路由，檢查session是否已完成line notify授權
app.get('/', (req, res) => {
  if (req.session.authPass) {
    const name = req.session.notify_info.target;
    const schNotify = req.session.schNotify;
    res.render('success', { name, schNotify }); //自訂成功登入頁面LINE Notify功能
  } else if (req.session.errMsg) {
    res.render('login', {  //自訂尚未登入頁面，顯示錯誤訊息
      ErrMsg: req.session.errMsg
    });
  } else {
    res.render('login');  //自訂尚未登入頁面，沒有錯誤訊息
  }
});

//LINE Notify相關的API
app.get('/auth/notify', lineNotify.authDirect()); //產生跳轉到LINE Notify的授權網址
app.get('/auth/notify/cb', lineNotify.authcb( //Notify API端點接收授權訊息
  (req, res) => { //登入成功
    req.session.authPass = true;  
    res.redirect('/');
  }, (req, res, error) => {  //登入失敗
    req.session.authPass = false;
    req.session.errMsg = error.message;
    res.redirect('/');
  }
));

//提醒事項功能
//預定通知Notify API
app.get('/auth/notify/me', (req, res) => {
  const notifySeconds = req.query.n_s || 5;
  const scheduleTime = moment().utc().add(8,'h').add(notifySeconds, 's').format('LTS'); //時區增加8小時
  const msg = `${scheduleTime} 通知訊息`;
  setTimeout(() => {  //設定一個延遲的訊息推播
    lineNotify.sendMsg(req.session.access_token, msg);
    delete req.session.schNotify;
  }, notifySeconds * 1000);
  req.session.schNotify = scheduleTime;  //儲存推播的時間
  res.redirect('/');
});

//清除session API
app.get('/auth/notify/logout', (req, res) => { //登出帳號清除session
  req.session.destroy();
  res.redirect('/');
});

// 當有人傳送訊息給Bot時
bot.on('message', function (event) {
    // event.message.text是使用者傳給bot的訊息
    // 準備要回傳的內容
    // var replyMsg ='reply message 1';

    //貼心叮嚀功能
    if(event.message.text == "貼心叮嚀"){
        //Imgur資訊勿刪
        //CLIENT_ID: f4b7e817c8c011a
        //CLIENT_SECRET: 8b759b380c34ad683a202e9851cfb1543bc8124b
        //Access Token: 6a432a35538c9721406cbd5de6ccf86997ebc395
        //https://imgur.com/gallery/xmJXFMT
        
        //連接imgur api
        var options = { method: 'GET',
            url: 'https://api.imgur.com/3/album/xmJXFMT/images',
            headers:
            { 'access-token': '6a432a35538c9721406cbd5de6ccf86997ebc395',
            'cache-control': 'no-cache',
            authorization: 'Client-ID f4b7e817c8c011a' } };
            
        //取得imgur相簿的所有內容，隨機回覆圖片
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            //取得相簿裡隨機位置的圖片link
            var pic_url= 'https://imgur.com/' + JSON.parse(body).data[Math.floor(Math.random()*JSON.parse(body).data.length)].id + '.jpg';
            // 透過event.reply(要回傳的訊息)方法將訊息回傳給使用者
            event.reply({
                type: 'image',
                originalContentUrl: pic_url,
                previewImageUrl: pic_url
                });
        });
    } 
});      
       
//         event.reply(
//             {
//                 type: 'image',
//                 originalContentUrl: pic_url,
//                 previewImageUrl: pic_url
//             }
//         ).then(function (data) {
//             // 當訊息成功回傳後的處理
//         }).catch(function (error) {
//             // 當訊息回傳失敗後的處理
//         });
    

//啟動web server(含web api)
// Bot所監聽的webhook路徑與port
bot.listen('/linewebhook', 3000, function () {
    console.log('[BOT已準備就緒]');
});