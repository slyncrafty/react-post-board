import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema(
	{
		url: { type: String, required: true },
		publicId: { type: String, required: true },
	},
	{ _id: false }
);

const PostSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      require: true,
    },
    cloudinaryId: {
      type: String,
      require: true,
    },
    caption: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
	{ timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);
export default Post;