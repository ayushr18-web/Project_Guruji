import { useRouter } from "next/navigation";
import { IBook, ICategory } from "../../../../types/books";

const BookCard = ({ book, category }: { book: IBook,category: ICategory  | {}}) => {
  const router = useRouter();
  return (
    <div
      className="w-64 bg-[#fcf9f3] rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 relative cursor-pointer"
      onClick={() => {
        router.push(`/books/${book.id}`);
      }}
    >
      {/* Top-right badge */}
      <div className="absolute top-2 right-2 bg-[#f4efe8] text-xs text-gray-800 px-2 py-1 rounded-full font-medium">
        {book.book_format}
      </div>

      {/* Cover Image */}
      <div className="bg-gray-100 flex items-center justify-center">
        <img
          src={book.cover_image_url || "/placeholder-cover.png"}
          alt={book.title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Info Section */}
      <div className="p-4">
        <h2 className="text-base font-semibold text-black mb-1">{book.title}</h2>
        <p className="text-sm text-gray-500 mb-3">By {book.author_name}</p>

        {/* Category pill */}
        <span className="inline-block bg-[#f4efe8] text-xs text-black px-3 py-1 rounded-full font-medium">
          {category?.name}
        </span>
      </div>
    </div>
  );
};

export default BookCard;
