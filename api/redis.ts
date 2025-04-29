import { RedisClientType, RedisClientOptions } from 'redis';
import { REDIS_CACHE_KEY_GENOCIDE_WATCH } from './config';

export const getRedisOptions = (): RedisClientOptions => {
    return {
        url: process.env.HINDS_BANNER_REDIS_URL,
    };
}

export const connectRedis = async (client: RedisClientType): Promise<void> => {
    try {
        await client.connect();
    } catch (error: any) {
        // on any error, just ignore and return null
        console.error(error);
        return;
    }
};

export const getGenocideWatchData = async (client: RedisClientType): Promise<object | null> => {
    if (!client.isOpen) {
        return null;
    }

    let rawData: string | null = null;

    try {
        rawData = await client.get(REDIS_CACHE_KEY_GENOCIDE_WATCH);
    } catch (error: any) {
        // on any error, just ignore and return null
        console.error(error);
        return null;
    }

    if (!rawData) {
        return null;
    }

    try {
        return JSON.parse(rawData);
    } catch (error: any) {
        // on any error, just ignore and return null
        console.error(error);
        return null;
    }
};

export const setGenocideWatchData = async (client: RedisClientType, data: object): Promise<void> => {
    if (!client.isOpen) {
        return;
    }

    const now: Date = new Date();
    const expiration: number = Math.ceil(new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999)
    ).getTime() + 1) / 1000;

    try {
        await client.set(REDIS_CACHE_KEY_GENOCIDE_WATCH, JSON.stringify(data), {
            EXAT: expiration,
        });
    } catch (error: any) {
        // on any error, just ignore and return null
        console.error(error);
        return;
    }
};
