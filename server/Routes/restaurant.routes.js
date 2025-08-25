import restaurantController from '../controllers/restaurant.controllers.js';
import express from 'express';
import authJwt from '../middleware/authjwt.js';

const router = express.Router();
//POST http://localhost:5000/api/v1/restaurants
router.post('/',authJwt.verifyToken, restaurantController.restaurantCreate);

//GET http://localhost:5000/api/v1/restaurants
router.get('/', restaurantController.getAllRestaurants);

//GET http://localhost:5000/api/v1/restaurants/:id
router.get('/:id', restaurantController.getRestaurantById);

//PUT http://localhost:5000/api/v1/restaurants/:id
router.put('/:id',authJwt.verifyToken, restaurantController.UpdateRestaurant);

//DELETE http://localhost:5000/api/v1/restaurants/:id
router.delete('/:id',authJwt.verifyToken, authJwt.isAdmin, restaurantController.deleteRestaurant);

export default router;