const express = require("express");
//const routes = require("./routes/index");
const db = require("./db/init-db");
const database = require("./db/database");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const marketDataRoutes = require("./routes/marketDataRoutes");
const config = require("./config.json");
const middlewares = require("./middlewares/index");

// create express app
const app = express();
app.use(express.json());
// setup middlewares
//middlewares(app);

// setup routes
//routes(app);

app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", marketDataRoutes);
const PORT = 3000;


// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
