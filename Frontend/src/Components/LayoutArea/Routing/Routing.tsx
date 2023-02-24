import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../authArea/Login/Login";
import Register from "../../authArea/Register/Register";
import Home from "../../HomeArea/Home/Home";
import Pagination from "../../ShareArea/Pagination/Pagination";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import VacationReport from "../../VacationsArea/VacationReport/VacationReport";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/vacations" element={<Pagination />} />
            <Route path="/reports" element={<VacationReport />} />
            <Route path="/vacations/new" element={<AddVacation />} />
            <Route path="/vacations/edit/:vacationId" element={<EditVacation />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default Routing;
