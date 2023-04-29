
const mongoose=require("mongoose")



const restaurantSchema=mongoose.Schema({
    name: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String
    },
    menu: [{
        type: Object
    }]
})

const RestaurantModel=mongoose.model("restaurants",restaurantSchema)


module.exports = {
    RestaurantModel
}