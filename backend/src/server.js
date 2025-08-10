import express from "express";
// const express = require("express");    // line 1 and 2 means same thing with different syntax

import notesRoutes from "./routes/notesRoutes.js"; // Importing the notes routes
import { connectDB } from "./config/db.js"; // Importing the database connection function

// Importing the connectDB function to establish a connection to MongoDB
import dotenv from "dotenv"; // Importing dotenv to manage environment variables
dotenv.config(); // Load environment variables from .env file

const app = express();
connectDB(); // Connect to the database

const PORT = process.env.PORT || 5001; // Use the PORT from environment variables or default to 5001

app.use("/api/notes",notesRoutes);

// Endpoint : An endpoint is a specific URL where an API can be accessed by a client application.
            //  it is the combination of the HTTP method and the URL which lets client access the server's resources.

app.listen(PORT, ()=> {
    console.log(`Server is running on port : ${PORT}` );
});