const mongoose=require('mongoose')


const connectionSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect`,
      },
    },
  },
  { timestamps: true }
);


connectionSchema.index({ fromUserId: 1, toUserId: 1 });

const Connection=mongoose.model('connections',connectionSchema)

module.exports=Connection