var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
    {
        name: "Vermilion Lake Site", 
        image: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description: "Nestled on the shore of Lake Vermilion, this campground is a beauty with excellent fishing access."
    },
    {
        name: "Superior Hiking Trail", 
        image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description: "Beautiful lake superior view"
    },
    {
        name: "Vermilion Lake Site 2", 
        image: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description: "Again, Nestled on the shore of Lake Vermilion, this campground is a beauty with excellent fishing access."
    },
    {
        name: "Red Rock", 
        image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description: "Big red rocks n stuff"
    }
];

function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else{
            console.log("removed campgrounds");

            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is beautiful!",
                                author: {
                                    username: "Test1"
                                }
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("comment added");
                                }
                            });
                    }
                });
            });      
        }
    });
};

module.exports = seedDB;