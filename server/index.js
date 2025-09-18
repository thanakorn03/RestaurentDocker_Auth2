import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './model/index.js';
import restaurantRoutes from './Routes/restaurant.routes.js';
import authRoutes from './Routes/auth.routes.js';

dotenv.config();
const app = express();
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5000;

// CORS
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://192.168.2.34:5173",
  "https://restaurentdocker-auth2-client.onrender.com"
];

const corsOptions = {
  origin: function(origin, callback) {
    if(!origin) return callback(null, true); // allow non-browser requests
    if(allowedOrigins.indexOf(origin) === -1){
      return callback(new Error(`CORS policy does not allow access from ${origin}`), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// รองรับ preflight request ทุก route ด้วยตัว options
app.options("*", cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database init
const initializeDatabase = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database connection established successfully.");
    if (process.env.NODE_ENV === 'development') {
      await db.sequelize.sync({ alter: true }); // ใช้ alter ในการอัปเดตตารางให้ตรงกับโมเดล
      console.log("All models were synchronized successfully.");
    } else {
      await db.sequelize.sync();
      console.log("All models were synchronized successfully.");
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// Routes
app.get('/', (req,res) => {
  res.send('Restaurant Useful API');
});

app.use('/api/v1/activity', restaurantRoutes);
app.use("/api/v1/auth", authRoutes);

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
