// load .env data into process.env
import dotenv from 'dotenv';
dotenv.config();

// Enable __dirname with ES6 modules
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// Web server config
import sassMiddleware from './lib/sass-middleware.js';
import express from 'express';
import morgan from 'morgan';

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
import { default as userApiRoutes } from './routes/users-api.js';
import { default as usersRoutes } from './routes/users.js';
import { default as widgetApiRoutes } from './routes/widgets-api.js';

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
