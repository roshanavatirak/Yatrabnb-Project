# YatraBnB

YatraBnB is a full-stack property booking platform inspired by Airbnb. It offers secure user and admin authentication, interactive map integration for location-based searches, and property booking features. This project is open-source and welcomes contributors.

## 📍 Live URL

- Project: [https://yatrabnb-project.onrender.com](https://yatrabnb-project.onrender.com)
- Repository: [https://github.com/roshanavatirak/Yatrabnb-Project](https://github.com/roshanavatirak/Yatrabnb-Project)

---

## 🔧 Tech Stack and Tools

### Backend
- **Node.js & Express.js**: Used to build the RESTful backend and handle server-side logic.
- **Passport.js**: For user authentication (signup/login).
- **PBKDF2**: Hashing algorithm used with salt to securely store passwords.

### Frontend
- **EJS Templates**: Server-side rendering for dynamic HTML views.
- **Bootstrap**: For responsive and clean UI/UX design.

### Mapping & Geolocation
- **Leaflet.js**: Lightweight JS library to display interactive maps.
- **OpenStreetMap**: Base map tiles for displaying geographical data.
- **Nominatim API**: For geocoding location names into latitude and longitude.

### Database
- **MongoDB Atlas**: Cloud-hosted NoSQL database to store user, admin, and property data.

### Deployment
- **Render**: The app is deployed using [Render](https://render.com).

### API Testing
- **Hoppscotch**: Used to test, debug, and monitor API routes during backend development.

---

## ✅ Core Features

1. **User Authentication**
   - Real-time login/signup with Passport.js
   - Salted and hashed passwords using PBKDF2 algorithm for extra security
   - Separate login flows for users and administrators

2. **Admin Panel**
   - Add, update, or delete property listings
   - Manage user bookings

3. **User Interface**
   - Browse 50+ active property listings
   - Book and manage reservations
   - Search for properties based on location using a dynamic map

4. **Map Integration**
   - Interactive map view using Leaflet.js
   - Search locations with real-time geocoding via Nominatim API

---

## 📁 Project Structure

Yatrabnb-Project/
│
├── models/ # Mongoose models (User, Property, Admin, etc.)
├── routes/ # Express route handlers
├── views/ # EJS templates
├── public/ # Static files (CSS, JS, images)
├── middleware/ # Custom middlewares (auth, error handlers)
├── utils/ # Utility functions (geocoding, hashing)
├── app.js # Main application file
├── .env # Environment variables (not pushed)
└── package.json # Dependencies and scripts

yaml
Copy
Edit

---

## 🖥️ Local Setup Instructions

Follow these steps to run YatraBnB locally:

### 1. Clone the Repository

```bash
git clone https://github.com/roshanavatirak/Yatrabnb-Project.git
cd Yatrabnb-Project
2. Install Dependencies
bash
Copy
Edit
npm install
3. Set Up Environment Variables
Create a .env file in the root directory with the following content:

ini
Copy
Edit
PORT=3000
MONGODB_URI=your_mongodb_atlas_uri
SESSION_SECRET=your_secret_key
4. Run the Application
bash
Copy
Edit
npm start
Access the app at: http://localhost:3000

🤝 Contributing
We welcome contributions from the community. Here's how to get started:

Fork the Repository

Click on the "Fork" button on the top right of the GitHub repo.

Clone Your Fork

bash
Copy
Edit
git clone https://github.com/your-username/Yatrabnb-Project.git
cd Yatrabnb-Project
Create a New Branch

bash
Copy
Edit
git checkout -b feature/your-feature-name
Make Changes and Commit

bash
Copy
Edit
git add .
git commit -m "Add feature: your description"
Push to Your Fork

bash
Copy
Edit
git push origin feature/your-feature-name
Create a Pull Request

Go to the original repo and open a new Pull Request describing your changes.

All contributors will be credited in the contributors section once merged.

📧 Contact
For any queries, suggestions, or collaborations:

Roshan Avatirak
Email: roshanavatirak@gmail.com
GitHub: @roshanavatirak
