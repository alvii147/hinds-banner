const express = require('express');
const axios = require('axios');
const path = require('path');

const PORT = 3000;
const PALESTINE_DATASETS_API_SUMMARY_URL = 'https://data.techforpalestine.org/api/v3/summary.min.json';

const numberWithCommas = (n) => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const fetchGenocideData = async () => {
    const response = await axios.get(PALESTINE_DATASETS_API_SUMMARY_URL);
    const totalKilledInGaza = response.data.gaza.killed.total;
    const totalKilledInWestBank = response.data.west_bank.killed.total;
    const childrenKilledInGaza = response.data.gaza.killed.children;
    const childrenKilledInWestBank = response.data.west_bank.killed.children;
    const totalKilled = totalKilledInGaza + totalKilledInWestBank;
    const childrenKilled = childrenKilledInGaza + childrenKilledInWestBank;

    return {
        palestiniansMurdered: numberWithCommas(totalKilled) + '+',
        palestiniansChildrenMurdered: numberWithCommas(childrenKilled) + '+',
    };
};

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.get('/', async (req, res) => {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.render('index', await fetchGenocideData());
});

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});

module.exports = app;
