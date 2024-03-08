
# Full Stack Application

## Overview
This project is a full-stack web application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). 

## Features
- Token based Authentication/Authorisation.
- API Development and Integration.
- Developed using ReactJS and Tailwindcss to create a modern and responsive user interface.


## Technology used
- MongoDB: Database to store and manage data.
- Express.js: Backend framework for building RESTful APIs.
- React.js: Frontend library for building user interfaces.
- Node.js: Server-side JavaScript runtime environment.

## Requirements
Before getting started, ensure you have the following installed:
- Node.js and npm: Node.js is the JavaScript runtime, and npm is the package manager for Node.js.
- MongoDB: MongoDB is the NoSQL database used for storing data.


## Configuration
Create a .env file in the server directory of the project and add the necessary environment variables:

- MONGODB_URL 
- ACCESS_TOKEN_SECRET_KEY 
- REFRESH_TOKEN_SECRET_KEY

Replace the values with your desired configurations, such as  MongoDB URI and a secure JWT secret key.

## Installation

- `git clone https://github.com/maaz64/fullstack-project`
- `cd fullstack-project`
- `cd server` 
- `npm install` to install all the dependencies of backend
- open new terminal and run `cd client` to open the client directory.
- `npm install` to install all the dependencies of frontend
- run `npm start` to start the development server for frontend    and backend in their respective terminals.


## User Authentication API
The backend includes APIs for user authentication using JSON Web Tokens (JWT).(API documentation coming soon)

## Post API
The Post API provides endpoints for managing post-related operations, including creating and retrieving post data.(API documentation coming soon)


## Dependencies
List of main dependencies used in project.

- express: Fast, unopinionated, minimalist web framework for Node.js.

- mongoose: Elegant MongoDB object modeling for Node.js.
- jsonwebtoken: JSON Web Token implementation for Node.js.
For a complete list of dependencies, check the package.json file.
