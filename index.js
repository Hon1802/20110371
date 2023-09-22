const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

const MyGroup = require('./models/MyGroup');
const mainRoutes = require('./routes/MyGroupRouter'); // Import router


app.use((req, res, next) => {
console.log(`${req.method} request to localhost:5000${req.url}`);
next();
});

// Sử dụng router
app.use('/', mainRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
