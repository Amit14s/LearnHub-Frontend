import { Link } from "react-router-dom";
import { BookOpen, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-white mt-20">
            <div className="container-width py-14 grid md:grid-cols-4 gap-10">

                <div>
                    <div className="flex items-center gap-2 text-2xl font-bold">
                        <BookOpen className="text-violet-400" />
                        LearnHub
                    </div>

                    <p className="text-slate-400 mt-4 text-sm leading-7">
                        Discover new skills, attend expert-led sessions
                        and explore digital knowledge with LearnHub.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold mb-5">Explore</h3>
                    <div className="flex flex-col gap-3 text-sm text-slate-400">
                        <Link to="/webinars">Webinars</Link>
                        <Link to="/workshops">Workshops</Link>
                        <Link to="/ebooks">Digital E-books</Link>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold mb-5">Account</h3>
                    <div className="flex flex-col gap-3 text-sm text-slate-400">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                        <Link to="/dashboard">My Dashboard</Link>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold mb-5">Contact</h3>
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <Mail size={17} />
                        support@learnhub.com
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-slate-400 text-sm">
                        LearnHub
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
                © {new Date().getFullYear()} LearnHub. All rights reserved.
            </div>
        </footer>
    );
}