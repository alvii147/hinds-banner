export const PORT: number = 3000;
export const PALESTINE_DATASETS_API_SUMMARY_URL: string = 'https://data.techforpalestine.org/api/v3/summary.min.json';

export interface ColorOptions {
    colorBackgroundPrimary: string;
    colorBackgroundSecondary: string;
    colorTextBackground: string;
    colorLight: string;
    colorText: string;
    colorDark: string;
    colorBlood: string;
};

export type Variant = 'classic' | 'crimson' | 'forest' | 'graphite' | 'olive' | 'sand' | 'tatreez';

export const VARIANT_COLOR_OPTIONS: Record<Variant, ColorOptions> = {
    'classic': {
        colorBackgroundPrimary: 'FFFFFF',
        colorBackgroundSecondary: 'E6E6E6',
        colorTextBackground: 'FFFFFF',
        colorLight: '737373',
        colorText: '333333',
        colorDark: '1A1A1A',
        colorBlood: 'FF1A1A',
    },
    'crimson': {
        colorBackgroundPrimary: 'FFF7F0',
        colorBackgroundSecondary: 'FFCCCC',
        colorTextBackground: 'FFF7F0',
        colorLight: 'FF8080',
        colorText: '660000',
        colorDark: 'FF3333',
        colorBlood: 'FF1A1A',
    },
    'forest': {
        colorBackgroundPrimary: '001A00',
        colorBackgroundSecondary: '1F4D00',
        colorTextBackground: '003300',
        colorLight: '008000',
        colorText: '99FF99',
        colorDark: '008000',
        colorBlood: 'FF1A1A',
    },
    'graphite': {
        colorBackgroundPrimary: '0D0D0D',
        colorBackgroundSecondary: '4D4D4D',
        colorTextBackground: '404040',
        colorLight: '666666',
        colorText: 'F2F2F2',
        colorDark: 'D9D9D9',
        colorBlood: 'FF1A1A',
    },
    'olive': {
        colorBackgroundPrimary: '666633',
        colorBackgroundSecondary: '446600',
        colorTextBackground: 'CCCC99',
        colorLight: '1A1A1A',
        colorText: '333333',
        colorDark: '1A1A1A',
        colorBlood: 'FF1A1A',
    },
    'sand': {
        colorBackgroundPrimary: '997300',
        colorBackgroundSecondary: '996100',
        colorTextBackground: 'FFD966',
        colorLight: '1A1A1A',
        colorText: '333333',
        colorDark: '1A1A1A',
        colorBlood: 'FF1A1A',
    },
    'tatreez': {
        colorBackgroundPrimary: '1A0A00',
        colorBackgroundSecondary: '662700',
        colorTextBackground: '4D1F00',
        colorLight: 'CC5200',
        colorText: 'FFB380',
        colorDark: 'E65C00',
        colorBlood: 'FF1A1A',
    },
};
