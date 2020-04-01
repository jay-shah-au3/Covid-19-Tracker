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
    const tr = $('div').find('div.table-responsive>table>tbody>tr');
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
        let len = $(children).length;
        if(len >= 4){
            if(!isNaN( parseInt( $(children[0]).text() ) ) ){
                const obj = {};
                let state = $(children[1]).text()
                if(!dbStates.includes(state)){
                    latest.push(state);
                    change = true;
                }
                states.push(state);
                obj["no"] = $(children[0]).text();
                obj["state"] = state;
                if(len===5){
                    obj["confirmedCases"] = $(children[2]).text().replace(/\*/g,' ');
                    obj["cured"] = $(children[3]).text().replace(/\#/g,'').replace(/\*/g,' ');
                    obj["death"] = $(children[4]).text().replace(/\#/g,'').replace(/\*/g,' ');    
                }
                else{
                    let confirmedIndian = $(children[2]).text().replace(/\*/g,' ');
                    let confirmedForeign = $(children[3]).text().replace(/\*/g,' ');
                    obj["confirmedIndian"] = confirmedIndian;
                    obj["confirmedForeign"] = confirmedForeign;
                    obj["confirmedCases"] = parseInt(confirmedIndian)+parseInt(confirmedForeign);
                    obj["cured"] = $(children[4]).text().replace(/\#/g,'');
                    obj["death"] = $(children[5]).text().replace(/\#/g,'');
                }
                arr.push(obj);
            }
            else{
                if(len === 4){
                    total["confirmedCases"] = $(children[1]).text().replace(/\#/g,'').replace(/\*/g,'').trim();
                    total["cured"] = $(children[2]).text().replace(/\\n/g,'').replace(/\#/g,'').trim();
                    total["death"] = $(children[3]).text().replace(/\\n/g,'').replace(/\#/g,'').trim();
                }
                else{
                    let confirmedIndian = $(children[1]).text().replace(/\#/g,'').replace(/\\n/g,'').replace(/\*/g,'').trim();
                    let confirmedForeign = $(children[2]).text().replace(/\#/g,'').replace(/\\n/g,'').replace(/\*/g,'').trim();
                    total["confirmedIndian"] = confirmedIndian;
                    total["confirmedForeign"] = confirmedForeign;
                    total["confirmedCases"] = parseInt(confirmedIndian) + parseInt(confirmedForeign); 
                    total["cured"] = $(children[3]).text().replace(/\\n/g,'').replace(/\#/g,'').trim();
                    total["death"] = $(children[4]).text().replace(/\\n/g,'').replace(/\#/g,'').trim();
                }
                if(!_.isEqual(total,dbTotal))
                    change = true;
            }
        }
    });
    if( change || _.differenceBy(arr , dbData, 'confirmedCases').length > 0)
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
    const tr = $('div').find('div.table-responsive>table>tbody>tr');
    const total = {};

    const dbStates = db.get('states').value();
    for(let state of dbStates){
        if(!db.has(state).value())
            db.set(state,[]).write();
    }

    if(tr.html()===null){
        const dbData = db.get('data').value();
        const dbTotal = db.get('total').value();
        dbData.forEach((el,index)=>{
            let state = el.state;
            const obj = {};
            obj["confirmedCases"] = el.confirmedCases;
            obj["cured"] = el.cured;
            obj["death"] = el.death;
            obj["date"] = Date.now()-86400000;
            db.get(state).push(obj).write();
        });
        total["confirmedCases"] = dbTotal.confirmedCases;
        total["cured"] = dbTotal.cured;
        total["death"] = dbTotal.death;
        total["date"] = Date.now()-86400000;
        db.get('historyData').push(total).write();    
    }
    else{
        tr.each((index, el)=>{
            let children = $(el).children();
            let len = $(children).length; 
            if(len >=4){
                let state = $(children[1]).text();
                if(!isNaN( parseInt( $(children[0]).text() ) )){
                    const obj = {};
                    if(len===5){
                        obj["confirmedCases"] = $(children[2]).text().replace(/\*/g,' ');
                        obj["cured"] = $(children[3]).text().replace(/\#/g,'').replace(/\*/g,' ');
                        obj["death"] = $(children[4]).text().replace(/\#/g,'').replace(/\*/g,' ');    
                    }
                    else{
                        let confirmedIndian = $(children[2]).text().replace(/\*/g,' ');
                        let confirmedForeign = $(children[3]).text().replace(/\*/g,' ');
                        obj["confirmedIndian"] = confirmedIndian;
                        obj["confirmedForeign"] = confirmedForeign;
                        obj["confirmedCases"] = parseInt(confirmedIndian)+parseInt(confirmedForeign);
                        obj["cured"] = $(children[4]).text().replace(/\#/g,'');
                        obj["death"] = $(children[5]).text().replace(/\#/g,'');    
                    }    
                    obj["date"] = Date.now()-86400000;                
                    db.get(state).push(obj).write();
                }
                else{
                    if(len === 4){
                        total["confirmedCases"] = $(children[1]).text().replace(/\#/g,'').replace(/\*/g,'').trim();
                        total["cured"] = $(children[2]).text().replace(/\\n/g,'').replace(/\#/g,'').trim();
                        total["death"] = $(children[3]).text().replace(/\\n/g,'').replace(/\#/g,'').trim();
                    }    
                    else{
                        let confirmedIndian = $(children[1]).text().replace(/\#/g,'').replace(/\\n/g,'').replace(/\*/g,'').trim();
                        let confirmedForeign = $(children[2]).text().replace(/\#/g,'').replace(/\\n/g,'').replace(/\*/g,'').trim();
                        total["confirmedIndian"] = confirmedIndian;
                        total["confirmedForeign"] = confirmedForeign;
                        total["confirmedCases"] = parseInt(confirmedIndian) + parseInt(confirmedForeign); 
                        total["cured"] = $(children[3]).text().replace(/\\n/g,'').replace(/\#/g,'').trim();
                        total["death"] = $(children[4]).text().replace(/\\n/g,'').replace(/\#/g,'').trim();
                    }    
                    total["date"] = Date.now()-86400000;
                    db.get('historyData').push(total).write();
                }
            }
        });
    }
}

module.exports = {scrapeData, scraperTwo};