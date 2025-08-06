# SmartLeads-AI_CRM

SmartLeads-AI_CRM is a next-generation AI-powered CRM and Lead Management Platform built using the MERN stack.  
It helps businesses and sales teams capture, organize, and score leads, automate follow-ups, and visualize performance through real-time analytics and AI predictions.  
The platform comes with modern UI, responsive design, and a full CI/CD deployment pipeline for seamless development and delivery.

## Table of Contents

- [Features](#features)    
- [Installation](#installation)  
- [Usage](#usage)  
- [Demo](#demo)  
- [Video](#video)  
- [Technologies](#technologies)  
- [CI/CD Pipeline](#cicd-pipeline)  
- [Contributing](#contributing)  
- [License](#license)  
- [Contact](#contact)  

## Features

- Lead Management: Add, edit, search, and filter leads with complete details.  
- AI Lead Scoring: Predict lead conversion probability using integrated AI models.  
- Dynamic Filtering: Apply multi-criteria filters for faster lead targeting.  
- Interactive Dashboard: Monitor lead count, AI scores, conversion rates, and sales KPIs.  
- Secure Authentication: Role-based login using JWT (Admin & Team Members).  
- Follow-Up Scheduling: Set reminders and follow-up tasks directly from the CRM.  
- Real-time Updates: Optimized state management for instant UI refreshes.  
- Responsive UI: Works seamlessly on mobile, tablet, and desktop devices.  
- Deployment Ready: Fully integrated CI/CD pipeline for automated build, test, and deploy.  


## Installation

To run SmartLeads-AI_CRM locally:

1. Clone the repository:
   git clone https://github.com/Gibrail404/SmartLeads-AI_CRM.git
   cd SmartLeads-AI_CRM

2. Install backend dependencies:
   cd backend
   npm install

3. Install frontend dependencies:
   cd ../frontend
   npm install

4. Set up environment variables:  
   Create a `.env` file in the backend directory:
   MONGO_URI=<Your MongoDB Atlas URI>
   JWT_SECRET=<Your JWT Secret>
   GEMINI_API_KEY=<Your Gemini API Key>

5. Run the application:
   Backend:
     cd backend
     npm start
   Frontend:
     cd frontend
     npm start

6. Access the app:  
   Visit http://localhost:3000 in your browser.

## Usage
  - Add & manage leads.
  - Monitor AI-scored leads.
  - View analytics dashboard.
  - Update lead status.
  - Schedule follow-ups.
  - View assigned leads.

## Demo

Live Demo: [https://smart-leads-ai-crm](https://smart-leads-ai-crm.vercel.app/)

## Video

Coming Soon – A complete walkthrough video showing all features in action.

## Technologies

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)  
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)  
![React](https://img.shields.io/badge/React%20(Vite)-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)  
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)  
![JWT](https://img.shields.io/badge/JWT%20Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)  
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)  
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)  
![Framer Motion](https://img.shields.io/badge/Framer--Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)  
![Lucide Icons](https://img.shields.io/badge/Lucide--Icons-000000?style=for-the-badge&logo=lucide&logoColor=white)  
![Gemini AI API](https://img.shields.io/badge/Gemini%20AI%20API-4285F4?style=for-the-badge&logo=google&logoColor=white)  
![Mongoose](https://img.shields.io/badge/Mongoose%20ORM-880000?style=for-the-badge&logo=mongoose&logoColor=white)  
![Toastify](https://img.shields.io/badge/Toastify-FFDD00?style=for-the-badge&logo=react&logoColor=black)  
![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)  
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)  
![Vercel](https://img.shields.io/badge/Vercel%20(Frontend)-000000?style=for-the-badge&logo=vercel&logoColor=white)  
![Render](https://img.shields.io/badge/Render%20(Backend)-46E3B7?style=for-the-badge&logo=render&logoColor=black)  
 

## CI/CD Pipeline

SmartLeads-AI_CRM is configured with a CI/CD pipeline using GitHub Actions:
- Automatic build and test on every push to main branch.
- Deploy frontend to Vercel after successful build.
- Deploy backend to Render with health checks.
- Environment variables securely managed through deployment platforms.

## Contributing

We welcome contributions!

1. Fork the repository.
2. Create a new branch:
   git checkout -b feature/YourFeature
3. Commit changes:
   git commit -m "Add feature: YourFeature"
4. Push to your branch:
   git push origin feature/YourFeature
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

Email: gibrailzaidi@gmail.com  
GitHub: https://github.com/Gibrail404
