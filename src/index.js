const express = require('express');
const cors = require('cors');
const app = express();

const router = require('./router');
const db = require('./models/index');

// test db: 
db.sequelize.authenticate()
  .then(() => console.log('☔️Database connected!'))
  .catch(err => console.error(err));


app.use(cors())
.use(express.json())
.use(router);

(async () => {
  try {
    await db.sequelize.sync();//{force: true}
    const port = 5000;
    app.listen(port);
    console.log(`🍇Server listening on port ${port}`); // eslint-disable-line no-console
  } catch (e) {
    console.error('Error connecting to the db', e); // eslint-disable-line no-console
  }
})();