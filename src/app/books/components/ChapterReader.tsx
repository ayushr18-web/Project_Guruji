"use client";

import { useParams } from "next/navigation";
import { useGetSection } from "../../../../hooks/useBook";

const ChapterReader = ({ section, chapterId }: { section: any, chapterId: string }) => {
    const params = useParams();
    const bookId = params.id as string;
    const { data, isLoading } = useGetSection(bookId, chapterId, section.id);
    if (!section?.id) {
        return (
            <></>
        )
    }

    return (
        <div className="flex-1 bg-[#f5f5dc] p-4">
            <h5 className="pb-2 mb-4 border-b border-gray-300 shadow-sm">
                {data?.title}
            </h5>

            <div className="prose max-w-none h-[60vh] overflow-y-auto" >
                {data?.body}
                </div>

        </div>

    );
}
export default ChapterReader;