const Category = require('../models').Category;

module.exports = {
    list:function(req,res) {
        Category.findAll().then(cats=>{
            res.render('categories/index',{categories: cats});
        }).catch(err=>{
            console.log(err);
        })
    },
    new:function(req,res) {
        res.render('categories/new_category');
    },
    create:function(req,res) {
        Category.create({
            title:req.body.title,
            color:req.body.color
        }).then(()=>{
            res.redirect('/categories');
        }).catch(err=>{
            console.log(err);
        });
    },
    edit:function(req,res) {
        Category.findByPk(req.params.id).then(category=>{
            if(!category){
                res.redirect('/categories');
            }else{
                res.render('categories/edit_category',{category:category});
            }
        }).catch(err=>{
            console.log(err);
        })
    },
    update:function(req,res) {
        Category.update({
                            title:req.body.title,
                            color:req.body.color
                        },{
                            where:{
                            id:req.params.id
                        }
                        }).then(function(responde) {
                            res.redirect('/categories');
                        }    
                        ).catch(err=>{
            console.log(err);
        });
    },
    delete:function(req,res) {
        Category.destroy({
            where:{
                id:req.params.id
            }
        }).then(()=>{
            res.redirect('/categories');
        }).catch(err=>{
            console.log(err);
        })
    }
}