import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { BookOpen } from "lucide-react";
import toast from "react-hot-toast";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading } = useSelector(state => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await dispatch(registerUser(form)).unwrap();

            toast.success("Account created successfully!");

            navigate("/dashboard");

        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <div className="min-h-[80vh] flex justify-center items-center px-5 py-12">

            <div className="bg-white rounded-3xl shadow-xl border p-8 md:p-10 w-full max-w-md">

                <div className="flex justify-center mb-6">
                    <div className="bg-violet-100 text-violet-700 p-4 rounded-2xl">
                        <BookOpen size={32}/>
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-center">
                    Create Account
                </h1>

                <p className="text-center text-slate-500 mt-2 mb-8">
                    Start your learning journey today
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block font-medium mb-2">Full Name</label>
                        <input
                            type="text"
                            required
                            value={form.name}
                            onChange={e => setForm({...form, name: e.target.value})}
                            placeholder="Your name"
                            className="w-full border rounded-xl p-3"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">Email</label>
                        <input
                            type="email"
                            required
                            value={form.email}
                            onChange={e => setForm({...form, email: e.target.value})}
                            placeholder="Your email"
                            className="w-full border rounded-xl p-3"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">Password</label>
                        <input
                            type="password"
                            minLength={6}
                            required
                            value={form.password}
                            onChange={e => setForm({...form, password: e.target.value})}
                            placeholder="Create password"
                            className="w-full border rounded-xl p-3"
                        />
                    </div>

                    <button
                        disabled={loading}
                        className="w-full bg-violet-600 hover:bg-violet-700 text-white p-3 rounded-xl font-semibold disabled:opacity-60"
                    >
                        {loading ? "Creating account..." : "Create Account"}
                    </button>

                </form>

                <p className="text-center mt-7 text-slate-500">
                    Already have an account?
                    <Link to="/login" className="text-violet-600 font-semibold ml-1">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}