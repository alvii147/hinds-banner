"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const axios_1 = __importDefault(require("axios"));
const path = __importStar(require("path"));
const PORT = 3000;
const PALESTINE_DATASETS_API_SUMMARY_URL = 'https://data.techforpalestine.org/api/v3/summary.min.json';
const BANNERS = ['free-palestine', 'genocide-watch'];
;
const COLOR_DATA = {
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
const numberWithCommas = (n) => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const fetchGenocideData = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(PALESTINE_DATASETS_API_SUMMARY_URL);
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
});
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.get('/:banner/:variant?', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!BANNERS.includes(req.params.banner)) {
        res.sendStatus(404);
        return;
    }
    let colorData = COLOR_DATA['classic'];
    if (req.query.variant && typeof req.query.variant === 'string' && COLOR_DATA.hasOwnProperty(req.query.variant)) {
        colorData = COLOR_DATA[req.query.variant];
    }
    const genocideData = yield fetchGenocideData();
    res.setHeader('Content-Type', 'image/svg+xml');
    res.render(req.params.banner, Object.assign(Object.assign({}, colorData), genocideData));
}));
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
//# sourceMappingURL=index.js.map