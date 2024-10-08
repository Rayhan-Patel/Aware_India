import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../media/css/RegisterCrime.css';

const CrimeReportForm = () => {

    const [Domain, setDomain] = useState('')
    const [load, setload] = useState(false)

    const [formData, setFormData] = useState({
        date_reported: '',
        date_of_occurrence: '',
        time_of_occurrence: '',
        city: '',
        crime_code: '',
        crime_description: '',
        victim_age: '',
        victim_gender: 'M',  // Default to Male
        weapon_used: '',
        crime_domain: '',
        police_deployed: false,  // Default to No
        case_closed: false,  // Default to No
        date_case_closed: '',  // Default to empty string
        state: ''
    });

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/Account/Register_Field/')
            .then(response => {
                setDomain(response.data.domain)
                setload(true)
                console.log(response.data.domain);
            })
            .catch(e => console.log(e)
            )
    }, [])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/Account/Register_crime/', formData);
            alert('Crime report created successfully!');
        } catch (error) {
            console.error(error);
            alert('Error creating crime report.');
        }
    };

    return (
        <div>
            <h2>Create Crime Report</h2>
            <form onSubmit={handleSubmit}>

                <label>Date Reported:</label>
                <input type="date" name="date_reported" value={formData.date_reported} onChange={handleChange} required />

                <label>Date of Occurrence:</label>
                <input type="date" name="date_of_occurrence" value={formData.date_of_occurrence} onChange={handleChange} required />

                <label>Time of Occurrence:</label>
                <input type="time" name="time_of_occurrence" value={formData.time_of_occurrence} onChange={handleChange} required />

                <label>City:</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} required />

                <label>Crime Code:</label>
                <textarea name="crime_code" value={formData.crime_code} onChange={handleChange} required></textarea>

                <label>Crime Description:</label>
                <textarea name="crime_description" value={formData.crime_description.toUpperCase()} onChange={handleChange} required></textarea>

                <label>Victim Age:</label>
                <input type="number" name="victim_age" value={formData.victim_age} onChange={handleChange} required />

                <label>Victim Gender:</label>
                <div>
                    <label>
                        <input type="radio" name="victim_gender" value="M" checked={formData.victim_gender === 'M'} onChange={handleChange} />
                        Male
                    </label>
                    <label>
                        <input type="radio" name="victim_gender" value="F" checked={formData.victim_gender === 'F'} onChange={handleChange} />
                        Female
                    </label>
                    <label>
                        <input type="radio" name="victim_gender" value="X" checked={formData.victim_gender === 'F'} onChange={handleChange} />
                        Other
                    </label>
                </div>

                <label>Weapon Used:</label>
                <input type="text" name="weapon_used" value={formData.weapon_used} onChange={handleChange} />

                <label>Crime Domain:</label>
                {load ? (
                    <select name="crime_domain" value={formData.crime_domain} onChange={handleChange} required>
                        <option value="" disabled>--Select Domain--</option>
                        {Domain.map((d, index) => (
                            <option key={index} value={d.crime_domain}>{d.crime_domain}</option>
                        ))}
                    </select>
                ) : null}

                <label>Date Case Closed:</label>
                <input type="date" name="date_case_closed" value={formData.date_case_closed} onChange={handleChange} />

                <label>Case Closed:</label>
                <input type="checkbox" style={{height:20, marginTop:10}} name="case_closed" checked={formData.case_closed} onChange={handleChange} />

                <label>Police Deployed:</label>
                <input type="checkbox" style={{height:20, marginTop:10 }} name="police_deployed" checked={formData.police_deployed} onChange={handleChange} />

                <label>State:</label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} required />

                <button type="submit">Submit Crime Report</button>
            </form>
        </div>
    );
};

export default CrimeReportForm;
