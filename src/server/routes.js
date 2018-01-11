import BuildList from './controller/build-list';
import BuildExec from './controller/build-exec';

const Router = require('koa-router');
let router = new Router();

router.get('/build/list', BuildList.getBuildList);

router.get('/compiler/:id', BuildExec.compiler);

router.get('/remove/:id', BuildExec.remove);

router.get('/build/queue', BuildExec.status);

export default router;