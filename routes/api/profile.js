const express = require('express');
const router = express.Router(); // using router insead of app because we just want to look at the router part of express in server.js instead of all. Here router is a variabe name which we can give any.
router.get('/test', (req, res) => res.json({ msg: 'Profile works!' }));

module.exports = router;