const Follow=require('../models/Follow')

exports.addFollow=function(req,res) {
    let follow=new Follow(req.params.username,req.visitor.id)
    follow.create().then(()=>{
        req.flash("success", `Successfully followed ${req.params.username}`)
        req.session.save(()=>res.redirect(`/profile/${req.params.username}`))
    }).catch(()=>{
        errors.forEach(error=>{
            req.flash('errors', error)
        })
        res.session.save(()=>{
            res.redirect('/')
        })
    })
}