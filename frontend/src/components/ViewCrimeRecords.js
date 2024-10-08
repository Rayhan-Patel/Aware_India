import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../media/css/View_crime.css';

const ViewCrimeRecord = () => {
    const [crimes, setCrimes] = useState([]);  // State to store the fetched crime data
    const [loading, setLoading] = useState(true);  // State to handle loading status
    const [error, setError] = useState(null);  // State to handle error
    const [currentPage, setCurrentPage] = useState(1);  // State to manage current page
    const [totalPages, setTotalPages] = useState(1);  // State to manage total pages
    const [totalResult, setTotalResult] = useState(null)
    const [isExpanded, setIsExpanded] = useState(false);  // State to manage form expansion
    const [filters, setFilters] = useState({
        case_no: '',
        crime_desc: '',
        date_from: '',
        date_to: '',
        city: '',
        state: ''
    });

    useEffect(() => {

        const fetchCrimes = async () => {
            try {
                const query = new URLSearchParams({ ...filters, page: currentPage }).toString();
                const response = await axios.get(`http://127.0.0.1:8000/Account/View_crime/?${query}`);

                setCrimes(response.data.results);
                setCurrentPage(response.data.current_page);
                setTotalPages(response.data.total_pages);
                setTotalResult(response.data.total_results);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCrimes();  // Fetch data for the current page
    }, [currentPage, filters]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value.toUpperCase()
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        setIsExpanded(false);
    };

    const toggleForm = () => {
        setIsExpanded(prevState => !prevState);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="crime-table-container">
            <center><h1>Crime Report</h1></center>
            <div>
                <div className={`form-container ${isExpanded ? 'expanded' : ''}`} onDoubleClick={toggleForm}>
                    <h2>Search Form</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Case No.</label>
                        <input type="text" name="case_no" value={filters.case_no} onChange={handleFilterChange} />
                        <label>Crime Description</label>
                        <input type='text' name='crime_desc' value={filters.crime_desc} onChange={handleFilterChange} />
                        <label>Case Status</label>
                        <input type='checkbox' name='status' checked={filters.status || false} onChange={handleFilterChange} />
                        <label>Date From</label>
                        <input type='date' name='date_from' value={filters.date_from} onChange={handleFilterChange} />
                        <label>Date To</label>
                        <input type='date' name='date_to' value={filters.date_to} onChange={handleFilterChange} />
                        <label>City</label>
                        <input type='text' name='city' value={filters.city} onChange={handleFilterChange} />
                        <label>State</label>
                        <input type='text' name='state' value={filters.state} onChange={handleFilterChange} />
                        <button type='submit'>Search</button>
                    </form>
                </div>
            </div>
            <h3>Matches Found:{totalResult}</h3>
            <table>
                <thead className='sticky-top'>
                    <tr>
                        <th>Report Number</th>
                        <th>Date Reported</th>
                        <th>Date of Occurrence</th>
                        <th>Time of Occurrence</th>
                        <th>City</th>
                        <th>Crime Code</th>
                        <th>Crime Description</th>
                        <th>Victim Age</th>
                        <th>Victim Gender</th>
                        <th>Weapon Used</th>
                        <th>Crime Domain</th>
                        <th>Police Deployed</th>
                        <th>Case Closed</th>
                        <th>Date Case Closed</th>
                        <th>State</th>
                    </tr>
                </thead>
                <tbody>
                    {crimes.map((report, index) => (
                        <tr key={index}>
                            <td>{report.report_number}</td>
                            <td>{report.date_reported}</td>
                            <td>{report.date_of_occurrence}</td>
                            <td>{report.time_of_occurrence}</td>
                            <td>{report.city}</td>
                            <td>{report.crime_code}</td>
                            <td>{report.crime_description}</td>
                            <td>{report.victim_age}</td>
                            <td>{report.victim_gender}</td>
                            <td>{report.weapon_used}</td>
                            <td>{report.crime_domain}</td>
                            <td>{report.police_deployed ? 'Yes' : 'No'}</td>
                            <td>{report.case_closed ? 'Yes' : 'No'}</td>
                            <td>{report.date_case_closed}</td>
                            <td>{report.state}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="pagination-controls">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
                Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
                Next
            </button>
        </div>
    );
};

export default ViewCrimeRecord;
