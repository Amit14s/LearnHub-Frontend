
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import {
    BookOpen,
    Menu,
    X,
    User,
    LogOut,
    LayoutDashboard
} from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        setOpen(false);
        navigate("/login");
    };

    const linkClass = ({ isActive }) =>
        `text-sm font-medium transition-colors duration-200 ${
            isActive
                ? "text-violet-700"
                : "text-slate-600 hover:text-violet-700"
        }`;

    const closeMenu = () => setOpen(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">

            <div className="container-width flex h-20 items-center justify-between">

                {/* Logo */}
                <Link
                    to="/"
                    onClick={closeMenu}
                    className="flex shrink-0 items-center gap-2"
                >
                    <div className="rounded-xl bg-violet-600 p-2 text-white">
                        <BookOpen size={23} />
                    </div>

                    <span className="text-2xl font-bold tracking-tight text-slate-900">
                        Learn<span className="text-violet-600">Hub</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    <NavLink to="/" className={linkClass}>
                        Home
                    </NavLink>

                    <NavLink to="/webinars" className={linkClass}>
                        Webinars
                    </NavLink>

                    <NavLink to="/workshops" className={linkClass}>
                        Workshops
                    </NavLink>

                    <NavLink to="/ebooks" className={linkClass}>
                        E-books
                    </NavLink>
                </div>

                {/* Desktop Account Actions */}
                <div className="hidden items-center gap-3 md:flex">

                    {user ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-violet-700"
                            >
                                <User size={18} />
                                <span>
                                    {user.name?.split(" ")[0] || "Account"}
                                </span>
                            </Link>

                            {/* Admin Button */}
                            {user.role === "admin" && (
                                <Link
                                    to="/admin"
                                    className="!bg-violet-600 !text-white hover:!bg-violet-700 px-5 py-2.5 rounded-xl font-semibold text-sm shadow-sm transition-all duration-200"
                                >
                                    Admin
                                </Link>
                            )}

                            <button
                                onClick={handleLogout}
                                className="rounded-lg p-2.5 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                                title="Logout"
                                aria-label="Logout"
                            >
                                <LogOut size={19} />
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-violet-700"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold !text-white shadow-sm transition hover:bg-violet-700"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
                    onClick={() => setOpen(!open)}
                    aria-label={open ? "Close menu" : "Open menu"}
                >
                    {open ? <X size={25} /> : <Menu size={25} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {open && (
                <div className="border-t border-slate-200 bg-white px-5 py-5 shadow-lg md:hidden">

                    <div className="flex flex-col gap-1">

                        <NavLink
                            onClick={closeMenu}
                            to="/"
                            className={({ isActive }) =>
                                `rounded-lg px-4 py-3 text-sm font-medium transition ${
                                    isActive
                                        ? "bg-violet-50 text-violet-700"
                                        : "text-slate-700 hover:bg-slate-50"
                                }`
                            }
                        >
                            Home
                        </NavLink>

                        <NavLink
                            onClick={closeMenu}
                            to="/webinars"
                            className={({ isActive }) =>
                                `rounded-lg px-4 py-3 text-sm font-medium transition ${
                                    isActive
                                        ? "bg-violet-50 text-violet-700"
                                        : "text-slate-700 hover:bg-slate-50"
                                }`
                            }
                        >
                            Webinars
                        </NavLink>

                        <NavLink
                            onClick={closeMenu}
                            to="/workshops"
                            className={({ isActive }) =>
                                `rounded-lg px-4 py-3 text-sm font-medium transition ${
                                    isActive
                                        ? "bg-violet-50 text-violet-700"
                                        : "text-slate-700 hover:bg-slate-50"
                                }`
                            }
                        >
                            Workshops
                        </NavLink>

                        <NavLink
                            onClick={closeMenu}
                            to="/ebooks"
                            className={({ isActive }) =>
                                `rounded-lg px-4 py-3 text-sm font-medium transition ${
                                    isActive
                                        ? "bg-violet-50 text-violet-700"
                                        : "text-slate-700 hover:bg-slate-50"
                                }`
                            }
                        >
                            E-books
                        </NavLink>

                        <div className="my-3 border-t border-slate-200" />

                        {user ? (
                            <>
                                <Link
                                    onClick={closeMenu}
                                    to="/dashboard"
                                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                >
                                    <LayoutDashboard size={18} />
                                    My Dashboard
                                </Link>

                                {user.role === "admin" && (
                                    <Link
                                        onClick={closeMenu}
                                        to="/admin"
                                        className="block rounded-lg bg-violet-50 px-4 py-3 font-semibold text-violet-700 transition hover:bg-violet-100"
                                    >
                                        Admin Dashboard
                                    </Link>
                                )}

                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    onClick={closeMenu}
                                    to="/login"
                                    className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                >
                                    Login
                                </Link>

                                <Link
                                    onClick={closeMenu}
                                    to="/register"
                                    className="rounded-xl bg-violet-600 px-4 py-3 text-center text-sm font-semibold !text-white hover:bg-violet-700"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
