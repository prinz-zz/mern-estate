import jwt from 'jsonwebtoken';

export const genTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign(
        {userId},
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
    );

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 900000,
    });
}