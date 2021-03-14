const app = require('./server/src/app')
const port = process.env.PORT
const express = require('express');
const path = require('path')
const agenda = require('./server/src/jobs/agenda')

const startAgenda = async () => {
  await agenda.start()
  // await agenda.every('1:45pm', 'pickQOTD')
  // await agenda.schedule('1 second', 'pickQOTD')
  await agenda.every('1440 minutes', 'pickQOTD')
}

startAgenda()

const forceSSL = (req, res, next) => {
  if(process.env.NODE_ENV === 'production'){
      console.log(req.headers)
      if(req.header('x-forwarded-proto') === 'http') {
        return res.redirect(301, `https://tjvaughn-zen.herokuapp.com/`)
      }
    if (req.header('host') === 'www.tjvaughn-zen.herokuapp.com'){
        return res.redirect(301, 'https://tjvaughn-zen.herokuapp.com/')
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
  // setTimeout(() => {
    app.on("close", process.exit(1))
  // }, 100)
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
