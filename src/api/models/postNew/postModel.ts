import mongoose, { Schema } from "mongoose";

// Import Interface
import News from "./interface";

const postSchemal = new Schema<News>(
  {
    title: {
      type: String,
      maxLength: [50, "A post must have less of equal then 50 characters"],
      minLength: [10, "A post must have less of less then 10 characters"],
      required: [true, "A post must have a title"],
    },
    description: {
      type: String,
      maxLength: [500, "A post must have less of equal then 500 characters"],
      minLength: [10, "A post must have less of less then 10 characters"],
      required: [true, "A post must have a description"],
    },
    images: {
      type: Array,
      required: [true, "A post must have a images"],
    },
    createAt: {
      type: Date,
      default: new Date(Date.now()),
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    collection: "Post",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchemal.pre<News>(/^find/, function (next) {
  this.populate({
    path: "author",
    select: "name email",
  })
    .populate({
      path: "comment",
      select: "description",
    })
    .populate({
      path: "like",
      // select: "description"
    });
  next();
});

const Post = mongoose.model<News & mongoose.Document>("Post", postSchemal);

export default Post;
