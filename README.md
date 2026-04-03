# 🧘‍♀️ VR Therapy Hub

**VR Therapy Hub** is an advanced, full-stack virtual reality platform designed to provide evidence-based virtual reality exposure therapy for anxiety, phobias, and PTSD treatment. It combines immersive 3D environments with clinical assessment tools to support mental wellness in a controlled, therapeutic way.

---

## 🌟 Features

- **Clinical Assessment Wizard**: Comprehensive evaluation using validated clinical scales (GAD-7, PCL-5, specific phobia ratings).
- **Immersive VR Environments (WebVR/A-Frame)**: Experience controlled virtual worlds designed for targeted exposure therapy, including:
  - 🏙️ **Height Therapy** (`sky.html`): Gradual exposure from low platforms to skyscrapers.
  - ✈️ **Flying Simulation** (`air.html`): Overcome aerophobia through realistic flight experiences with turbulence simulation.
  - 🎤 **Social Training** (`public.html`): Practice public speaking in front of dynamic virtual audiences.
  - 🏥 **Medical Training** (`ot.html`): Overcome medical procedure anxiety in a simulated operation theater.
  - 🚪 **Claustrophobia Therapy** (`claustro.html`): Elevator simulation.
  - 🌑 **Darkness Therapy** (`darkness.html`): Dark room simulation.
- **Therapy Dashboard**: Track progress, anxiety reduction, exposure tolerance, and session completion metrics.
- **Secure Authentication**: Backend-supported user registration and login to securely save session data and assessments.

---

## 🏗️ Technology Stack

### Frontend
- **HTML5, CSS3, JavaScript (ES6+)**: Core structure, styling, and application logic.
- **A-Frame**: Web framework for building virtual reality experiences (WebVR/WebXR).
- **Responsive UI**: Custom design system with a premium dark theme (`style.css`).

### Backend
- **Node.js & Express.js**: RESTful API server.
- **MongoDB & Mongoose**: Database for storing user profiles, assessments, and therapy results.
- **JWT & bcryptjs**: Secure authentication and password hashing.

---

## 📁 Project Structure

```text
VR-Therapy-Hub-main/
│
├── frontend/                 # Client-side VR application
│   ├── index.html            # Main landing page & dashboard
│   ├── login.html            # User login page
│   ├── signup.html           # User registration page
│   ├── app.js                # Core UI logic, assessments, and API integration
│   ├── style.css             # Main stylesheet & custom design system
│   ├── air.html              # VR Scene: Airplane cabin
│   ├── sky.html              # VR Scene: Skyscraper heights
│   ├── public.html           # VR Scene: Auditorium / Public speaking
│   ├── ot.html               # VR Scene: Operation Theater
│   ├── claustro.html         # VR Scene: Elevator
│   └── darkness.html         # VR Scene: Dark room
│
├── backend/                  # Server-side API
│   ├── server.js             # Main Express server entry point
│   ├── models/               # Mongoose database models
│   ├── routes/               # API route definitions (auth, results, therapy)
│   ├── package.json          # Backend dependencies
│   └── .env                  # Environment configuration variables
│
└── package.json              # Project-level scripts (concurrently)
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or Atlas URI)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd VR-Therapy-Hub-main
   ```

2. **Install Root Dependencies:**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Configure Environment Variables:**
   - Ensure you have a `.env` file in the `backend/` directory with:
     ```env
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

5. **Run the Application:**
   From the root directory, you can start both the frontend and backend concurrently:
   ```bash
   # Starts Node server and serves frontend
   npm start
   ```
   *(Alternatively, run `npm run backend` and `npm run frontend` in separate terminals).*

6. **Access the App:**
   - Open your browser and navigate to the frontend URL (usually `http://localhost:3000` or served via `npx serve`).

---

## 💡 Usage Notes

- **VR Compatibility**: The VR scenes are built on A-Frame and can be viewed on desktop browsers (using mouse/WASD controls), mobile devices (magic window), or dedicated VR headsets (Meta Quest, HTC Vive, etc.).
- **Simulations**: Inside specific VR scenes, use keyboard shortcuts (e.g., `1-9` in `sky.html` for height changes, `T` in `air.html` for turbulence) or UI overlays to adjust the exposure levels dynamically.

---

## 🔒 Security & Privacy
This application is designed with privacy in mind. Patient data, assessment scores, and biometric estimations are processed securely. Ensure your `.env` secrets are kept safe when deploying to production.
