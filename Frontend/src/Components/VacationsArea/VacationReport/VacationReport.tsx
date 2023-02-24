import { BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { CSVLink } from "react-csv";
import { NavLink } from "react-router-dom";
import ReportModel from "../../../Models/report-model";
import adminVacationService from "../../../Services/AdminVacationService";
import notify from "../../../Utils/Notify";
import "./VacationReport.css";

function VacationReport(): JSX.Element {

    const [reportData, setReportData] = useState<ReportModel[]>([]);


    // Get data for report and csv file
    useEffect(() => {

        // Use service func
        adminVacationService.getReport()
            .then(report => {

                setReportData(report);
            })
            .catch(err => notify.error(err));
    }, []);


    Chart.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    return (
        (reportData &&
            <div >
                <h1>Reports</h1>

                <CSVLink data={reportData} filename={'followers_report.csv'}>
                    <button className='Csv'>Download</button>
                </CSVLink>
<br/>

                <NavLink to={"/vacations"}>
                    <button>
                        Back
                    </button>
                </NavLink>

                <Bar
                    data={{
                        labels: reportData.map(data => data.destination),
                        datasets: [{
                            label: 'Followers Count',
                            data: reportData.map(data => data.followersCount),
                            backgroundColor: 'rgba(75,192,192,1)',
                            borderColor: 'rgba(0,0,0,1)',
                            borderWidth: 1,

                        }]
                    }}
                    options={{
                        plugins: {
                            title: { display: true },
                            legend: { display: true, position: 'top' }
                        },
                        scales: {
                            y: { beginAtZero: true, ticks: { color: 'red' } },
                            x: { ticks: { color: 'white' } },
                        },
                    }}
                />

          
            </div>)
    )


}

export default VacationReport;
