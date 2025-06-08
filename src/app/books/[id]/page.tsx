"use client";
import { useEffect, useState } from "react";

import { Menu } from "lucide-react";
import ChaptersSidebar from "../components/ChapterSidebar";
import { useParams } from "next/navigation";
import { useGetTOC } from "../../../../hooks/useBook";
import ChapterReader from "../components/ChapterReader";

export default function Home() {
    const params = useParams();
    const bookId = params.id as string;

  const [selectedSection, setSelectedSection] = useState<any>(null);
  const [selectedChapter, setSelectedChapter] = useState<any>(null);
  const [showSidebar, setShowSidebar] = useState(true);

  const { data, isLoading } = useGetTOC(bookId)

  useEffect(() => {
    if (data && data.chapters.length > 0) {
        setSelectedChapter(data.chapters[0]);
        setSelectedSection(data.chapters?.[0]?.sections?.[0]);
    }
  },[data])
  
  return (
    <div className="flex h-screen overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="p-2 rounded shadow"
        >
          <Menu />
        </button>
      </div>
      {showSidebar && (
        <div className="w-64 shrink-0 z-0">
          <ChaptersSidebar chapters={data?.chapters ?? []} onSelect={setSelectedSection} />
        </div>
      )}
      {selectedSection?.id && selectedChapter?.id && <div className="flex-1 z-0  m-4 overflow-hidden">
        <ChapterReader section={selectedSection} chapterId={selectedChapter?.id || ''}/>
      </div>}
    </div>
  );
}
