# Business Workflow API

## Overview

This project implements a Business Workflow API that allows users to create, retrieve, and update business profiles through various stages of a workflow. The API is built using Node.js, Express, TypeScript, and MongoDB.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [API Documentation](#api-documentation)
4. [Swagger Details](#swagger-details)
5. [Testing](#testing)
6. [Project Structure](#project-structure)
7. [Key Features](#key-features)
8. [Potential Flaws and Improvements](#potential-flaws-and-improvements)

## Installation

1. Clone the repository:

git clone https://github.com/yourusername/business-workflow-api.git 

2. Install dependencies:

cd business-workflow-api
npm install

3. Set up environment variables:
Create a `.env` file in the root directory and add the following:

PORT=3000
MONGODB_URI=mongodb://localhost:27017/business-workflow

4. Start the server:
npm run dev


## Usage

The API will be available at `http://localhost:3000` (or the port you specified in the `.env` file).

## API Documentation

### Endpoints

1. **Create a new business**
- Method: POST
- URL: `/api/business`
- Body:
  ```json
  {
    "FEIN": "123456789",
    "name": "Test Business",
    "classification": {
      "bureau": "WCIRB",
      "classCode": "9079"
    },
    "phoneNumber": "1234567890",
    "xMod": 1.0
  }
  ```
- Response: 201 Created

2. **Get a business by ID**
- Method: GET
- URL: `/api/business/:id`
- Response: 200 OK

3. **Get all businesses**
- Method: GET
- URL: `/api/businesses`
- Response: 200 OK

4. **Update business status**
- Method: PUT
- URL: `/api/business/:id`
- Body:
  ```json
  {
    "classification": {
      "bureau": "WCIRB",
      "classCode": "9079"
    },
    "phoneNumber": "1234567890",
    "xMod": 1.0
  }
  ```
- Response: 200 OK

## Swagger Details

Swagger documentation is available at `/api-docs` when the server is running. It provides detailed information about each endpoint, including request/response schemas and example payloads.

To access Swagger UI:
1. Start the server
2. Open a web browser and navigate to `http://localhost:3000/api-docs`

## Testing
Run the test suite using the following command:
npm test

The tests cover various scenarios for each endpoint, including:
- Creating a new business
- Retrieving a business by ID
- Getting all businesses
- Updating business status
- Handling error cases (e.g., invalid input, not found)

## Project Structure
/business-workflow-api
├── src/
│   ├── controllers/
│   │   └── business/
│   │       ├── createBusiness.ts
│   │       ├── getBusinessById.ts
│   │       ├── getAllBusinessList.ts
│   │       └── updateBusinessStatus.ts
│   ├── models/
│   │   └── Business.model.ts
│   ├── routes/
│   │   └── Business.route.ts
│   ├── utils/
│   │   └── business-helper.ts
│   └── index.ts
├── tests/
│   └── controllers/
│       └── business/
│           ├── createBusiness.test.ts
│           ├── getBusinessById.test.ts
│           ├── getAllBusinessList.test.ts
│           └── updateBusinessStatus.test.ts
├── .env
├── package.json
├── tsconfig.json
└── README.md


## Key Features

1. **Workflow Stages**: The API implements a business workflow with stages including New, Market Approved, Market Declined, Sales Approved, and Sales Declined.
2. **Data Validation**: Input data is validated to ensure required fields are provided and conform to expected formats.
3. **Next Required Data**: The API provides information about the next required data for each business based on its current status.
4. **TypeScript**: The project is built with TypeScript, providing type safety and improved developer experience.
5. **MongoDB Integration**: Data is persisted in a [MongoDB](https://www.mongodb.com/) database, allowing for scalable and flexible data storage.
6. **Testing**: Comprehensive test suite using Jest and Supertest to ensure API reliability.

## Potential Flaws and Improvements

1. **Authentication and Authorization**: The current implementation lacks user authentication and authorization. Implementing [JWT](https://jwt.io/)-based authentication would improve security.

2. **Rate Limiting**: Adding rate limiting would protect the API from abuse and ensure fair usage.

3. **Logging**: Implement a robust logging system for better debugging and monitoring.

4. **Input Sanitization**: While some validation is in place, additional input sanitization could improve security.

5. **Error Handling**: Implement a centralized error handling mechanism for more consistent error responses.

6. **Database Indexing**: Optimize database queries by adding appropriate indexes to the MongoDB collections.

7. **Caching**: Implement caching mechanisms to improve performance for frequently accessed data.

8. **Pagination**: Add pagination to the getAllBusinessList endpoint to handle large datasets more efficiently.

9. **API Versioning**: Implement API versioning to allow for future updates without breaking existing client integrations.

10. **Dockerization**: Containerize the application for easier deployment and scaling.

By addressing these points, the project can be made more robust, secure, and production-ready.
