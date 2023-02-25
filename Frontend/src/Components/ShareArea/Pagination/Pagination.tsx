import { Button, Checkbox } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { NavLink, useNavigate } from 'react-router-dom';
import UserModel from '../../../Models/user-model';
import VacationModel from '../../../Models/vacation-model';
import { authStore } from '../../../Redux/AuthState';
import { vacationStore } from '../../../Redux/VacationState';
import adminVacationService from '../../../Services/AdminVacationService';
import userVacationService from '../../../Services/UserVacationService ';
import VacationsList from '../../VacationsArea/VacationsList/VacationsList';
import "./Pagination.css";

function Pagination(): JSX.Element {

    const [user, setUser] = useState<UserModel>();
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const navigate = useNavigate();

    const [filterFollowed, setFilterFollowed] = useState<boolean>(false);
    const [hasNotStart, setIsStarted] = useState<boolean>(false);
    const [isOngoing, setIsOngoing] = useState<boolean>(false);


    const [startOffset, setStartOffset] = useState(0);
    const vacationsPerPage = 10;

    //find last index per page
    const endOffset = startOffset + vacationsPerPage;
    //create new array per page
    const currentVacations = vacations.slice(startOffset, endOffset);
    //calculate count of page 
    const pageCount = Math.ceil(vacations.length / vacationsPerPage);

    const handlePageClick = (event: any) => {

        //after move page - set new startOffset
        const newOffset = (event.selected * vacationsPerPage) % vacations.length;

        //update startOffset
        setStartOffset(newOffset);
    };

    //filtered Vacation for user
    function filterVacations(vacations: VacationModel[]): VacationModel[] {
        if (filterFollowed) {
            vacations = vacations.filter(v => v.isFollowing);
        }
        if (hasNotStart) {
            vacations = vacations.filter(v => Date.parse(v.startDate) > Date.now());
        }
        if (isOngoing) {
            vacations = vacations.filter(v => Date.parse(v.startDate) <= Date.now() && Date.parse(v.endDate) > Date.now());
        }
        return vacations;
    }

    useEffect(() => {
        if (!authStore.getState().user) {
            navigate("/home");
        }
        setUser(authStore.getState().user)
    }, []);

    //handle vacation State and refresh
    useEffect(() => {

        if (!authStore.getState().user) return;

        if (user && user.role === "Admin") {
            adminVacationService.getAllVacations();
            setVacations(vacationStore.getState().vacations);
            vacationStore.subscribe(() => {
                setVacations(vacationStore.getState().vacations)
            })
        }
        else {
            userVacationService.getAllVacations()
            setVacations(filterVacations(vacationStore.getState().vacations));
            vacationStore.subscribe(() => {
                setVacations(filterVacations(vacationStore.getState().vacations));
            })

        }

    }, [filterFollowed, isOngoing, hasNotStart]);

    return (
        <>
            {user?.role === "User" && <div>
                <Checkbox onChange={(e) => {
                    setFilterFollowed(e.target.checked);
                    setStartOffset(0);
                }} />
                <label>Followed Vacations</label>

                <Checkbox onChange={(e) => {
                    setIsStarted(e.target.checked);
                    setStartOffset(0);
                }} />
                <label>Has Not Started</label>

                <Checkbox onChange={(e) => {
                    setIsOngoing(e.target.checked);
                    setStartOffset(0);
                }} />
                <label>Is On Going</label>
            </div>
            }

            {user?.role === "Admin" && <div className="addLink">
                <NavLink to="/vacations/new">
                    <button className="addBtn">Add vacation</button>
                </NavLink>
                <br />

                <NavLink to={'/reports'}>
                    <div>Report</div>
                </NavLink>
            </div>}

           
            < VacationsList vacations={currentVacations} />

            <ReactPaginate
                breakLabel=""
                nextLabel="next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                activeClassName="active"

            />
        </>
    );
}

export default Pagination;
