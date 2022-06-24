const { Router } = require("express");
const router = new Router();
const { toJWT, toData } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");

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

//Cretae a new story
router.post("/:spaceId/story", authMiddleware, async (req, res, next) => {
  const { spaceId } = req.params;
  const { name, content, imageUrl } = req.body;
  if (!name) {
    return res.status(400).send("Your story should have a name!");
  }

  try {
    const newStory = await Story.create({
      name,
      content,
      imageUrl,
      spaceId,
    });

    res.send(newStory);
  } catch (e) {
    next(e);
  }
});

//Update Space
router.put("/:spaceId", authMiddleware, async (req, res, next) => {
  try {
    const { title, description, background, textcolor } = req.body;
    const { spaceId } = req.params;
    const spaceUpdate = await Space.findByPk(spaceId);
    const updaytedSpace = await spaceUpdate.update({
      title: title,
      description: description,
      background: background,
      textcolor: textcolor,
    });
    res.send(updaytedSpace);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
