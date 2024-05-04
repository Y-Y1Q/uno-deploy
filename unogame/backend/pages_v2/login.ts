import express from 'express';
import * as UserCtrl from '../controllers/ctrl_users';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserCtrl.logIn(username, password);
        if (user) {
            req.session.user = { id: user.id, username: user.username };
            res.redirect('/lobby'); // THIS NEEDS TO REDIRECT TO THE LOBBY PAGE
        } else {
            res.render('login', { title: 'Login to Your Account', message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login Error:', error);
        res.render('login', { title: 'Login to Your Account', message: 'Login failed. Please try again.' });
    }
});

export default router;