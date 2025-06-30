EV Charging Frontend

A modern, responsive frontend application for managing Electric Vehicle (EV) charging station networks. Built with Vue 3, Leaflet for interactive maps, and TailwindCSS for sleek, customizable styling, this project provides an intuitive dashboard to monitor, filter, and manage EV charging stations with real-time data integration via Axios.
🚀 Features

Interactive Dashboard: Manage EV charging stations with a user-friendly interface.
Real-Time Filtering: Filter stations by status, connector type, and power output.
Map Integration: Visualize charging station locations using Leaflet maps.
Responsive Design: Optimized for desktop and mobile devices with TailwindCSS.
State Management: Powered by Pinia for efficient, scalable state handling.
Modern UI Components: Enhanced with Quasar and Lucide icons for a polished look.
CRUD Operations: Add, edit, and delete charging stations seamlessly.
API Integration: Connects to backend services via Axios for real-time data.

🛠️ Installation
Follow these steps to set up the project locally:
Prerequisites

Node.js (v16 or higher)
npm (v8 or higher) or yarn
A compatible backend API for EV charging station data

Steps

Clone the Repository:
git clone https://github.com/your-username/ev-charging-frontend.git
cd ev-charging-frontend


Install Dependencies:
npm install

or
yarn install


Configure Environment:

Create a .env file in the project root.
Add your backend API URL (used by Axios):VITE_API_URL=http://your-backend-api-url




Run the Development Server:
npm run dev

This starts the Vite development server and opens the app in your default browser.

Build for Production:
npm run build

The optimized build will be generated in the dist folder.

Preview the Build:
npm run preview

This serves the production build locally for testing.


📚 Usage

Access the Dashboard:

Open the app in your browser (default: http://localhost:5173).
View a list of EV charging stations with details like name, location, power output, and status.


Filter Stations:

Use the filter controls to narrow down stations by status (active/inactive), connector type (e.g., Type 1, Type 2, CCS, CHAdeMO), or minimum power output.


Manage Stations:

Click Add Station to create a new station.
Use Edit or Delete buttons on each station card to modify or remove entries.
Input station details (name, latitude, longitude, power, connector type, status) in the modal form.


Map Visualization:

Navigate to the map view (if implemented) to see station locations plotted using Leaflet.



🗂️ Project Structure
ev-charging-frontend/
├── public/                 # Static assets
├── src/                    # Source code
│   ├── api/                # Axios API client
│   ├── assets/             # Images, fonts, etc.
│   ├── components/         # Vue components
│   ├── router/             # Vue Router configuration
│   ├── store/              # Pinia store
│   ├── views/              # Page components (e.g., Dashboard, Map)
│   └── App.vue             # Root Vue component
├── .env                    # Environment variables
├── package.json            # Project metadata and dependencies
├── vite.config.js          # Vite configuration
└── README.md               # This file

📦 Dependencies
Production Dependencies

Vue 3 (^3.5.17): Reactive frontend framework.
Vue Router (^4.5.1): Client-side routing.
Pinia (^3.0.3): State management.
Axios (^1.10.0): HTTP client for API requests.
Leaflet (^1.9.4) & Vue3-Leaflet (^1.0.50): Interactive map components.
Quasar (^2.18.1): UI component framework.
Lucide-Vue-Next (^0.525.0): Modern icon library.
TailwindCSS (^4.1.11): Utility-first CSS framework.
@TailwindCSS/Vite (^4.1.11): Tailwind integration for Vite.

Development Dependencies

Vite (^7.0.0): Fast build tool and development server.
@ViteJS/Plugin-Vue (^6.0.0): Vue support for Vite.
Vite-Plugin-Vue-DevTools (^7.7.7): Debugging tools for Vue.

🛠️ Development

Run Locally: Use npm run dev to start the development server with hot reloading.
Build: Use npm run build to generate a production-ready build.
Preview: Use npm run preview to test the production build locally.
Styling: Customize styles in src/assets using TailwindCSS classes or custom CSS.
API Integration: Update src/api to match your backend endpoints.

🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes and commit (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a Pull Request with a detailed description.

Please ensure your code follows the project's coding standards and includes relevant tests.
📜 License
This project is licensed under the MIT License. See the LICENSE file for details.
🙏 Acknowledgments

Vue.js for a powerful and flexible framework.
TailwindCSS for rapid, responsive styling.
Leaflet for robust map integration.
Quasar and Lucide for enhancing the UI.
The open-source community for continuous inspiration and support.


Happy Charging! ⚡️
For questions or support, contact [your-email@example.com] or open an issue on GitHub.
