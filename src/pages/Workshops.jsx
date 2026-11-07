import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkshops } from "../features/workshops/workshopSlice";
import EventCard from "../components/EventCard";
import Loader from "../components/Loader";
import { Search } from "lucide-react";

export default function Workshops() {
    const dispatch = useDispatch();

    const { workshops, loading, error, total, pages } =
        useSelector(state => state.workshops);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(fetchWorkshops({
                search,
                category,
                page,
                limit: 9
            }));
        }, 300);

        return () => clearTimeout(timer);
    }, [dispatch, search, category, page]);

    return (
        <div className="container-width py-14">

            <div className="text-center mb-12">
                <span className="text-violet-600 font-semibold">
                    PRACTICAL LEARNING
                </span>

                <h1 className="text-4xl font-bold mt-3">
                    Explore Workshops
                </h1>

                <p className="text-slate-500 mt-3">
                    Learn practical skills through interactive workshops.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-10">

                <div className="relative flex-1">
                    <Search className="absolute left-4 top-3.5 text-slate-400" size={20}/>

                    <input
                        value={search}
                        onChange={e => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        placeholder="Search workshops..."
                        className="w-full border bg-white rounded-xl p-3 pl-12"
                    />
                </div>

                <select
                    value={category}
                    onChange={e => {
                        setCategory(e.target.value);
                        setPage(1);
                    }}
                    className="border bg-white rounded-xl px-5 py-3"
                >
                    <option value="">All Categories</option>
                    <option value="Technology">Technology</option>
                    <option value="Business">Business</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Design">Design</option>
                    <option value="Programming">Programming</option>
                </select>

            </div>

            <p className="text-slate-500 mb-6">
                {total} workshops found
            </p>

            {loading ? (
                <Loader/>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : workshops.length ? (
                <div className="grid md:grid-cols-3 gap-7">
                    {workshops.map(item => (
                        <EventCard
                            key={item._id}
                            event={item}
                            type="Workshop"
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-slate-500">
                    No workshops found.
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

                    <span className="px-4 py-2">
                        {page} / {pages}
                    </span>

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