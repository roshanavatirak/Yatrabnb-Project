# YatraBnB

YatraBnB is a secure, full-stack property booking platform inspired by Airbnb, featuring 50+ active listings, interactive maps, and role-based authentication. This project is built with Node.js backend and EJS templates for frontend rendering.

---

## Live Demo  
[https://yatrabnb-project.onrender.com](https://yatrabnb-project.onrender.com)

---

## Features

- Real-time signup/login with Passport.js and salted + hashed passwords (PBKDF2) for enhanced security  
- Separate login flows and dashboards for users and admins  
- Interactive maps using Leaflet.js and OpenStreetMap tiles  
- Location search powered by OpenStreetMap Nominatim API (geocoding)  
- Responsive UI built with Bootstrap for clean and mobile-friendly design  
- Backend monitoring and performance improvements with Hopscotch  
- 50+ property listings with booking and management functionalities  

---

## Tech Stack

- Backend: Node.js, Express.js  
- Frontend: EJS templates, Bootstrap  
- Authentication: Passport.js, PBKDF2 (salt + hash)  
- Database: MongoDB Atlas (cloud-hosted)  
- Maps & Geocoding: Leaflet.js, OpenStreetMap, Nominatim API  
- Deployment: Render.com  

---

## Installation & Setup

Follow these steps to run YatraBnB locally on your machine:

1. **Clone the repository**  
```bash
git clone https://github.com/roshanavatirak/yatrabnb.git
cd yatrabnb
