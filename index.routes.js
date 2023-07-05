module.exports=function(app){
    app.use(res, req, next){
        res.header(
            "Access-Controll-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next()
    }
}