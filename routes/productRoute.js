import express from 'express';
import {
    getProducts,
    getProductsById,
    createProducts,
    updateProducts,
    deleteProducts
} from '../controllers/Products.js';
// import { verifyUser } from '../middleware/AuthUser.js';
const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductsById);
router.post('/products', createProducts);
router.patch('/products/:id', updateProducts);
router.delete('/products/:id', deleteProducts);

export default router;
