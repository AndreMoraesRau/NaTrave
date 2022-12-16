import Router from '@koa/router';

import * as users from './users/index.js';
import * as predictions from './predictions/index.js';
import * as games from './games/index.js';

export const router = new Router();

router.get('/login', users.login);
router.post('/users', users.create);

router.post('/predictions', predictions.create);

router.get('/games', games.list);

router.get('/:username', users.predictions);
