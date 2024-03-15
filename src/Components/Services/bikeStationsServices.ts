const development: string = import.meta.env.VITE_APP_ENV
const url: string = import.meta.env.VITE_URL
export interface BikeStationsData {
    data: any
}
export interface BikeStationsDataToAddress {
    data: any
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
