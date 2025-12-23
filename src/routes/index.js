const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();

const userController = new UserController();

router.get('/ping', (req, res) => {
    res.json({ pong: true });
});

router.get('/users', (req, res) => userController.list(req, res));
router.get('/users/:id', (req, res) => userController.getById(req, res));
router.post('/users', (req, res) => userController.create(req, res));
router.put('/users/:id', (req, res) => userController.update(req, res));
router.delete('/users/:id', (req, res) => userController.delete(req, res));

module.exports = router;
