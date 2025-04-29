import { Response } from 'express';

export const renderSVG = (res: Response, view: string, options: object) => {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.render(view, options);
};

export const handleBadRequest = (res: Response, message: string) => {
    res.json({
        message: message,
    });
    res.sendStatus(400);
};

export const formatNumberWithCommas = (n: number): string => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
