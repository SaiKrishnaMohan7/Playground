import { Router } from "express";

const router = Router();

/**
 * Update
 */
router.get('/product', () => {});
router.get('/update/:id', () => {});
router.put('/update/:id', () => {});
router.post('/update', () => {});
router.delete('/update/:id', () => {});

/**
 * Update Point
 */
router.get('/updatepoint', () => {});
router.get('/updatepoint/:id', () => {});
router.put('/updatepoint/:id', () => {});
router.post('/updatepoint', () => {});
router.delete('/updatepoint/:id', () => {});

export default router;