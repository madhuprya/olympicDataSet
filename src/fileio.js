import fs from "fs";

export const writeFile = (filePath, data) => {
  console.log("Writing File", filePath);
  return new Promise((resolve, reject) => {
    fs.writeFile(
      filePath,
      JSON.stringify(data, undefined, 2),
      { flag: "w" },
      err => {
        if (err) return reject(err);
        return resolve();
      }
    );
  });
};

export const readFile = filePath => {
  console.log("Reading File", filePath);

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};
