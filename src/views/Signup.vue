<template>
  <div class="signup-container">
    <div class="signup-card">
      <!-- Logo Section -->
      <div class="logo-section">
        <div class="logo-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
        </div>
        <h2>Join Our Platform</h2>
        <p>Create your account to start managing charging stations</p>
      </div>

      <!-- Signup Form -->
      <form @submit.prevent="register" class="signup-form">
        <div class="form-group">
          <label for="name">Full Name</label>
          <div class="input-wrapper">
            <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            <input 
              id="name"
              v-model="name" 
              type="text" 
              placeholder="Enter your full name" 
              required 
              class="form-input"
              :class="{ 'error': error && !name }"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email Address</label>
          <div class="input-wrapper">
            <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
            </svg>
            <input 
              id="email"
              v-model="email" 
              type="email" 
              placeholder="Enter your email address" 
              required 
              class="form-input"
              :class="{ 'error': error && !email }"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <div class="input-wrapper">
            <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
            <input 
              id="password"
              v-model="password" 
              :type="showPassword ? 'text' : 'password'" 
              placeholder="Create a strong password" 
              required 
              class="form-input"
              :class="{ 'error': error && !password }"
              @input="checkPasswordStrength"
            />
            <button 
              type="button" 
              @click="showPassword = !showPassword" 
              class="password-toggle"
            >
              <svg v-if="showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </button>
          </div>
          <!-- Password Strength Indicator -->
          <div v-if="password" class="password-strength">
            <div class="strength-bar">
              <div 
                class="strength-fill" 
                :class="passwordStrength.class"
                :style="{ width: passwordStrength.width }"
              ></div>
            </div>
            <span class="strength-text" :class="passwordStrength.class">
              {{ passwordStrength.text }}
            </span>
          </div>
        </div>

        <!-- Terms and Conditions -->
        <div class="form-group">
          <label class="checkbox-label">
            <input 
              v-model="agreeToTerms" 
              type="checkbox" 
              required 
              class="checkbox-input"
            />
            <span class="checkbox-custom"></span>
            <span class="checkbox-text">
              I agree to the 
              <a href="#" class="terms-link">Terms of Service</a> 
              and 
              <a href="#" class="terms-link">Privacy Policy</a>
            </span>
          </label>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="error-message">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          {{ error }}
        </div>

        <!-- Success Message -->
        <div v-if="success" class="success-message">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          {{ success }}
        </div>

        <!-- Signup Button -->
        <button type="submit" class="signup-btn" :disabled="loading || !agreeToTerms">
          <span v-if="loading" class="button-spinner"></span>
          <svg v-if="!loading" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
          </svg>
          {{ loading ? 'Creating Account...' : 'Create Account' }}
        </button>
      </form>

      <!-- Switch to Login -->
      <div class="switch-section">
        <p class="switch-text">
          Already have an account?
          <router-link to="/login" class="switch-link">Sign in here</router-link>
        </p>
      </div>

      <!-- Benefits Section -->
      <div class="benefits-section">
        <h4>Why join our platform?</h4>
        <div class="benefits-grid">
          <div class="benefit-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            <span>Manage Multiple Stations</span>
          </div>
          <div class="benefit-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
            <span>Real-time Analytics</span>
          </div>
          <div class="benefit-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
            </svg>
            <span>Revenue Tracking</span>
          </div>
          <div class="benefit-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"/>
            </svg>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';

export default {
  setup() {
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const error = ref('');
    const success = ref('');
    const loading = ref(false);
    const showPassword = ref(false);
    const agreeToTerms = ref(false);
    const router = useRouter();

    const passwordStrength = computed(() => {
      const pwd = password.value;
      if (!pwd) return { width: '0%', class: '', text: '' };
      
      let score = 0;
      let feedback = [];
      
      // Length check
      if (pwd.length >= 8) score += 1;
      else feedback.push('at least 8 characters');
      
      // Uppercase check
      if (/[A-Z]/.test(pwd)) score += 1;
      else feedback.push('uppercase letter');
      
      // Lowercase check
      if (/[a-z]/.test(pwd)) score += 1;
      else feedback.push('lowercase letter');
      
      // Number check
      if (/\d/.test(pwd)) score += 1;
      else feedback.push('number');
      
      // Special character check
      if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) score += 1;
      else feedback.push('special character');
      
      if (score <= 2) {
        return { 
          width: '33%', 
          class: 'weak', 
          text: `Weak - Add ${feedback.slice(0, 2).join(', ')}` 
        };
      } else if (score <= 3) {
        return { 
          width: '66%', 
          class: 'medium', 
          text: `Medium - Add ${feedback[0] || 'more complexity'}` 
        };
      } else {
        return { 
          width: '100%', 
          class: 'strong', 
          text: 'Strong password!' 
        };
      }
    });

    const checkPasswordStrength = () => {
      // This function is called on input to trigger reactivity
    };

    const register = async () => {
      loading.value = true;
      error.value = '';
      success.value = '';
      
      try {
        const res = await api.post('/auth/register', {
          name: name.value,
          email: email.value,
          password: password.value
        });
        
        success.value = 'Registration successful! Redirecting to login...';
        
        setTimeout(() => {
          router.push('/login');
        }, 2000);
        
      } catch (err) {
        error.value = err.response?.data?.message || 'Registration failed. Please try again.';
      } finally {
        loading.value = false;
      }
    };

    return {
      name, 
      email, 
      password, 
      error, 
      success, 
      loading,
      showPassword,
      agreeToTerms,
      passwordStrength,
      checkPasswordStrength,
      register
    };
  }
};
</script>

<style scoped>
/* Base Container */
.signup-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Signup Card */
.signup-card {
  background: rgba(255, 255, 255, 0.98);
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  animation: slideInUp 0.6s ease;
  position: relative;
  overflow: hidden;
}

.signup-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #667eea, #764ba2);
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Logo Section */
.logo-section {
  text-align: center;
  margin-bottom: 35px;
  animation: fadeInDown 0.6s ease 0.2s both;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.logo-icon svg {
  width: 28px;
  height: 28px;
}

.logo-section h2 {
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 700;
  color: #2d3748;
}

.logo-section p {
  margin: 0;
  color: #718096;
  font-size: 15px;
}

/* Form Styles */
.signup-form {
  animation: fadeInUp 0.6s ease 0.4s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #4a5568;
  font-size: 14px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 15px;
  width: 18px;
  height: 18px;
  color: #a0aec0;
  z-index: 2;
  transition: color 0.3s ease;
}

.form-input {
  width: 100%;
  padding: 15px 15px 15px 45px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.3s ease;
  background: white;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  transform: translateY(-1px);
}

.form-input:focus + .input-icon,
.form-input:focus ~ .input-icon {
  color: #667eea;
}

.form-input.error {
  border-color: #e53e3e;
  box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
}

.password-toggle {
  position: absolute;
  right: 15px;
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  transition: all 0.3s ease;
  z-index: 2;
}

.password-toggle:hover {
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}

.password-toggle svg {
  width: 18px;
  height: 18px;
}

/* Password Strength */
.password-strength {
  margin-top: 10px;
}

.strength-bar {
  width: 100%;
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 5px;
}

.strength-fill {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.strength-fill.weak {
  background: #e53e3e;
}

.strength-fill.medium {
  background: #ed8936;
}

.strength-fill.strong {
  background: #38a169;
}

.strength-text {
  font-size: 12px;
  font-weight: 500;
}

.strength-text.weak {
  color: #e53e3e;
}

.strength-text.medium {
  color: #ed8936;
}

.strength-text.strong {
  color: #38a169;
}

/* Checkbox Styles */
.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.5;
}

.checkbox-input {
  display: none;
}

.checkbox-custom {
  width: 18px;
  height: 18px;
  border: 2px solid #e2e8f0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-top: 2px;
}

.checkbox-input:checked + .checkbox-custom {
  background: #667eea;
  border-color: #667eea;
}

.checkbox-input:checked + .checkbox-custom::after {
  content: '✓';
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.checkbox-text {
  color: #4a5568;
}

.terms-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.terms-link:hover {
  text-decoration: underline;
}

/* Error and Success Messages */
.error-message, .success-message {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
  margin-bottom: 20px;
}

.error-message {
  background: #fff5f5;
  border: 1px solid #feb2b2;
  color: #e53e3e;
  animation: shake 0.5s ease;
}

.success-message {
  background: #f0fff4;
  border: 1px solid #9ae6b4;
  color: #22543d;
  animation: slideInDown 0.5s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.error-message svg, .success-message svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

/* Signup Button */
.signup-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px 20px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  margin-bottom: 20px;
}

.signup-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.signup-btn:active:not(:disabled) {
  transform: translateY(0);
}

.signup-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.signup-btn svg {
  width: 20px;
  height: 20px;
}

/* Button Spinner */
.button-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Switch Section */
.switch-section {
  text-align: center;
  padding: 20px 0;
  border-top: 1px solid #e2e8f0;
  margin-top: 20px;
  animation: fadeIn 0.6s ease 0.6s both;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.switch-text {
  margin: 0;
  color: #718096;
  font-size: 14px;
}

.switch-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.switch-link:hover {
  color: #764ba2;
  text-decoration: underline;
}

/* Benefits Section */
.benefits-section {
  margin-top: 25px;
  animation: fadeInUp 0.6s ease 0.8s both;
}

.benefits-section h4 {
  text-align: center;
  margin: 0 0 20px 0;
  color: #2d3748;
  font-size: 16px;
  font-weight: 600;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 15px;
  background: #f8fafc;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.benefit-item:hover {
  background: #edf2f7;
  transform: translateY(-2px);
}

.benefit-item svg {
  width: 20px;
  height: 20px;
  color: #667eea;
  flex-shrink: 0;
}

.benefit-item span {
  font-size: 13px;
  color: #4a5568;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 480px) {
  .signup-card {
    padding: 30px 25px;
    margin: 10px;
  }
  
  .logo-section h2 {
    font-size: 24px;
  }
  
  .benefits-grid {
    grid-template-columns: 1fr;
  }
}

/* Focus States for Accessibility */
.signup-btn:focus,
.password-toggle:focus,
.terms-link:focus,
.switch-link:focus,
.checkbox-label:focus-within {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}
</style>