'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Trainings', [
      {id:1, name: 'HIPAA', trainingType:"Health Insurance", location:"public/assets/forms/hipaaTraining.pdf", createdAt: new Date(), updatedAt: new Date()},
      {id:2, name: 'Legal whatever', trainingType: "Legal", location:"public/assets/forms/hipaaTraining.pdf", createdAt: new Date(), updatedAt: new Date()},
      {id:3, name: 'Finance Training', trainingType:"Finance", location:"public/assets/forms/financeTraining.pdf", createdAt: new Date(), updatedAt: new Date()},
      {id:4, name: 'HR Training', trainingType:"Human Resources", location:"public/assets/forms/hrTraining.pdf", createdAt: new Date(), updatedAt: new Date()},
    ], {});
  },

  down: function (queryInterface, Sequelize) {
   return queryInterface.bulkDelete('Trainings', null, {});
  }
};