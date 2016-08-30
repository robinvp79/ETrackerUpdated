'use strict';
// var models = require('./models');
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Employees', [
      {id:1, name:'David Bermudez', username:'davidb1990', accountType: 'Admin', dob: '1990-09-09', password: 'hello', DepartmentId:1, createdAt: new Date(), updatedAt: new Date()},
      {id:2, name:'Elsa Matsui', username:'elsaj1987', accountType: 'User', dob: '1987-07-12', password: 'kryptonite', DepartmentId:4, createdAt: new Date(), updatedAt: new Date()},
      {id:3, name:'Gary Jackson', username:'garyj1996', accountType: 'User', dob: '1966-01-15', password: 'goodbye', DepartmentId:1, createdAt: new Date(), updatedAt: new Date()},
      {id:4, name:'Brian Yaringano', username:'alex', accountType: 'User', dob: '1996-05-30', password: 'alex', DepartmentId:2, createdAt: new Date(), updatedAt: new Date()},
      {id:5, name:'Robin Van Persie', username:'robin', accountType: 'Admin', dob: '1975-01-03', password: 'robin', DepartmentId:5, createdAt: new Date(), updatedAt: new Date()},
    ], {});
  },


  down: function (queryInterface, Sequelize) {
     return queryInterface.bulkDelete('Employees', null, {});
  }
};

// node server.js
// sequelize db:seed:all