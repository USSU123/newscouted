import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { User } from '../models';

const router = Router();

router.get('/users', authenticateToken, async (req, res) => {
  try {
    const { q: query, tags, location } = req.query;

    const searchQuery: any = {
      $or: [
        { username: { $regex: query as string, $options: 'i' } },
        { displayName: { $regex: query as string, $options: 'i' } },
      ],
    };

    if (location) {
      searchQuery.location = { $regex: location as string, $options: 'i' };
    }

    if (tags) {
      searchQuery.tags = {
        $in: (tags as string).split(','),
      };
    }

    const users = await User.find(searchQuery)
      .populate('tags')
      .populate('subscription')
      .limit(20);

    res.json(users);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

export default router;