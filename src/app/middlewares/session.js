function onlyAdmin(req, res, next){
    
    if(!req.session.is_admin == true){
    
    return res.redirect('/admin/profile')    
}
    
    next()
}

function isLoggedRedirectToAdmin(req, res, next){
    if(req.session.adminId)
    return res.redirect('/admin/profile')

    next()
}

function onlyUsers(req, res, next){
    if(!req.session.userId)
    return res.redirect('/admin/login')

    next()
}

function isLoggedRedirectToUsers(req, res, next){
    if(req.session.userId)
    return res.redirect('/session/login')

    next()
}

module.exports = {
    onlyUsers,
    isLoggedRedirectToUsers,
    onlyAdmin,
    isLoggedRedirectToAdmin
}