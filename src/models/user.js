const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", { document: true, query: false },async function(next) {
    
//   const user = this;
//   if (!user.isModified("password")) {
    
//     return next();
//   }
//  return bcrypt.genSalt(10),
    // (err, salt) => {
      
    //   if (err) {
       
    //     return next(err);
    //   }
   
    //   bcrypt.hash(user.password, 10, (err, hash) => {
       
    //     if (err) {
    //       return next(err);
    //     }
    //     user.password = hash;
    //     next();
    //   });
    // // };

    next();
});

// userSchema.methods.comparePassword =async function(candidatePassword) {
//   const user = this;
//   console.log('Step1')
//   return new Promise((resolve, reject) => {
//     console.log('Step2')
//     console.log(candidatePassword)
//     console.log( "User password "+ user.password)
//     console.log('Step3')
//     bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
//         console.log('Step4')
//       if (err) {
//         console.log('Step5')
//         return reject(err);
//       }
//       if (!isMatch) {
//         console.log('Ste6')
//         console.log('I m here on match :::' + isMatch)
//         return reject(false);
//       }
//       console.log('Ste7')

//       resolve(true);
//     });
//   });
// };
mongoose.model("User", userSchema);
