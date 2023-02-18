import React, { ChangeEvent, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import { NavLink } from 'react-router-dom';
import UserModel from '../../../Models/user-model';
import VacationModel from '../../../Models/vacation-model';
import { authStore } from '../../../Redux/AuthState';
import { vacationStore } from '../../../Redux/VacationState';
import adminVacationService from '../../../Services/AdminVacationService';
import userVacationService from '../../../Services/UserVacationService ';
import VacationsList from '../../VacationsArea/VacationsList/VacationsList';
import "./Pagination.css";



function Pagination(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [user, setUser] = useState<UserModel>();
    const vacationsPerPage = 10;

    const [startOffset, setStartOffset] = useState(0);

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

    useEffect(() => {
        let user = authStore.getState().user
        if (user && user.role === "Admin") {
            adminVacationService.getAllVacations();
            setVacations(vacationStore.getState().vacations);
            vacationStore.subscribe(() => {
                setVacations(vacationStore.getState().vacations)
            })
        }
        else {
            userVacationService.getAllVacations()
            setVacations(vacationStore.getState().vacations);
            vacationStore.subscribe(() => {
                setVacations(vacationStore.getState().vacations)
            })
        }
    }, []);




    return (
        <>
          < VacationsList vacations={currentVacations} />
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
          
        </>
      );
    }

export default Pagination;
