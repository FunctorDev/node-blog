import express from 'express';
import { envLoader, expressLoader } from './loaders';
import * as CONFIG from './config';
import models from '@/models';

const startServer = () => {
  const app = express();

  expressLoader(app, envLoader);
  // models.sequelize.sync({ force: true }).then(() => {
    app.listen(CONFIG.PORT, (err) => {
      if (err) {
        throw err;
      }

      console.log('App listen on: http://localhost:' + CONFIG.PORT);
    });
  // });
};

startServer();
