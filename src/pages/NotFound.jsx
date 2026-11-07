import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5">

            <h1 className="text-8xl font-bold text-violet-600">
                404
            </h1>

            <h2 className="text-3xl font-bold mt-5">
                Page Not Found
            </h2>

            <p className="text-slate-500 mt-3">
                Sorry, the page you are looking for doesn't exist.
            </p>

            <Link
                to="/"
                className="bg-violet-600 text-white px-7 py-3 rounded-xl mt-8 flex items-center gap-2"
            >
                <Home size={18}/>
                Back to Home
            </Link>

        </div>
    );
}