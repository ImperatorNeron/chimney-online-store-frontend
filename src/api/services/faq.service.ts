import { endpoints } from "../endpoints";
import { http } from "../http";
import { ReadFAQSResponseData } from "../types/types";

class FAQService {
    private endpoint = endpoints.faqs;

    async getFAQS() {
        const response = await http.get<ReadFAQSResponseData>(`${process.env.NEXT_PUBLIC_API_URL}${this.endpoint}`);
        return response.data;
    }
}

export const faqService = new FAQService()