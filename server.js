import { serverConfig, consoleConfig } from './config';
import express from 'express';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';

consoleConfig();

const server = express();
const port = serverConfig.port;


//Use sass middleware
server.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public')
}));


// Use EJS engine template
server.set('view engine', 'ejs');


// Handle GET request on /
server.get(['/', '/week-activity', '/dashboard'], (req, res) => {
  res.render('index', {
    content : 'Emerik works for you !'
  });
});


server.use(express.static('public'));

// Server listen on port
server.listen(port, serverConfig.host, () =>{
  // Success handler
  console.log('Express listening on port', port);
});
