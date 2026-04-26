import { http } from '@/api/http';
import { endpoints } from '../endpoints';
import { AReadWebSiteSettingsSchema, UpdateWebSiteSettingsSchema } from '../types/types';


class WebSiteSettingsService {
    private endpoint = endpoints.websiteSettings;

    async getSettings(token: string) {
        const response = await http.get<AReadWebSiteSettingsSchema>(this.endpoint, token);
        return response.data;
    }

    async updateSettings(token: string, data: UpdateWebSiteSettingsSchema) {
        const response = await http.patch<AReadWebSiteSettingsSchema>(this.endpoint, data, token);
        return response.data;
    }
}

export const websiteSettingsService = new WebSiteSettingsService();
