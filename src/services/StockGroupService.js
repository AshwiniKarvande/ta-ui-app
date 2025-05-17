import axiosBaseUrl from "../components/AxiosConfig";

const API_URL = "/info/groups";
const StockGroupService = {
    getAllStockGroups: async () => {
        try {
            const response = await axiosBaseUrl.get(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error fetching stock groups:", error);
            throw error;
        }
    },
};