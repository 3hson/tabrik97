process.env.NTBA_FIX_319='production'
const TelegramBot = require('node-telegram-bot-api'); 
const token = "594136880:AAEKyek5W-ZEHwdP52n1iEPQzBJwFLtISTo";
const bot = new TelegramBot(token, {polling: true});
var fs = require('fs');

const Btn1_RASM = 'پیام تبریک رسمی';
const Btn1_DUST = 'پیام تبریک دوستانه';

const BTN1GP = {'keyboard':[[Btn1_RASM,Btn1_DUST]],'resize_keyboard':true}



bot.on('message', (msg) => {

    if (msg.text == Btn1_RASM ) {
        fs.readFile(`./data/USERS/${msg.from.username}.json` , function (err, data) {
            var userData = JSON.parse(data);
        
            if( userData.RASM.length >=23){
                
                userData.RASM=[];
                
            }
            var rasmArray = userData.RASM;
          
            do{
                var randomNumber = Math.ceil(Math.random() * 23);
            }while(rasmArray.find((rasmNumber)=>randomNumber===rasmNumber));
            userData.RASM.push(randomNumber)

            fs.writeFile(`./data/USERS/${msg.from.username}.json` , JSON.stringify(userData), (err) => {
                if (err) throw err;
            
               
            });
            fs.readFile(`./data/RASM/${randomNumber}.txt`, 'utf8', function (err, data) {
                if (err) {
                  
                  return;
                }
                bot.sendMessage(
                          msg.chat.id,
                          data + "\n\n" + "از طرف  "+ msg.from.first_name  ,
                          {parse_mode : "HTML"}
                      );
         
              });
        })
      
      
    } 
    
    if (msg.text == Btn1_DUST ) {
        fs.readFile(`./data/USERS/${msg.from.username}.json` , function (err, data) {
            var userData = JSON.parse(data);
        
            if( userData.DUST.length >=23){
                
                userData.DUST=[];
                
            }
            var dustArray = userData.DUST;
            do{
                var randomNumber = Math.ceil(Math.random() * 23);
            }while(dustArray.find((dustArray)=>randomNumber===dustArray));
            userData.DUST.push(randomNumber)

            fs.writeFile(`./data/USERS/${msg.from.username}.json` , JSON.stringify(userData), (err) => {
                if (err) throw err;
            
            });
            fs.readFile(`./data/RASM/${randomNumber}.txt`, 'utf8', function (err, data) {
                if (err) {
                  
                  return;
                }
                bot.sendMessage(
                          msg.chat.id,
                          data + "\n\n" + "از طرف  "+ msg.from.first_name  ,
                          {parse_mode : "HTML"}
                      );
         
              });
        })
    } 
});

bot.onText(/\/start/, (msg) => {
    var initData = {
                "RASM":[],
                "DUST": []
               };
    
    fs.writeFile(`./data/USERS/${msg.from.username}.json`, JSON.stringify(initData),(err)=>{
        
    });
    
    bot.sendMessage(
        msg.from.id,
        "لطفا  انتخاب کنید",{
        'reply_markup':BTN1GP,
    })
    
  
});

