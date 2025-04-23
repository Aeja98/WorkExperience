const express = require("express");
const cors = require("cors");
const workexpRoutes = require("./routes/workexp");

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware- run before any route(GET,POST, etc)

//allows frontend (e.g. from a different port) to make requests to backend without being blocked
app.use(cors());

//automatically parses incoming json requests and adds to req.body to easily access user input in routes 
  //parse: analyzes program & extracts info
app.use(express.json());  

//Routes
app.use("/api/workexp", workexpRoutes);

//Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});