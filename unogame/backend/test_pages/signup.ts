import express from 'express';
import * as UserCtrl from '../controllers/ctrl_users';
import * as Session from '../middleware/session';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('signup');
});

router.post('/', async (req, res) => {
    const { username, fullname } = req.body;
    try {
        const user = await UserCtrl.signUp(fullname, username);
        if (user) {
            // Set user info in session
            req.session.user = { id: user.id, username: user.username };
            res.redirect('/lobby'); // Redirect to lobby upon successful login
        } else {
            res.render('signup', { title: 'Login to Your Account', message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('signup Error:', error);
        res.render('signup', { title: 'Login to Your Account', message: 'Login failed. Please try again.' });
    }
});

export default router;