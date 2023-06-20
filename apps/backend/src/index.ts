import app from "./app";

const port = process.env.PORT || 4200;

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
