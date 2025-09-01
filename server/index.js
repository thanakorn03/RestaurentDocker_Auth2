import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './model/index.js';
import restaurantRoutes from './Routes/restaurant.routes.js';
import authRoutes from './Routes/auth.routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// CORS
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://192.168.2.34:5173",
  "https://restaurentdocker-auth2-client.onrender.com"
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // allow non-browser requests
    if(allowedOrigins.indexOf(origin) === -1){
      return callback(new Error(`CORS policy does not allow access from ${origin}`), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options("*", cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database init
const initializeDatabase = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Database synchronized");

    const Role = db.Role;
    const count = await Role.count();
    if(count === 0){
      await Role.bulkCreate([
        { name: "user" },
        { name: "moderator" },
        { name: "admin" }
      ]);
      console.log("Default roles created");
    } else {
      console.log("Roles already exist, skipping creation");
    }

  } catch(error){
    console.error("Database initialization error:", error);
  }
};

// Routes
app.get('/', (req,res) => {
  res.send('Restaurant Useful API');
});

app.use('/api/v1/restaurants', restaurantRoutes);
app.use("/api/v1/auth", authRoutes);

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
