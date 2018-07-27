const { Router } = require("express");

const router = Router();

// Mock Logs
const logs = [
  { time: "2018", data: "AA" },
  { time: "2019", data: "BB" },
  { time: "2020", data: "CC" }
];

/* GET logs. */
router.get("/logs", function (req, res, next) {
  res.json(logs);
});

router.post("/log", function (req, res, next) {
  console.log(req.body);
  res.json(req.body);
});

/*
router.get("/logs/:id", function (req, res, next) {
  const id = parseInt(req.params.id);
  if (id >= 0 && id < logs.length) {
    res.json(logs[id]);
  } else {
    res.sendStatus(404);
  }
});
*/

module.exports = router;
