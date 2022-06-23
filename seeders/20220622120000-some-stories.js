"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "stories",
      [
        {
          name: "My cat",
          content:
            "One day, an old man was having a stroll in the forest when he suddenly saw a little cat stuck in a hole.",
          imageUrl: "https://cataas.com/cat",
          spaceId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "I Like Amsterdam",
          content:
            "I like this city it's super plice,nice and people here are nice!",
          imageUrl:
            "https://i.pinimg.com/564x/12/a7/85/12a7852acd94e971462fd362d2ecf379.jpg",
          spaceId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "I have no clue what to type here. ",
          content: "This is just a random text",
          imageUrl:
            "https://i.pinimg.com/564x/c4/b6/92/c4b692702e6994c84478313865ffad73.jpg",
          spaceId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "This is a title ",
          content: "Here you can find some content ",
          imageUrl:
            "https://i.pinimg.com/564x/7e/12/71/7e12714e74efffcfcf807e691eada589.jpg",
          spaceId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("stories", null, {});
  },
};
