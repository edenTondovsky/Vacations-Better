import userEvent from "@testing-library/user-event";
import React from "react";
import { useEffect, useState } from "react";
import { AxisOptions, Chart } from "react-charts";
import UserModel from "../../../Models/user-model";
import VacationModel from "../../../Models/vacation-model";
import { authStore } from "../../../Redux/AuthState";
import { vacationStore } from "../../../Redux/VacationState";
import adminVacationService from "../../../Services/AdminVacationService";
import userVacationService from "../../../Services/UserVacationService ";
import "./VacationReport.css";

function VacationReport(): JSX.Element {
    const [vacations, setVacations] = useState<VacationModel[]>([]);

    useEffect(() => {
        adminVacationService.getAllVacations();
        setVacations(vacationStore.getState().vacations);
        vacationStore.subscribe(() => {
            setVacations(vacationStore.getState().vacations)
        })
    }, []);

    type DailyStars = {
        date: Date,
        stars: number,
    }

    const data = [
        {
            label: 'React Charts',
            data: [
                {   
                    date: new Date(),
                    stars: 202123,

                }

            ]
        },
    ]


    const primaryAxis = React.useMemo(
        (): AxisOptions<DailyStars> => ({
            getValue: datum => datum.date,
        }),
        []
    )

    const secondaryAxes = React.useMemo(
        (): AxisOptions<DailyStars>[] => [
            {
                getValue: datum => datum.stars,
            },
        ],
        []
    )

    return (
        <div>
            <Chart
                options={{
                    data,
                    primaryAxis,
                    secondaryAxes,
                }}
            />
        </div>

    )




}

export default VacationReport;
