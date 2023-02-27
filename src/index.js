const express = require('express');
const cors = require('cors');

const router = require('./routes');

const app = express();

app.use(express.json());
app.use('/api/v1', router);
app.use(cors());
app.listen(3000, () => {
  console.log('app is running at http://localhost:3000')
})
