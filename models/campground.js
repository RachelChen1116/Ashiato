var mongoose = require("mongoose");

// schema set up
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }, 
        username: String
    },
    foods: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Food"
        }
    ]
});

// create campground model using the schema and export it
module.exports = mongoose.model("Campground", campgroundSchema);

