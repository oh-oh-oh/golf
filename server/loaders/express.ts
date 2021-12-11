import express from 'express';

const main = async () => {
  const app = express();
  
  app.get('/', (req, res) => res.send('HOORAY!'));
  
  return app;
}

export default main;
