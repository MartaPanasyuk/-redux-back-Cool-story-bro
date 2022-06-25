"use strict";
const { Model } = require("sequelize");
const favoritelist = require("./favoritelist");
module.exports = (sequelize, DataTypes) => {
  class story extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // - story belongs to space
      //- space has many story
      story.belongsTo(models.space, { foreignKey: "spaceId" });
      story.belongsToMany(models.user, {
        through: "favoritelist",
        foreignKey: "storyId",
      });
    }
  }
  story.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      content: DataTypes.TEXT,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "story",
    }
  );
  return story;
};
