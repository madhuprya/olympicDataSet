import http from "http";
import path from "path";
import { readFile } from "../src/fileio";

let PORT = process.env.PORT || 3000;

let mimetype = {
  ".json": "application/json",
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif"
};

let server = http.createServer((request, response) => {
  console.log(`${request.method} ${request.url}`);

  switch (request.url) {
    case "/styles.css":
      getFile(response, "./client/styles.css");
      break;
    case "/charts.js":
      getFile(response, "./client/charts.js");
      break;
    case "/favicon.ico":
      getFile(response, "./client/favicon.ico");
      break;
    case "/getNoOfOlympicHosted":
      getFile(response, "./output/getNoOfOlympicHosted.json");
      break;
    case "/getGenderCountPerDecade":
      getFile(response, "./output/getGenderCountPerDecade.json");
      break;
    case "/getCountriesWonMedal":
      getFile(response, "./output/getCountriesWonMedal.json");
      break;
    case "/getAverageAge":
      getFile(response, "./output/getAverageAge.json");
      break;
    case "/getMedalistsIndia":
      getFile(response, "./output/getMedalistsIndia.json");
      break;
    default:
      getFile(response, "./client/index.html");
      break;
  }
});

let getFile = async (response, filePath) => {
  let contentType = mimetype[path.extname(filePath)];
  response.writeHead(200, { "Content-Type": contentType });
  let file = await readFile(filePath);
  response.write(file);
  response.end();
};

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
