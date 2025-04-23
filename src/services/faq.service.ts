class FAQService {
    async getFAQS(): Promise<{ items: FAQItem[] }> {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/faq`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: ApiResponseOne<FAQItem[]> = await response.json();
            if (data.errors.length) throw new Error(data.errors[0].message);

            return { items: data.data };

        } catch (error) {
            console.error('Failed to fetch FAQs:', error);
            throw new Error('Не вдалося завантажити питання. Спробуйте оновити сторінку');
        }
    }
}

export const faqService = new FAQService()