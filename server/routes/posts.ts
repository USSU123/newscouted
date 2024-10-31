import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { uploadImage } from '../services/storage';
import multer from 'multer';
import { z } from 'zod';
import { Post } from '../models';

const router = Router();
const upload = multer();

const postSchema = z.object({
  content: z.string().min(1).max(2000),
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const data = postSchema.parse(req.body);

    const post = await Post.create({
      content: data.content,
      author: req.user._id,
    });

    await post.populate('author', 'username displayName avatar');

    res.json(post);
  } catch (error) {
    console.error('Post creation error:', error);
    res.status(400).json({
      error: error instanceof z.ZodError 
        ? error.errors 
        : 'Failed to create post',
    });
  }
});

router.post('/media', authenticateToken, upload.array('media', 4), async (req, res) => {
  try {
    if (!req.files?.length) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const files = req.files as Express.Multer.File[];
    const uploadPromises = files.map(file => uploadImage(file, 'posts'));
    const mediaUrls = await Promise.all(uploadPromises);

    res.json({ mediaUrls });
  } catch (error) {
    console.error('Media upload error:', error);
    res.status(500).json({ error: 'Failed to upload media' });
  }
});

export default router;