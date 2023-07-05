module.exports=function(app){
    app.use(function(res, req, next){
        res.header(
            "Access-Controll-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next()
    })
}