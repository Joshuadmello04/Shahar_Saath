# Smart Slum Community App

## 🚀 Vision & Purpose

In a world where urban expansion often sidelines the needs of marginalized communities, technology must bridge the gap. The **Smart Slum Community App** is built for and with slum residents, empowering them to report issues, communicate with NGOs, and bring real-world impact through AI-driven solutions.

## 🌍 What This App Does

The **Smart Slum Community App** is a **React Native** mobile application that enables slum dwellers to:

- 📸 **Report Grievances:** Upload images of problems (e.g., water shortages, sanitation issues, disasters).
- 🔍 **AI-Powered Issue Classification:** Uses a **ResNet-18** model to classify issues into categories such as **Water, Sanitation, Communal, or Disaster**.
- 📝 **Automated Captioning:** Generates issue descriptions using **BLIP (Bootstrapping Language-Image Pretraining)**, making reports comprehensive and understandable.
- 📍 **Geotagged Reports:** Ensures that reported issues are mapped in real-time for NGOs and government organizations.
- 🛠️ **Fake Grievance Detection:** Helps maintain authenticity and accountability in reporting.
- 💬 **Community Chat & Support:** Enables residents to communicate, discuss solutions, and receive NGO updates.

---

## 🏗️ Tech Stack

### **Frontend (Mobile App)**
- **React Native**
- **Expo** (for seamless development and testing)
- **Tailwind CSS** (for styling)

### **Backend & AI Models**
- **FastAPI** (for handling API requests efficiently)
- **PyTorch** (for ResNet-18 and BLIP models)
- **MongoDB** (for structured data storage)
- **Node.js & Express** (for server-side functionality)

---

## 🛠️ Setup & Installation

### **1️⃣ Clone the Repository**
```sh
  git clone https://github.com/yourusername/smart-slum-app.git
  cd smart-slum-app
```

### **2️⃣ Install Dependencies**
```sh
  npm install  # Install React Native dependencies
```

### **3️⃣ Start the Expo Development Server**
```sh
  npx expo start
```

### **4️⃣ Set Up Backend (FastAPI & AI Models)**
1. Navigate to the backend folder:
```sh
  cd backend
```
2. Install dependencies:
```sh
  pip install -r requirements.txt
```
3. Run the FastAPI server:
```sh
  uvicorn app:app --reload
```

### **5️⃣ Start the Node.js Server**
1. Navigate to the backend folder:
```sh
  cd backend
```
2. Install dependencies:
```sh
  npm install
```
3. Run the server:
```sh
  node server.js
```

---

## 🌟 Contributing
We believe in **open-source for social good**. If you’d like to contribute:
1. Fork the repo
2. Create a feature branch (`feature-new-enhancement`)
3. Push changes and submit a PR

---
## 🏆 Why This Matters
This project is more than just an app—it’s a movement. By leveraging AI and community-driven reporting, we bridge the gap between slum residents and the organizations that can help them. Every issue reported and resolved brings us closer to sustainable urban development.

🌟 **Join us in making a difference.** Contribute, fork, or simply spread the word. **#TechForGood**

📩 Contact:
crce.9886.ce@gmail.com
crce.9882.ce@gmail.com
🌐 : https://joshuadmello.vercel.app

