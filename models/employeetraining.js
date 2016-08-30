'use strict';
module.exports = function(sequelize, DataTypes) {
  var EmployeeTraining = sequelize.define('EmployeeTraining', {
    completed: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return EmployeeTraining;
};