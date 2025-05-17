import axiosBaseUrl from "../components/AxiosConfig";

const API_URL = "/info/strategies";
const StrategyService = {
    getAllStrategies: async () => {
        try {
            const response = await axiosBaseUrl.get(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error fetching strategies:", error);
            throw error;
        }
    },
    getStrategyByName: async (name) => {
        try {
            const response = await axios.get(API_URL);
            // TODO filter the strategies and return one matching the name
            return response.data;
        } catch (error) {
            console.error(`Error fetching startegy with name ${name}:`, error);
            throw error;
        }
    },
};