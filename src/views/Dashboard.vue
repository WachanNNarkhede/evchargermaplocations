<template>
  <div class="min-h-screen text-white dashboard-container transform -translate-y-1">
    <!-- Header -->
    <header class="bg-white bg-opacity-98 shadow-xl">
      <div class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center gap-4 animate-slide-in-left">
          <div class="w-10 h-10 logo-icon rounded-lg flex items-center justify-center text-white">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-800">Charging Stations</h1>
            <p class="text-sm text-gray-500">Manage Your EV Network</p>
          </div>
        </div>
        <button
          @click="showForm = true"
          class="flex items-center gap-2 add-btn text-white font-medium py-2 px-5 rounded-full shadow-md hover:shadow-lg transform transition-all duration-300 animate-slide-in-right"
        >
          <svg class="w-5 h-5 transform transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Add Station
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-4 py-6">
      <!-- Filters -->
      <div class="bg-white bg-opacity-95 border border-gray-200 rounded-xl p-5 mb-6 shadow-lg animate-slide-in-down">
        <div class="flex items-center gap-2 mb-4">
          <svg class="w-5 h-5 text-[#667eea] animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1m-17 4h18m-18 4h18m-18 4h18"></path>
          </svg>
          <span class="text-base font-medium text-gray-800">Filter Stations</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="animate-fade-in-up">
            <label class="block text-sm font-medium text-gray-600 mb-1">Status</label>
            <select
              v-model="filters.status"
              @change="applyFilters"
              class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#667eea] focus:border-[#667eea] transition-all duration-200"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div class="animate-fade-in-up" style="animation-delay: 0.1s;">
            <label class="block text-sm font-medium text-gray-600 mb-1">Connector Type</label>
            <select
              v-model="filters.connectorType"
              @change="applyFilters"
              class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#667eea] focus:border-[#667eea] transition-all duration-200"
            >
              <option value="">All Connector Types</option>
              <option v-for="type in connectorTypes" :key="type" :value="type">{{ type }}</option>
            </select>
          </div>
          <div class="animate-fade-in-up" style="animation-delay: 0.2s;">
            <label class="block text-sm font-medium text-gray-600 mb-1">Min Power (kW)</label>
            <input
              v-model="filters.powerOutput"
              placeholder="Min Power (kW)"
              type="number"
              class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#667eea] focus:border-[#667eea] transition-all duration-200"
            />
          </div>
        </div>
      </div>

      <!-- Stations List -->
      <div v-if="filteredStations.length === 0" class="bg-white bg-opacity-95 border border-gray-200 rounded-xl p-8 text-center shadow-lg animate-fade-in">
        <div class="inline-flex items-center justify-center w-12 h-12 empty-icon rounded-full text-white mb-4">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-6h6v6m-6 2h6m-9-8h12"></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-800">No Stations Found</h3>
        <p class="text-gray-500">Adjust filters or add a new station.</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="station in filteredStations"
          :key="station._id"
          class="bg-white bg-opacity-98 rounded-xl p-5 shadow-lg hover:shadow-xl transform transition-all duration-300 animate-slide-up"
        >
          <div class="flex justify-between items-start mb-3">
            <div>
              <h3 class="text-base font-semibold text-gray-800">{{ station.name }}</h3>
              <div class="flex items-center gap-1 text-xs text-gray-500">
                <svg class="w-4 h-4 text-[#667eea] animate-wiggle" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13 12l4.657-4.657m-6.314 0L6 12l4.657 4.657"></path>
                </svg>
                <span>{{ station.latitude }}, {{ station.longitude }}</span>
              </div>
            </div>
            <div :class="['flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium', station.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']">
              <span :class="['w-1.5 h-1.5 rounded-full animate-blink', station.status === 'active' ? 'bg-green-500' : 'bg-red-500']"></span>
              {{ station.status | capitalize }}
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="flex items-center gap-2 bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all duration-200">
              <div class="detail-icon rounded-md p-1.5 transform hover:rotate-360 transition-transform duration-500">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div>
                <span class="text-xs text-gray-500">Power</span>
                <span class="text-sm font-medium text-gray-800">{{ station.powerOutput }} kW</span>
              </div>
            </div>
            <div class="flex items-center gap-2 bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all duration-200">
              <div class="detail-icon rounded-md p-1.5 transform hover:rotate-360 transition-transform duration-500">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <span class="text-xs text-gray-500">Connector</span>
                <span class="text-sm font-medium text-gray-800">{{ station.connectorType }}</span>
              </div>
            </div>
          </div>
          <div class="flex gap-2 mt-3">
            <button
              @click="editStation(station)"
              class="flex-1 flex items-center justify-center gap-1 bg-gray-50 text-gray-600 py-1.5 rounded-lg hover:bg-gray-100 transform transition-all duration-200"
            >
              <svg class="w-4 h-4 transform hover:rotate-15" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              Edit
            </button>
            <button
              @click="deleteStation(station._id)"
              class="flex-1 flex items-center justify-center gap-1 bg-red-100 text-red-800 py-1.5 rounded-lg hover:bg-red-200 transform transition-all duration-200"
            >
              <svg class="w-4 h-4 transform hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0h4m-8 4h12"></path>
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Form for Add/Edit -->
      <div
        v-if="showForm"
        class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in-modal"
        @click.self="resetForm"
      >
        <div
          class="bg-white bg-opacity-98 rounded-xl p-6 max-w-md w-full shadow-2xl animate-slide-in-modal modal-content"
        >
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-800">{{ editMode ? 'Edit' : 'Add' }} Station</h3>
            <button
              @click="resetForm"
              class="p-1.5 rounded-full hover:bg-gray-50 text-gray-400 hover:text-gray-500 transition-all duration-200"
            >
              <svg class="w-5 h-5 transform hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div class="space-y-4">
            <div class="animate-slide-in-form">
              <label class="block text-sm font-medium text-gray-600 mb-1">Name</label>
              <input
                v-model="form.name"
                placeholder="Station Name"
                required
                class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#667eea] focus:border-[#667eea] transition-all duration-200"
              />
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="animate-slide-in-form" style="animation-delay: 0.1s;">
                <label class="block text-sm font-medium text-gray-600 mb-1">Latitude</label>
                <input
                  v-model.number="form.latitude"
                  placeholder="Latitude"
                  type="number"
                  step="any"
                  required
                  class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#667eea] focus:border-[#667eea] transition-all duration-200"
                />
              </div>
              <div class="animate-slide-in-form" style="animation-delay: 0.2s;">
                <label class="block text-sm font-medium text-gray-600 mb-1">Longitude</label>
                <input
                  v-model.number="form.longitude"
                  placeholder="Longitude"
                  type="number"
                  step="any"
                  required
                  class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#667eea] focus:border-[#667eea] transition-all duration-200"
                />
              </div>
            </div>
            <div class="animate-slide-in-form" style="animation-delay: 0.3s;">
              <label class="block text-sm font-medium text-gray-600 mb-1">Power (kW)</label>
              <input
                v-model.number="form.powerOutput"
                placeholder="Power (kW)"
                type="number"
                required
                class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#667eea] focus:border-[#667eea] transition-all duration-200"
              />
            </div>
            <div class="animate-slide-in-form" style="animation-delay: 0.4s;">
              <label class="block text-sm font-medium text-gray-600 mb-1">Connector Type</label>
              <input
                v-model="form.connectorType"
                placeholder="Connector Type"
                required
                class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#667eea] focus:border-[#667eea] transition-all duration-200"
              />
            </div>
            <div class="animate-slide-in-form" style="animation-delay: 0.5s;">
              <label class="block text-sm font-medium text-gray-600 mb-1">Status</label>
              <select
                v-model="form.status"
                required
                class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#667eea] focus:border-[#667eea] transition-all duration-200"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div class="flex gap-3 mt-4">
              <button
                @click="submitForm"
                class="flex-1 submit-btn text-white font-medium py-2 rounded-lg shadow-md hover:shadow-lg transform transition-all duration-200"
              >
                {{ editMode ? 'Update' : 'Add' }}
              </button>
              <button
                @click="resetForm"
                class="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 font-medium py-2 rounded-lg shadow-md hover:shadow-lg transform transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import api from '../api';

export default {
  data() {
    return {
      stations: [],
      filteredStations: [],
      showForm: false,
      editMode: false,
      form: {
        _id: '',
        name: '',
        latitude: '',
        longitude: '',
        powerOutput: '',
        connectorType: '',
        status: 'active',
      },
      filters: {
        status: '',
        connectorType: '',
        powerOutput: '',
      },
      connectorTypes: ['Type 1', 'Type 2', 'CCS', 'CHAdeMO'],
    };
  },
  filters: {
    capitalize(value) {
      if (!value) return '';
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  async mounted() {
    await this.loadStations();
  },
  methods: {
    async loadStations() {
      try {
        const res = await api.get('/stations');
        this.stations = res.data;
        this.applyFilters();
      } catch (err) {
        console.error('Failed to load stations:', err);
      }
    },
    applyFilters() {
      this.filteredStations = this.stations.filter((station) => {
        return (
          (!this.filters.status || station.status === this.filters.status) &&
          (!this.filters.connectorType || station.connectorType === this.filters.connectorType) &&
          (!this.filters.powerOutput || station.powerOutput >= this.filters.powerOutput)
        );
      });
    },
    async submitForm() {
      try {
        if (this.editMode) {
          await api.put(`/stations/${this.form._id}`, this.form);
        } else {
          await api.post('/stations', this.form);
        }
        await this.loadStations();
        this.resetForm();
      } catch (err) {
        console.error('Failed to save station:', err);
      }
    },
    editStation(station) {
      this.form = { ...station };
      this.editMode = true;
      this.showForm = true;
    },
    async deleteStation(id) {
      if (confirm('Delete this station?')) {
        try {
          await api.delete(`/stations/${id}`);
          await this.loadStations();
        } catch (err) {
          console.error('Failed to delete station:', err);
        }
      }
    },
    resetForm() {
      this.form = {
        _id: '',
        name: '',
        latitude: '',
        longitude: '',
        powerOutput: '',
        connectorType: '',
        status: 'active',
      };
      this.editMode = false;
      this.showForm = false;
    },
  },
};
</script>

<style scoped>
/* Animations */
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-4deg); }
  75% { transform: rotate(4deg); }
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0.4; }
}

@keyframes fadeInModal {
  from { opacity: 0; backdrop-filter: blur(0px); }
  to { opacity: 1; backdrop-filter: blur(4px); }
}

@keyframes slideInModal {
  from { opacity: 0; transform: scale(0.9) translateY(-30px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes slideInForm {
  from { opacity: 0; transform: translateX(-15px); }
  to { opacity: 1; transform: translateX(0); }
}

.animate-slide-in-left {
  animation: slideInLeft 0.5s ease;
}

.animate-slide-in-right {
  animation: slideInRight 0.5s ease;
}

.animate-slide-in-down {
  animation: slideInDown 0.5s ease;
}

.animate-slide-up {
  animation: slideUp 0.5s ease;
}

.animate-fade-in {
  animation: fadeIn 0.6s ease;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-wiggle {
  animation: wiggle 2s ease-in-out infinite;
}

.animate-blink {
  animation: blink 2s infinite;
}

.animate-fade-in-modal {
  animation: fadeInModal 0.3s ease;
}

.animate-slide-in-modal {
  animation: slideInModal 0.4s ease;
}

.animate-slide-in-form {
  animation: slideInForm 0.5s ease;
}

/* Base Container */
.dashboard-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea, #764ba2);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Logo Icon */
.logo-icon {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

/* Buttons */
.add-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.add-btn:hover {
  background: linear-gradient(135deg, #5a6cd8, #6a3c92);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  transform: translateY(-2px);
}

.submit-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.submit-btn:hover {
  background: linear-gradient(135deg, #5a6cd8, #6a3c92);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  transform: translateY(-2px);
}

/* Detail Icons */
.detail-icon {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

/* Empty State Icon */
.empty-icon {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

/* Modal Content */
.modal-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #667eea, #764ba2);
}
</style>