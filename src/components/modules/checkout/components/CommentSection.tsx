import SectionContainer from "./SectionContainer";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import FormField from "@/components/shared/FormField";
import { inputPatterns } from "@/utils/field.patterns";

export default function CommentSection({ errors, register }: { errors: any; register: any }) {
    return (
        <SectionContainer>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Коментар</h2>
            <FormField
                id="comment"
                label="Коментар до замовлення"
                placeholder="Побажання, уточнення тощо"
                icon={ChatBubbleLeftIcon}
                errorMessage={errors.comment?.message}
                pattern={inputPatterns.message}
                {...register("comment")}
            />
        </SectionContainer>
    );
}
