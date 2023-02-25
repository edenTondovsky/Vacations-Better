import { sizing } from "@mui/system";
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

    // Get data for report 
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
            <div className="VacationReport">
                <h1>Report</h1>

                <div>
                    <CSVLink data={reportData} className='csvFile' filename={'followers_report.csv'}>
                        <button className="csvLink">Download</button>
                    </CSVLink>
                </div>

                <div>
                    <NavLink to={"/vacations"}>
                        <button className="backBtn">Back</button>
                    </NavLink>
                </div>

                <Bar
                    data={{
                        labels: reportData.map(data => data.destination),
                        datasets: [{
                            label: 'Followers Count',
                            data: reportData.map(data => data.followersCount),
                            backgroundColor: 'rgb(255,182,193)',
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
                            y: { beginAtZero: true, ticks: { color: 'white', stepSize: 1 } },
                            x: { ticks: { color: 'white', stepSize: 1 } },
                        },
                    }}
                />
            </div>)
    )
}

export default VacationReport;
