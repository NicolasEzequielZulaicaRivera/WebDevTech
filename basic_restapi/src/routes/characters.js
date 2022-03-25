const { Router } = require("express");
const router = Router();

let characters = [
  {
    id: "0",
    name: "mickey",
  },
  {
    id: "1",
    name: "minnie",
  },
];

router.get("/", (req, res) => {
  res.json({
    data: characters,
  });
});

router.post("/", (req, res) => {
  console.log(req.body);

  res.json({
    status: "TBD",
  });
});

module.exports = router;
