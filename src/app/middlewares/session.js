function onlyAdmin(req, res, next){
    
    if(!req.session.is_admin == true){
    
    return res.redirect('/admin/profile')    
}
    
    next()
}

module.exports = {
    onlyAdmin
}