import { Injectable } from '@angular/core';
import { CryptoService } from './crypto.service';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor(private crypto: CryptoService) { }

    set = (key: string, data: any) => {
        try {
        localStorage.setItem(key, JSON.stringify(this.crypto.encrypt(data)));
        } catch (e) {
        console.error('Error saving to localStorage', e);
        }
    }

    get<T>(key: string): any {
        try {
        const data = localStorage.getItem(key);
        if (!data) { return null; }
            return this.crypto.decrypt<T>(data);
        } catch (e) {
            console.error('Error getting data from localStorage', e);
            return null;
        }
    }

    remove = (key: string) => {
        try {
        localStorage.removeItem(key);
        } catch (e) {
        console.error('Error removing data from localStorage', e);
        return null;
        }
    }

}
