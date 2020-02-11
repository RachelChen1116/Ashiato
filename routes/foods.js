var express     = require("express");
var router      = express.Router({mergeParams: true});
var Campground  = require("../models/campground");
var Food     = require("../models/food");
var middleware  = require("../middleware");

// Show new foods route
router.get("/new", middleware.checkCampgroundOwnership, function (req, res) {
    // find campground by id
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("foods/new", {campground: campground});     
        }
    });
});

// post new foods route
router.post("/", middleware.checkCampgroundOwnership, function (req, res) {
   // look up campground by ID
   Campground.findById(req.params.id, function (err, campground) {
       if (err) {
           console.log(err);
           res.redirect("/campgrounds");
       } else {
          // create a new food
          Food.create(req.body.food, function (err, food) {
              if (err) {
                  req.flash("error", "Something went wrong!");
                  console.log(err);
              } else {
                  // add username and id to food
                  food.author.id = req.user._id;
                  food.author.username = req.user.username;
                  
                  // save food
                  food.save();
                  
                  // connect new food to campground
                  campground.foods.push(food);
                  campground.save();
                  
                  // redirect to the SHOW router
                  req.flash("success", "Successfully added food!");
                  res.redirect('/campgrounds/' + campground._id);
              }
          });
       }
   });
});

// edit food route
router.get("/:food_id/edit", middleware.checkFoodOwnership, function (req, res) {
    // found the food by requested id
   Food.findById(req.params.food_id, function(err, foundFood) {
      if (err) {
          res.redirect("back");
      } else {
          // if found, render the edit form and parse the campground and food object
          res.render("foods/edit", {campground_id: req.params.id, food: foundFood});
      }
   });
});

// update food route
router.put("/:food_id", middleware.checkFoodOwnership, function (req, res) {
    // find food with given requested food_id and update the food
    Food.findByIdAndUpdate(req.params.food_id, req.body.food, function (err, updatedFood) {
       if (err) {
           res.redirect("back");
       } else {
           // redirect to the show page for the campsite
           res.redirect("/campgrounds/" + req.params.id);
       }
   }); 
});

// food destroy route
router.delete("/:food_id", middleware.checkFoodOwnership, function (req, res) {
    // find the given food with id and remove it from database
    Food.findByIdAndRemove(req.params.food_id, function (err) {
        if (err) {
            res.redirect("back");
        } else {
            // show flash message and redirect to show if successfully deleted 
            req.flash("success", "Food deleted!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// export the router module
module.exports = router;