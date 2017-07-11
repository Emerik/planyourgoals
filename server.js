import config from './config';
import express from 'express';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';

console.log(config);

const server = express();
const port = config.port;


//Use sass middleware
server.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public')
}));


// Use EJS engine template
server.set('view engine', 'ejs');


// Handle GET request on /
server.get(['/', '/daily-task', '/dashboard'], (req, res) => {
  res.render('index', {
    content : 'Emerik works for you !'
  });
});


server.use(express.static('public'));

// Server listen on port
server.listen(port, config.host, () =>{
  // Success handler
  console.log('Express listening on port', port);
});
