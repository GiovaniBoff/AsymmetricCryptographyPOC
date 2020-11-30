import express from 'express';
import routes from './routes';
import cors from 'cors';
import 'dotenv/config';
import fs from 'fs';
import './database';
import NodeRSA from 'node-rsa';
import path from 'path';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.createPrivateKey();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }

  createPrivateKey() {
    const fileName = 'isNotRsaPrivateKey.json';
    if (fs.existsSync(path.resolve(__dirname, 'config', fileName))) {
      return;
    }
    const key = new NodeRSA({ b: 1024 });
    const private_key = key.exportKey('pkcs8-private');
    const public_key = key.exportKey('pkcs8-public');
    const rsaPublic = {
      private_key,
      public_key,
    };
    fs.writeFileSync(
      path.resolve(__dirname, 'config', fileName),
      JSON.stringify(rsaPublic),
      function (err) {
        if (err) return console.log(err);
      }
    );
  }
}

export default new App().server;
