const express = require('express');
const path = require('path');

const app = express();
const port = 3000;
const cors = require('cors');

// Routers
const apiRouter = require('./routes/api');

// Serve all static files in dist folder
app.use(express.static(path.resolve(__dirname, '../dist')));

// Handle Request for Static Files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Route Handlers
app.use('/api', apiRouter);

app.get('/', cors(), (_req, res) => {
  res.status(200).json('Hello World');
});

app.use('*', cors(), (_req, res) => {
  res.status(404).json('Server Not Found');
});

// Global Error Handler
const errorHandler = (err, _req, res, _next) => {
  const defaultErr = {
    log: 'An error occured at unknown middleware',
    status: 500,
    message: { err: 'An Error Occured.' }
  }

  const customErr = Object.assign({}, defaultErr, err);
  console.log(customErr.log);
  return res.status(customErr.status).json(customErr.message);
}

// Start Server on Port 3000
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});