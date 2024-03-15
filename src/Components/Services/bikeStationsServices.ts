const development: string = import.meta.env.VITE_APP_ENV
const url: string = import.meta.env.VITE_URL
export interface BikeStationsData {
    data: any
}
export interface BikeStationsDataToAddress {
    data: any
}
// types.ts
export interface MatchingStation {
    station_id: string;
    num_bikes_available: number;
    num_bikes_available_types: {
        mechanical: number;
        ebike: number;
    };
    num_bikes_disabled: number;
    num_docks_available: number;
    num_docks_disabled: number;
    last_reported: number;
    is_charging_station: boolean;
    status: string;
    name: string;
    lat: number;
    lon: number;
    address: string;
    post_code: string;
    capacity: number;
    groups: string[];
}

class BikeStations {
    private baseUrl: string;

    constructor() {
        if (development === 'development') {
            this.baseUrl = 'http://localhost:9090';
        } else {
            this.baseUrl = url;
        }
    }
    async getBikeStations(): Promise<BikeStationsData> {
        const requestOptions: RequestInit = {
            method: 'GET',
        };
        try {
            const response = await fetch(`${this.baseUrl}/api/ecobici-status`, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: BikeStationsData = await response.json();
            return data;
        } catch (error) {
            console.error('error_User', error);
            throw error;
        }
    }
    async getBikeStationsToAddress(): Promise<BikeStationsDataToAddress> {
        const requestOptions: RequestInit = {
            method: 'GET',
        };
        try {
            const response = await fetch(`${this.baseUrl}/api/ecobici-information`, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: BikeStationsDataToAddress = await response.json();
            return data;
        } catch (error) {
            console.error('error_User', error);
            throw error;
        }
    }
}

export default BikeStations;
