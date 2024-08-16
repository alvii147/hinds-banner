import axios, { AxiosResponse } from 'axios';
import { PALESTINE_DATASETS_API_SUMMARY_URL } from './config';

export interface PeopleCountsData {
    total: number;
    children: number | null,
    women: number | null,
    civil_defence: number | null,
    press: number | null,
    medical: number | null,
};

export interface CityReportData {
    reports: number;
    last_update: string;
    massacres: number | null;
    settler_attacks: number | null;
    killed: PeopleCountsData;
    injured: PeopleCountsData;
};

export interface AgeBreakdownData {
    child: number | null;
    adult: number | null;
    senior: number | null;
    no_age: number | null;
};

export interface KnownKilledData {
    records: number;
    female: AgeBreakdownData | null;
    male: AgeBreakdownData | null;
};

export interface SummaryData {
    gaza: CityReportData;
    west_bank: CityReportData;
    known_killed_in_gaza: KnownKilledData;
    known_press_killed_in_gaza: KnownKilledData;
};

export const getSummary = async (): Promise<SummaryData> => {
    const response: AxiosResponse = await axios.get(PALESTINE_DATASETS_API_SUMMARY_URL);
    const responseData: SummaryData = response.data as SummaryData;

    return responseData;
};
