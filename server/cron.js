const cron = require('node-cron');
const {scrapeData, scraperTwo} = require('./scraper');

module.exports = {
    cron1(){
        cron.schedule('*/1 * * * *', ()=>{
        // cron.schedule('*/30 * * * *', ()=>{
            console.log("Running after every 30 minutes");
            scrapeData();
        });        
    },
    cron2(){
        cron.schedule('0 0 0 * * *', ()=>{
        // cron.schedule('*/2 * * * *', ()=>{
            console.log("Running every midnight");
            scraperTwo();
        });
    },
    // cron3(){
    //     cron.schedule('*/3 * * * *', ()=>{
    //         console.log("Running after every 3 minute");
    //         scraperThree();
    //     });        
    // },
} 