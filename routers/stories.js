const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const router = new Router();

//Model

const Story = require("../models").story;
const User = require("../models").user;

//Get All Stories
router.get("/", async (req, res, next) => {
  try {
    const stories = await Story.findAll();
    res.send(stories);
  } catch (e) {
    next(e);
  }
});

//Delete a Story
router.delete("/:id", async (req, res, next) => {
  try {
    const storyId = parseInt(req.params.id);
    const oneStory = await Story.findByPk(storyId);
    await oneStory.destroy();
    res.send({ message: "story deleted", storyId: storyId });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
