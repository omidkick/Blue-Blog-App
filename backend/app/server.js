const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const allRoutes = require("./router/router");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const createError = require("http-errors");
const path = require("path");
dotenv.config();
class Application {
  #app = express();
  #PORT = process.env.PORT || 5000;
  #DB_URI = process.env.MONGODB_URI;

  constructor() {
    this.createServer(); 
    this.connectToDB();
    this.configServer();
    this.initClientSession();
    this.configRoutes();
    this.errorHandling();
  }
  createServer() {
    this.#app.listen(this.#PORT, () =>
      console.log(`listening on port ${this.#PORT}`)
    );
  }
  connectToDB() {
    mongoose.set("strictQuery", true);
    mongoose.connect(
      `${this.#DB_URI}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        authSource: "admin",
      },
      (err) => {
        if (!err) {
          console.log("MongoDB connected!!");
        } else {
          console.log("Failed to connect to MongoDB", err);
        }
      }
    );
  }
  configServer() {
    // CORS Configuration
    const corsOptions = {
      origin: function (origin, callback) {
        // List of allowed domains
        const allowedDomains = [
          'https://blue-blog.ir',
          'https://www.blue-blog.ir',
          'http://localhost:3000',
          'http://localhost:3001'
        ];
        
        // Allow requests with no origin (like mobile apps or server requests)
        if (!origin) return callback(null, true);
        
        if (allowedDomains.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          console.log('Blocked by CORS:', origin);
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Cookie']
    };

    this.#app.use(cors(corsOptions));
    
    // Handle preflight requests
    this.#app.options('*', cors(corsOptions));
    
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname, "..")));
  }
  initClientSession() {
    this.#app.use(cookieParser(process.env.COOKIE_PARSER_SECRET_KEY));
  }
  configRoutes() {
    this.#app.use("/api", allRoutes);
  }
  errorHandling() {
    this.#app.use((req, res, next) => {
      next(createError.NotFound("آدرس مورد نظر یافت نشد"));
    });
    this.#app.use((error, req, res, next) => {
      const serverError = createError.InternalServerError();
      const statusCode = error.status || serverError.status;
      const message = error.message || serverError.message;
      return res.status(statusCode).json({
        statusCode,
        message,
      });
    });
  }
}

module.exports = Application;