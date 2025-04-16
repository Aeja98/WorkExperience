const express = require("express");
const cors = require("cors");
const workexpRoutes = require("./routes/workexp");

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(express.json()); // for JSON body parsing

//Routes
app.use("/api/workexp", workexpRoutes);

//Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});