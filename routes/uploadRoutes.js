const express = require('express');
const router = express.Router();
const upload = require('../utils/uploadLocal');

router.post('/', upload.single('productImage'), (req, res) => {
  try {
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${
      req.file.filename
    }`;
    res.json({ url: fileUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
