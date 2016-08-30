'use strict';

module.exports = {
 up: function (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('Departments', [
      {id:1, name: 'Finance', createdAt: new Date(), updatedAt: new Date()},
      {id:2, name: 'Legal', createdAt: new Date(), updatedAt: new Date()},
      {id:3, name: 'IT', createdAt: new Date(), updatedAt: new Date()},
      {id:4, name: 'Marketing', createdAt: new Date(), updatedAt: new Date()},
      {id:5, name: 'Human Resources', createdAt: new Date(), updatedAt: new Date()},
    ], {});
  },

  down: function (queryInterface, Sequelize) {
   return queryInterface.bulkDelete('Departments', null, {});
  }
};
