import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEbooks } from "../features/ebooks/ebookSlice";
import EbookCard from "../components/EbookCard";
import Loader from "../components/Loader";
import { Search, BookOpen } from "lucide-react";

export default function Ebooks() {
    const dispatch = useDispatch();

    const { ebooks, loading, error, total, pages } =
        useSelector(state => state.ebooks);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(fetchEbooks({
                search,
                category,
                page,
                limit: 12
            }));
        }, 300);

        return () => clearTimeout(timer);
    }, [dispatch, search, category, page]);

    return (
        <div className="container-width py-14">

            <div className="text-center mb-12">
                <div className="inline-flex bg-violet-100 text-violet-700 p-4 rounded-2xl">
                    <BookOpen size={30}/>
                </div>

                <h1 className="text-4xl font-bold mt-5">
                    Digital E-book Store
                </h1>

                <p className="text-slate-500 mt-3">
                    Explore books and expand your knowledge.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-10">

                <div className="relative flex-1">
                    <Search className="absolute left-4 top-3.5 text-slate-400"/>

                    <input
                        value={search}
                        onChange={e => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        placeholder="Search books or authors..."
                        className="w-full bg-white border rounded-xl p-3 pl-12"
                    />
                </div>

                <select
                    value={category}
                    onChange={e => {
                        setCategory(e.target.value);
                        setPage(1);
                    }}
                    className="bg-white border rounded-xl px-5 py-3"
                >
                    <option value="">All Categories</option>
                    <option value="Technology">Technology</option>
                    <option value="Programming">Programming</option>
                    <option value="Business">Business</option>
                    <option value="Finance">Finance</option>
                    <option value="Personal Development">Personal Development</option>
                </select>

            </div>

            <p className="text-slate-500 mb-6">
                {total} books available
            </p>

            {loading ? (
                <Loader/>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : ebooks.length ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {ebooks.map(book => (
                        <EbookCard key={book._id} ebook={book}/>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-slate-500">
                    No e-books found.
                </div>
            )}

            {pages > 1 && (
                <div className="flex justify-center gap-3 mt-12">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="border px-5 py-2 rounded-lg disabled:opacity-40"
                    >
                        Previous
                    </button>

                    <span className="px-4 py-2">{page} / {pages}</span>

                    <button
                        disabled={page === pages}
                        onClick={() => setPage(page + 1)}
                        className="border px-5 py-2 rounded-lg disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            )}

        </div>
    );
}