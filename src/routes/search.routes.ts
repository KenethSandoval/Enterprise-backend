import { Router } from 'express';
import { search, collectionDocument } from '../controllers/search.controller';
import authMiddleware from '../middlewares/auth.middleware'

const router = Router();

router.route('/:filter')
    .get(authMiddleware, search)

router.route('/collection/:document/:filter')
    .get(authMiddleware, collectionDocument)

export default router;