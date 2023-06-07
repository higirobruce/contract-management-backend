"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRouter = void 0;
var multer_1 = __importDefault(require("multer"));
var express_1 = require("express");
var fs_1 = __importDefault(require("fs"));
exports.uploadRouter = (0, express_1.Router)();
exports.uploadRouter.post("/termsOfReference/", function (req, res) {
    var storage = multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "/src/public/files");
        },
        filename: function (req, file, cb) {
            cb(null, req.query.id + '.pdf');
        },
    });
    var upload = (0, multer_1.default)({ storage: storage }).single("file");
    upload(req, res, function (err) {
        if (err instanceof multer_1.default.MulterError) {
            console.log(err);
            return res.status(500);
        }
        else if (err) {
            console.log(err);
            return res.status(500);
        }
        return res.status(200).send(req.file);
    });
});
exports.uploadRouter.get("/:path", function (req, res) {
    var path = req.params.path;
    fs_1.default.stat("public/termsOfReference/".concat(path), function (err, stats) {
        if (err)
            res.send({ err: err });
        if (stats)
            res.send({ stats: stats });
    });
});
