process.env.NTBA_FIX_319='production'
const TelegramBot = require('node-telegram-bot-api'); 
const token = "594136880:AAEKyek5W-ZEHwdP52n1iEPQzBJwFLtISTo";
const bot = new TelegramBot(token, {polling: true});
var fs = require('fs');

const Btn1_RASM = 'پیام تبریک رسمی';
const Btn1_DUST = 'پیام تبریک دوستانه';

const BTN1GP = {'keyboard':[[Btn1_RASM,Btn1_DUST]],'resize_keyboard':true};
const _SESSION = [];
bot.onText(/\/start/, (msg) => {

    var initData = {
                "RASM":[],
                "DUST": []
               };
    
    fs.writeFile(`./data/USERS/${msg.from.username}.json`, JSON.stringify(initData),()=>{
        bot.sendMessage(
            msg.from.id,
            "لطفا  انتخاب کنید",{
            'reply_markup':BTN1GP,
        })
        
bot.on('message', (msg) => {

    fs.readFile(`./data/USERS/${msg.from.username}.json` , function (err, data) {
    if (data)
    var userData = JSON.parse(data);

    if (msg.text == Btn1_RASM ) {
        
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
              return true;
      
      
    } 
    
    if (msg.text == Btn1_DUST ) {
       
        
            if( userData.DUST.length >=23){
                
                userData.DUST=[];
                
            }
            var dustArray = userData.DUST;
          
            do{
                var randomNumber = Math.ceil(Math.random() * 23);
            }while(dustArray.find((dustNumber)=>randomNumber===dustNumber));
            userData.DUST.push(randomNumber)

            fs.writeFile(`./data/USERS/${msg.from.username}.json` , JSON.stringify(userData), (err) => {
                if (err) throw err;
            
               
            });
            fs.readFile(`./data/DUST/${randomNumber}.txt`, 'utf8', function (err, data) {
                if (err) {
                  
                  return;
                }
                bot.sendMessage(
                          msg.chat.id,
                          data + "\n\n" + "از طرف  "+ msg.from.first_name  ,
                          {parse_mode : "HTML"}
                      );
         
              });
        
      return true
      
    }
 })
});

    });
    
  return true
  
});
