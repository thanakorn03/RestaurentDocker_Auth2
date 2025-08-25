import express from 'express'
import dotenv from 'dotenv'
import restaurantRoutes from './Routes/restaurant.routes.js';
import authRoutes from './Routes/auth.routes.js';
import cors from 'cors';
import db from './model/index.js';

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174", // <--- เพิ่มบรรทัดนี้
    "http://127.0.0.1:5174"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const initializeDatabase = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Database synchronized");
    const Role = db.Role;
    const count = await Role.count();
    if (count === 0) {
      await Role.bulkCreate([
        { name: "user" },
        { name: "moderator" },
        { name: "admin" }
      ]);
      console.log("Default roles created");
    } else {
      console.log("Roles already exist, skipping creation");
    }
  } catch (error) {
    console.error("Database initialization error:", error);
  }
};

app.get('/', (req, res) => {
  res.send('Restaurant Useful API')
});

app.use('/api/v1/restaurants', restaurantRoutes);
app.use("/api/v1/auth", authRoutes);

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});