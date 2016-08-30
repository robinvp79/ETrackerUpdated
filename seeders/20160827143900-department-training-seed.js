'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('DepartmentTraining', [
      {DepartmentId: 2, TrainingId:1, createdAt: new Date(), updatedAt: new Date()},
    ], {});

  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
