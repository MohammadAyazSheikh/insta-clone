import { MMKV } from 'react-native-mmkv';
import { Storage } from 'redux-persist';

export const storage = new MMKV()


const setItem = (key: string, value: any) => {
    storage.set(key, value);
    return Promise.resolve(true);
}

const removeItem = (key: string) => {
    storage.delete(key);
    return Promise.resolve();
}

const getItem = (key: string) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
}

export const mmkvStorage: Storage = {
    getItem,
    setItem,
    removeItem
}




