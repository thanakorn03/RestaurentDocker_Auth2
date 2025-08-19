import Restaurant from '../model/restaurant.model.js';
const restaurantController = {};

// Create and Save a new Restaurant
 restaurantController.restaurantCreate = async (req, res) => {
        const { title, type, img } = req.body;
        // Validate input
        if (!title || !type || !img) {
            return res.status(400).send({ message: "name type and imageURL need to be fill" });
        }
        await Restaurant.findOne({ where: { name: title } })
            .then(async (restaurant) => {
                if (restaurant) {
                    return res.status(400).send({ message: "Restaurant already exists" });
                }
                const newRestaurant = {
                    name: title,
                    type: type,
                    imageURL: img
                };
                Restaurant.create(newRestaurant).then((data) => {
                    res.send((data));
                }
                ).catch((error) => {
                    res.status(500).send({ message: error.message || "Some error occurred while creating the Restaurant." });
                });
            })};
// Get all Restaurants
restaurantController.getAllRestaurants = async (req, res) => {
    await Restaurant.findAll()
        .then(restaurants => {
            res.status(200).send(restaurants);
        })
        .catch(error => {
            res.status(500).send({ message: error.message || "Some error occurred while retrieving restaurants." });
        });
};
// Get a single Restaurant by ID
restaurantController.getRestaurantById = async (req, res) => {
    const id = req.params.id;
    await Restaurant.findByPk(id)
        .then(restaurant => {
            if (!restaurant) {
                return res.status(404).send({ message: "Restaurant not found id" + id });
            }
            res.status(200).send(restaurant);
        })
        .catch(error => {
            res.status(500).send({ message: error.message || "Some error occurred while retrieving the restaurant." });
        });
};
// Update a Restaurant by ID
restaurantController.UpdateRestaurant = async (req, res) => {
    const id = req.params.id;
    const { name, type, imageURL } = req.body;
        // validate input
        if (!name && !type && !imageURL) {
            return res.status(400).send({ message: "name type and imageURL need to be fill" });
        }
    await Restaurant.update(
        { name, type, imageURL },
        { where: { id: id } }
    )
        .then(num => {
            if (num[0] === 1) {
                res.send({ message: "Restaurant was updated successfully." });
            } else {
                res.send({ message: `Cannot update Restaurant with id=${id}. Maybe Restaurant was not found or req.body is empty!` });
            }
        })
        .catch(error => {
            res.status(500).send({ message: error.message || "Error updating Restaurant with id=" + id });
        });
}
// Delete a Restaurant by ID
restaurantController.deleteRestaurant = async (req, res) => {
    const id = req.params.id;
    await Restaurant.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({ message: "Restaurant was deleted successfully!" });
            } else {
                res.send({ message: `Cannot delete Restaurant with id=${id}. Maybe Restaurant was not found!` });
            }
        })
        .catch(error => {
            res.status(500).send({ message: error.message || "Could not delete Restaurant with id=" + id });
        });
}
export default restaurantController;
