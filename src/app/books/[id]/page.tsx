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

  const handlePreviousChapter = () => {
  if (!selectedChapter || !selectedSection) return;

  const chapterIndex = data?.chapters.findIndex(ch => ch.id === selectedChapter.id);
  const sectionIndex = selectedChapter.sections.findIndex(sec => sec.id === selectedSection.id);

  // Step 1: If there's a previous section in the current chapter
  if (sectionIndex > 0) {
    setSelectedSection(selectedChapter.sections[sectionIndex - 1]);
    return;
  }

  // Step 2: If this was the first section, move to the previous chapter's last section
  if (chapterIndex > 0) {
    const prevChapter = data?.chapters[chapterIndex - 1];
    setSelectedChapter(prevChapter);
    const lastSection = prevChapter.sections?.[prevChapter.sections.length - 1] ?? null;
    setSelectedSection(lastSection);
  }
};

const handleNextChapter = () => {
  if (!selectedChapter || !selectedSection) return;

  const chapterIndex = data?.chapters.findIndex(ch => ch.id === selectedChapter.id);
  const sectionIndex = selectedChapter.sections.findIndex(sec => sec.id === selectedSection.id);

  // Step 1: If there's a next section in the current chapter
  if (sectionIndex < selectedChapter.sections.length - 1) {
    setSelectedSection(selectedChapter.sections[sectionIndex + 1]);
    return;
  }

  // Step 2: If this was the last section, move to the next chapter's first section
  if (chapterIndex < (data?.chapters.length || 0) - 1) {
    const nextChapter = data?.chapters[chapterIndex + 1];
    setSelectedChapter(nextChapter);
    const firstSection = nextChapter.sections?.[0] ?? null;
    setSelectedSection(firstSection);
  }
};
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="p-2 rounded shadow"
        >
          <Menu />
        </button>
      </div> */}
        <div className="w-64 shrink-0 z-0">
          <ChaptersSidebar chapters={data?.chapters ?? []} onSelect={setSelectedSection} onToggle={() => setShowSidebar((prev) => !prev)}/>
        </div>
      {selectedSection?.id && selectedChapter?.id && <div className="flex-1 z-0  m-4 overflow-hidden">
        <ChapterReader section={selectedSection} chapterId={selectedChapter?.id || ''} handleNextChapter={handleNextChapter} handlePreviousChapter={handlePreviousChapter}/>
      </div>}
    </div>
  );
}
