const mongosse = require("mongoose");

const PostSchema = mongosse.Schema({
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  author: [
    {
        type:mongosse.Schema.Types.ObjectId,ref:"User"
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
PostSchema.pre("save", (next) => {
  now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }

  next();
});
const post = mongosse.model("Posts", PostSchema);
module.exports=post;
