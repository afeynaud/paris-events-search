import axios from "axios";
import { create } from 'zustand';
import { CityEvent } from './types/CityEvent';

interface State {
    cityEvents: CityEvent[];
    getCityEvents: () => Promise<void>;
}

export const useStore = create<State>((set) => ({
    cityEvents: [],
    getCityEvents: async () => {
        try {
            const response = await axios.get("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=100", {
                withCredentials: false,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const events = response.data.results;
            set({ cityEvents: events });
        } catch (error) {
            console.error("Failed to fetch city events:", error);
        }
    }
}));