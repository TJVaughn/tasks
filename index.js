const app = require('./server/src/app')
const port = process.env.PORT
const express = require('express');
// const userRouter = require('./server/src/routers/User');
// const taskRouter = require('./server/src/routers/Task')
// const weatherRouter = require('./server/src/routers/Weather')
// const projectRouter = require('./server/src/routers/Project')
// const recaptchaRouter = require('./server/src/routers/Recaptcha')
//  $ mongoDB/bin/mongod.exe --dbpath=mongodb-data/
const path = require('path')

// app.use(express.json())
// app.use(userRouter)
// app.use(taskRouter)
// app.use(weatherRouter)
// app.use(projectRouter)
// app.use(recaptchaRouter)

const forceSSL = (req, res, next) => {
  if(process.env.NODE_ENV === 'production'){
      console.log(req.headers)
      if(req.header('x-forwarded-proto') === 'http') {
          return res.redirect(301, `https://taskworks.co`)
      }
      if(req.header('host') === 'www.taskworks.co'){
          return res.redirect(301, 'https://taskworks.co')
      }
  }
  return next();
}
app.use(forceSSL)

if (process.env.NODE_ENV === 'production') {
    
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
      
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }
  
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
