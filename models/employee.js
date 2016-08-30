'use strict';
module.exports = function(sequelize, DataTypes) {
	var Employee = sequelize.define('Employee', {
		name: DataTypes.STRING,
		username: DataTypes.STRING,
		password: DataTypes.STRING, 
		dob: DataTypes.DATE,
		accountType: DataTypes.STRING,
		// completed: DataTypes.BOOLEAN
	}, {
		classMethods: {
			associate: function(models) {
				// O : M
				Employee.belongsTo(models.Department);
				// M : M
				Employee.belongsToMany(models.Training, {through: models.EmployeeTraining});
			}
		}
	});
	return Employee;
};