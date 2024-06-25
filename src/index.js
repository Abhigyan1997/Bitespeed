const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./models/sequelize');
const contactRoutes = require('./routes/contact');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(contactRoutes);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
