"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "spaces",
      [
        {
          title: "How I get a cat",
          description:
            "I got a cat from shelter. She is nice, but overweight. ",
          backgroundColor: "#008000",
          color: "#ffffff",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "How I moved to the Amsterdam",
          description: "My short story how I managed to relocate.",
          backgroundColor: "#CD5C5C",
          color: "#000000",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("spaces", null, {});
  },
};
