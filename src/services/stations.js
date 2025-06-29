// src/services/stations.js
import api from '../api';

export const stationService = {
  async getAll(filters = {}) {
    try {
      const response = await api.get('/stations', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch stations: ' + error.message);
    }
  },
};