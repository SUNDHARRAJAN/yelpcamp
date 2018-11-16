var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//INDEX - SHOW ALL CAMPGROUNDS
router.get("/",function(req,res){
    
    Campground.find({},function(err,allCampgrounds){
       if(err){
           console.log(err);
       }
       else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
       }
    });
});

//CREATE - ADD A NEW CAMPGROUND TO DB
router.post("/",middleware.isLoggedIn,function(req, res) {
     //get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc =req.body.description;
    var author = {
        id:req.user._id,
        username:req.user.username
    }
    var newcampground={name:name,price:price,image:image,description:desc,author:author};
    Campground.create(newcampground,function(err,newlycreated){
        if(err){
            console.log(err);
        }else{
            //redirect back to campgrounds page
            //console.log(newlycreated);
            res.redirect("/campgrounds");
        }
    });
});
//NEW-SHOW FORM TO CREATE NEW CAMPGROUND
router.get("/new",middleware.isLoggedIn,function(req, res) {
   res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
router.get("/:id",function(req, res) {
    //find the campground with provited the Ip
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
              //render show template with that campground
                res.render("campgrounds/show",{campground: foundCampground});
        }
    });

});

// edit campground route
router.use("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    
    Campground.findById(req.params.id,function(err,foundCampground) {
        res.render("campgrounds/edit",{campground:foundCampground});
            });
    //otherwise,redirect
    //if not,redirect
});
//update campground route
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    //find and update correct campgrounds
    
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampgrounds){
    if(err){
        res.redirect("/campgrounds");
    }
    else{
          //redirect somewhere(show page)
        res.redirect("/campgrounds/" + req.params.id)
    }
});
});

//Destory campground route
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    })
});



module.exports = router;