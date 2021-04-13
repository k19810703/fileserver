const express = require('express');
const multer  = require('multer');
const path = require('path');
const serveIndex = require('serve-index');
const fs = require('fs')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'file/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const app = express();

app.post('/file', upload.single('file'), function (req, res, next) {
  fs.chmodSync(`./file/${req.file.filename}`, 0o777);
  res.redirect('/');
});
app.use('/', express.static('file/'), serveIndex('file/', {'icons': true, 'template': './index/index.html'}));


const port = process.env.PORT || '3000';

// start server on the specified port and binding host
app.listen(port, () => {
  // print a message when the server starts listening
  console.log(`server starting on http://localhost:${port}`);
});
