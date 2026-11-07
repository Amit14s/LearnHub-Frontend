import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import API from "../api/axios";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { CalendarDays, Clock, UserRound, MapPin } from "lucide-react";

export default function EventDetails({ type }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = useSelector(state => state.auth);

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const endpoint = type === "Webinar"
                    ? "/webinars/"
                    : "/workshops/";

                const res = await API.get(endpoint + id);

                setEvent(type === "Webinar"
                    ? res.data.webinar
                    : res.data.workshop
                );
            } catch (error) {
                toast.error("Event not found");
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id, type]);

    const handleRegister = async () => {
        if (!user) {
            navigate("/login");
            return;
        }

        if (event.price > 0) {
            toast.error("Paid event checkout is not available in the current backend.");
            return;
        }

        setRegistering(true);

        try {
            await API.post("/registrations", {
                eventId: event._id,
                eventType: type
            });

            toast.success("Registration successful!");

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Registration failed"
            );
        } finally {
            setRegistering(false);
        }
    };

    if (loading) return <Loader/>;

    if (!event) {
        return <div className="text-center py-24">Event not found.</div>;
    }

    return (
        <div className="container-width py-14">

            <div className="grid md:grid-cols-2 gap-12 items-start">

                <div>
                    <img
                        src={event.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000"}
                        alt={event.title}
                        className="rounded-3xl w-full h-[400px] object-cover"
                    />

                    <div className="mt-8">
                        <span className="text-violet-600 font-semibold">
                            {event.category}
                        </span>

                        <h1 className="text-3xl md:text-4xl font-bold mt-3">
                            {event.title}
                        </h1>

                        <h3 className="font-semibold text-xl mt-8">
                            About this {type}
                        </h3>

                        <p className="text-slate-600 leading-8 mt-4 whitespace-pre-line">
                            {event.description}
                        </p>
                    </div>
                </div>

                <div className="bg-white border rounded-3xl p-7 shadow-sm sticky top-28">

                    <span className="bg-violet-100 text-violet-700 px-3 py-2 rounded-full text-sm font-semibold">
                        {type}
                    </span>

                    <h2 className="text-3xl font-bold mt-6">
                        {event.price === 0 ? "Free" : `₹${event.price}`}
                    </h2>

                    <div className="space-y-5 mt-8">

                        <div className="flex gap-3">
                            <CalendarDays className="text-violet-600"/>
                            <div>
                                <p className="font-semibold">Date</p>
                                <p className="text-slate-500">
                                    {new Date(event.date).toLocaleString("en-IN")}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Clock className="text-violet-600"/>
                            <div>
                                <p className="font-semibold">Duration</p>
                                <p className="text-slate-500">
                                    {event.duration} minutes
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <UserRound className="text-violet-600"/>
                            <div>
                                <p className="font-semibold">
                                    {type === "Webinar" ? "Speaker" : "Instructor"}
                                </p>
                                <p className="text-slate-500">
                                    {event.speaker || event.instructor}
                                </p>
                            </div>
                        </div>

                        {type === "Workshop" && (
                            <div className="flex gap-3">
                                <MapPin className="text-violet-600"/>
                                <div>
                                    <p className="font-semibold">Location</p>
                                    <p className="text-slate-500">
                                        {event.location}
                                    </p>
                                </div>
                            </div>
                        )}

                    </div>

                    <button
                        onClick={handleRegister}
                        disabled={registering || event.status !== "upcoming"}
                        className="w-full mt-9 bg-violet-600 hover:bg-violet-700 text-white rounded-xl p-4 font-semibold disabled:opacity-50"
                    >
                        {registering
                            ? "Registering..."
                            : event.status !== "upcoming"
                                ? "Registration unavailable"
                                : "Register Now"
                        }
                    </button>

                    <p className="text-center text-xs text-slate-400 mt-4">
                        {event.price === 0
                            ? "Free registration"
                            : "Payment checkout is not yet enabled for this event."
                        }
                    </p>

                </div>
            </div>
        </div>
    );
}