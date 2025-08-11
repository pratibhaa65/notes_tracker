import express from "express";
// const express = require("express");    // line 1 and 2 means same thing with different syntax
import cors from "cors"; // Importing CORS middleware for handling cross-origin requests

// Importing the connectDB function to establish a connection to MongoDB
import dotenv from "dotenv"; // Importing dotenv to manage environment variables

import notesRoutes from "./routes/notesRoutes.js"; // Importing the notes routes
import { connectDB } from "./config/db.js"; // Importing the database connection function
import rateLimiter from "./middleware/rateLimiter.js"; // Importing the rate limiter middleware

dotenv.config(); // Load environment variables from .env file

const app = express();
connectDB(); // Connect to the database

app.use(cors(
    {
        origin: "http://localhost:5173",
    }
)); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(rateLimiter); // Apply rate limiting middleware to all routes


const PORT = process.env.PORT || 5001; // Use the PORT from environment variables or default to 5001

app.use("/api/notes",notesRoutes);

// Endpoint : An endpoint is a specific URL where an API can be accessed by a client application.
            //  it is the combination of the HTTP method and the URL which lets client access the server's resources.

app.listen(PORT, ()=> {
    console.log(`Server is running on port : ${PORT}` );
});