const app = require('./server/src/app')
const port = process.env.PORT
const express = require('express');
const path = require('path')

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
  

process.on('SIGINT', () => {
  console.log("Server is shitting down")
  setTimeout(() => {
    app.on("close", process.exit())
  }, 1000)
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
