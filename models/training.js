'use strict';
module.exports = function(sequelize, DataTypes) {
  var Training = sequelize.define('Training', {
    name: DataTypes.STRING,
    trainingType: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Training.belongsToMany(models.Department, {through: "DepartmentTraining"});
        Training.belongsToMany(models.Employee, {through: models.EmployeeTraining});
      }
    }
  });
  return Training;
};