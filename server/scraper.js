const axios = require('axios');
const cheerio = require('cheerio');
const db = require('./config.js');
var _ = require('lodash');

// db.defaults({ states: [], data:[],total: {}, latest:[], historyData:[]})
// .write();


async function getHTML(){
    const response = await axios.get('https://www.mohfw.gov.in/');
    return response.data;
}

async function scrapeData(){

    const html = await getHTML();
    const $ = cheerio.load(html);
    const trLen = $('table>tbody>tr').length;
    const tr = $('div.table-responsive>table>tbody>tr');
    const states=[]; 
    const arr = [];    
    const total = {};
    const latest = [];

    const dbStates = db.get('states').value();
    const dbData = db.get('data').value();
    const dbTotal = db.get('total').value();
    let change = false;

    tr.each((index, el)=>{
        let children = $(el).children();
        if($(children).length >=4){
            if(index!==trLen-1){
                const obj = {};
                let state = $(children[1]).text()
                if(!dbStates.includes(state)){
                    latest.push(state);
                    change = true;
                }
                states.push(state);
                obj["no"] = $(children[0]).text();
                obj["state"] = state;
                obj["confirmedIndian"] = $(children[2]).text().replace(/\*/g,' ');
                obj["confirmedForeign"] = $(children[3]).text().replace(/\*/g,' ');
                obj["cured"] = $(children[4]).text().replace(/\#/g,'');
                obj["death"] = $(children[5]).text().replace(/\#/g,'');
                arr.push(obj);
            }
            else{
                total["confirmedIndian"] = $(children[1]).text().replace(/\#/g,'').replace(/\*/g,'').trim();
                total["confirmedForeign"] = $(children[2]).text().replace(/\#/g,'').replace(/\\n/g,'').replace(/\*/g,'').trim();
                total["cured"] = $(children[3]).text().replace(/\\n/g,'').replace(/\#/g,'').trim();
                total["death"] = $(children[4]).text().replace(/\\n/g,'').replace(/\#/g,'').trim();
                if(!_.isEqual(total,dbTotal))
                    change = true;
            }
        }
    });

    if( change || _.differenceBy(arr , dbData, 'confirmedIndian').length > 0 || _.differenceBy(arr , dbData, 'confirmedForeign').length > 0)
        change = true;

    if(change){
        db.get('states').assign(states).write();
        db.get('data').assign(arr).write();
        db.set('total',total).write();
        if(latest.length>0)
            db.get('latest').push(...latest).write();
    }
}

async function scraperTwo(){
    const html = await getHTML();
    const $ = cheerio.load(html);
    const trLen = $('table>tbody>tr').length;
    const tr = $('div.table-responsive>table>tbody>tr');
    const total = {};

    const dbStates = db.get('states').value();
    for(let state of dbStates){
        if(!db.has(state).value())
            db.set(state,[]).write();
    }

    tr.each((index, el)=>{
        let children = $(el).children();
        if($(children).length >=4){
            if(index!==trLen-1){
                const obj = {};
                let state = $(children[1]).text();
                obj["confirmedIndian"] = $(children[2]).text().replace(/\*/g,' ');
                obj["confirmedForeign"] = $(children[3]).text().replace(/\*/g,' ');
                obj["cured"] = $(children[4]).text();
                obj["death"] = $(children[5]).text().replace(/\#/g,'');
                obj["date"] = Date.now()-86400000;                
                db.get(state).push(obj).write();
            }
            else{
                total["confirmedIndian"] = $(children[1]).text().replace(/\#/g,'').replace(/\*/g,'').trim();
                total["confirmedForeign"] = $(children[2]).text().replace(/\#/g,'').replace(/\\n/g,'').replace(/\*/g,'').trim();
                total["cured"] = $(children[3]).text().replace(/\\n/g,'').trim();
                total["death"] = $(children[4]).text().replace(/\\n/g,'').replace(/\#/g,'').trim();
                total["date"] = Date.now()-86400000;                
            }
        }
    });
    
    // db.get('historyData').push(total).write();
}

module.exports = {scrapeData, scraperTwo};