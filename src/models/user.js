const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const validator=require('validator')


const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
    },
    lastName: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      unique: true,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address");
        }
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Weak password");
        }
      },
    },
    age: {
      type: Number,
      required: true,
      min: [15, "Minimum age must be 15"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
      required: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Invalid gender");
        }
      },
    },
    about: {
      type: String,
      default: "Fresher in the community",
    },
    photoUrl: {
      type: String,
      default:
        "https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo url");
        }
      },
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save',async function(next){
    if(this.isModified("password"))
        {
               this.password=await bcrypt.hash(this.password,10)
                next()
        }
})



const User=mongoose.model('users',userSchema)
module.exports=User