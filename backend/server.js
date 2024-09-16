const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Server response!!!");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}...`);
});
