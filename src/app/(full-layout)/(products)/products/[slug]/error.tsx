'use client';
import GlobalLoadingFailure from "@/components/shared/GlobalLoadingFailure";

export default function ComponentError({ error }: { error: Error }) {
    return (
        <GlobalLoadingFailure error={error} />
    );
}
