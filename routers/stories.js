const { Router } = require("express");
const router = new Router();

//Model

const Story = require("../models").story;

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
