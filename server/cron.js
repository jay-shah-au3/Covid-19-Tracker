const cron = require('node-cron');
const {scrapeData, scraperTwo} = require('./scraper');

// module.exports = cron.schedule('*/60 * * * *', ()=>{
//     console.log("Running after every 60 minute");
//     scrapeData();
// });

module.exports = {
    cron1(){
        cron.schedule('*/60 * * * *', ()=>{
            console.log("Running after every 60 minutes");
            scrapeData();
        });        
    },
    cron2(){
        cron.schedule('0 0 0 * * *', ()=>{
            console.log("Running every midnight");
            scraperTwo();
        });
    }    
} 