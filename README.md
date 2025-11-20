# 📚 UniVerse - Campus Community Hub

UniVerse is a centralized web platform designed to bridge the gap between academic needs and campus community life. It allows students to share resources, find tutors, join clubs, manage events via a calendar, and trade items in a campus marketplace.

## 🚀 Features

The application is divided into three main "Hubs":

### 1\. 🎓 Academic Hub

  * **Beacons:** Location-based alerts or study spots.
  * **Resources:** Share and download study materials.
  * **Tutors:** Find peer tutors for specific subjects.

### 2\. 👥 Community Hub

  * **Clubs:** Explore and join student organizations.
  * **Events:** View upcoming events on an interactive **Calendar Widget**.
  * **Lost & Found:** Report and find lost items on campus.

### 3\. 🛒 Marketplace

  * **Buy & Sell:** a student-to-student marketplace.
  * **Direct Contact:** View seller details to arrange transactions.

### ✨ Core Functionalities

  * **User Authentication:** Sign up and Login (linked to Student ID).
  * **Profile Management:** View your own activity and posts.
  * **Real-time Updates:** immediate UI updates upon creating or deleting items.
  * **Search & Filter:** Filter content by name, location, or subject.

-----

## 🛠️ Tech Stack

  * **Frontend:** React.js, CSS3
  * **Backend:** Node.js, Express.js (Assumed based on API structure)
  * **Database:** MongoDB (Assumed based on `_id` field usage)

-----

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### Prerequisites

  * Node.js installed
  * MongoDB installed and running

### 1\. Clone the Repository

```bash
git clone https://github.com/yourusername/universe.git
cd universe
```

### 2\. Backend Setup

*Navigate to the server directory (adjust folder name if different).*

```bash
cd backend
npm install
# Start the backend server (runs on port 5001)
node index.js 
```

### 3\. Frontend Setup

*Open a new terminal and navigate to the client directory.*

```bash
cd frontend
npm install
# Start the React application
npm start
```

The app will launch at `http://localhost:3000`.

-----

## 🔌 API Endpoints

The frontend interacts with the backend via the following endpoints (running on port 5001):

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/signup` | Register a new student |
| `POST` | `/login` | Authenticate user |
| `GET` | `/beacons` | Fetch academic beacons |
| `GET` | `/resources` | Fetch study resources |
| `GET` | `/events` | Fetch community events |
| `GET` | `/market` | Fetch marketplace items |
| `POST` | `/[endpoint]` | Create a new item (dynamic based on category) |
| `DELETE` | `/[endpoint]/:id` | Delete an item created by the user |
