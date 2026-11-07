import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function EbookCard({ ebook }) {
    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition group">

            <div className="h-64 bg-slate-100 overflow-hidden">
                <img
                    src={ebook.coverImage || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600"}
                    alt={ebook.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
            </div>

            <div className="p-5">
                <span className="text-xs text-violet-600 font-semibold">
                    {ebook.category}
                </span>

                <h3 className="font-bold text-lg mt-2 line-clamp-2">
                    {ebook.title}
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                    By {ebook.author}
                </p>

                <div className="flex justify-between items-center mt-5">
                    <span className="font-bold text-xl">
                        {ebook.price === 0 ? "Free" : `₹${ebook.price}`}
                    </span>

                    <Link
                        to={`/ebooks/${ebook._id}`}
                        className="bg-violet-600 text-white p-3 rounded-xl hover:bg-violet-700"
                        title="View book"
                    >
                        <BookOpen size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
}