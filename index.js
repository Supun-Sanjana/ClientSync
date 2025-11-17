import app from "./src/app.js";

const port = process.env.PORT || 5000;

app.listen(port, "0.0.0.0", () => {
  console.log(`server is running on port ${port}`);
});
