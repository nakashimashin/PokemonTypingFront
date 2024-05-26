import { Route, Routes } from 'react-router-dom'
import { Auth } from "../pages/Auth";
import { Home } from "../pages/Home";
import { Game } from "../pages/Game";
import { Result } from "../pages/Result";
import { PrivateRoute } from './PrivateRoute';


export const RouteConfig = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/game" element={<Game />} />
                    <Route path="/result" element={<Result />} />
                </Route>
            </Routes>
        </div>
    )
}

