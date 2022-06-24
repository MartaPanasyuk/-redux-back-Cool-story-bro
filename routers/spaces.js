const { Router } = require("express");
const router = new Router();

//Model

const Space = require("../models").space;
const Story = require("../models").story;

// Get all spaces
router.get("/", async (req, res, next) => {
  try {
    const spaces = await Space.findAll({ include: Story });
    res.send(spaces);
  } catch (e) {
    next(e);
  }
});

//Get spaces by Id with stories
router.get("/:id", async (req, res, next) => {
  try {
    const spaceId = parseInt(req.params.id);
    const oneSpace = await Space.findByPk(spaceId, { include: Story });
    res.send(oneSpace);
  } catch (e) {
    next(e);
  }
});

//Cretae a story
router.post("/:id", async (req, res, next) => {
  const { name, content, imageUrl, token } = req.body;
  if (!name) {
    return res.status(400).send("Your story should have a name!");
  }

  try {
    const userId = parseInt(req.params.id);
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

module.exports = router;
