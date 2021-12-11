import express from 'express';

const main = async () => {
  const app = express();
  
  app.get('/', (req, res) => res.send('HELLO WORLD'));
  
  return app;
}

export default main;
