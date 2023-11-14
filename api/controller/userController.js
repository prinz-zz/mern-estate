import { errorMessage } from '../utils/error.js';
import bcrypt from 'bcrypt';
import User from '../models/user.js';


export const updateUser = async (req, res, next) => {

    const { username, email, password, avatar } = req.body;

    if(req.user.id !== req.params.id) return next(403, 'Unauthorized');

    try {
        if(password){
            password = await bcrypt.hash(password, 10)
        }
    const updatedUser = await User.findByIdAndUpdate(req.params.id,{
        $set: { 
            username,
            email,
            password,
            avatar,
        }
    }, { new : true }
    )
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);

    } catch (error) {
        next(error)
    }
}