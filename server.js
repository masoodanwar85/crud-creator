const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/save-schema", (req, res) => {
  fs.writeFileSync("schema/schema.json", JSON.stringify(req.body, null, 2));
  res.send("Schema saved!");
});

app.listen(3000, () => console.log("UI running at http://localhost:3000"));
