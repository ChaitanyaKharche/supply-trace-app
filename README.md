# Full-Stack Developer Take-Home Assessment

## Overview

This project is a web application that displays a list of companies and their details, including multiple possible locations. The application consists of a Python backend API and a React frontend with map integration, and is containerized using Docker.

## Requirements

- Python 3.8+
- Node.js 14+
- Docker

## Setup

### Backend

1. Navigate to the `backend` directory:
    ```sh
    cd backend
    ```

2. Create a virtual environment and install dependencies:
    ```sh
    python -m venv venv
    .\venv\Scripts\activate
    pip install -r requirements.txt
    ```

3. Run the backend server:
    ```sh
    uvicorn main:app --reload
    ```
![image](https://github.com/user-attachments/assets/9791f5f8-5a41-4b95-97c1-7bf5e2e1df3f)

### Frontend

1. Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Run the frontend server:
    ```sh
    npm start
    ```
![image](https://github.com/user-attachments/assets/946f8286-8c29-4e8b-bd21-57a63df12e75)

### Docker

1. Build and run the containers:
    ```sh
    docker-compose up --build
    ```

## Accessing the Application

- Backend API: [http://localhost:8000/docs](http://localhost:8000/docs)
- Frontend: [http://localhost:3000](http://localhost:3000)

## Sample Data

- `companies.csv`
- `locations.csv`

## API Endpoints

- `GET /companies` - Get all companies
- `GET /companies/{company_id}` - Get company details by ID
- `GET /companies/{company_id}/locations` - Get all locations for a specific company

## Additional Notes

- Ensure Docker is installed and running on your system.
- The backend API documentation is available at `/docs`.

## Running Tests

### Backend

1. Navigate to the `backend` directory:
    ```sh
    cd backend
    ```

2. Run the tests:
    ```sh
    pytest
    ```

## Evaluation Criteria

- Code quality and organization
- Proper use of Python, React, and Docker best practices
- Implementation of routing and state management in React
- Efficient handling of data from multiple CSV files
- Creativity and user experience in displaying company locations
- Error handling and edge cases
- Documentation and code comments
