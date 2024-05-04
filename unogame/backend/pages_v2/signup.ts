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
            req.session.user = { id: user.id, username: user.username };
            res.redirect('/login'); // THIS NEEDS TO REDIRECT TO THE LOGIN PAGE
        } else {
            res.render('signup', { title: 'Sign up Now', message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('signup Error:', error);
        res.render('signup', { title: 'Create an Account', message: 'Sign up failed. Please try again.' });
    }
});

export default router;