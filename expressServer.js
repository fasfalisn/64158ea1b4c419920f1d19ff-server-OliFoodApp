// const { Middleware } = require('swagger-express-middleware');
const http = require("http");
const fs = require("fs");
const path = require("path");
const swaggerUI = require("swagger-ui-express");
const jsYaml = require("js-yaml");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { OpenApiValidator } = require("express-openapi-validator");
const logger = require("./logger");
const config = require("./config");
const { createuser } = require("./services/UserService");
const { User } = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  }
});

async function sendEmail(name, email, phone) {
  const mailOptions = {
    from: '"Olifood Team" <olifoodapp>', // sender address
    to: process.env.USER_EMAIL, // Your contact email or multiple recipients
    subject: 'Olifood - Νέα Επικοινωνία', // Subject line
    html: `
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Olifood - Νέα Επικοινωνία</title>
        </head>
        <body>
          <div style="font-family: verdana; max-width: 800px;">
            <h1>Νέα Επικοινωνία από τον/την ${name}</h1>
            <p><strong>Όνομα:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Τηλέφωνο:</strong> ${phone}</p>
            <p>Παρακαλούμε επικοινωνήστε μαζί του/της το συντομότερο δυνατόν.</p>
          </div>
        </body>
      </html>
    `,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email sending error:', error);
        reject(false); // Reject with failure
      } else {
        console.log('Email sent:', info.response);
        resolve(true); // Resolve with success
      }
    });
  });
}

class ExpressServer {
  constructor(port, openApiYaml) {
    dotenv.config();
    this.port = port;
    this.intervalId = null;
    this.serviceUrl = process.env.SERVICE_URL;
    this.app = express();
    this.openApiPath = openApiYaml;
    try {
      this.schema = jsYaml.safeLoad(fs.readFileSync(openApiYaml));
    } catch (e) {
      logger.error("failed to start Express Server", e.message);
    }
    this.setupMiddleware();
  }

  setupMiddleware() {
    // this.setupAllowedMedia();
    this.app.use(cors());
    this.app.use(bodyParser.json({ limit: "14MB" }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    //Simple test to see that the server is up and responding
    this.app.get("/hello", (req, res) =>
      res.send(`Hello World. path: ${this.openApiPath}`)
    );
    //Send the openapi document *AS GENERATED BY THE GENERATOR*
    this.app.get("/openapi", (req, res) =>
      res.sendFile(path.join(__dirname, "api", "openapi.yaml"))
    );
    //View the openapi document in a visual interface. Should be able to test from this page
    this.app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(this.schema));
    this.app.get("/login-redirect", (req, res) => {
      res.status(200);
      res.json(req.query);
    });
    this.app.get("/oauth2-redirect.html", (req, res) => {
      res.status(200);
      res.json(req.query);
    });

    this.app.post("/v1/register", async (req, res) => {
      if (req.body.password) {
        req.body.password = await bcrypt
          .hash(req.body.password, 12)
          .catch((err) => {
            res.status(500).json({ message: "Internal server error" });
          });
      }

      const { useremail, password, username, usercategory } = req.body;

      // Check if the useremail is already taken
      // const userExists = users.some((user) => user.useremail === useremail);
      const existingUser = await User.findOne({ useremail });

      if (existingUser) {
        res.status(400).json({ message: "useremail already exists" });
      } else {
        // If useremail is unique, create a new user
        const user = { useremail, password, username, usercategory };
        // users.push(newUser);
        createuser({ user });
        res
          .status(201)
          .json({ message: "Registration successful", user: user });
      }
    });

    this.app.post("/v1/login", async (req, res) => {
      const { useremail, password } = req.body;

      // Check if the user exists in the simulated database
      // const user = users.find((user) => user.useremail === useremail && user.password === password);

      try {
        // Find a user with the provided useremail and password
        const user = await User.findOne({ useremail });

        if (user) {
          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            res.status(500).json({ message: "Internal server error" });
            return;
          }

          const token = jwt.sign({ userid: user._id.toString() }, "secretKey", {
            expiresIn: "365d",
          });
          // If user exists, return the user data
          res.json({ user, token });
        } else {
          // If user doesn't exist or password is incorrect, return an error
          res.status(401).json({ message: "Authentication failed" });
        }
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    this.app.post('/v1/contact', async (req, res) => {
      const { name, email, phone } = req.body;
    
      // Simple validation
      if (!name || !email || !phone) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
    
      try {
        // Send the email
        const emailSent = await sendEmail(name, email, phone);
    
        if (emailSent) {
          return res.status(200).json({ message: 'Email sent successfully. We will contact you soon!' });
        } else {
          return res.status(500).json({ message: 'Failed to send email. Please try again later.' });
        }
      } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    });
    
  }

  launch() {
    new OpenApiValidator({
      apiSpec: this.openApiPath,
      operationHandlers: path.join(__dirname),
      validateRequests: false,
      fileUploader: { dest: config.FILE_UPLOAD_PATH },
    })
      .install(this.app)
      .catch((e) => console.log(e))
      .then(() => {
        // eslint-disable-next-line no-unused-vars
        this.app.use((err, req, res, next) => {
          // format errors
          res.status(err.status || 500).json({
            message: err.message || err,
            errors: err.errors || "",
          });
        });

        http.createServer(this.app).listen(this.port);
        console.log(`Listening on port ${this.port}`);
        // this.callService();
        // this.intervalId = setInterval(async () => {
        //   await this.callService();
        // }, 10 * 60 * 1000);
      });
  }

  async callService() {
    try {
      const response = await axios.get(this.serviceUrl);
      console.log("Service called successfully:", response.data);
    } catch (error) {
      console.error("Error calling service:", error.message);
    }
  }

  async close() {
    if (this.server !== undefined) {
      await this.server.close();
      console.log(`Server on port ${this.port} shut down`);
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
      console.log("Service interval cleared.");
    }
  }
}

module.exports = ExpressServer;
