import express = require('express');
import { Express, Request, Response } from 'express';
import * as path from 'path';
import { PORT, ColorOptions, Variant, VARIANT_COLOR_OPTIONS } from './config';
import { getSummary, SummaryData } from './data';
import { formatNumberWithCommas } from './utils';

const handleBadRequest = (res: Response, message: string) => {
    res.json({
        message: message,
    });
    res.sendStatus(400);
};

const renderSVG = (res: Response, view: string, options: object) => {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.render(view, options);
};

const app: Express = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

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
    const summary: SummaryData = await getSummary();

    const dataOptions: object = {
        palestiniansMurdered: formatNumberWithCommas(summary.gaza.killed.total + summary.west_bank.killed.total) + '+',
        palestinianChildrenMurdered: formatNumberWithCommas((summary.gaza.killed.children as number) + (summary.west_bank.killed.children as number)) + '+',
    };

    renderSVG(res, 'genocide-watch', {
        ...colorOptions,
        ...dataOptions,
    });
});

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
