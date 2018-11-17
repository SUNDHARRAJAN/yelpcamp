var express    = require("express"),
    app        = express(),
    bodyparser = require("body-parser"),
    mongoose   = require("mongoose"),
    flash      = require("connect-flash"),
    passport   = require("passport"),
    localstrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    User       = require("./models/user"),
    seedDB     = require("./seeds")
  
// requring routes    
var commentsRoutes  = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");
    
 
//mongoose.connect("mongodb://localhost:27017/yelp_camp_v9",{ useNewUrlParser: true });
mongoose.connect("mongodb://sundhar:sundhar1@ds163683.mlab.com:63683/yelpcamp1",{ useNewUrlParser: true });
//mongodb://sundhar:sundhar1@ds163683.mlab.com:63683/yelpcamp1

app.use(bodyparser.urlencoded({extended:true}));

app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//seedDB();  //seed the database

//passport configuration

app.use(require("express-session")({
    secret:"hi hello",
    resave: false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
     res.locals.success = req.flash("success");
    next();
});

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentsRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("The YelpCamp server has Started"); 
});