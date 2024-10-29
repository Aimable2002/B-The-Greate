import jwt from 'jsonwebtoken';
import User from '../Modal/userModal.js';




export const Signup = async(req, res) => {
    try{
        const {fullName, userName, age, gender, email, Phone_number, password, confirmPassword} = req.body;
        console.log('req :', req.body)

        if(!fullName || !userName ||  !gender || !email || !Phone_number || !password || !confirmPassword){
            return res.status(403).json({error: 'fill all the filled'})
        }
        if(password != confirmPassword){
            return res.status(401).json({error: 'password mismatch'})
        }
        // if(age < 18){
        //     return res.status(400).json({error: 'no under 18 user'})
        // }

        const oldUser = await User.findOne({userName});

        if(oldUser){
            return res.status(404).json({error: 'username taken'})
        }

        // const salt = await bcrypt.genSalt(10);
        // const harshPassword = await bcrypt.hash(password, salt)


        // const avatarBoy = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        // const avatarGirl = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const newUser = new User({
            fullName,
            userName,
            email,
            gender,
            Phone_number,
            password,
            // avatar: gender === "Male" ? avatarBoy : avatarGirl,
        })
        console.log('new user:', newUser)
        if(newUser){
            const token = jwt.sign({userId: newUser._id}, process.env.SECRET, {expiresIn: '10d'})
            await newUser.save();
            
            res.status(201).json({
                _id: newUser._id,
                userName: newUser.userName,
                token
            })
            
        }
    }catch(error){
        console.log("internal server sign error", error.message)
        res.status(500).json({error: 'internal server sign error'})
    }

}

export const login = async(req, res) => {
    try{
        const {userName, password} = req.body;
        console.log('req.body :', req.body)

        if(!userName || !password){
            return res.status(409).json({error: "fill the field"})
        }

        const user = await User.findOne({userName});
        if(!user){
            return res.status(404).json({error: "No user Found"})
        }
        console.log('password :', password)

        
        console.log('hashedPassword :', user?.password)
        if(password !== user?.password){
            return res.status(408).json({error: 'incorrect password'})
        }
        // const isPasswordTrue = await bcrypt.compare(password, user?.password || '')
        // console.log('isPasswordTrue :', isPasswordTrue)

        // if(!isPasswordTrue){
        //     return res.status(401).json({error: "Incorrect password"})
        // }

        const token = jwt.sign({userId: user._id}, process.env.SECRET, {expiresIn: '10d'})

        res.status(201).json({
            _id: user._id,
            userName: user.userName,
            token
        })
    }catch(error){
        console.log('internal server login error :', error.message)
        res.status(500).json({error: "internal server login error"})
    }
}

export const logout = (req, res) => {
    try{
        res.cookie("jwt", "",  {maxAge: '0'});
        res.status(200).json("successfully logout")
    }catch(error){
        console.log("internal server logout error", error.message)
        res.status(500).json({error: "internal server logout error"})
    }
}