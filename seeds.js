 var mongoose   = require("mongoose");
 var Campground = require("./models/campground");
 var comment    = require("./models/comment");
 
 var data = [
        {
            name:"clouds",
            image:"https://www.ecoshape.org/uploads/sites/2/2016/06/building-with-nature-2-702x440.jpg",
            description:"Nature, in the broadest sense, is the natural, physical, or material world or universe. Nature can refer to the phenomena of the physical world, and also to life in general."
        },
        {
            name:"nature",
            image:"http://nebula.wsimg.com/f1790d90df046b654d956a01869839c8?AccessKeyId=F1D62B7B2CA8EB884A49&disposition=0&alloworigin=1",
            description:"Nature, in the broadest sense, is the natural, physical, or material world or universe. Nature can refer to the phenomena of the physical world, and also to life in general."
        },
        {
            name:"nature",
            image:"https://jooinn.com/images/nature-392.jpg",
            description:"Nature, in the broadest sense, is the natural, physical, or material world or universe.Nature can refer to the phenomena of the physical world, and also to life in general."
        },
 ]
 
 function seedDB(){
      Campground.remove({},function(err){
         if(err){
             console.log(err);
         }
        console.log("removed campgrounds"); 
        //add a few campgrounds
         data.forEach(function(seed){
             Campground.create(seed,function(err,campground){
                 if(err){
                     console.log(err);
                 }else{
                     console.log("added a campground");
                      //add a few comments
                      comment.create(
                          {
                              text:"This place is great,but I wish there was internet",
                              author:"hello"
                              
                          },function(err,comment){
                              if(err){
                                  console.log(err);
                              }else{
                                  campground.comments.push(comment);
                                  campground.save();
                                  console.log("created new comments");
                              }
                          });
                 }
            });
         });
      });
 }
 module.exports = seedDB;
 