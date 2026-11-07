import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading } = useSelector(state => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = await dispatch(loginUser(form)).unwrap();

            toast.success("Welcome back!");

            navigate(user.role === "admin" ? "/admin" : "/dashboard");

        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-5 py-12">

            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10 w-full max-w-md">

                <div className="flex justify-center mb-6">
                    <div className="bg-violet-100 text-violet-700 p-4 rounded-2xl">
                        <BookOpen size={32} />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-center">
                    Welcome Back
                </h1>

                <p className="text-center text-slate-500 mt-2 mb-8">
                    Login to continue learning
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block font-medium mb-2">Email</label>
                        <input
                            type="email"
                            required
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={e => setForm({...form, email: e.target.value})}
                            className="w-full border rounded-xl p-3 focus:border-violet-500"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">Password</label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                placeholder="Enter password"
                                value={form.password}
                                onChange={e => setForm({...form, password: e.target.value})}
                                className="w-full border rounded-xl p-3 pr-12 focus:border-violet-500"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-3.5 text-slate-500"
                            >
                                {showPassword ? <EyeOff size={19}/> : <Eye size={19}/>}
                            </button>
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        className="w-full bg-violet-600 hover:bg-violet-700 text-white p-3 rounded-xl font-semibold disabled:opacity-60"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="text-center mt-7 text-slate-500">
                    Don't have an account?
                    <Link to="/register" className="text-violet-600 font-semibold ml-1">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}