const Task = require('../models').Task;
const User = require('../models').User;

module.exports = {
    create: function(req,res){
        Task.create({
            description: req.body.description,
            userId: req.user.id
        }).then(task=>{
            res.redirect('/tasks');
        }).catch(err=>{
            console.log(err);
            res.json(err);
        })
    },
    new:function(req,res) {
        res.render('tasks/new_task');
    },
    show:function(req,res) {
        Task.findByPk(req.params.id,{
            include: [
                {
                    model:User,
                    as:'user'
                }
            ]
            }).then(task=>{
            if (!task) {
                res.redirect('/tasks');
            }else{
                res.render('tasks/edit_task',{task});
            }
        }).catch(err=>{
            console.log(err);
            res.redirect('/tasks');
        });
    },
    update:function(req,res) {
        Task.update({description: req.body.description},{
            where:{
                id: req.params.id
            }
        }).then(function(responde) {
            res.redirect('/tasks');
        }).catch(err=>{
            console.log(err);
        });
    },
    list:function(req,res){
        //Task.findAll().then(tasks=>{
            res.render('tasks/index',{tasks: req.user.tasks});
        //}).catch(err=>{
        //    console.log(err);
        //})
    },
    delete:function(req,res) {
        Task.destroy({
            where: {id:req.params.id}
        }).then(function(responde) {
            res.redirect('/tasks');
        }).catch(err=>{
            console.log(err);
        })
    }    
};    