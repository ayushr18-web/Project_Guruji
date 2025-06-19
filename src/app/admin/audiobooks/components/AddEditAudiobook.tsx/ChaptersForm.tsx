import { useState } from "react";

interface ChaptersFormProps {
  onBack: () => void;
}

const ChaptersForm = ({ onBack }: ChaptersFormProps) => {
  const [chapters, setChapters] = useState<unknown[]>([
    { id: 1, title: "", audioUrl: "" },
  ]);

  const handleChapterChange = (id: number, field: string, value: string) => {
    setChapters((prev) =>
      prev.map((ch) => (ch.id === id ? { ...ch, [field]: value } : ch))
    );
  };

  const handleDeleteChapter = (id: number) => {
    setChapters((prev) => prev.filter((ch) => ch.id !== id));
  };

  {
    chapters.map((ch) => (
      <ChapterForm
        key={ch.id}
        chapter={ch}
        onChange={handleChapterChange}
        onDelete={handleDeleteChapter}
      />
    ))
  }
};

export default ChaptersForm;
