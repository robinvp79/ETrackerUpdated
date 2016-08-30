var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var passport = require('passport');
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var LocalStrategy = require('passport-local').Strategy;
var methodOverride = require('method-override')
var multer = require('multer')

var routes = require('./controllers/routes_controller.js');

var db = require('./models/index.js').sequelize;
// var Employee = require('./models').employee;
// db.sync();

var models = require('./models');
var sequelizeConnection = models.sequelize;
sequelizeConnection.query('SET FOREIGN_KEY_CHECKS = 0')
.then(function(){
	return sequelizeConnection.sync({force:false})
})

var app = express();
var storage = multer.diskStorage({
	destination: function(req, file, data){
		data(null, '/public/assets/assessments')
	},
	filename: function(req, file, dataName){
		dataname(null, file.fieldname);
	}
})
var upload = multer ({storage: storage})

app.use(express.static(process.cwd() + '/public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'))

app.use(session({
  secret: 'keyboard cat',
  cookie: { maxAge : 300000 },	// 5 minutes
  store: new SequelizeStore({
	db: db
  }),
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new LocalStrategy(function(username, password, done) {
	models.Employee.findOne({where:{username: username}}).then(function(employee) {
		if(!employee){
			return done(null, false);
		}
		var realPass = employee.password;
		if (!employee.username){
			return done(null, false);
		}
		if (password !== realPass){
			return done(null, false);
		}

		return done(null, employee);
	}).catch(function(err){
		throw err;
	});
}));

passport.serializeUser(function(employee, cb) {
  cb(null, employee.id);
});

passport.deserializeUser(function(id, cb) {
  models.Employee.findOne( {where: {id: id} }).then(function(employee) {
	cb(null, employee);
  }).catch(function(err) {
	if (err) {
	  return cb(err);
	}
  });
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

var PORT = 7070;
app.listen(process.env.PORT || PORT, function(){
	console.log('Connected and listening on', PORT)
})
