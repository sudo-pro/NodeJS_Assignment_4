import express from "express";
import "./config/index.js";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use("/", userRoutes);
app.use("/", (_req, res) =>
  res.render("404", { pageTitle: "404", styles: [], message: null })
);
app.use((error, _req, res, _next) => {
  console.log(error);
  res.render("error", { error: error.message, pageTitle: "Error", styles: [], message: null });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return process.exit(1);
  }
  console.log(`Server is running on http://localhost:${PORT}`);
});
