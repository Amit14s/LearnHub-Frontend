import { useEffect, useState } from "react";
import API from "../api/axios";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { BookOpen, Download } from "lucide-react";

export default function MyLibrary() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(null);

    useEffect(() => {
        const loadLibrary = async () => {
            try {
                const res = await API.get("/orders/my");
                setOrders(res.data.orders);
            } catch (error) {
                toast.error("Unable to load your library");
            } finally {
                setLoading(false);
            }
        };

        loadLibrary();
    }, []);

    const handleDownload = async (ebookId) => {
        setDownloading(ebookId);

        try {
            const res = await API.get(`/orders/download/${ebookId}`);

            const url = res.data.downloadUrl;

            if (!url || !/^https:\/\//i.test(url)) {
                throw new Error("Invalid download URL");
            }

            window.open(url, "_blank", "noopener,noreferrer");

        } catch (error) {
            toast.error(
                error.response?.data?.message || error.message || "Download failed"
            );
        } finally {
            setDownloading(null);
        }
    };

    if (loading) return <Loader/>;

    return (
        <div className="container-width py-14">

            <div className="mb-10">
                <h1 className="text-4xl font-bold">
                    My Library
                </h1>

                <p className="text-slate-500 mt-3">
                    Access your purchased digital books.
                </p>
            </div>

            {orders.length ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                    {orders.map(order => (
                        <div key={order._id} className="bg-white border rounded-2xl overflow-hidden">

                            <img
                                src={order.ebook?.coverImage || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600"}
                                alt={order.ebook?.title}
                                className="h-56 w-full object-cover"
                            />

                            <div className="p-4">
                                <h3 className="font-bold line-clamp-2">
                                    {order.ebook?.title}
                                </h3>

                                <p className="text-sm text-slate-500 mt-2">
                                    {order.ebook?.author}
                                </p>

                                <button
                                    onClick={() => handleDownload(order.ebook?._id)}
                                    disabled={downloading === order.ebook?._id}
                                    className="w-full bg-violet-600 text-white p-3 rounded-xl mt-5 flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    <Download size={17}/>
                                    {downloading === order.ebook?._id
                                        ? "Please wait..."
                                        : "Access E-book"
                                    }
                                </button>
                            </div>

                        </div>
                    ))}

                </div>
            ) : (
                <div className="text-center bg-white border rounded-2xl py-20">
                    <BookOpen size={45} className="mx-auto text-slate-300"/>
                    <h2 className="font-bold text-xl mt-5">
                        Your library is empty
                    </h2>
                    <p className="text-slate-500 mt-2">
                        Purchase an e-book to see it here.
                    </p>
                </div>
            )}

        </div>
    );
}