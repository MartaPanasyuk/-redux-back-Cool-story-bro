const { Router } = require("express");
const router = new Router();

//Model

const Story = require("../models").story;

//Cretae a story
router.post("/stories", async (req, res, next) => {
  const { name, content, imageUrl } = req.body;
  if (!name) {
    return res.status(400).send("Your story should have a name!");
  }

  try {
    const newStory = await Story.create({
      name,
      content,
      imageUrl,
    });

    const fullSpace = await Space.findByPk(newStory.id, {
      include: [{ model: Story }],
    });
    res.send({ story: fullSpace });
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
