import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import API from "../api/axios";
import Loader from "../components/Loader";
import {
    BookOpen,
    CalendarDays,
    ShoppingBag,
    UserRound
} from "lucide-react";

export default function Dashboard() {
    const { user } = useSelector(state => state.auth);

    const [registrations, setRegistrations] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const [registrationRes, orderRes] = await Promise.all([
                    API.get("/registrations/my"),
                    API.get("/orders/my")
                ]);

                setRegistrations(registrationRes.data.registrations);
                setOrders(orderRes.data.orders);

            } catch (error) {
                console.error("Dashboard error:", error);
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    if (loading) return <Loader/>;

    return (
        <div className="container-width py-12">

            <div className="bg-gradient-to-r from-violet-700 to-indigo-700 rounded-3xl p-8 md:p-12 text-white">

                <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-4 rounded-full">
                        <UserRound size={32}/>
                    </div>

                    <div>
                        <p className="text-violet-100">Welcome back,</p>
                        <h1 className="text-3xl font-bold">
                            {user?.name}
                        </h1>
                    </div>
                </div>

                <p className="mt-5 text-violet-100">
                    Continue your learning journey with LearnHub.
                </p>

            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-10">

                {[
                    {
                        title: "Registrations",
                        value: registrations.length,
                        icon: CalendarDays
                    },
                    {
                        title: "Purchased E-books",
                        value: orders.length,
                        icon: BookOpen
                    },
                    {
                        title: "Account Type",
                        value: user?.role || "User",
                        icon: UserRound
                    }
                ].map((item, i) => (
                    <div key={i} className="bg-white border rounded-2xl p-6">
                        <div className="flex justify-between">
                            <p className="text-slate-500">{item.title}</p>
                            <item.icon className="text-violet-600"/>
                        </div>

                        <h2 className="text-3xl font-bold mt-5">
                            {item.value}
                        </h2>
                    </div>
                ))}

            </div>

            <div className="grid lg:grid-cols-2 gap-8 mt-12">

                <div className="bg-white border rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">
                            My Registrations
                        </h2>
                        <CalendarDays className="text-violet-600"/>
                    </div>

                    {registrations.length ? (
                        registrations.map(item => (
                            <div key={item._id} className="border-b py-4 last:border-0">
                                <h3 className="font-semibold">
                                    {item.item?.title || "Event"}
                                </h3>

                                <p className="text-sm text-slate-500 mt-1">
                                    {item.itemType} · {item.status}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-slate-500">
                            You haven't registered for any events.
                        </p>
                    )}

                    <Link
                        to="/webinars"
                        className="inline-block text-violet-600 font-semibold mt-5"
                    >
                        Explore Webinars →
                    </Link>
                </div>


                <div className="bg-white border rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">
                            My Purchases
                        </h2>
                        <ShoppingBag className="text-violet-600"/>
                    </div>

                    {orders.length ? (
                        orders.map(order => (
                            <div key={order._id} className="border-b py-4 last:border-0">
                                <h3 className="font-semibold">
                                    {order.ebook?.title || "E-book"}
                                </h3>

                                <p className="text-sm text-slate-500 mt-1">
                                    ₹{order.amount} · Paid
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-slate-500">
                            No purchased e-books yet.
                        </p>
                    )}

                    <Link
                        to="/library"
                        className="inline-block text-violet-600 font-semibold mt-5"
                    >
                        Open My Library →
                    </Link>
                </div>

            </div>

        </div>
    );
}