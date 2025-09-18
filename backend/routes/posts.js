import { Router } from 'express';
import Post from '../models/Post.js';
import upload from '../middleware/multer.js';
import cloudinary from '../middleware/cloudinary.js';

const router = Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate('user', 'name email');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'name email');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create a post (with single image)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: 'Not authenticated' });

    const { title, caption } = req.body;
    if (!title || !caption) {
      return res.status(400).json({ message: 'Title and caption are required' });
    }

    let imageUrl = '';
    let cloudinaryId = '';
    
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: 'react-recipe-board/posts',
      });
      imageUrl = uploadResult.secure_url;
      cloudinaryId = uploadResult.public_id;
    }

    const post = await Post.create({ 
      title, 
      caption, 
      image: imageUrl,
      cloudinaryId,
      likes: 0,
      user: userId 
    });
    
    await post.populate('user', 'name email');
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update a post (owner only)
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: 'Not authenticated' });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { title, caption } = req.body;
    if (title !== undefined) post.title = title;
    if (caption !== undefined) post.caption = caption;

    // Handle new image upload
    if (req.file) {
      // Delete old image from Cloudinary
      if (post.cloudinaryId) {
        try { await cloudinary.uploader.destroy(post.cloudinaryId); } catch (e) {}
      }
      
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: 'react-recipe-board/posts',
      });
      post.image = uploadResult.secure_url;
      post.cloudinaryId = uploadResult.public_id;
    }

    await post.save();
    await post.populate('user', 'name email');
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Like a post
router.put('/like/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    post.likes += 1;
    await post.save();
    res.json({ likes: post.likes });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete a post (owner only) and remove image
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: 'Not authenticated' });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Delete image from Cloudinary
    if (post.cloudinaryId) {
      try { await cloudinary.uploader.destroy(post.cloudinaryId); } catch (e) {}
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;