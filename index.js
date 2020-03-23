const express = require('express');
const app = express();
const cases = require('./server/routes/cases');
const cors = require('cors');

require("dotenv").config();
const PORT = process.env.PORT;

const cronJob = require('./server/cron');
cronJob.cron1();
cronJob.cron2();
app.use(cors());

if(process.env.NODE_ENV === 'production'){
    app.use(express.static("client/build"));
    app.get(/^\/(?!api).*/, (req, res) => {
      res.sendFile(path.join(__dirname, "./client/build/index.html"));
    });    
}

app.use('/api/cases',cases);

app.listen(PORT || 8080);