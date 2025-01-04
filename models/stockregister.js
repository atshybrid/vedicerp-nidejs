"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class StockRegister extends Model {
    static associate(models) {
      // Association with Items
      this.belongsTo(models.Item, {
        foreignKey: "item_id",
        as: "item",
      });

      // Association with ItemVariations
      this.belongsTo(models.ItemVariation, {
        foreignKey: "variation_id",
        as: "variation",
      });

      // Association with Branches
      this.belongsTo(models.Branch, {
        foreignKey: "branch_id",
        as: "branch",
      });
    }
  }

  StockRegister.init(
    {
      stock_register_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      variation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      branch_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      transaction_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Transaction type cannot be empty",
          },
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [0],
            msg: "Quantity cannot be negative",
          },
        },
      },
      gst_rate: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      gst_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      reference_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      transaction_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "StockRegister",
      tableName: "stock_register",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return StockRegister;
};
