import { Router } from 'express';
import { search, collectionDocument } from '../controllers/search.controller';
import authMiddleware from '../middlewares/auth.middleware'

const router = Router();

router.route('/:filter')
    .get(search)

router.route('/collection/:document/:filter')
    .get(collectionDocument)

export default router;