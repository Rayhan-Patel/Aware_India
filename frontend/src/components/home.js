import React, { useEffect, useState } from 'react';
import '../media/css/home.css';
import { useNavigate } from 'react-router-dom';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import indiaMap from './india_states.geojson';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactECharts from 'echarts-for-react';
import Search from './Search'
import axios from 'axios';
import * as d3 from 'd3';

function Home() {
    var crime_rate = {}
    const [Statistics, setStatistics] = useState(null);
    const [load, setLoad] = useState(false);
    const [news, setNews] = useState([]);
    const [crime, setcrime] = useState(null)
    const [total, settotal] = useState(null)
    const [StateName, setStateName] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.get('http://127.0.0.1:8000/')
                    .then((response) => {
                        setNews(response.data['news']);
                        setStatistics(response.data['statistic'])
                        setcrime(response.data['crimes'])
                        settotal(response.data['total'])
                        setLoad(true);
                    })
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoad(false);
            }
        };

        fetchData();
    }, []);

    const colorScale = d3.scaleLinear()
        .domain([0, 100]) // Adjust the domain to your data range
        .range(['white', 'red']);

    const getCrimeCountByState = (selectedState) => {
        const stateData = crime.find(item => item.state === selectedState);
        crime_rate[selectedState] = stateData ? (stateData.crime_count / total) * 100 : 5
        return stateData ? ((stateData.crime_count / total) * 100) + 15 : 5;
    };
    const COLORS = ['#ff5252', '#ff7f50', '#ffbf00', '#80ff00', '#00ff40', '#00bfff', '#bf00ff', '#ff00bf'];

    const data = load ?
        Object.entries(Statistics).map(([name, value], index) => ({
            name, value, fill: COLORS[index % COLORS.length]
        }))
        : null;


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
            bottom: 'bottom',
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
        <div className="main">
            {/* Hero Section */}
            <div className="header-container">
                <h1 className="header-heading">Stay Informed About Crime Rates Across States and Cities</h1>
                <p className="header-text">Explore detailed crime statistics and trends</p>
                <input
                    type="text"
                    name='search'
                    onChange={(e) => setStateName(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase())}
                    placeholder="Search your state or city"
                    className="search-bar"
                />
                <button className="search-button" onClick={() => navigate(`/state/${StateName}`)}>Search</button>
            </div>

            {load ? <div className='row'>
                <div className="map-container col-lg-6 col-sm-12">
                    <h2>Explore Crime Rates by State</h2>
                    <div className="map-placeholder">
                        <h3>
                            <strong>State:</strong> {StateName}
                        </h3>
                        <ComposableMap projection="geoMercator" projectionConfig={{ scale: 1150, center: [78.9629, 22.5937] }}>
                            <Geographies geography={indiaMap}>
                                {({ geographies }) =>
                                    geographies.map((geo) => (
                                        <Geography id='map'
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill={colorScale(getCrimeCountByState(geo.properties.NAME_1))}
                                            stroke="black"
                                            strokeWidth={0.5}
                                            onClick={() => setStateName(geo.properties.NAME_1)}
                                            onDoubleClick={() => navigate(`/state/${geo.properties.NAME_1}`)}
                                        />
                                    ))
                                }
                            </Geographies>
                        </ComposableMap>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="map-container col-lg-6 col-sm-12">
                    <h2>Key Crime Statistics</h2>
                    <div className="stats-grid mb-5">
                        {Object.entries(Statistics).map(([key, value]) => {
                            return (
                                < div className="stat-card" >
                                    <h3 className="stat-card-heading">{key.toUpperCase()}</h3>
                                    <p>{value} cases in 2023</p>
                                </div>)
                        })}
                    </div>
                    <ReactECharts option={chartOptions} style={{ height: '400px' }} />
                </div>
            </div> : ''
            }
            <Search />
            {/* News Section */}
            <div className="news-container mt-4">
                <h2>Recent Crime News</h2>
                <div className='news'>
                    {load ? news.map((n) => {
                        return <div className="news-card">
                            <img src={n.image_url} alt={n.title} />
                            <a href={n.link}><h3>{n.title}</h3></a>
                        </div>
                    }) : "Loading..."}
                </div>
            </div>
        </div >
    );
}

export default Home;
