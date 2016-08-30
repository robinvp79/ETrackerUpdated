'use strict';
module.exports = function(sequelize, DataTypes) {
  var Department = sequelize.define('Department', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Department.belongsToMany(models.Training, {through: "DepartmentTraining"});

        // Department.hasMany(models.Employee, {as: "Employees"});
        // O : M 
        Department.hasMany(models.Employee);
      }
    }
  });
  return Department;
};