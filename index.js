const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const cors = require("cors");
const app = express();
const authRoutes = require("./routes/authroutes");
const userRoutes = require("./routes/userroutes");
const postRoutes = require("./routes/postroutes");
//middleware
app.use(cors());

app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
// app.use('/uploads', express.static('uploads')) //make uploads folder private so that image can be accessed from outside
//connect to db
const port = 3330 || process.env.PORT;
mongoose.set("strictQuery", true);
mongoose
    .connect(process.env.DBURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((result) => {
        app.listen(port, () =>
            console.log(`connected to db and Server started on port ${port}`)
        );
    })
    .catch((e) => console.log(e, "error connecting to db!.."));
//routes
app.use("/api/user", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api", userRoutes);