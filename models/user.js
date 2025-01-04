"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Association with Branch
      this.belongsTo(models.Branch, {
        foreignKey: "branch_id",
        as: "branch",
      });

      // Association with Role
      this.belongsTo(models.Role, {
        foreignKey: "role_id",
        as: "role",
      });
    }
  }

  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      mobile_number: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Mobile number cannot be empty",
          },
        },
      },
      mpin: {
        type: DataTypes.STRING(6),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "MPIN cannot be empty",
          },
          len: {
            args: [6, 6],
            msg: "MPIN must be exactly 6 characters",
          },
        },
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name cannot be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Must be a valid email address",
          },
        },
      },
      branch_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  User.beforeCreate(async (user) => {
    user.mpin = await bcrypt.hash(user.mpin, 10);
  });

  return User;
};
