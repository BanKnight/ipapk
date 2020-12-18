const Koa = require('koa');
const serve = require('koa-static');

const app = new Koa();

module.exports = function(port)
{
    port = port || 80

    app.use(serve('.'))

    app.listen(port,()=>{
        console.log(`http server is listening at: ${port}`);
    });

    app.once("error",(error)=>{
        console.error(error);
        process.exit(1)
    })
 
}