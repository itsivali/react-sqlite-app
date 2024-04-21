// DashboardPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardPage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    // Fetch data from server when component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/people');
      setPeople(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>People List</h3>
      <ul>
        {people.map(person => (
          <li key={person.id}>
            {person.firstName} {person.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
