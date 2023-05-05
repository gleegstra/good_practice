const User = require('../models').User;

module.exports = function (req,res,next) {
    
    User.findByPk(req.session.userId,{
        include: [
            {
                association: 'tasks'
            }
        ]
    }).then(user=>{
        if (!req.session.userId) return next();
        if (user){
            req.user = user;
            next();
        }
    });
}