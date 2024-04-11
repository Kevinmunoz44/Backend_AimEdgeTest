import express from 'express';
import { getUser, getUserById, createUser, updateUser, deleteUser } from '../controllers/Users.js'
import { verifyUser, adminOnly } from '../middleware/AuthUser.js';
const router = express.Router();

router.get('/users', adminOnly, verifyUser,  getUser)
router.get('/users/:id', adminOnly, verifyUser, getUserById)
router.post('/users', adminOnly, verifyUser, createUser)
router.patch('/users/:id', adminOnly, verifyUser, updateUser)
router.delete('/users/:id', adminOnly, verifyUser, deleteUser)

export default router;
