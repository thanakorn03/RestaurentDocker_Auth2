import restaurantController from '../controllers/restaurant.controllers.js';
import express from 'express';
const router = express.Router();
//POST http://localhost:5000/api/v1/restaurants
router.post('/', restaurantController.restaurantCreate);

//GET http://localhost:5000/api/v1/restaurants
router.get('/', restaurantController.getAllRestaurants);

//GET http://localhost:5000/api/v1/restaurants/:id
router.get('/:id', restaurantController.getRestaurantById);

//PUT http://localhost:5000/api/v1/restaurants/:id
router.put('/:id', restaurantController.UpdateRestaurant);

//DELETE http://localhost:5000/api/v1/restaurants/:id
router.delete('/:id', restaurantController.deleteRestaurant);

export default router;