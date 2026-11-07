import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Webinars from "./pages/Webinars";
import Workshops from "./pages/Workshops";
import Ebooks from "./pages/Ebooks";
import EbookDetails from "./pages/EbookDetails";
import EventDetails from "./pages/EventDetails";
import Dashboard from "./pages/Dashboard";
import MyLibrary from "./pages/MyLibrary";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

export default function App() {
    return (
        <div className="min-h-screen flex flex-col">

            <Navbar/>

            <main className="flex-1">

                <Routes>

                    {/* PUBLIC ROUTES */}

                    <Route path="/" element={<Home/>}/>

                    <Route path="/login" element={<Login/>}/>

                    <Route path="/register" element={<Register/>}/>

                    <Route path="/webinars" element={<Webinars/>}/>

                    <Route
                        path="/webinars/:id"
                        element={<EventDetails type="Webinar"/>}
                    />

                    <Route path="/workshops" element={<Workshops/>}/>

                    <Route
                        path="/workshops/:id"
                        element={<EventDetails type="Workshop"/>}
                    />

                    <Route path="/ebooks" element={<Ebooks/>}/>

                    <Route path="/ebooks/:id" element={<EbookDetails/>}/>


                    {/* USER PROTECTED ROUTES */}

                    <Route element={<ProtectedRoute/>}>

                        <Route path="/dashboard" element={<Dashboard/>}/>

                        <Route path="/library" element={<MyLibrary/>}/>

                    </Route>


                    {/* ADMIN PROTECTED ROUTES */}

                    <Route element={<ProtectedRoute admin/>}>

                        <Route path="/admin" element={<AdminDashboard/>}/>

                    </Route>


                    {/* 404 */}

                    <Route path="*" element={<NotFound/>}/>

                </Routes>

            </main>

            <Footer/>

        </div>
    );
}