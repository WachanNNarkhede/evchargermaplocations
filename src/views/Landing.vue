<template>
  <div class="landing-container">
    <!-- Add this right after the opening div of landing-container -->
    <div class="scroll-progress" ref="scrollProgress"></div>
    <!-- Landing Page Navigation -->
    <nav class="landing-nav fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="nav-logo">
            <svg class="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <span class="text-xl font-bold text-black">EV Network</span>
        </div>
        
        <div class="flex items-center gap-4">
          <button 
            @click="$router.push('/login')"
            class="text-black hover:text-gray-800 font-medium transition-colors duration-200">
            Login
          </button>
          <button 
            @click="$router.push('/signup')"
            class="bg-white/20 hover:bg-white/30 text-black font-medium px-4 py-2 rounded-full backdrop-blur-sm border border-white/30 transition-all duration-200">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
    <!-- Hero Section -->
    <section class="hero-section relative overflow-hidden min-h-screen flex items-center justify-center">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="floating-orb orb-1"></div>
        <div class="floating-orb orb-2"></div>
        <div class="floating-orb orb-3"></div>
        <div class="grid-pattern"></div>
      </div>
      
      <div class="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div class="hero-content" ref="heroContent">
          <div class="mb-8">
            <div class="logo-container animate-float">
              <div class="hero-logo">
                <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <h1 class="hero-title text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
            <span class="text-reveal inline-block mr-4">Power</span>
            <span class="text-reveal inline-block mr-4" style="animation-delay: 0.2s;">Your Future</span>
            <!-- <span class="text-reveal creative-text inline-block" style="animation-delay: 0.4s;"></span> -->
          </h1>
          
          <p class="hero-subtitle text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            <span class="typing-text" ref="typingText"></span>
            <span class="typing-cursor">|</span>
          </p>
          
          <div class="hero-buttons flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              @click="$router.push('/login')"
              class="cta-button primary-btn text-lg px-8 py-4 rounded-full font-semibold transform transition-all duration-300 hover:scale-105">
              <span>Get Started</span>
              <svg class="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </button>
            <button 
              @click="$router.push('/signup')"
              class="cta-button secondary-btn text-lg px-8 py-4 rounded-full font-semibold transform transition-all duration-300 hover:scale-105">
              <span>Sign Up Free</span>
              <svg class="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m2 5a4 4 0 01-6.32-3.13A3 3 0 015.82 13H9a4.002 4.002 0 003.874 3.002z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div class="scroll-indicator">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section py-20 bg-white relative overflow-hidden">
      <div class="max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8" ref="statsContainer">
          <div class=" text-center" v-for="(stat, index) in stats" :key="index">
            <div class="stat-number text-5xl font-bold  mb-2" :ref="`stat-${index}`">0</div>
            <div class="stat-label text-gray-600 text-lg font-medium">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section py-32 bg-gray-50 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-20" ref="featuresHeader">
          <h2 class="section-title text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            <span class="text-reveal">Why Choose</span>
            <span class="text-reveal " style="animation-delay: 0.2s;">Our Network</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of electric vehicle charging with our cutting-edge technology and nationwide network
          </p>
        </div>
        
        <div class="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref="featuresGrid">
          <div class="feature-card" v-for="(feature, index) in features" :key="index">
            <div class="feature-icon-container mb-6">
              <div class="feature-icon" v-html="feature.icon"></div>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">{{ feature.title }}</h3>
            <p class="text-gray-600 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Map Section -->
    <section class="map-section py-32 bg-white relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div class="map-content" ref="mapContent">
            <h2 class="text-5xl font-bold text-gray-800 mb-6">
              <span class="text-reveal">Find Stations</span>
              <span class="text-reveal creative-text" style="animation-delay: 0.2s;">Everywhere</span>
            </h2>
            <p class="text-xl text-gray-600 mb-8 leading-relaxed">
              Our intelligent network spans across the country, ensuring you're never far from a charging station. 
              Real-time availability and smart routing make your journey seamless.
            </p>
            <div class="map-features space-y-4">
              <div class="map-feature flex items-center" v-for="(item, index) in mapFeatures" :key="index">
                <div class="feature-check mr-4">
                  <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700 font-medium">{{ item }}</span>
              </div>
            </div>
          </div>
          
          <div class="map-visual relative" ref="mapVisual">
            <div class="interactive-map">
              <div class="map-container">
                <div class="map-pin" v-for="(pin, index) in mapPins" :key="index" 
                     :style="{ top: pin.top, left: pin.left }"
                     :class="{ 'active': pin.active }">
                  <div class="pin-pulse"></div>
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Technology Section -->
    <section class="tech-section py-32 bg-gray-900 text-white relative overflow-hidden">
      <div class="tech-bg-pattern"></div>
      <div class="max-w-7xl mx-auto px-4 relative z-10">
        <div class="text-center mb-20" ref="techHeader">
          <h2 class="section-title text-5xl md:text-6xl font-bold mb-6">
            <span class="text-reveal inline-block mr-4">Advanced</span>
            <span class="text-reveal  inline-block" style="animation-delay: 0.2s;">Technology</span>
          </h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            Powered by cutting-edge technology for the fastest, most reliable charging experience
          </p>
        </div>
        
        <div class="tech-grid grid grid-cols-1 md:grid-cols-2 gap-16 items-center" ref="techGrid">
          <div class="tech-visual">
            <div class="tech-animation-container">
              <div class="charging-animation">
                <div class="battery-container">
                  <div class="battery-level" ref="batteryLevel"></div>
                  <div class="battery-spark"></div>
                </div>
                <div class="energy-flow">
                  <div class="energy-particle" v-for="n in 5" :key="n"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="tech-content">
            <div class="tech-features space-y-8">
              <div class="tech-feature" v-for="(tech, index) in techFeatures" :key="index">
                <div class="flex items-start">
                  <div class="tech-icon mr-6 mt-1" v-html="tech.icon"></div>
                  <div>
                    <h3 class="text-2xl font-bold mb-3">{{ tech.title }}</h3>
                    <p class="text-gray-300 leading-relaxed">{{ tech.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section py-32 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white relative overflow-hidden">
      <div class="cta-bg-elements">
        <div class="cta-orb cta-orb-1"></div>
        <div class="cta-orb cta-orb-2"></div>
      </div>
      
      <div class="max-w-4xl mx-auto px-4 text-center relative z-10" ref="ctaContent">
        <h2 class="text-5xl md:text-6xl font-bold mb-8">
          <span class="text-reveal inline-block mr-4">Ready</span>
          <span class="text-reveal inline-block mr-4" style="animation-delay: 0.2s;">to</span>
          <span class="text-reveal  inline-block mr-4" style="animation-delay: 0.4s;">Get</span>
          <span class="text-reveal  inline-block" style="animation-delay: 0.6s;">Started?</span>
        </h2>
        <p class="text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Join thousands of drivers who have already made the switch to smarter, faster EV charging
        </p>
        
        <div class="cta-buttons flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button 
            @click="$router.push('/signup')"
            class="cta-button cta-primary text-lg px-10 py-4 rounded-full font-semibold transform transition-all duration-300 hover:scale-105">
            <span>Start Your Journey</span>
            <svg class="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </button>
          <button 
            @click="$router.push('/login')"
            class="cta-button cta-secondary text-lg px-10 py-4 rounded-full font-semibold transform transition-all duration-300 hover:scale-105">
            <span>Already a Member?</span>
            <svg class="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h3a3 3 0 013 3v1"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer-section py-16 bg-gray-900 text-white">
      <div class="max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="footer-brand">
            <div class="flex items-center gap-3 mb-6">
              <div class="footer-logo">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <span class="text-xl font-bold">EV Network</span>
            </div>
            <p class="text-gray-400 leading-relaxed">
              Powering the future of transportation with intelligent charging solutions.
            </p>
          </div>
          
          <div class="footer-links">
            <h4 class="text-lg font-semibold mb-4">Product</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">API</a></li>
            </ul>
          </div>
          
          <div class="footer-links">
            <h4 class="text-lg font-semibold mb-4">Company</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div class="footer-links">
            <h4 class="text-lg font-semibold mb-4">Support</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-800 mt-12 pt-8 text-center">
          <p class="text-gray-400">&copy; 2024 EV Network. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data() {
    return {
      stats: [
        { value: 10000, label: 'Charging Stations' },
        { value: 50000, label: 'Happy Drivers' },
        { value: 99, label: 'Uptime %' },
        { value: 24, label: 'Countries' }
      ],
      features: [
        {
          title: 'Ultra-Fast Charging',
          description: 'Get up to 350kW charging speeds that can power your vehicle from 10% to 80% in under 20 minutes.',
          icon: '<svg class="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>'
        },
        {
          title: 'Smart Network',
          description: 'AI-powered routing and real-time availability ensure you always find the perfect charging spot.',
          icon: '<svg class="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>'
        },
        {
          title: 'Universal Compatibility',
          description: 'Support for all major EV brands and connector types, ensuring compatibility with your vehicle.',
          icon: '<svg class="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>'
        },
        {
          title: '24/7 Support',
          description: 'Round-the-clock customer support and maintenance ensure your charging experience is always smooth.',
          icon: '<svg class="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2v2m0 16v2m-9-9h2m16 0h2"></path></svg>'
        },
        {
          title: 'Green Energy',
          description: 'Powered by 100% renewable energy sources, making your drive truly sustainable and eco-friendly.',
          icon: '<svg class="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>'
        },
        {
          title: 'Mobile App',
          description: 'Seamlessly manage your charging sessions, payments, and find stations with our intuitive mobile app.',
          icon: '<svg class="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z"></path></svg>'
        }
      ],
      mapFeatures: [
        'Real-time station availability',
        'Smart route optimization',
        'Predictive maintenance alerts',
        'Dynamic pricing updates'
      ],
      mapPins: [
        { top: '20%', left: '15%', active: true },
        { top: '35%', left: '45%', active: false },
        { top: '60%', left: '25%', active: true },
        { top: '45%', left: '70%', active: false },
        { top: '75%', left: '55%', active: true },
        { top: '25%', left: '80%', active: true }
      ],
      techFeatures: [
        {
          title: 'Lightning Speed',
          description: 'Advanced power electronics deliver consistent high-speed charging with minimal wait times.',
          icon: '<svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>'
        },
        {
          title: 'Smart Grid Integration',
          description: 'Seamlessly integrates with smart grid technology for optimal energy distribution and cost efficiency.',
          icon: '<svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>'
        },
        {
          title: 'Predictive Analytics',
          description: 'AI-powered analytics predict maintenance needs and optimize charging patterns for maximum efficiency.',
          icon: '<svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>'
        }
      ]
    }
  },
  mounted() {
    this.initScrollAnimations();
    this.initCounterAnimations();
    this.initParallaxEffects();
    this.initInteractiveElements();
    this.initTypingEffect();
  },
  methods: {
    initScrollAnimations() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, observerOptions);

      // Observe all sections
      const sections = document.querySelectorAll('.features-section, .map-section, .tech-section, .cta-section');
      sections.forEach(section => observer.observe(section));

      // Observe individual elements
      const elements = document.querySelectorAll('.feature-card, .tech-feature, .map-content, .map-visual');
      elements.forEach(el => observer.observe(el));
    },

    initCounterAnimations() {
      const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateCounters();
            statsObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      if (this.$refs.statsContainer) {
        statsObserver.observe(this.$refs.statsContainer);
      }
    },

    animateCounters() {
      this.stats.forEach((stat, index) => {
        const element = this.$refs[`stat-${index}`]?.[0];
        if (element) {
          this.animateValue(element, 0, stat.value, 2000);
        }
      });
    },

    animateValue(element, start, end, duration) {
      const startTime = performance.now();
      const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };
      requestAnimationFrame(update);
    },

    initParallaxEffects() {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (scrolled / maxHeight) * 100;
        
        // Update scroll progress bar
        if (this.$refs.scrollProgress) {
          this.$refs.scrollProgress.style.width = `${scrollProgress}%`;
        }
        
        // Existing parallax code
        const parallaxElements = document.querySelectorAll('.floating-orb, .tech-bg-pattern');
        parallaxElements.forEach((element, index) => {
          const speed = 0.5 + (index * 0.1);
          element.style.transform = `translateY(${scrolled * speed}px)`;
        });
      });
    },

    initInteractiveElements() {
      // Animate map pins
      setInterval(() => {
        this.mapPins.forEach((pin, index) => {
          if (Math.random() > 0.7) {
            this.mapPins[index].active = !pin.active;
          }
        });
      }, 3000);

      // Battery animation
      if (this.$refs.batteryLevel) {
        setInterval(() => {
          const level = Math.random() * 100;
          this.$refs.batteryLevel.style.width = `${level}%`;
        }, 2000);
      }
    },
    
    initTypingEffect() {
      const text = "Revolutionary EV charging network that transforms how you power your electric journey";
      const typingElement = this.$refs.typingText;
      if (!typingElement) return;
      
      let index = 0;
      const typeSpeed = 50;
      
      const typeWriter = () => {
        if (index < text.length) {
          typingElement.textContent += text.charAt(index);
          index++;
          setTimeout(typeWriter, typeSpeed);
        }
      };
      
      // Start typing after hero animations
      setTimeout(typeWriter, 1200);
    }
  }
}
</script>

<style scoped>
/* Base Styles */
.landing-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow-x: hidden;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
}

.floating-orb {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  animation: float 6s ease-in-out infinite;
}

.orb-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: -5%;
  animation-delay: 0s;
}

.orb-2 {
  width: 200px;
  height: 200px;
  top: 60%;
  right: -5%;
  animation-delay: 2s;
}

.orb-3 {
  width: 150px;
  height: 150px;
  top: 30%;
  right: 20%;
  animation-delay: 4s;
}

.grid-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;
}

.hero-logo {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.text-reveal {
  display: inline-block;
  opacity: 0;
  transform: translateY(50px);
  animation: textReveal 1s ease forwards;
}

.creative-text {
  position: relative;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #667eea 100%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientSlide 3s ease-in-out infinite;
  text-shadow: 0 0 30px rgba(102, 126, 234, 0.5);
}

.creative-text::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.2), transparent);
  border-radius: 8px;
  z-index: -1;
  animation: shimmer 2s ease-in-out infinite;
}

@keyframes gradientSlide {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes shimmer {
  0%, 100% { opacity: 0; transform: scaleX(0.8); }
  50% { opacity: 1; transform: scaleX(1.1); }
}

/* Buttons */
.primary-btn {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.primary-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

.secondary-btn {
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.5);
  color: white;
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Stats Section */
.stat-item {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.stats-section.animate-in .stat-item {
  opacity: 1;
  transform: translateY(0);
}

.stat-item:nth-child(1) { transition-delay: 0.1s; }
.stat-item:nth-child(2) { transition-delay: 0.2s; }
.stat-item:nth-child(3) { transition-delay: 0.3s; }
.stat-item:nth-child(4) { transition-delay: 0.4s; }

/* Features Section */
.feature-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.6s ease;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.feature-card:hover::before {
  transform: scaleX(1);
}

.features-section.animate-in .feature-card {
  opacity: 1;
  transform: translateY(0);
}

.feature-card:nth-child(1) { transition-delay: 0.1s; }
.feature-card:nth-child(2) { transition-delay: 0.2s; }
.feature-card:nth-child(3) { transition-delay: 0.3s; }
.feature-card:nth-child(4) { transition-delay: 0.4s; }
.feature-card:nth-child(5) { transition-delay: 0.5s; }
.feature-card:nth-child(6) { transition-delay: 0.6s; }

.feature-icon-container {
  transform: scale(0);
  animation: iconPop 0.6s ease forwards;
  animation-delay: 0.3s;
}

/* Map Section */
.interactive-map {
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  border-radius: 20px;
  padding: 3rem;
  position: relative;
  height: 400px;
  overflow: hidden;
}

.map-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23e2e8f0" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
}

.map-pin {
  position: absolute;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  transition: all 0.3s ease;
  cursor: pointer;
}

.map-pin.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  animation: pinPulse 2s infinite;
}

.map-pin:not(.active) {
  background: #e2e8f0;
  color: #64748b;
}

.map-pin svg {
  transform: rotate(45deg);
}

.pin-pulse {
  position: absolute;
  inset: -10px;
  border: 2px solid #667eea;
  border-radius: 50%;
  opacity: 0;
  animation: pulse 2s infinite;
}

.map-pin.active .pin-pulse {
  animation: pulse 2s infinite;
}

/* Technology Section */
.tech-section {
  position: relative;
}

.tech-bg-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(118, 75, 162, 0.1) 0%, transparent 50%);
}

.charging-animation {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.battery-container {
  width: 200px;
  height: 100px;
  border: 4px solid #667eea;
  border-radius: 10px;
  position: relative;
  background: #1a1a1a;
  overflow: hidden;
}

.battery-container::after {
  content: '';
  position: absolute;
  right: -15px;
  top: 30%;
  width: 10px;
  height: 40%;
  background: #667eea;
  border-radius: 0 5px 5px 0;
}

.battery-level {
  height: 100%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  width: 0%;
  transition: width 2s ease;
  position: relative;
}

.battery-spark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  background: white;
  border-radius: 50%;
  opacity: 0;
  animation: spark 1s ease infinite;
}

.energy-flow {
  display: flex;
  gap: 1rem;
}

.energy-particle {
  width: 10px;
  height: 10px;
  background: #667eea;
  border-radius: 50%;
  animation: energyFlow 2s ease infinite;
}

.energy-particle:nth-child(1) { animation-delay: 0s; }
.energy-particle:nth-child(2) { animation-delay: 0.4s; }
.energy-particle:nth-child(3) { animation-delay: 0.8s; }
.energy-particle:nth-child(4) { animation-delay: 1.2s; }
.energy-particle:nth-child(5) { animation-delay: 1.6s; }

/* CTA Section */
.cta-orb {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.cta-orb-1 {
  width: 400px;
  height: 400px;
  top: -200px;
  left: -200px;
  animation: float 8s ease-in-out infinite;
}

.cta-orb-2 {
  width: 300px;
  height: 300px;
  bottom: -150px;
  right: -150px;
  animation: float 8s ease-in-out infinite reverse;
}

.cta-primary {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
}

.cta-secondary {
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.5);
  color: white;
}

/* Footer */
.footer-logo {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes textReveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes creativeShift {
  0%, 100% { 
    background-position: 0% 50%;
    transform: scale(1);
  }
  50% { 
    background-position: 100% 50%;
    transform: scale(1.05);
  }
}

@keyframes glowPulse {
  0%, 100% { 
    opacity: 0;
    transform: scale(0.8);
  }
  50% { 
    opacity: 1;
    transform: scale(1.1);
  }
}

@keyframes borderFlow {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

@keyframes gridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

@keyframes iconPop {
  0% { transform: scale(0) rotate(-180deg); }
  80% { transform: scale(1.1) rotate(10deg); }
  100% { transform: scale(1) rotate(0deg); }
}

@keyframes pinPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes pulse {
  0% { opacity: 0; transform: scale(0.8); }
  50% { opacity: 0.5; transform: scale(1.2); }
  100% { opacity: 0; transform: scale(1.5); }
}

@keyframes spark {
  0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}

@keyframes energyFlow {
  0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
  50% { transform: translateY(-20px) scale(1.2); opacity: 0.7; }
}

.cta-section {
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 30% 70%, rgba(255,255,255,0.05) 0%, transparent 40%),
    radial-gradient(circle at 70% 30%, rgba(255,255,255,0.05) 0%, transparent 40%);
  animation: subtleGlow 10s ease-in-out infinite;
}

.tech-section::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(102, 126, 234, 0.03) 0%, transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(118, 75, 162, 0.03) 0%, transparent 40%);
  animation: subtleGlow 8s ease-in-out infinite;
}

@keyframes subtleGlow {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.02); }
}

@keyframes backgroundShift {
  0%, 100% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.1); }
}

@keyframes techPattern {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 3rem;
  }
  
  .hero-subtitle {
    font-size: 1.125rem;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
  
  .feature-card {
    padding: 1.5rem;
  }
  
  .interactive-map {
    height: 300px;
    padding: 2rem;
  }
  
  .battery-container {
    width: 150px;
    height: 75px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .cta-buttons {
    flex-direction: column;
  }
}

.typing-text {
  display: inline;
}

.typing-cursor {
  display: inline-block;
  background-color: white;
  margin-left: 2px;
  width: 2px;
  animation: blink 1s infinite;
}

.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 4px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  z-index: 9999;
  transition: width 0.1s ease;
}

.landing-nav {
  animation: slideInDown 0.8s ease;
}

.nav-logo {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes slideInDown {
  from { 
    opacity: 0; 
    transform: translateY(-20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
</style>
