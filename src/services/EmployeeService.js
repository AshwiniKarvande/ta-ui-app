import axios from "axios";

const API_URL = "http://localhost:8001/info/groups";
const EmployeeService = {
    getAllEmployees: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error fetching groups:", error);
            throw error;
        }
    },
    getEmployeeById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching employee with id ${id}:`, error);
            throw error;
        }
    },
};