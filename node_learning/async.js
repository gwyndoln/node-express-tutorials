const { readFile, writeFile } = require("fs").promises;

// const util = require("util");
// const readFilePromise = util.promisify(readFile);
// const writeFilePromise = util.promisify(writeFile);

// readFile("./content/file.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   } else {
//     console.log(data);
//   }
// });

// const getText = (path) => {
//   return new Promise((res, rej) => {
//     readFile(path, "utf-8", (err, data) => {
//       if (err) {
//         rej(err);
//       } else {
//         res(data);
//       }
//     });
//   });
// };

// getText("./content/file.txt")
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));

// const start = async (path) => {
//   try {
//     const data = await getText(path);
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// };
// start("./content/file.txt");

//

const start = async () => {
  try {
    const first = await readFile("./content/file1.txt", "utf-8");
    const second = await readFile("./content/file2.txt", "utf-8");
    await writeFile(
      "./content/async-file.txt",
      `ASYNC FILE: ${first} ${second}`
    );
  } catch (err) {
    console.log(err);
  }
};
start("./content/file.txt");
