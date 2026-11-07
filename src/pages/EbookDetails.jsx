import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import API from "../api/axios";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { BookOpen, ShoppingCart, ShieldCheck } from "lucide-react";

export default function EbookDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = useSelector(state => state.auth);

    const [ebook, setEbook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [buying, setBuying] = useState(false);
    const [purchased, setPurchased] = useState(false);

    useEffect(() => {
        const loadBook = async () => {
            try {
                const [bookRes, ordersRes] = await Promise.all([
                    API.get(`/ebooks/${id}`),
                    user ? API.get("/orders/my") : Promise.resolve(null)
                ]);

                setEbook(bookRes.data.ebook);

                if (ordersRes) {
                    const ownsBook = ordersRes.data.orders.some(
                        order => order.ebook?._id === id
                    );

                    setPurchased(ownsBook);
                }

            } catch (error) {
                toast.error("Unable to load e-book");
            } finally {
                setLoading(false);
            }
        };

        loadBook();
    }, [id, user]);

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }

            const script = document.createElement("script");

            script.src = "https://checkout.razorpay.com/v1/checkout.js";

            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);

            document.body.appendChild(script);
        });
    };

    const handlePurchase = async () => {
        if (!user) {
            navigate("/login");
            return;
        }

        if (buying) return;

        if (ebook.price === 0) {
            toast.error("Free e-book access is not implemented in the current backend.");
            return;
        }

        setBuying(true);

        try {
            const loaded = await loadRazorpay();

            if (!loaded) {
                throw new Error("Unable to load Razorpay checkout");
            }

            // Create Razorpay order on backend.
            const orderRes = await API.post("/orders/create", {
                ebookId: ebook._id
            });

            const order = orderRes.data;

            const options = {
                key: order.key,

                amount: order.amount,
                currency: order.currency,

                name: "LearnHub",
                description: ebook.title,

                order_id: order.razorpayOrderId,

                prefill: {
                    name: user.name,
                    email: user.email
                },

                theme: {
                    color: "#7c3aed"
                },

                handler: async (response) => {
                    try {
                        // Verify payment on backend.
                        await API.post("/orders/verify", response);

                        setPurchased(true);

                        toast.success("Payment successful! E-book purchased.");

                        navigate("/library");

                    } catch (error) {
                        toast.error(
                            error.response?.data?.message ||
                            "Payment verification failed. Contact support with your payment ID."
                        );
                    } finally {
                        setBuying(false);
                    }
                },

                modal: {
                    ondismiss: () => {
                        setBuying(false);
                    }
                }
            };

            const paymentWindow = new window.Razorpay(options);

            paymentWindow.on("payment.failed", (response) => {
                toast.error(
                    response.error?.description || "Payment failed"
                );

                setBuying(false);
            });

            paymentWindow.open();

        } catch (error) {
            toast.error(
                error.response?.data?.message || error.message || "Unable to start payment"
            );

            setBuying(false);
        }
    };

    if (loading) return <Loader/>;

    if (!ebook) {
        return <div className="text-center py-20">E-book not found.</div>;
    }

    return (
        <div className="container-width py-14">

            <div className="grid md:grid-cols-2 gap-12 items-center">

                <div className="bg-slate-100 rounded-3xl p-8 flex justify-center">
                    <img
                        src={ebook.coverImage || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800"}
                        alt={ebook.title}
                        className="w-full max-w-sm h-[480px] object-cover rounded-xl shadow-2xl"
                    />
                </div>

                <div>
                    <span className="text-violet-600 font-semibold">
                        {ebook.category}
                    </span>

                    <h1 className="text-4xl font-bold mt-4">
                        {ebook.title}
                    </h1>

                    <p className="text-slate-500 mt-3">
                        Written by {ebook.author}
                    </p>

                    <div className="flex gap-5 mt-6 text-sm text-slate-500">
                        <span>{ebook.pages} Pages</span>
                        <span>{ebook.language}</span>
                    </div>

                    <h2 className="text-3xl font-bold mt-8">
                        {ebook.price === 0 ? "Free" : `₹${ebook.price}`}
                    </h2>

                    <p className="text-slate-600 leading-8 mt-5">
                        {ebook.description}
                    </p>

                    {purchased ? (
                        <button
                            onClick={() => navigate("/library")}
                            className="mt-8 w-full bg-green-600 text-white p-4 rounded-xl flex items-center justify-center gap-2 font-semibold"
                        >
                            <BookOpen size={20}/>
                            Go to My Library
                        </button>
                    ) : (
                        <button
                            onClick={handlePurchase}
                            disabled={buying}
                            className="mt-8 w-full bg-violet-600 hover:bg-violet-700 text-white p-4 rounded-xl flex items-center justify-center gap-2 font-semibold disabled:opacity-60"
                        >
                            <ShoppingCart size={20}/>
                            {buying ? "Processing..." : "Purchase E-book"}
                        </button>
                    )}

                    <div className="flex gap-2 items-center text-sm text-slate-500 mt-5">
                        <ShieldCheck size={19} className="text-green-600"/>
                        Secure checkout powered by Razorpay
                    </div>
                </div>

            </div>

        </div>
    );
}