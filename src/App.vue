
<template>
  <div class="app-container">
    <nav v-if="shouldShowNavbar" class="navbar transform -translate-y-1">
      <div class="mx-4 sm:mx-6 lg:mx-8 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <!-- Logo Section -->
        <div class="flex items-center gap-3 animate-slide-in-left">
          <div class="logo-icon rounded-lg flex items-center justify-center text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <span class="text-xl font-bold text-gray-800">EV Dashboard</span>
        </div>

        <!-- Navigation Links -->
        <div class="flex items-center gap-6">
          <router-link
            to="/dashboard"
            class="nav-link text-gray-600 hover:text-gray-800 transition-all duration-300 animate-slide-in-right"
          >
            <svg class="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-6h6v6m-6 2h6m-9-8h12"></path>
            </svg>
            Dashboard
          </router-link>
          <router-link
            to="/map"
            class="nav-link text-gray-600 hover:text-gray-800 transition-all duration-300 animate-slide-in-right"
            style="animation-delay: 0.1s;"
          >
            <svg class="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Map View
          </router-link>
          <button
            @click="logout"
            class="logout-btn text-white font-medium py-2 px-4 rounded-full shadow-md hover:shadow-lg transform transition-all duration-300 animate-slide-in-right"
            style="animation-delay: 0.2s;"
          >
            <svg class="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h3a3 3 0 013 3v1"></path>
            </svg>
            Logout
          </button>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    shouldShowNavbar() {
      const publicRoutes = ['/login', '/signup', '/landing'];
      return !publicRoutes.includes(this.$route.path);
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/landing'); // Redirect to landing instead of login
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

@keyframes slideInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes underlineGrow {
  from { width: 0; }
  to { width: 100%; }
}

.animate-slide-in-left {
  animation: slideInLeft 0.5s ease;
}

.animate-slide-in-right {
  animation: slideInRight 0.5s ease;
}

.logo-icon {
  animation: pulse 2s infinite;
}

/* App Container */
.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea, #764ba2);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Navbar */
.navbar {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1001; /* Increased to avoid overlap with Map.vue */
}

.navbar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #667eea, #764ba2);
}

/* Logo Icon */
.logo-icon {
  background: linear-gradient(135deg, #667eea, #764ba2);
  width: 40px;
  height: 40px;
}

/* Navigation Links */
.nav-link {
  position: relative;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 8px;
}

.nav-link:hover {
  background: rgba(102, 126, 234, 0.1);
  transform: translateY(-1px);
}

.nav-link.router-link-exact-active {
  font-weight: 700;
  color: #2d3748;
}

.nav-link.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  animation: underlineGrow 0.3s ease;
}

/* Logout Button */
.logout-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.logout-btn:hover {
  background: linear-gradient(135deg, #5a6cd8, #6a3c92);
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .navbar {
    padding: 12px 8px;
  }

  .navbar > div {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: space-between;
    align-items: center;
    max-width: 100%;
  }

  .logo-icon {
    width: 36px;
    height: 36px;
  }

  .logo-icon svg {
    width: 20px;
    height: 20px;
  }

  .logo-icon + span {
    font-size: 18px;
  }

  .nav-link,
  .logout-btn {
    font-size: 14px;
    padding: 8px 12px;
    min-height: 44px;
    justify-content: center;
    animation: slideInUp 0.5s ease;
  }

  .nav-link svg,
  .logout-btn svg {
    width: 18px;
    height: 18px;
  }

  .nav-link.router-link-exact-active::after {
    height: 2px;
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 8px 4px;
  }

  .navbar > div {
    flex-direction: column;
    gap: 8px;
    align-items: stretch;
    text-align: center;
  }

  .logo-icon {
    width: 32px;
    height: 32px;
  }

  .logo-icon svg {
    width: 18px;
    height: 18px;
  }

  .logo-icon + span {
    font-size: 16px;
  }

  .nav-link,
  .logout-btn {
    width: 100%;
    padding: 10px;
    font-size: 13px;
    min-height: 48px;
  }

  .nav-link svg,
  .logout-btn svg {
    width: 16px;
    height: 16px;
  }
}
</style>
