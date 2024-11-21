const app = require("./server");
const PORT = process.env.NODE_PORT || 3000;

app.listen(PORT, () => {
  console.log(`api listening on port ${PORT}...`);
});
