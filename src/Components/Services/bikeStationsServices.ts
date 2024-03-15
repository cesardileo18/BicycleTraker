export interface BikeStationsData {
    data: any
}
export interface BikeStationsDataToAddress {
    data: any
}

class BikeStations {
    async getBikeStations(): Promise<BikeStationsData> {
        const requestOptions: RequestInit = {
            method: 'GET',
        };
        try {
            const response = await fetch('http://localhost:9090/api/ecobici-status', requestOptions);
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
            const response = await fetch('http://localhost:9090/api//ecobici-information', requestOptions);
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
