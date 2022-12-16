import Router from '@koa/router';

import * as users from './app/users/index.js';
import * as predictions from './app/predictions/index.js';
import * as games from './app/games/index.js';

export const router = new Router();

router.get('/login', users.login);
router.post('/users', users.create);

router.post('/predictions', predictions.create);

router.get('/games', games.list);

router.get('/:username', users.predictions);
