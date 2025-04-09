interface QuestionBlockProps {
    index: number;
    item: {
        question: string;
        answer: string;
        videoId?: string | null;
    };
}