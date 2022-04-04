import { Model, DataTypes } from "sequelize";
import { dbConnection } from "./connection.js";
import { meals, categories } from '../sql/data/meals.js'

const { STRING, FLOAT, INTEGER } = DataTypes;

class Meal extends Model {}

Meal.init(
  {
    id: { type: INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: STRING, allowNull: false },
    description: { type: STRING, allowNull: false },
    price: { type: FLOAT, allowNull: false },
  },
  {
    sequelize: dbConnection,
    name: {
      singular: "meal",
      plural: "meals",
    },
  }
);

class Category extends Model {}

Category.init(
  {
    id: { type: INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: STRING, allowNull: false },
  },
  {
    sequelize: dbConnection,
    name: {
      singular: "category",
      plural: "categories",
    },
  }
);

Category.hasMany(Meal);
Meal.belongsTo(Category);

await dbConnection.sync({ force: true });

// seed the data
await Category.bulkCreate(categories);
await Meal.bulkCreate(meals);

export { Meal, Category };
