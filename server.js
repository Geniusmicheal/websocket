const app = require('express')();
const async  = require('async')

console.time("Time this");
const functionBody =`let counter = 0;
for (let i = 0; i < 200000; i++) {
  counter++;
  console.log('zxxcxxcxc');
}; return;`;
const calculateCount = new Function(...[], functionBody);

 calculateCount()
 console.timeEnd("Time this");

 function parallel(middlewares) {
  return function (req,res, next){
    async.each(middlewares,function(mw,cb){
      mw(req,res,cb);
    }, next);
  }
 }

 app.use(parallel([]))


const server = app.listen(4000, ()=>{
  console.log(`🚀 Server ready at 4000`);
});