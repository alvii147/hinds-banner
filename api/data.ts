import axios, { AxiosResponse } from 'axios';
import { PALESTINE_DATASETS_API_SUMMARY_URL } from './config';

export interface SummaryData {
    gaza: {
        reports: number;
        last_update: string;
        massacres: number;
        killed: {
            total: number;
            children: number;
            civil_defence: number;
            women: number;
            press: number;
            medical: number;
        };
        injured: {
            total: number;
        };
    };
    west_bank: {
        reports: number;
        last_update: string;
        killed: {
            total: number;
            children: number;
        };
        injured: {
            total: number;
            children: number;
        };
        settler_attacks: number;
    };
    known_killed_in_gaza: {
        records: number;
        male: {
            senior: number;
            adult: number;
            child: number;
            no_age: number;
        };
        female: {
            senior: number;
            adult: number;
            child: number;
            no_age: number;
        };
    };
    known_press_killed_in_gaza: {
        records: number;
    }
};

export const getSummary = async (): Promise<SummaryData> => {
    const response: AxiosResponse = await axios.get(PALESTINE_DATASETS_API_SUMMARY_URL);
    const responseData: SummaryData = response.data as SummaryData;

    return responseData;
};
