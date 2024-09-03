import { review } from '@review/controllers/create';
import { reviewsByGigId, reviewsBySellerId } from '@review/controllers/get';
import express, { Router } from 'express';

const router = express.Router();

export const reviewRoutes = (): Router => {
  router.get('/gig/:gigId', reviewsByGigId);
  router.get('/seller/:sellerId', reviewsBySellerId);
  router.post('/', review);

  return router;
};
