const express = require('express');
const app = express();
const cases = require('./server/routes/cases');
const cors = require('cors');

const cronJob = require('./server/cron');
cronJob.cron1();
cronJob.cron2();
app.use(cors());

app.use('/api/cases',cases);

app.listen(8080);