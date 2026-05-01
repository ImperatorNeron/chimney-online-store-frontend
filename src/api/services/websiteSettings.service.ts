import { http } from '@/api/http';
import { endpoints } from '../endpoints';
import { AReadWebSiteSettingsSchema, UpdateWebSiteSettingsSchema } from '../types/types';

export interface SiteContactInfo {
    phone: string | null;
    email: string | null;
    address: string | null;
    work_schedule: string | null;
    telegram_url: string | null;
    facebook_url: string | null;
}

let cachedPublicSettings: SiteContactInfo | null = null;

const PUBLIC_SETTINGS_URL = typeof window === 'undefined'
    ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/website-settings/public`
    : `/backend/website-settings/public`;

class WebSiteSettingsService {
    private endpoint = endpoints.websiteSettings;

    async getSettings(token: string) {
        const response = await http.get<AReadWebSiteSettingsSchema>(this.endpoint, token);
        return response.data;
    }

    async updateSettings(token: string, data: UpdateWebSiteSettingsSchema) {
        const response = await http.patch<AReadWebSiteSettingsSchema>(this.endpoint, data, token);
        cachedPublicSettings = null;
        return response.data;
    }

    async getPublicSettings(): Promise<SiteContactInfo> {
        if (cachedPublicSettings) return cachedPublicSettings;
        const res = await fetch(PUBLIC_SETTINGS_URL);
        if (!res.ok) return { phone: null, email: null, address: null, work_schedule: null, telegram_url: null, facebook_url: null };
        const json = await res.json();
        cachedPublicSettings = json.data;
        return cachedPublicSettings!;
    }
}

export const websiteSettingsService = new WebSiteSettingsService();
