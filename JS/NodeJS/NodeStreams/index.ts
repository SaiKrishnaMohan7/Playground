import archiver from "archiver";
import fs from "fs";

function createMassiveFile() {
  const readStream = fs.createReadStream("text-bank.txt");
  const writeStream = fs.createWriteStream("text-bank-mega.txt");

  readStream.on("data", function readStreamDataEventListener(chunk) {
    for (let i = 0; i < 10; i++) {
      writeStream.write(chunk);
    }
  });
  writeStream.on("finish", function writeStreamFinishEventHandler() {
    console.log("I AM DONE");
  });
}

function main() {
  // create a new file and stream data to it to create
  // a massive file that will not fit into memory
  if (!fs.existsSync("text-bank-mega.txt")) {
    createMassiveFile();
  }
  // read from the massive file and create a zip file archive
  // on the fs
  const archive = archiver("zip", { zlib: { level: 9 } });
  const massiveReadFileStream = fs.createReadStream("text-bank-mega.txt");
  const zipWriteStream = fs.createWriteStream("massive-file-zipped.zip");
  massiveReadFileStream.once("close", () =>
    console.log("file size in bytes: ", archive.pointer())
  );
  archive.pipe(zipWriteStream);
  archive.append(massiveReadFileStream, { name: "test" });
  archive.finalize();
}

main();
