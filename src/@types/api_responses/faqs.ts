interface FAQItem {
    id: number;
    question: string;
    answer: string;
    youtube_url?: string | null;
    embed_url?: string | null;
}