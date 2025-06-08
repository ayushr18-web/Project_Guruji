"use client";

import { useParams } from "next/navigation";
import { useGetSection } from "../../../../hooks/useBook";
import Button from "../../../../components/Button";

const ChapterReader = ({ section, chapterId, handlePreviousChapter,  handleNextChapter }: { section: any, chapterId: string, handlePreviousChapter: () => void, handleNextChapter: () => void }) => {
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
            <div className="flex items-center justify-between pb-2 mb-4 border-b border-gray-300 shadow-sm">
                <h5 className="text-lg font-semibold">
                    {data?.title}
                </h5>

                <div className="space-x-2 flex">
                    <Button className="px-2 border-radius-0" text="Prev" type="button" onClick={handlePreviousChapter}/>
                    <Button className="px-2 border-radius-0"  text="Next" type="button" onClick={handleNextChapter}/>
                </div>
            </div>

            <div className="prose max-w-none h-[60vh] overflow-y-auto" >
                {data?.body}
            </div>

        </div>

    );
}
export default ChapterReader;