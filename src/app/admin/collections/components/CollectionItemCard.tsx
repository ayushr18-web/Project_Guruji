import { useRouter } from "next/navigation";
import { TContentItem } from "../../../../../types/collections";
import { Trash } from "lucide-react";

const CollectionItemCard = ({ content, handleDelete }: { content: TContentItem, handleDelete: (id: string) => void}) => {
  const router = useRouter();
  return (
    <div
      className="w-64 bg-[#fcf9f3] rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 relative cursor-pointer"
      onClick={() => {
        router.push(`/books/${content.id}`);
      }}
    >
      {/* Top-right badge */}
      <div className="absolute top-2 right-2 bg-[#f4efe8] text-xs text-gray-800 px-2 py-1 rounded-full font-medium">
        <button
            className="flex items-center gap-2 w-full text-red-600 hover:bg-red-50"
            onClick={() => handleDelete(content.id)}
          >
            <Trash />
          </button>
      </div>

      {/* Cover Image */}
      <div className="bg-gray-100 flex items-center justify-center">
        <img
          src={content.cover_image_url || "/placeholder-cover.png"}
          alt={content.title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Info Section */}
      <div className="p-4">
        <h2 className="text-base font-semibold text-black mb-1">{content.title}</h2>

      </div>
    </div>
  );
};

export default CollectionItemCard;
