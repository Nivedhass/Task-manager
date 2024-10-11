# Task Management Application

## Overview

The Task Management Application is a full-stack project designed to help users create, manage, and track their tasks efficiently. This application consists of a backend API built with Node.js and Express, and a frontend interface developed using React.

## Features

### Backend (Task Management API)

- **User Authentication**: Secure registration and login for users.
- **Task Management**: Create, read, update, and delete tasks.
- **Task Importance**: Mark tasks as important for prioritization.
- **Task Completion**: Update tasks to mark them as completed.
- **Task Filtering**: Retrieve all tasks, important tasks, completed tasks, and incomplete tasks.

### Frontend

- **User Interface**: Clean and intuitive interface for managing tasks.
- **Real-time Updates**: Automatically reflects changes without needing to refresh the page.

## Tech Stack

- **Backend**: 
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)

- **Frontend**: 
  - React
  - Axios (for API calls)
  - CSS (for styling)

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- MongoDB (local or remote)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <backend-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the environment variables:
   - Create a `.env` file in the root of the backend directory and add the following:
     ```
     MONGODB_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication

- **POST /api/auth/login**: User login
- **POST /api/auth/register**: User registration

### Tasks

- **POST /api/tasks/create-task**: Create a new task
- **GET /api/tasks/get-all-tasks**: Retrieve all tasks for the logged-in user
- **DELETE /api/tasks/delete-task/:id**: Delete a specific task
- **PUT /api/tasks/update-task/:id**: Update a specific task
- **PUT /api/tasks/update-imp-task/:id**: Toggle the importance of a task
- **PUT /api/tasks/update-complete-task/:id**: Update the completion status of a task
- **GET /api/tasks/get-imp-tasks**: Retrieve all important tasks
- **GET /api/tasks/get-complete-tasks**: Retrieve all completed tasks
- **GET /api/tasks/get-incomplete-tasks**: Retrieve all incomplete tasks

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.


## Acknowledgements

- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Axios](https://axios-http.com/) - Promise-based HTTP client for the browser and Node.js
