import express from 'express';
import { envLoader, expressLoader } from './loaders';
import * as CONFIG from './config';

const startServer = () => {
  const app = express();

  expressLoader(app, envLoader);

  app.listen(CONFIG.PORT, (err) => {
    if (err) {
      throw err;
    }

    console.log('App listen on: http://localhost:' + CONFIG.PORT);
  });
};

startServer();
