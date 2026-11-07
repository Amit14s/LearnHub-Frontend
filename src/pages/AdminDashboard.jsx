import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

import {
    Users,
    Video,
    BookOpen,
    ShoppingBag,
    PlusCircle,
    LayoutDashboard
} from "lucide-react";

const initialForm = {
    title: "",
    description: "",
    category: "",
    date: "",
    price: 0,
    duration: 60,
    speaker: "",
    instructor: "",
    author: "",
    thumbnail: "",
    coverImage: "",
    fileUrl: "",
    location: "Online",
    pages: 0,
    language: "English"
};

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [activeTab, setActiveTab] = useState("webinar");
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await API.get("/admin/dashboard");
                setStats(res.data.dashboard);
            } catch (error) {
                toast.error("Unable to load dashboard");
            }
        };

        getStats();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const endpoints = {
                webinar: "/webinars",
                workshop: "/workshops",
                ebook: "/ebooks"
            };

            const data = { ...form };

            if (activeTab === "webinar") {
                data.speaker = form.speaker;
                data.date = new Date(form.date).toISOString();
            }

            if (activeTab === "workshop") {
                data.instructor = form.instructor;
                data.date = new Date(form.date).toISOString();
            }

            if (activeTab === "ebook") {
                data.isPublished = true;
            }

            await API.post(endpoints[activeTab], data);

            toast.success("Content created successfully!");

            setForm(initialForm);

            const res = await API.get("/admin/dashboard");
            setStats(res.data.dashboard);

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Unable to create content"
            );
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            title: "Total Users",
            value: stats?.totalUsers ?? "-",
            icon: Users
        },
        {
            title: "Webinars",
            value: stats?.totalWebinars ?? "-",
            icon: Video
        },
        {
            title: "Workshops",
            value: stats?.totalWorkshops ?? "-",
            icon: LayoutDashboard
        },
        {
            title: "E-books",
            value: stats?.totalEbooks ?? "-",
            icon: BookOpen
        },
        {
            title: "Paid Orders",
            value: stats?.totalOrders ?? "-",
            icon: ShoppingBag
        }
    ];

    const inputClass =
        "w-full border rounded-xl p-3 bg-white focus:border-violet-500";

    return (
        <div className="container-width py-12">

            <div className="flex items-center gap-3 mb-10">
                <div className="bg-violet-100 text-violet-700 p-3 rounded-xl">
                    <LayoutDashboard size={28}/>
                </div>

                <div>
                    <h1 className="text-3xl font-bold">
                        Admin Dashboard
                    </h1>
                    <p className="text-slate-500">
                        Manage your LearnHub platform.
                    </p>
                </div>
            </div>


            {/* STATISTICS */}

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">

                {statCards.map((item, i) => (
                    <div key={i} className="bg-white border rounded-2xl p-5">

                        <div className="flex justify-between">
                            <item.icon className="text-violet-600"/>
                        </div>

                        <h2 className="text-3xl font-bold mt-5">
                            {item.value}
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                            {item.title}
                        </p>

                    </div>
                ))}

            </div>


            {/* REVENUE */}

            <div className="bg-gradient-to-r from-violet-700 to-indigo-700 rounded-2xl p-7 text-white mt-7">
                <p className="text-violet-100">
                    Total Revenue
                </p>

                <h2 className="text-4xl font-bold mt-2">
                    ₹{(stats?.totalRevenue || 0).toLocaleString("en-IN")}
                </h2>
            </div>


            {/* CREATE CONTENT */}

            <div className="bg-white border rounded-2xl p-6 mt-10">

                <div className="flex items-center gap-2 mb-7">
                    <PlusCircle className="text-violet-600"/>
                    <h2 className="text-xl font-bold">
                        Create New Content
                    </h2>
                </div>

                <div className="flex flex-wrap gap-3 mb-8">

                    {["webinar", "workshop", "ebook"].map(tab => (
                        <button
                            key={tab}
                            onClick={() => {
                                setActiveTab(tab);
                                setForm(initialForm);
                            }}
                            className={`px-5 py-3 rounded-xl capitalize font-medium ${
                                activeTab === tab
                                    ? "bg-violet-600 text-white"
                                    : "bg-slate-100 text-slate-600"
                            }`}
                        >
                            Add {tab}
                        </button>
                    ))}

                </div>

                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">

                    <div>
                        <label className="block mb-2 font-medium">Title</label>
                        <input
                            required
                            className={inputClass}
                            placeholder="Enter title"
                            value={form.title}
                            onChange={e => setForm({...form, title: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Category</label>
                        <input
                            required
                            className={inputClass}
                            placeholder="Technology, Business..."
                            value={form.category}
                            onChange={e => setForm({...form, category: e.target.value})}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-2 font-medium">Description</label>
                        <textarea
                            required
                            rows="4"
                            className={inputClass}
                            value={form.description}
                            onChange={e => setForm({...form, description: e.target.value})}
                        />
                    </div>

                    {activeTab === "webinar" && (
                        <div>
                            <label className="block mb-2 font-medium">Speaker</label>
                            <input
                                required
                                className={inputClass}
                                value={form.speaker}
                                onChange={e => setForm({...form, speaker: e.target.value})}
                            />
                        </div>
                    )}

                    {activeTab === "workshop" && (
                        <div>
                            <label className="block mb-2 font-medium">Instructor</label>
                            <input
                                required
                                className={inputClass}
                                value={form.instructor}
                                onChange={e => setForm({...form, instructor: e.target.value})}
                            />
                        </div>
                    )}

                    {activeTab === "ebook" && (
                        <>
                            <div>
                                <label className="block mb-2 font-medium">Author</label>
                                <input
                                    required
                                    className={inputClass}
                                    value={form.author}
                                    onChange={e => setForm({...form, author: e.target.value})}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">PDF File URL</label>
                                <input
                                    type="url"
                                    required
                                    className={inputClass}
                                    value={form.fileUrl}
                                    onChange={e => setForm({...form, fileUrl: e.target.value})}
                                    placeholder="Private file URL"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Cover Image URL</label>
                                <input
                                    type="url"
                                    className={inputClass}
                                    value={form.coverImage}
                                    onChange={e => setForm({...form, coverImage: e.target.value})}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Pages</label>
                                <input
                                    type="number"
                                    min="0"
                                    className={inputClass}
                                    value={form.pages}
                                    onChange={e => setForm({...form, pages: Number(e.target.value)})}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Language</label>
                                <input
                                    className={inputClass}
                                    value={form.language}
                                    onChange={e => setForm({...form, language: e.target.value})}
                                />
                            </div>
                        </>
                    )}

                    {activeTab !== "ebook" && (
                        <>
                            <div>
                                <label className="block mb-2 font-medium">Date and Time</label>
                                <input
                                    type="datetime-local"
                                    required
                                    className={inputClass}
                                    value={form.date}
                                    onChange={e => setForm({...form, date: e.target.value})}
                                />
                            </div>

                            {activeTab === "workshop" && (
                                <div>
                                    <label className="block mb-2 font-medium">Location</label>
                                    <input
                                        className={inputClass}
                                        value={form.location}
                                        onChange={e => setForm({...form, location: e.target.value})}
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block mb-2 font-medium">Duration (minutes)</label>
                                <input
                                    type="number"
                                    min="1"
                                    className={inputClass}
                                    value={form.duration}
                                    onChange={e => setForm({...form, duration: Number(e.target.value)})}
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block mb-2 font-medium">Price (₹)</label>
                        <input
                            type="number"
                            min="0"
                            required
                            className={inputClass}
                            value={form.price}
                            onChange={e => setForm({...form, price: Number(e.target.value)})}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            {activeTab === "ebook" ? "Cover Image URL" : "Thumbnail URL"}
                        </label>
                        <input
                            type="url"
                            className={inputClass}
                            value={activeTab === "ebook" ? form.coverImage : form.thumbnail}
                            onChange={e => setForm({
                                ...form,
                                [activeTab === "ebook" ? "coverImage" : "thumbnail"]: e.target.value
                            })}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <button
                            disabled={loading}
                            className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-50"
                        >
                            {loading ? "Creating..." : `Create ${activeTab}`}
                        </button>
                    </div>

                </form>

            </div>

        </div>
    );
}