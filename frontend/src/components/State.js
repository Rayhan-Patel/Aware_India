import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactECharts from 'echarts-for-react';
import axios from 'axios';
import '../media/css/State.css';

const StatePage = () => {
    const state = useParams()['state'];
    const [crimeData, setCrimeData] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/state/${state}`);
                setCrimeData(response.data.crime);

                // Calculate statistics
                const crimeTypes = response.data.crime.reduce((acc, crime) => {
                    acc[crime.crime_description] = (acc[crime.crime_description] || 0) + 1;
                    return acc;
                }, {});
                setStatistics(crimeTypes);

                setLoading(false); // Set loading to false once data is fetched and processed

            } catch (error) {
                console.error('Error fetching crime data:', error);
                setLoading(false); // Ensure loading state is set to false even if there's an error
            }
        };

        fetchData();
    }, [state]);

    const data = Object.entries(statistics).map(([name, value]) => ({ name, value }));

    const chartOptions = {
        title: {
            text: 'Crime Statistics',
            left: 'center',
            textStyle: {
                fontSize: 30,
                fontWeight: 'bold',
                color: '#333',
            },
        },
        tooltip: {
            trigger: 'item',
        },
        legend: {
            orient: 'horizontal',
            bottom:'bottom',
        },
        grid: {
            top: '30%',
            bottom: '20%',
            left: '10%',
            right: '10%',
        },
        series: [
            {
                name: 'Crime Type',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: true,
                    position: 'outside',
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '20',
                        fontWeight: 'bold',
                    },
                },
                data: data,
            },
        ],
    };

    return (
        <div className="state-page row">
            {!loading && (
                <div className='col-lg-6 mt-2'>
                    <ReactECharts option={chartOptions} style={{ height: '900px' }} />
                </div>
            )}
            <div className="col-lg-5 overflow-hidden">
                <h2 className="text-center">Crime Statistics from 2020 - Now</h2>
                <p className="text-center">Crime statistics for {state}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Crime Type</th>
                            <th>Crime Occured</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((entry) => (
                            <tr>
                                <td><strong>{entry.name}:</strong></td>
                                <td> {entry.value} incidents </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div id='crime-table'>
                <h3>Recent Crime Records</h3>
                <table >
                    <thead>
                        <tr>
                            <th>Date Reported</th>
                            <th>Date of Occurrence</th>
                            <th>City</th>
                            <th>Description</th>
                            <th>Victim Age</th>
                            <th>Domain</th>
                        </tr>
                    </thead>
                    <tbody>
                        {crimeData.slice(0, 30).map((crime, index) => (
                            <tr key={index}>
                                <td>{crime.date_reported}</td>
                                <td>{crime.date_of_occurrence}</td>
                                <td>{crime.city}</td>
                                <td>{crime.crime_description}</td>
                                <td>{crime.victim_age}</td>
                                <td>{crime.crime_domain}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StatePage;
