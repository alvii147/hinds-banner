import express = require('express');
const redis = require('redis');
import { Express, Request, Response } from 'express';
import { RedisClientType } from 'redis';
import * as path from 'path';
import { PORT, ColorOptions, Variant, VARIANT_COLOR_OPTIONS } from './config';
import { getSummary, SummaryData } from './data';
import { connectRedis, getGenocideWatchData, getRedisOptions, setGenocideWatchData } from './redis';
import { renderSVG, handleBadRequest, formatNumberWithCommas } from './utils';

const app: Express = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.get('/', (req: Request, res: Response) => {
    res.render('index');
});

app.get('/free-palestine/:variant?', async (req: Request, res: Response) => {
    if (req.query.variant && !VARIANT_COLOR_OPTIONS.hasOwnProperty(req.query.variant as string)) {
        handleBadRequest(res, 'invalid variant');
        return;
    }

    const variant: Variant = req.query.variant ? req.query.variant as Variant : 'classic';
    const colorOptions = VARIANT_COLOR_OPTIONS[variant];

    renderSVG(res, 'free-palestine', {
        ...colorOptions,
    });
});

app.get('/genocide-watch/:variant?', async (req: Request, res: Response) => {
    if (req.query.variant && !VARIANT_COLOR_OPTIONS.hasOwnProperty(req.query.variant as string)) {
        handleBadRequest(res, 'invalid variant');
        return;
    }

    const variant: Variant = req.query.variant ? req.query.variant as Variant : 'classic';
    const colorOptions: ColorOptions = VARIANT_COLOR_OPTIONS[variant];

    const redisClient: RedisClientType = redis.createClient(getRedisOptions());
    redisClient.on('error', (error: any) => console.error(error));
    await connectRedis(redisClient);

    const cachedDataOptions: object | null = await getGenocideWatchData(redisClient);
    if (cachedDataOptions) {
        renderSVG(res, 'genocide-watch', {
            ...colorOptions,
            ...cachedDataOptions,
        });
        return;
    }

    const summary: SummaryData = await getSummary();
    const dataOptions: object = {
        palestiniansMurdered: formatNumberWithCommas(summary.gaza.killed.total + summary.west_bank.killed.total) + '+',
        palestinianChildrenMurdered: formatNumberWithCommas(summary.gaza.killed.children + summary.west_bank.killed.children) + '+',
    };

    await setGenocideWatchData(redisClient, dataOptions);

    renderSVG(res, 'genocide-watch', {
        ...colorOptions,
        ...dataOptions,
    });
});

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
