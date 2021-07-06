const express = require('express')
const app = express()

// * config
app.set('port', process.env.PORT || 3000)

// * Middleware
app.use(express.json())

const whitelist = ['http://localhost/libro_reclamaciones/', 'http://127.0.0.1/libro_reclamaciones/', 'http://localhost', 'http://127.0.0.1']

app.use((req, res, next) => {
  const origin = Array.isArray(req.headers.origin) ? req.headers.origin[0] : req.headers.origin;

  if (origin && whitelist.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin);
  }


  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    next();
  }
});

// * routes
app.use(require('./routes/book-claims'))
app.use(require('./routes/sendEmail'))




app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'))
})

