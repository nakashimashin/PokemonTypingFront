import { Navigate, Outlet } from "react-router-dom";
import { authStore } from "../store/authStore";

export const PrivateRoute = () => {
    const isAuth = authStore((state) => state.isAuth);
    return isAuth ? <Outlet /> : <Navigate to="/" />;
}