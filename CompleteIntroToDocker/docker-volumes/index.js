const fs = require("fs").promises;
const path = require("path");

const dataPath = path.join(process.env.DATA_PATH || "./data.txt");

fs.readFile(dataPath)
  .then(buffer => {
    const data = buffer.toString();
    console.log(data);

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Unary_plus
    writeTo(+data + 1); //The unary plus operator converts its operand to Number type.
  })
  .catch(e => {
    console.log("file not found, writing '0' to a new file");
    writeTo(0);
  });

const writeTo = data => {
  fs.writeFile(dataPath, data.toString()).catch(console.error);
};