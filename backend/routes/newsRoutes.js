const {
  createNews,
  showNews,
  getOneNews,
  deleteOneNews,
  setLike,
} = require("../controllers/NewsController");

const router = require("express").Router();

router.get("/all", showNews);
router.get("/:id", getOneNews);
router.post("/create", createNews);
router.delete("/delete", deleteOneNews);
router.post("/setLike", setLike);

module.exports = router;
