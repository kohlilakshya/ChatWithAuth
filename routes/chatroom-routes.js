const router = require('express').Router();

// auth login
router.get('/', (req, res) => {
    if (req.user) {
        res.render('chatroom', { user: req.user });
    }
    else {
        res.redirect('/auth/login');
    }
});

router.get('/screenShare', (req, res)=>{
    res.render('screenShare');
})
module.exports = router;