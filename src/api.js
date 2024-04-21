// api.js
import axios from 'axios';

const baseURL = 'http://localhost:5000/api/people';

export const getAllPeople = async () => {
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getPersonById = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const addPerson = async (personData) => {
  try {
    const response = await axios.post(baseURL, personData);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const updatePerson = async (id, updatedPersonData) => {
  try {
    const response = await axios.put(`${baseURL}/${id}`, updatedPersonData);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const deletePerson = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
