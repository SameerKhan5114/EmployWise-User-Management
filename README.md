echo "# EmployWise User Management System

This is a full-stack user management system built using:

- **Frontend:** React, Bootstrap
- **Backend:** Node.js, Express, MongoDB
- **Authentication:** JWT-based authentication

## Setup Instructions

1. Clone the repository:
   \`\`\`
 
   cd YOUR_REPOSITORY
   \`\`\`

2. Install dependencies:
   \`\`\`
   cd backend
   npm install
   cd ../frontend
   npm install
   \`\`\`

3. Configure `.env` file (create a `backend/.env` file and add):
   \`\`\`
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   \`\`\`

4. Run the application:
   \`\`\`
   cd backend
   npm start
   cd ../frontend
   npm start
   \`\`\`

## Features
- User authentication (Login/Logout)
- Fetch users from database
- Edit and delete users
- Pagination support

## API Endpoints
- **GET /api/users** - Get paginated users
- **PUT /api/users/:id** - Update user
- **DELETE /api/users/:id** - Delete user


