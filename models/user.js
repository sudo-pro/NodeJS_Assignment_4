import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

class User extends Model {}

User.init(
  {
    profilePicture: {
      type: DataTypes.STRING
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Added unique constraint
    },
  },
  {
    sequelize,
    modelName: "User ",
  }
);

// Define the self-referential association
User.hasMany(User, {
  as: "friends", // Alias for the relationship
  foreignKey: "userId", // Foreign key in the friends table
});

User.belongsTo(User, {
  as: "friendOf", // Alias for the relationship
  foreignKey: "userId", // Foreign key in the user table
});

export default User;
