import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ admin = false }) {
    const { user } = useSelector(state => state.auth);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (admin && user.role !== "admin") {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}