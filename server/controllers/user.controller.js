// import User from "../model/user.model.js";
import User from "../model/user.model.js"
import {OAuth2Client} from "google-auth-library"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const registerUser = async (req, res) => {
  try {
    let { fullName, email, password } = req.body;

    fullName = fullName?.trim();
    email = email?.trim();
    password = password?.trim();

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await  User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hassedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password:hassedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    console.log(error);
    
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



export const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email?.trim().toLowerCase();
    password = password?.trim();

    // Input Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    // Find User
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Success Response
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const getProfile = async (req, res) => {

  
    const userId = req.user.id;


    const user = await User.findById(userId).select("-password");


    if(!user){
      return res.status(404).json({
        success : false,
        message : "user does not exists"
      })


    }

   return res.status(200).json({
    success: true,
    user: user
});
}


export const updateProfile = async (req, res) => {
 try{
  const {fullName, bio, profileImage} = req.body;
  const userId = req.user.id;

  const updateData = {};

    if(fullName) {
  updateData.fullName = fullName;
}

if(bio) {
  updateData.bio = bio;
}

if(profileImage) {
  updateData.profileImage = profileImage;
}



  const user = await User.findById(userId);


    if(!user){
      return res.status(404).json({
        success : false,
        message : "user does not exists"
      })}

        const updatedProfile = await User.findByIdAndUpdate(userId,updateData,
        {
          new:true,
          runValidators:true
        })

 return res.status(200).json({
  success : true,
  message : "updating profile",
  user : updatedProfile,
})
 } catch(err){
console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
 }
}


export const googleLogin = async (req, res) => {
try{
const { credential } = req.body;
if (!credential) {
  return res.status(400).json({
    success: false,
    message: "Google credential is required",
  });
}

const ticket = await googleClient.verifyIdToken({
  idToken : credential,
  audience : process.env.GOOGLE_CLIENT_ID
});

const payload = ticket.getPayload();
const {email, name, picture, email_verified} = payload;

if (!email_verified) {
  return res.status(401).json({
    success: false,
    message: "Google email is not verified",
  });
}

const existingUser = await User.findOne({
  email,
});

if(existingUser){
  const token = jwt.sign(
    {
    id:existingUser._id,
  },
  process.env.JWT_SECRET,
  {
    expiresIn:"7d"
  }
);

return res.status(200).json({
  message:"google login successfully",
  success:true,
  token,
})
} else{
  const user = await User.create({
    email : email,
    fullName : name,
    provider :"google",
    profileImage: picture,
  });

  const token =  jwt.sign(
    {id:user._id,}, process.env.JWT_SECRET, {expiresIn:"7d"})

   return res.status(201).json({
      success: true,
      message: "google login successfully",
      token,
    });
}

} catch(error){
  console.error(error);

  return res.status(401).json({
    success: false,
    message: "Invalid Google Credential",
  });

}
}
