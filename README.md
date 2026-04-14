📌 Abstract

This project presents the frontend implementation of a Chronic Kidney Disease (CKD) Prediction System, designed to assist in early detection through a machine learning-based diagnostic pipeline. The frontend serves as the user interaction layer, enabling data input, visualization of predictions, and communication with the backend inference engine.

The system emphasizes usability, responsiveness, and clarity, ensuring that medical inputs can be efficiently processed and interpreted.

🎯 Objectives
To design a responsive and accessible user interface for CKD prediction
To enable structured medical data input through validated forms
To integrate seamlessly with a FastAPI-based backend
To present prediction results in a clear and interpretable format
To ensure performance optimization using modern frontend tooling
🏗️ System Architecture

The frontend represents the Presentation Layer in a three-tier architecture:

Presentation Layer: React + Vite + Tailwind CSS (this project)
Application Layer: FastAPI backend (API handling and validation)
Model Layer: Machine Learning models for CKD prediction

This separation ensures modularity, scalability, and maintainability.

⚙️ Technology Stack
Frontend Framework: React (with Vite for optimized builds)
Styling: Tailwind CSS
Programming Language: TypeScript
State Management / Data Fetching: TanStack Query (React Query v5)
UI Components: ShadCN UI
API Communication: Axios / Fetch API
✨ Functional Features
Structured input form for clinical parameters (e.g., blood pressure, specific gravity)
Real-time interaction with backend prediction API
Display of classification results (CKD / Non-CKD)
Responsive design for cross-device compatibility
User feedback mechanisms (notifications and validation)
Modular and reusable component architecture
📂 Project Structure
src/
│
├── components/        # Reusable UI components
├── pages/            # Application views
├── hooks/            # Custom React hooks
├── services/         # API interaction layer
├── types/            # Type definitions
├── utils/            # Helper utilities
│
├── App.tsx
└── main.tsx
🔗 Backend Interaction

The frontend communicates with the backend through RESTful APIs.

Primary Endpoint:

POST /predict

Input Format (Example):

{
  "age": 45,
  "bp": 80,
  "sg": 1.02,
  "al": 1,
  "su": 0
}

The backend processes this data using trained machine learning models and returns a classification result.

⚙️ Installation and Execution
Step 1: Clone Repository
git clone https://github.com/your-username/ckd-frontend.git
cd ckd-frontend
Step 2: Install Dependencies
npm install
Step 3: Run Development Server
npm run dev

The application will be available at:

http://localhost:5173
🧪 Build and Deployment

To generate a production build:

npm run build

To preview the production build:

npm run preview

⚠️ Limitations
The frontend relies on backend availability for predictions
No persistent storage of user input or prediction history
Limited interpretability of model decisions (no explainability module yet)
🔮 Future Enhancements
Integration of model explainability (e.g., SHAP/LIME visualizations)
User authentication and personalized dashboards
Storage and retrieval of historical prediction data
Enhanced data visualization (charts and trends)
Deployment on cloud platforms (e.g., Vercel, AWS)


📜 Declaration

This project is developed as part of academic requirements for the M.Tech program. The implementation is intended for educational and research purposes and should not be used as a substitute for professional medical diagnosis.
