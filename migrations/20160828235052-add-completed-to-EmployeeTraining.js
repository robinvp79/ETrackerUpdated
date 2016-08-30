'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		// return queryInterface.addColumn('EmployeeTraining', 'Completed', {
		// 			type: Sequelize.BOOLEAN,
		// 			defaultValue: 0
		// });
	},
	down: function(queryInterface, Sequelize) {
		// return queryInterface.removeColumn('EmployeeTraining', 'Completed');    
	}
};