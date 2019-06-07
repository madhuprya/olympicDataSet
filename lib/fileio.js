"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readFile = exports.writeFile = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const writeFile = (filePath, data) => {
  console.log("Writing File", filePath);
  return new Promise((resolve, reject) => {
    _fs.default.writeFile(filePath, JSON.stringify(data, undefined, 2), {
      flag: "w"
    }, err => {
      if (err) return reject(err);
      return resolve();
    });
  });
};

exports.writeFile = writeFile;

const readFile = filePath => {
  console.log("Reading File", filePath);
  return new Promise((resolve, reject) => {
    _fs.default.readFile(filePath, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

exports.readFile = readFile;