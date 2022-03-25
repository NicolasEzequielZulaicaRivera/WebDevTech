const { Router } = require("express");
const router = Router();

let characters = [
  {
    id: 0,
    name: "mickey",
  },
  {
    id: 1,
    name: "minnie",
  },
];

router.get("/", (req, res) => {
  res.json({
    data: characters,
  });
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params?.id);

  if (!id)
    return res.status(400).json({ error: `Invalid id: '${req.params.id}'` });

  const character = characters.find((char) => char.id === parseInt(id));

  if (!character)
    return res
      .status(500)
      .json({ error: `Character with { id: ${id} } Not Found` });

  res.json({
    data: character,
  });
});

router.post("/", (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: `Missing field: 'name'` });

  if (characters.some((char) => char.name === name))
    return res.status(500).json({ error: `Duplicated name: '${name}'` });

  // find current max id
  const id =
    characters.reduce((max, char) => {
      if (char.id > max) max = char.id;
      return max;
    }, 0) + 1;

  const newCharacter = {
    id,
    name,
  };

  characters.push(newCharacter);

  res.json({ data: newCharacter });
});

module.exports = router;
