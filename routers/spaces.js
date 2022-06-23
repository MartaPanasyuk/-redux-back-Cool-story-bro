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

module.exports = router;
