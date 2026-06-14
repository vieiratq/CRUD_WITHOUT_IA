require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
////////////////////////////////////////////////////////////////////////
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "private")));
app.use(express.static(path.join(__dirname, "frontend")));
app.use(session({
  secret: "MatadorDePorco1000xFreeFire",
  resave: false,
  saveUninitialized: false
}));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});


app.get("/dashboard", ValidaLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "backend", "dashboard", "dash.html"))
});


app.use(express.json());
app.use("/", authRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


function ValidaLogin(req, res, next) {
  if (req.session.user)
    return next()
  else
    res.redirect("/")
}
