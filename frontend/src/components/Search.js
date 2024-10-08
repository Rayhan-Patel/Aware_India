import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../media/css/Search.css'; // Adjust the path if necessary

const Search = () => {
  const [stateName, setStateName] = useState('');
  const [policeStations, setPoliceStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(''); // State for handling messages

  const handleSearch = async () => {
    if (!stateName) return;

    setLoading(true);
    setMessage(''); // Reset message on new search
    try {
      const response = await axios.get(`http://localhost:8000/PoliceStation/police-stations/`, {
        params: { state: stateName }
      });
      
      if (response.data.message) {
        setMessage(response.data.message); // Set message from response if present
        setPoliceStations([]); // Clear any previous results
      } else {
        setPoliceStations(response.data);
      }
    } catch (error) {
      console.error('Error fetching police stations:', error);
      setMessage('An error occurred while fetching data');
      setPoliceStations([]); // Clear any previous results
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    handleSearch();
  }, [stateName]);

  return (
    <div className='genContainer'>
      <div className="search-container">
        <input
          type="text"
          value={stateName}
          onChange={(e) => setStateName(e.target.value)}
          placeholder="Enter state name"
          className="search-input"
        />
      </div>
      {loading && <div className="loading">Loading...</div>}
      {message && <div className="message">{message}</div>} {/* Display message */}
      <div className="cards-container">
        {policeStations.map((station) => (
          <div key={station.addId} className="card">
            <h3 className="station-name">{station.sr__police_name}, {station.state}</h3>
            <hr />
            <div className="address-container">
              <span className="address-label">Address:</span>
              <span className="address">{station.address_line1}</span>
            </div>
            <div className="phone-number-container">
              <span className="phone-number-label">Ph no:</span>
              <span className="phone-number">{station.phone_number}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
