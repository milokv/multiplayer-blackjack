import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { username } = req.body;

    try {
        let user = await User.findOne({ username });
        if (!user) {
            user = await User.create({ username });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: 'User creation failed' });
    }
});

export default router;