import express = require('express');
import { Express, Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import * as path from 'path';

const PORT: number = 3000;
const PALESTINE_DATASETS_API_SUMMARY_URL: string = 'https://data.techforpalestine.org/api/v3/summary.min.json';
const BANNERS: string[] = ['free-palestine', 'genocide-watch'];

interface ColorData {
    colorBackground: string;
    colorTextBackground: string;
    colorLight: string;
    colorText: string;
    colorDark: string;
    colorBlood: string;
};

type Variant = 'classic' | 'crimson' | 'forest' | 'graphite' | 'olive' | 'sand' | 'tatreez';

const COLOR_DATA: Record<Variant, ColorData> = {
    'classic': {
        colorBackground: 'FFFFFF',
        colorTextBackground: 'FFFFFF',
        colorLight: '737373',
        colorText: '333333',
        colorDark: '1A1A1A',
        colorBlood: 'FF1A1A',
    },
    'crimson': {
        colorBackground: 'FFF7F0',
        colorTextBackground: 'FFF7F0',
        colorLight: 'FF8080',
        colorText: '660000',
        colorDark: 'FF3333',
        colorBlood: 'FF1A1A',
    },
    'forest': {
        colorBackground: '001A00',
        colorTextBackground: '003300',
        colorLight: '008000',
        colorText: '99FF99',
        colorDark: '008000',
        colorBlood: 'FF1A1A',
    },
    'graphite': {
        colorBackground: '0D0D0D',
        colorTextBackground: '404040',
        colorLight: '666666',
        colorText: 'F2F2F2',
        colorDark: 'D9D9D9',
        colorBlood: 'FF1A1A',
    },
    'olive': {
        colorBackground: '666633',
        colorTextBackground: 'CCCC99',
        colorLight: '1A1A1A',
        colorText: '333333',
        colorDark: '1A1A1A',
        colorBlood: 'FF1A1A',
    },
    'sand': {
        colorBackground: '997300',
        colorTextBackground: 'FFD966',
        colorLight: '1A1A1A',
        colorText: '333333',
        colorDark: '1A1A1A',
        colorBlood: 'FF1A1A',
    },
    'tatreez': {
        colorBackground: '1A0A00',
        colorTextBackground: '4D1F00',
        colorLight: 'CC5200',
        colorText: 'FFB380',
        colorDark: 'E65C00',
        colorBlood: 'FF1A1A',
    },
};

const numberWithCommas = (n: number): string => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const fetchGenocideData = async () => {
    const response: AxiosResponse = await axios.get(PALESTINE_DATASETS_API_SUMMARY_URL);
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

const app: Express = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.get('/:banner/:variant?', async (req: Request, res: Response) => {
    if (!BANNERS.includes(req.params.banner)) {
        res.sendStatus(404);
        return;
    }

    let colorData = COLOR_DATA['classic'];
    if (req.query.variant && typeof req.query.variant === 'string' && COLOR_DATA.hasOwnProperty(req.query.variant as string)) {
        colorData = COLOR_DATA[req.query.variant as Variant];
    }

    const genocideData = await fetchGenocideData();

    res.setHeader('Content-Type', 'image/svg+xml');
    res.render(req.params.banner, {
        ...colorData,
        ...genocideData,
    });
});

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});