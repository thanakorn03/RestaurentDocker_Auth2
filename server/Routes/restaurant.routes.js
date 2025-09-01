import restaurantController from '../controllers/restaurant.controllers.js';
import express from 'express';
import authJwt from '../middleware/authjwt.js';

const router = express.Router();

//POST - user & admin
router.post('/', authJwt.verifyToken, restaurantController.restaurantCreate);

//GET - public
router.get('/', restaurantController.getAllRestaurants);
router.get('/:id', restaurantController.getRestaurantById);

//PUT - admin หรือ owner ของร้าน
router.put('/:id', authJwt.verifyToken, authJwt.isOwnerOrAdmin, restaurantController.UpdateRestaurant);

//DELETE - admin only
router.delete('/:id', authJwt.verifyToken, authJwt.isAdmin, restaurantController.deleteRestaurant);

export default router;
