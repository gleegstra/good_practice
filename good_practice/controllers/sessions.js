const User = require('../models').User;

module.exports={
    new: function (req,res) {
        res.render('sessions/new');
    },
    create: function (req,res) {
        User.login(req.body.email, req.body.password)
            .then(user => {
                if (user){
                    req.session.userId = user.id;
                }
                res.redirect('/');
            })
            .catch(err=>{
                console.log(err);
                res.json(err);
            });
    },
    delete:function (req,res) {
        req.session.destroy(function () {
            res.redirect('/sessions');
        })
    }
};