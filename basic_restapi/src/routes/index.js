const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.json({
    routes: [
      {
        name: "characters",
        methods: ["GET"],
      },
    ],
  });
});

module.exports = router;
