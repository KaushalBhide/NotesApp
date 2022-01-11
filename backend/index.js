const connectToMongo = require("./db");
const express = require('express');
const cors = require('cors');

connectToMongo();
const app = express()
const port = 5000

app.use(express.json()); // if you want to get request's body, then you need to use this "middleware"
app.use(cors());

// Available Routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})