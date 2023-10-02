const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const mainRoutes = require('./routes/MyGroupRouter'); // Import router
const hbs = require('express-handlebars');
const path = require('path')
//
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//template engine
app.engine('handlebars', hbs.engine(
  {extname: '.hbs'}
));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'views'));
app.use((req, res, next) => {
  console.log(`${req.method} request to localhost:5000${req.url}`);
  next();
});

// Sử dụng router
app.use('/', mainRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
