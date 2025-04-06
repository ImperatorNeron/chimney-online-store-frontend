'use client';
import ErrorComponent from "@/components/Errors/LoadingError";

export default function ComponentError({ error }: { error: Error }) {
    return (
        <ErrorComponent error={error} />
    );
}
