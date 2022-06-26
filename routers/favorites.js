const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const Favorite = require("../models").favoritelist;
const Story = require("../models/").story;
const User = require("../models/").user;

const router = new Router();

//Get all stories  http  localhost:4000/favorites
router.get("/", async (request, response) => {
  try {
    const allMyFavorites = await Favorite.findAll();
    response.send(allMyFavorites);
  } catch (e) {
    console.log(e.message);
  }
});

// Get All Favorites from One User  (http -v localhost:4000/favorites/myfavorites/1)
router.get("/myfavorites/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const allMyFavorites = await Favorite.findAll({
      where: { userId: id },
      include: [Story],
    });
    response.send(allMyFavorites);
  } catch (error) {
    console.log("error from Favorites: ", error.message);
  }
});

//Adding a favorite story
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { userId, storyId } = req.body;
    const newFavorite = await Favorite.create({ userId, storyId });
    res.send(newFavorite);
  } catch (e) {
    next(e);
  }
});

// Delete a favorite from the list
router.delete("/", authMiddleware, async (request, response, next) => {
  try {
    const { userId, storyId } = request.body;
    console.log("data inside the endpoint: ", userId, storyId);
    const storyToDelete = await Favorite.findOne({
      where: { userId: userId, storyId: storyId },
    });

    if (!storyToDelete) {
      return response.status(404).send("Story not found!");
    }

    await storyToDelete.destroy();

    return response.status(204).send("Story terminated");
  } catch (error) {
    console.log("error from the delete endpoint: ", error);
    next(error);
  }
});

module.exports = router;

/*
//Get all favorites by user
router.get("/favorite/:id", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    const storyList = await Favorite.findAll({
      where: { userId: userId },
    });
    res.send(storyList);
  } catch (e) {
    next(e);
  }
}); 
*/

//http -v DELETE :4000/favorites userId=3 storyId=3 Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTY1NjI0ODMzOSwiZXhwIjoxNjU2MjU1NTM5fQ.HQ_vUVeR7lfDKqikv5sj-VZ4jGaIfNXkFJWPxTx5A7A"
