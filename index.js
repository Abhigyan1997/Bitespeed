const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./src/models/sequelize');
const contactRoutes = require('./src/routes/contact');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(contactRoutes);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
