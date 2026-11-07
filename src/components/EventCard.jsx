import { Link } from "react-router-dom";
import { CalendarDays, Clock, UserRound } from "lucide-react";

export default function EventCard({ event, type }) {
    const path = type === "Webinar" ? "/webinars" : "/workshops";

    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition group">

            <div className="h-48 overflow-hidden bg-violet-100 relative">
                <img
                    src={event.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

                <span className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-semibold text-violet-700">
                    {type}
                </span>
            </div>

            <div className="p-5">
                <span className="text-xs text-violet-600 font-semibold">
                    {event.category}
                </span>

                <h3 className="font-bold text-lg mt-2 mb-3 line-clamp-2">
                    {event.title}
                </h3>

                <div className="flex flex-col gap-2 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                        <UserRound size={16} />
                        {event.speaker || event.instructor}
                    </div>

                    <div className="flex items-center gap-2">
                        <CalendarDays size={16} />
                        {new Date(event.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                        })}
                    </div>

                    <div className="flex items-center gap-2">
                        <Clock size={16} />
                        {event.duration} minutes
                    </div>
                </div>

                <div className="flex items-center justify-between mt-5 pt-4 border-t">
                    <span className="font-bold text-lg">
                        {event.price === 0 ? "Free" : `₹${event.price}`}
                    </span>

                    <Link
                        to={`${path}/${event._id}`}
                        className="bg-violet-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-violet-700"
                    >
                        Explore
                    </Link>
                </div>
            </div>
        </div>
    );
}