import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import startup from './startup';
import routes from './routes';

const app: { [key: string]: any } = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

routes.forEach((route: any) => {
  app[route.verb](route.endpoint, route.controller);
});

app.get('/*', (request: express.Request, response: express.Response) => {
  console.log('\n\nReached the API\n\n');
  response.send(`You've successfully reached the RaidTeam API`);
});

startup({ verbose: true });

export default app;
