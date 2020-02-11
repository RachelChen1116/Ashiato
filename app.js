// import packages
var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    Campground     = require("./models/campground"),
    Food        = require("./models/food"),
	Comment        = require("./models/comment"),
    User           = require("./models/user"),
    seedDB         = require("./seeds");

// requiring routes
var foodRoutes    = require("./routes/foods"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require('./routes/index');
	commentRoutes      = require('./routes/comment');
    
// set up the mongodb
var url =process.env.MONGODB_URI || 'mongodb+srv://rachelchen1116:'+process.env.MONGO_PASSWORD+'@cluster0-pdct2.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(url);

app.locals.lang = 0;
app.locals.vocab = require("./public/stylesheets/vocab.js");
app.locals.n_lang = app.locals.vocab.English.length;

// set up body-parser
app.use(bodyParser.urlencoded({extended: true}));
// set up the ejs view engine
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// set up method override
app.use(methodOverride("_method"));
// set up connect-flash
app.use(flash());

// seedBD for testing
// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Everything is awesome",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware to create globle varible for currentUser
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// set up routes
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/foods", foodRoutes);
app.use("/campgrounds/:camp_id/:food_id/comments", commentRoutes);

// set up the server
app.listen(process.env.PORT, process.env.IP, () => console.log("The YelpCamp Server Has Started!"));