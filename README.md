# Lead Management Module

A simple full-stack Lead Management app built with **React + Vite + Tailwind CSS** (frontend) and **Node.js + Express + MongoDB (Mongoose)** (backend).

## Features

- Add new leads via a validated form
- Read long notes via a “Read More” modal
- Edit existing leads in a modal
- Delete leads
- Form validation (name, email, phone, company)
- Duplicate checks on email/phone in backend
- Responsive UI (tables wrapped with horizontal scroll on small screens)
- Clean API responses: `{ success, error, message, data }`

---

## Tech Stack

**Frontend**
- React, React Router
- Tailwind CSS
- Vite

**Backend**
- Node.js, Express
- MongoDB, Mongoose
- CORS, dotenv

---

## Project Structure

```
lead-management/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── userController.js
│   ├── models/
│   │   └── userModel.js
│   ├── routes/
│   │   └── route.js
│   ├── server.js
│   ├── .env # PORT, MONGO_URI, FRONTEND_URL
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Header.jsx
│   │   ├── helpers/
│   │   │   └── SummaryApi.js
│   │   ├── pages/
│   │   │   ├── LeadForm.jsx
│   │   │   ├── LeadList.jsx
│   │   │   └── EditLeadData.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
└── README.md
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Prince-singh-1619/LeadFlow.git
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=8080
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
FRONTEND_URL=http://localhost:5173
```

Start the backend server:

```bash
nodemon start
# Server is running on http://localhost:8080
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

---

## API Endpoints

Base URL: `http://localhost:8080/api`

### Create Lead

**POST** `/save-user`

```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9998887777",
    "company": "company-1",
    "notes": "Interested in our product."
}
```

**Responses:**
- `201`: `{ success: true, data, message }`
- `400`: Validation or duplicate (email/phone)
- `500`: Server error

### Get All Leads

**GET** `/get-users`

**Response:**
- `200`: `{ success: true, data: [ ... ] }`

### Update Lead

**PUT** `/update-user/:id`

```json
{
    "name": "John Updated",
    "email": "john@example.com",
    "phone": "9998887777",
    "company": "company-2",
    "notes": "Updated note"
}
```

**Responses:**
- `200`: `{ success: true, data }`
- `400/404/500`: Error states

### Delete Lead (optional)

**DELETE** `/delete-user/:id`

**Response:**
- `200`: `{ success: true, message }`

---

## Mongoose Model (User)

- `name`: String (required)
- `email`: String (required, unique, lowercase)
- `phone`: String (required, unique)
- `company`: String
- `notes`: String
- `timestamps`: createdAt, updatedAt

---

## Frontend Notes

### Routing

- `/` → LeadForm
- `/lead-list` → LeadList

### LeadForm Validation (example)

- Name required
- Email required + regex
- Phone: 10 digits
- Company required
- Notes ≤ 1000 chars

### LeadList

- Responsive table, wrapped in `overflow-x-auto`
- Notes truncated to 100 chars with "Read More" button → opens modal
- Edit button opens EditLeadData modal; on save, updates row in state

---

## 📷 Screenshots

<p align="center">
  <img src="./frontend/src/assets/SS 1.png" alt="Form" width="44%" />
  <img src="./frontend/src/assets/SS 2.png" alt="List" width="44%" />
</p>
<p align="center">
  <img src="./frontend/src/assets/SS 3.png" alt="Notes popup" width="44%" />
  <img src="./frontend/src/assets/SS 4.png" alt="Edit form" width="44%" />
</p>


---