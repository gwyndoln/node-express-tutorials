const fs = require("fs");
const http = require("http");

// const stream = fs.createReadStream("./content/big.txt", {
//   highWaterMark: 90000,
//   encoding: "utf8",
// });

// stream.on("data", (result) => {
//   console.log(result);
// });

// stream.on("error", (err) => {
//   console.log(err);
// });

const server = http.createServer((req, res) => {
  // const text = fs.readFileSync("./content/big.txt", "utf8");
  // res.end(text);
  const fileStream = fs.createReadStream("./content/big.txt", "utf8");
  fileStream.on("open", () => {
    fileStream.pipe(res);
  });
  fileStream.on("error", (err) => {
    res.end(err);
  });
});

server.listen(5000);
