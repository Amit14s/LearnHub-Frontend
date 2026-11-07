
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchWebinars } from "../features/webinars/webinarSlice";
import { fetchWorkshops } from "../features/workshops/workshopSlice";
import { fetchEbooks } from "../features/ebooks/ebookSlice";

import EventCard from "../components/EventCard";
import EbookCard from "../components/EbookCard";
import Loader from "../components/Loader";

import {
    ArrowRight,
    Video,
    Users,
    BookOpen,
    Sparkles,
    GraduationCap
} from "lucide-react";

export default function Home() {
    const dispatch = useDispatch();

    const { webinars = [], loading: webinarLoading } =
        useSelector(state => state.webinars);

    const { workshops = [], loading: workshopLoading } =
        useSelector(state => state.workshops);

    const { ebooks = [], loading: ebookLoading } =
        useSelector(state => state.ebooks);

    useEffect(() => {
        dispatch(fetchWebinars({ page: 1, limit: 3 }));
        dispatch(fetchWorkshops({ page: 1, limit: 3 }));
        dispatch(fetchEbooks({ page: 1, limit: 4 }));
    }, [dispatch]);

    const features = [
        {
            icon: Video,
            title: "Live Webinars",
            description: "Learn directly from industry experts.",
            color: "bg-violet-100 text-violet-700"
        },
        {
            icon: Users,
            title: "Practical Workshops",
            description: "Develop real-world practical skills.",
            color: "bg-blue-100 text-blue-700"
        },
        {
            icon: BookOpen,
            title: "Digital E-books",
            description: "Access valuable learning resources.",
            color: "bg-indigo-100 text-indigo-700"
        }
    ];

    return (
        <main className="w-full overflow-hidden bg-slate-50">

            {/* HERO SECTION */}
            <section className="relative bg-gradient-to-br from-violet-50 via-white to-blue-50">
                <div className="container-width grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">

                    <div className="flex flex-col items-start">

                        <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold !text-violet-700">
                            <Sparkles size={17} />
                            Learn something new every day
                        </div>

                        <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight !text-slate-900 sm:text-5xl lg:text-6xl">
                            Unlock Your
                            <span className="gradient-text"> Potential </span>
                            With LearnHub
                        </h1>

                        <p className="mt-6 max-w-xl text-base leading-8 !text-slate-600 sm:text-lg">
                            Discover expert-led webinars, practical workshops
                            and premium digital books. Everything you need
                            to grow your skills in one place.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">

                            <Link
                                to="/webinars"
                                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-7 py-4 font-semibold !text-white shadow-lg shadow-violet-200 transition duration-200 hover:-translate-y-1 hover:bg-violet-700"
                            >
                                Explore Events
                                <ArrowRight size={19} />
                            </Link>

                            <Link
                                to="/ebooks"
                                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-7 py-4 font-semibold !text-slate-800 transition duration-200 hover:-translate-y-1 hover:border-violet-300 hover:bg-violet-50"
                            >
                                Browse E-books
                            </Link>

                        </div>

                        {/* HIGHLIGHTS */}
                        <div className="mt-12 flex flex-wrap gap-x-10 gap-y-5">

                            <div>
                                <h3 className="text-2xl font-bold !text-slate-900">
                                    Expert
                                </h3>
                                <p className="mt-1 text-sm !text-slate-500">
                                    Instructors
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold !text-slate-900">
                                    Flexible
                                </h3>
                                <p className="mt-1 text-sm !text-slate-500">
                                    Learning
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold !text-slate-900">
                                    Digital
                                </h3>
                                <p className="mt-1 text-sm !text-slate-500">
                                    Resources
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* HERO IMAGE */}
                    <div className="relative mt-4 md:mt-0">

                        <img
                            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200"
                            alt="Students attending a learning session"
                            className="h-[300px] w-full rounded-3xl object-cover shadow-2xl sm:h-[400px] lg:h-[470px]"
                        />

                        <div className="absolute -bottom-5 left-4 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-xl sm:-left-6 sm:p-5">

                            <div className="rounded-xl bg-violet-100 p-3 !text-violet-700">
                                <GraduationCap size={28} />
                            </div>

                            <div>
                                <h3 className="font-bold !text-slate-900">
                                    Learn Anywhere
                                </h3>
                                <p className="mt-1 text-sm !text-slate-500">
                                    Grow at your own pace
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="container-width py-16 md:py-20">

                <div className="mb-10 text-center">
                    <span className="text-sm font-bold uppercase tracking-wider !text-violet-600">
                        Everything in one place
                    </span>

                    <h2 className="mt-3 text-3xl font-bold !text-slate-900 md:text-4xl">
                        Explore What We Offer
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl leading-7 !text-slate-500">
                        Learn new skills, connect with experts and access
                        resources designed to help you grow.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">

                    {features.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={index}
                                className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-violet-200 hover:shadow-xl"
                            >
                                <div className={`w-fit rounded-2xl p-4 ${item.color}`}>
                                    <Icon size={29} />
                                </div>

                                <h3 className="mt-6 text-xl font-bold !text-slate-900">
                                    {item.title}
                                </h3>

                                <p className="mt-3 leading-7 !text-slate-500">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}

                </div>
            </section>

            {/* WEBINARS SECTION */}
            <section className="container-width py-14 md:py-16">

                <div className="mb-9 flex flex-wrap items-end justify-between gap-4">

                    <div>
                        <span className="text-sm font-bold uppercase tracking-wider !text-violet-600">
                            Learn from experts
                        </span>

                        <h2 className="mt-2 text-3xl font-bold !text-slate-900 md:text-4xl">
                            Upcoming Webinars
                        </h2>

                        <p className="mt-2 !text-slate-500">
                            Gain knowledge from experienced professionals.
                        </p>
                    </div>

                    <Link
                        to="/webinars"
                        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 font-semibold !text-violet-700 transition hover:bg-violet-50"
                    >
                        View All
                        <ArrowRight size={19} />
                    </Link>

                </div>

                {webinarLoading ? (
                    <Loader />
                ) : webinars.length > 0 ? (
                    <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                        {webinars.slice(0, 3).map(item => (
                            <EventCard
                                key={item._id}
                                event={item}
                                type="Webinar"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                        <Video size={35} className="mx-auto !text-slate-400" />
                        <p className="mt-4 font-medium !text-slate-600">
                            No webinars available right now.
                        </p>
                        <p className="mt-2 text-sm !text-slate-400">
                            Please check back later for upcoming sessions.
                        </p>
                    </div>
                )}

            </section>

            {/* WORKSHOPS SECTION */}
            <section className="bg-slate-100 py-16 md:py-20">

                <div className="container-width">

                    <div className="mb-9 flex flex-wrap items-end justify-between gap-4">

                        <div>
                            <span className="text-sm font-bold uppercase tracking-wider !text-violet-600">
                                Build your skills
                            </span>

                            <h2 className="mt-2 text-3xl font-bold !text-slate-900 md:text-4xl">
                                Featured Workshops
                            </h2>

                            <p className="mt-2 !text-slate-500">
                                Develop practical skills through hands-on learning.
                            </p>
                        </div>

                        <Link
                            to="/workshops"
                            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 font-semibold !text-violet-700 transition hover:bg-violet-50"
                        >
                            View All
                            <ArrowRight size={19} />
                        </Link>

                    </div>

                    {workshopLoading ? (
                        <Loader />
                    ) : workshops.length > 0 ? (
                        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                            {workshops.slice(0, 3).map(item => (
                                <EventCard
                                    key={item._id}
                                    event={item}
                                    type="Workshop"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                            <Users size={35} className="mx-auto !text-slate-400" />
                            <p className="mt-4 font-medium !text-slate-600">
                                No workshops available right now.
                            </p>
                            <p className="mt-2 text-sm !text-slate-400">
                                New practical sessions will appear here.
                            </p>
                        </div>
                    )}

                </div>
            </section>

            {/* EBOOKS SECTION */}
            <section className="container-width py-16 md:py-20">

                <div className="mb-9 flex flex-wrap items-end justify-between gap-4">

                    <div>
                        <span className="text-sm font-bold uppercase tracking-wider !text-violet-600">
                            Expand your knowledge
                        </span>

                        <h2 className="mt-2 text-3xl font-bold !text-slate-900 md:text-4xl">
                            Popular E-books
                        </h2>

                        <p className="mt-2 !text-slate-500">
                            Explore digital resources and learn at your own pace.
                        </p>
                    </div>

                    <Link
                        to="/ebooks"
                        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 font-semibold !text-violet-700 transition hover:bg-violet-50"
                    >
                        View All
                        <ArrowRight size={19} />
                    </Link>

                </div>

                {ebookLoading ? (
                    <Loader />
                ) : ebooks.length > 0 ? (
                    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-7">
                        {ebooks.slice(0, 4).map(book => (
                            <EbookCard
                                key={book._id}
                                ebook={book}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                        <BookOpen size={35} className="mx-auto !text-slate-400" />
                        <p className="mt-4 font-medium !text-slate-600">
                            No e-books available right now.
                        </p>
                        <p className="mt-2 text-sm !text-slate-400">
                            New learning resources will appear here.
                        </p>
                    </div>
                )}

            </section>

            {/* CALL TO ACTION */}
            <section className="container-width pb-16 pt-4 md:pb-20">

                <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-violet-700 via-violet-700 to-indigo-700 px-6 py-14 text-center shadow-xl sm:px-12 md:py-20">

                    <div className="mx-auto max-w-3xl">

                        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold !text-white">
                            <Sparkles size={16} />
                            Your learning journey starts here
                        </span>

                        <h2 className="mt-6 text-3xl font-extrabold leading-tight !text-white sm:text-4xl md:text-5xl">
                            Start Your Learning Journey Today
                        </h2>

                        <p className="mt-5 text-base leading-7 !text-violet-100 md:text-lg">
                            Join LearnHub and discover new opportunities.
                            Learn from experts and build skills for your future.
                        </p>

                        <Link
                            to="/register"
                            className="mt-9 inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-white px-9 py-4 font-bold !text-violet-800 shadow-lg transition duration-200 hover:-translate-y-1 hover:bg-violet-50 hover:shadow-xl"
                        >
                            Join LearnHub
                            <ArrowRight size={19} />
                        </Link>

                    </div>
                </div>

            </section>

        </main>
    );
}
