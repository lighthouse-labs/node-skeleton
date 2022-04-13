// load .env data into process.env
require("dotenv").config({ silent: true });

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const database = require('./server/database');

// Set Body Parser
const bodyParser = require("body-parser");
const db = require("./server/database.js");
app.use(bodyParser.urlencoded({ extended: true }));

// Set Cookie Parser
app.use(cookieParser());

// ROUTERS
const apiRouter = require('./server/apiRoutes');
const userRouter = require('./server/userRoutes');
const formRouter = require('./server/formRoutes');
const listingRouter = require('./server/listingRoutes');

app.use('/api', apiRouter);
app.use('/user', userRouter);
app.use('/form', formRouter);
app.use('/listing', listingRouter);

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.cookie('user_id', req.params.id);
  console.log('REQ.QUERY:', req.query);

  if (req.cookies.username) {
    database.getUsers(req.cookies.username)
    .then((user) => {
      const params = {
        name: user[0].name || 'username'
      };
      res.render('index', params);
    })
    .catch((e) => console.error(e));
  } else {
    const params = {
      name: 'Guest'
    }
    res.render('index', params);
  }


});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
