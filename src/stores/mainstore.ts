import { defineStore } from 'pinia';
import { LocationInfo } from './../models/LocationInfo';
import { LatLon } from '../models/LatLon';
import axios from 'axios';

export type IMainStore = {
  locations: LocationInfo[];
  polygon: LatLon[];
};

export const useMainStore = defineStore('mainstore', {
  state: (): IMainStore => ({
    locations: [
      
    ],
    
    polygon: [
      { Latitude: 52.099738624938254, Longitude: 4.253472755089291 },
      { Latitude: 52.092615424361725, Longitude: 4.263618313481771 },
      { Latitude: 52.09879591369889, Longitude: 4.274019642253535 },
      { Latitude: 52.10487081438146, Longitude: 4.263021515928983 },
      { Latitude: 52.099738624938254, Longitude: 4.253472755089291 }
    ]
  }),

  actions: {
async fetchChargingStations() {
  try {
    const token = localStorage.getItem('token'); // Ensure the token is stored in localStorage after login

    const response = await axios.get('http://localhost:5000/api/stations', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    this.locations = response.data.map((station: any) => ({
      Latitude: station.latitude,
      Longitude: station.longitude,
      Title: station.name,
      _id: station._id,
      PowerOutput: station.powerOutput, // Make sure your frontend components use this casing
      ConnectorType: station.connectorType,
      Status: station.status
    }));

    console.log('Fetched stations:', this.locations);
  } catch (error) {
    console.error('Failed to fetch stations:', error.response?.data || error.message);
  }
}

  }
  
});
