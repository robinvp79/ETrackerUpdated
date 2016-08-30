var chalk = require('chalk');
var express = require('express');
var router = express.Router();
var models = require('../models');
var passport = require('passport');
var allInfo = {};

function getTables(){
	models.Department.findAll({})
	.then(function(data){
    	allInfo.departments=data;
    })
    .then(function(){
    	models.Employee.findAll({})
    	.then(function(data){
    		allInfo.employees=data;
    	})
    	.then(function(){
    		models.Training.findAll({})
    		.then(function(data){
    			allInfo.trainings=data;
    		})
    	})
    })
}

getTables();


router.get('/logout', function (req, res){
	req.logout();
	var sessionCookie = req.cookies['connect.sid'];
	res.clearCookie(sessionCookie);
	req.session.destroy(function (err) {
		res.redirect('/'); //Inside a callback… bulletproof!
	});
});



// router.get( '/logout', function ( req, res, next ) {
//     if ( req.isUnauthenticated() ) {
//         // you are not even logged in, wtf
//         res.redirect( '/' );
//         return;
//     }

//     var sessionCookie = req.cookies['connect.sid'];

//     if ( ! sessionCookie ) {
//         // nothing to do here
//         res.redirect( '/' );
//         return;
//     }

//     var sessionId = sessionCookie.split( '.' )[0].replace( 's:', '' );

//     thinky.r.db( 'test' ).table( 'session' ).get( sessionId ).delete().run().then( function( result ) {
//         if ( ! result.deleted ) {
//             // we did not manage to find session for this user
//             res.redirect( '/' );
//             return;
//         }
//         req.logout();
//         res.redirect( '/' );
//         return;
//     });
// });




router.get('/', function(req, res) {
	res.render('login');
})

router.post('/login', passport.authenticate('local', { failureRedirect: '/' }), function (req, res) {
	// seems to be a passport bug sending the redirect before the session is saved?
	// https://github.com/expressjs/session/issues/309
	req.session.save(function () {
		console.log("THIS IS REQ BODY", req.body.username)
		var username = req.body.username
		console.log("THIS IS THE USERNAME", username)
		models.Employee.findOne({where: {username: username}})
		.then (function(getUsername){
			console.log("THIS IS ACCOUNT TYPE", getUsername.accountType)
			if(getUsername.accountType === "User"){
				res.redirect('/user/'+username)
			}
			else {
				res.redirect('/admin/'+username);
			}
		})
		});
});

function authorized(req, res, next) {
		if (req.user) {
				next();
		} else {
				console.log(chalk.black.bgYellow('== Unauthorize User ===='));
				res.redirect('/');
		}
};
// Associations 
//http://stackoverflow.com/questions/22958683/how-to-implement-many-to-many-association-in-sequelize

router.get('/api', authorized, function(req, res) {
	console.log(chalk.black.bgYellow('GET /api'));
	res.render('api')
});

// All api routes need to be changed to ==>  res.json(data)    important !!!!

router.get('/api/employee/', authorized, function(req, res) {
	console.log(chalk.black.bgYellow('GET /api/employee'));
	models.Employee.findAll({})
		.then(function(employees) {
			res.render('apiinfo', {data: employees});
		})
});

router.get('/api/employee/:id', authorized, function(req, res) {
	console.log(chalk.black.bgYellow('GET /api/employee/' + req.params.id));
	models.Employee.findOne({where : { id : req.params.id }})
		.then(function(employee) {
			res.render('apiinfo', {data: employee});
		})
});

router.get('/api/employee/:id/training', authorized, function(req, res) {
	console.log(chalk.black.bgYellow('GET /api/employee/' + req.params.id + '/training'));
	models.Employee.findOne({where : { id : req.params.id }})
		.then(function(employee) {
			return employee.getTrainings()
		})
		.then(function(training) {
			console.log(training);
			res.render('apiinfo', {data : training})
		});
});

router.get('/api/department', authorized, function(req, res) {
	console.log(chalk.black.bgYellow('GET /api/department'));
	models.Department.findAll({})
		.then(function(data) {
			res.render('apiinfo', {data: data});
		})
});

router.get('/api/department/:name', authorized, function(req, res) {
	console.log(chalk.black.bgYellow('GET /api/deparment/' + req.params.name));
	models.Department.findOne({where : { name : req.params.name }})
		.then(function(department) {
			return department.getEmployees()
		})
		.then(function(employees) {
			console.log(employees);
			res.render('apiinfo', {data : employees})
		});
});

router.get('/api/department/:name/training', authorized, function(req, res) {
	console.log(chalk.black.bgYellow('GET /api/department/' + req.params.name + '/training'));
	models.Department.findOne({where : { name : req.params.name }})
		.then(function(department) {
			return department.getTrainings()
		})
		.then(function(training) {
			console.log(training);
			res.render('apiinfo', {data : training})
		});
});

router.get('/api/training', authorized, function(req, res) {
	console.log(chalk.black.bgYellow('GET /api/training'));
	models.Training.findAll({})
		.then(function(data) {
			res.render('apiinfo', {data: data});
		})
});

router.get('/api/training/:name/department', authorized, function(req, res) {
	console.log(chalk.black.bgYellow('GET /api/training/' + req.params.name + '/department'));
	models.Training.findOne({where : { name : req.params.name }})
		.then(function(training) {
			return training.getDepartments()
		})
		.then(function(departments) {
			console.log(departments);
			res.render('apiinfo', {data : departments})
		});
});

router.get('/api/training/:name/employee', authorized, function(req, res) {
	console.log(chalk.black.bgYellow('GET /api/training/' + req.params.name + '/employee'));
	models.Training.findOne({where : { name : req.params.name }})
		.then(function(training) {
			return training.getEmployees()
		})
		.then(function(employees) {
			console.log(employees);
			res.render('apiinfo', {data : employees})
		});
});
// Save training
router.post('/api/training', authorized, function(req, res) {
	console.log(chalk.black.bgYellow('POST /api/training/'));
	models.Training.create({
		name: req.body.trainingName,
		trainingType: req.body.trainingType,
		location: req.body.location
	}).then(function(training) {
		console.log('training', training);
		res.redirect('/api');
	})
})
// Assign training to department and its employees
router.post('/api/training/department', authorized, function(req, res) {
	console.log(chalk.black.bgYellow('POST /api/training/department'));
	models.Training.findOne({where: { id : req.body.trainingId } })
		.then(function(training) {
			models.Department.findOne({where: { id : req.body.departmentId } })
				.then(function(department) {
					department.addTraining([training]);
					return department.getEmployees();
				})
				.then(function(employees) {
					employees.forEach(function(employee){
						employee.addTraining([training])
					})
					console.log(employees);
					res.redirect('/api');
				})
		})
})
// Assign training to individual employee
router.post('/api/training/employee', authorized, function(req, res) {
	console.log(chalk.black.bgYellow('POST /api/training/employee'));
	models.Employee.findOne({where: { id : req.body.employeeId } })
		.then(function(employee) {
			models.Training.findOne({where: { id : req.body.trainingId } })
				.then(function(training) {
					employee.addTraining([training]);
					console.log(training);
					res.redirect('/api');
				})
		})
})

//Update training completed to true
router.put('/api/training/completed', authorized, function(req, res){
	console.log(chalk.black.bgYellow('PUT /api/training/completed'));
	console.log(req.body.employeeId)
	models.EmployeeTraining.update({completed:1}, {where:{EmployeeId: req.body.employeeId, TrainingId: req.body.trainingId}})
	.then (function(completed){
		console.log(completed)
	})
	res.redirect('/api')
});


//USER PAGE

router.get('/user/:userName', function(req, res){
	console.log(chalk.black.bgYellow('GET /user'));
	console.log(req.params.userName)
	models.Employee.findOne({where : { username: req.params.userName }})
	.then(function(user){
		res.render('user', {data : user})
	})
})



router.get('/admin/:userName', function(req, res){
	console.log(chalk.black.bgYellow('GET /user'));
	console.log(req.params.userName);
	models.Employee.findOne({where : { username: req.params.userName }})
	.then(function(user){
		allInfo.admin=user;
		res.render('admin', {data:allInfo});
	})
})


module.exports = router;