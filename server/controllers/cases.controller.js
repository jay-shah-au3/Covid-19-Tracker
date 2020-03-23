const db = require('../config.js');

module.exports = {
    async getCases(req,res){
        const obj = db.getState();
        res.send(obj);
    }   
}