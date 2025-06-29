<template>
  <div class="map-container transform -translate-y-1">
    <!-- Header Section -->
    <div class="map-header ">
      <div class="header-content">
        <div class="header-left">
          <div class="map-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <div class="header-text">
            <h2>Station Map</h2>
            <p>{{ locations.length }} charging stations • {{ activeStations }} active</p>
          </div>
        </div>
        <div class="map-controls">
          <button @click="refreshStations" class="refresh-btn" :disabled="loading">
            <svg v-if="!loading" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            <div v-else class="button-spinner"></div>
            {{ loading ? 'Loading...' : 'Refresh' }}
          </button>
          <button @click="fitAllStations" class="fit-btn" :disabled="locations.length === 0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
            </svg>
            Fit All
          </button>
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="stats-bar">
      <div class="stats-content">
        <div class="stat-item">
          <div class="stat-icon active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="stat-text">
            <span class="stat-number">{{ activeStations }}</span>
            <span class="stat-label">Active</span>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon inactive">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="stat-text">
            <span class="stat-number">{{ inactiveStations }}</span>
            <span class="stat-label">Inactive</span>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon power">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div class="stat-text">
            <span class="stat-number">{{ totalPower }}</span>
            <span class="stat-label">Total kW</span>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon connectors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
          </div>
          <div class="stat-text">
            <span class="stat-number">{{ uniqueConnectors }}</span>
            <span class="stat-label">Connector Types</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="filter-bar">
      <div class="filter-content">
        <div class="filter-group">
          <label>Filter by Status:</label>
          <select v-model="statusFilter" @change="applyFilters" class="filter-select">
            <option value="">All Stations</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Connector Type:</label>
          <select v-model="connectorFilter" @change="applyFilters" class="filter-select">
            <option value="">All Types</option>
            <option v-for="type in connectorTypes" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Min Power (kW):</label>
          <input 
            v-model.number="powerFilter" 
            @input="applyFilters"
            type="number" 
            placeholder="0" 
            class="filter-input"
          />
        </div>
        <button @click="clearFilters" class="clear-filters-btn" v-if="hasActiveFilters">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
          Clear Filters
        </button>
      </div>
    </div>

    <!-- Map Section -->
    <div class="map-wrapper">
      <l-map 
        ref="map" 
        :zoom="zoom" 
        :center="center" 
        :useGlobalLeaflet="false" 
        style="height: 600px; width: 100%"
        @ready="onMapReady"
      >
        <l-tile-layer :url="tileUrl" attribution="© OpenStreetMap contributors" />
        
        <l-feature-group ref="fg">
          <l-marker 
            v-for="charger in filteredLocations" 
            :key="charger._id" 
            :lat-lng="[charger.latitude, charger.longitude]"
            @click="selectStation(charger)"
          >
            <l-popup>
              <div class="popup-content">
                <div class="popup-header">
                  <h4>{{ charger.name }}</h4>
                  <span :class="['popup-status', charger.status]">
                    <span class="status-dot"></span>
                    {{ charger.status === 'active' ? 'Active' : 'Inactive' }}
                  </span>
                </div>
                <div class="popup-details">
                  <div class="popup-detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    <span>Power: {{ charger.powerOutput }} kW</span>
                  </div>
                  <div class="popup-detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span>Connector: {{ charger.connectorType }}</span>
                  </div>
                  <div class="popup-detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span>{{ charger.latitude.toFixed(4) }}, {{ charger.longitude.toFixed(4) }}</span>
                  </div>
                </div>
                <div class="popup-actions">
                  <button @click="centerOnStation(charger)" class="popup-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                    Center Map
                  </button>
                </div>
              </div>
            </l-popup>
          </l-marker>
        </l-feature-group>
      </l-map>
    </div>

    <!-- Selected Station Info -->
    <div v-if="selectedStation" class="station-info-panel">
      <div class="panel-header">
        <h3>{{ selectedStation.name }}</h3>
        <button @click="selectedStation = null" class="close-panel">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <div class="panel-content">
        <div class="panel-detail">
          <span class="detail-label">Status</span>
          <span :class="['detail-badge', selectedStation.status]">
            <span class="status-dot"></span>
            {{ selectedStation.status === 'active' ? 'Active' : 'Inactive' }}
          </span>
        </div>
        <div class="panel-detail">
          <span class="detail-label">Power Output</span>
          <span class="detail-value">{{ selectedStation.powerOutput }} kW</span>
        </div>
        <div class="panel-detail">
          <span class="detail-label">Connector Type</span>
          <span class="detail-value">{{ selectedStation.connectorType }}</span>
        </div>
        <div class="panel-detail">
          <span class="detail-label">Coordinates</span>
          <span class="detail-value">{{ selectedStation.latitude.toFixed(6) }}, {{ selectedStation.longitude.toFixed(6) }}</span>
        </div>
        <div class="panel-actions">
          <button @click="centerOnStation(selectedStation)" class="panel-action-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
            Center on Map
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LMarker, LPopup, LFeatureGroup } from '@vue-leaflet/vue-leaflet';

// Define types
interface ChargingStation {
  _id: string;
  name: string;
  latitude: number;
  longitude: number;
  status: 'active' | 'inactive';
  powerOutput: number;
  connectorType: string;
}

// Use tuple type instead of PointTuple
const zoom = ref(13);
const center = ref<[number, number]>([52.09895303362214, 4.2637035702751405]);
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const locations = ref<any[]>([]);
const loading = ref(false);
const selectedStation = ref<any>(null);

// Filter states
const statusFilter = ref('');
const connectorFilter = ref('');
const powerFilter = ref<number | null>(null);

const fg = ref<any>(null);
const map = ref<any>(null);

// Computed properties
const activeStations = computed(() => 
  locations.value.filter(station => station.status === 'active').length
);

const inactiveStations = computed(() => 
  locations.value.filter(station => station.status === 'inactive').length
);

const totalPower = computed(() => 
  locations.value.reduce((sum, station) => sum + (station.powerOutput || 0), 0)
);

const connectorTypes = computed(() => 
  [...new Set(locations.value.map(station => station.connectorType))].filter(Boolean)
);

const uniqueConnectors = computed(() => connectorTypes.value.length);

const hasActiveFilters = computed(() => 
  statusFilter.value || connectorFilter.value || powerFilter.value
);

const filteredLocations = computed(() => {
  return locations.value.filter(station => {
    if (statusFilter.value && station.status !== statusFilter.value) return false;
    if (connectorFilter.value && station.connectorType !== connectorFilter.value) return false;
    if (powerFilter.value && station.powerOutput < powerFilter.value) return false;
    return true;
  });
});

// Methods
const fetchStations = async (): Promise<void> => {
  try {
    loading.value = true;
    console.log('Fetching charging stations...');
    const token = localStorage.getItem('token');
    const response = await axios.get('https://evochargermapbackend.vercel.app/api/stations', {
      headers: { Authorization: `Bearer ${token}` },
    });

    locations.value = response.data;
    console.log('Stations:', locations.value);

    await nextTick();
    fitAllStations();
  } catch (error) {
    console.error('Error fetching charging stations:', error);
  } finally {
    loading.value = false;
  }
};

const refreshStations = (): void => {
  fetchStations();
};

const fitAllStations = (): void => {
  if (fg.value && fg.value.leafletObject && filteredLocations.value.length > 0) {
    const bounds = fg.value.leafletObject.getBounds();
    if (bounds.isValid()) {
      map.value.leafletObject.fitBounds(bounds, { padding: [20, 20] });
    }
  }
};

const selectStation = (station: any): void => {
  selectedStation.value = station;
};

const centerOnStation = (station: any): void => {
  if (map.value && map.value.leafletObject) {
    map.value.leafletObject.setView([station.latitude, station.longitude], 16);
  }
};

const applyFilters = (): void => {
  // Filters are applied automatically via computed property
  // Fit bounds to show filtered results
  setTimeout(() => fitAllStations(), 100);
};

const clearFilters = (): void => {
  statusFilter.value = '';
  connectorFilter.value = '';
  powerFilter.value = null;
  setTimeout(() => fitAllStations(), 100);
};

const onMapReady = (): void => {
  console.log('Map is ready');
};

onMounted(async (): Promise<void> => {
  await fetchStations();
});
</script>

<style scoped>
/* Base Container */
.map-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Header */
.map-header {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.map-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.map-icon svg {
  width: 24px;
  height: 24px;
}

.header-text h2 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #2d3748;
}

.header-text p {
  margin: 5px 0 0 0;
  color: #718096;
  font-size: 14px;
}

.map-controls {
  display: flex;
  gap: 12px;
}

.refresh-btn, .fit-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.refresh-btn:hover:not(:disabled), .fit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.refresh-btn:disabled, .fit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.refresh-btn svg, .fit-btn svg {
  width: 18px;
  height: 18px;
}

.button-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Stats Bar */
.stats-bar {
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid #e2e8f0;
}

.stats-content {
  max-width: 1400px;
  margin: 0 370px;
  padding: 15px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 30px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stat-icon.active {
  background: linear-gradient(135deg, #48bb78, #38a169);
}

.stat-icon.inactive {
  background: linear-gradient(135deg, #f56565, #e53e3e);
}

.stat-icon.power {
  background: linear-gradient(135deg, #ed8936, #dd6b20);
}

.stat-icon.connectors {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.stat-icon svg {
  width: 20px;
  height: 20px;
}

.stat-text {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 20px;
  font-weight: 700;
  color: #2d3748;
  line-height: 1;
}

.stat-label {
  font-size: 12px;
  color: #718096;
  margin-top: 2px;
}

/* Filter Bar */
.filter-bar {
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

}

.filter-content {
  max-width: 1200px;
  margin: 0 400px;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-group label {
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
  white-space: nowrap;
}

.filter-select, .filter-input {
  padding: 8px 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  min-width: 120px;
}

.filter-select:focus, .filter-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.clear-filters-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: #f7fafc;
  color: #4a5568;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-filters-btn:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
}

.clear-filters-btn svg {
  width: 14px;
  height: 14px;
}

/* Map Wrapper */
.map-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
}

/* Station Info Panel */
.station-info-panel {
  position: fixed;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  width: 300px;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: slideInRight 0.4s ease;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateY(-50%) translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 0 20px;
}

.panel-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
}

.close-panel {
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.close-panel:hover {
  color: #718096;
  background: #f7fafc;
}

.close-panel svg {
  width: 20px;
  height: 20px;
}

.panel-content {
  padding: 20px;
}

.panel-detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e2e8f0;
}

.panel-detail:last-child {
  border-bottom: none;
}

.detail-label {
  font-weight: 500;
  color: #4a5568;
  font-size: 14px;
}

.detail-value {
  font-weight: 600;
  color: #2d3748;
  font-size: 14px;
}

.detail-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.detail-badge.active {
  background: #f0fff4;
  color: #22543d;
}

.detail-badge.inactive {
  background: #fff5f5;
  color: #742a2a;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  animation: blink 2s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0.3; }
}

.detail-badge.active .status-dot {
  background: #48bb78;
}

.detail-badge.inactive .status-dot {
  background: #f56565;
}

.panel-actions {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #e2e8f0;
}

.panel-action-btn, .popup-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  justify-content: center;
}

.panel-action-btn:hover, .popup-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.panel-action-btn svg, .popup-btn svg {
  width: 16px;
  height: 16px;
}

/* Enhanced Popup Styles */
.popup-content {
  padding: 20px;
  min-width: 250px;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e2e8f0;
}

.popup-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
}

.popup-status {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.popup-status.active {
  background: #f0fff4;
  color: #22543d;
}

.popup-status.inactive {
  background: #fff5f5;
  color: #742a2a;
}

.popup-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}

.popup-detail {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #4a5568;
}

.popup-detail svg {
  width: 16px;
  height: 16px;
  color: #667eea;
  flex-shrink: 0;
}

.popup-actions {
  padding-top: 15px;
  border-top: 1px solid #e2e8f0;
}

/* Responsive Design */
@media (max-width: 768px) {
   .header-content {
    flex-direction: column;
    gap: 12px;
    padding: 12px;
    align-items: center;
    text-align: center;
  }

  .map-icon {
    width: 40px;
    height: 40px;
  }

  .map-icon svg {
    width: 20px;
    height: 20px;
  }

  .header-text h2 {
    font-size: 22px;
  }

  .header-text p {
    font-size: 12px;
  }

  .map-controls {
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  .refresh-btn, .fit-btn {
    width: 100%;
    padding: 10px 16px;
    font-size: 14px;
    justify-content: center;
    min-height: 44px; /* Better touch target */
  }

  .refresh-btn svg, .fit-btn svg {
    width: 16px;
    height: 16px;
  }
  
  .stats-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    margin-left: 100px;
  }
  
  .filter-content {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
    margin-left: 100px;
  }
  
  .filter-group {
    flex-direction: column;
    align-items: stretch;
    gap: 5px;
  }
  
  .station-info-panel {
    position: fixed;
    top: auto;
    bottom: 20px;
    right: 20px;
    left: 20px;
    width: auto;
    transform: none;
  }
  
  .map-wrapper {
    padding: 20px 10px;
  }
}
</style>