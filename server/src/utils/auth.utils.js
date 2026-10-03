import jwt from 'jsonwebtoken'
import config from '../config/config.js'


export const createAccessToken = ({userId,email})=>{
    const accessToken = jwt.sign({userId, email}, config.ACCESS_TOKEN_SECRET, {expiresIn: "15Min"})

    return accessToken
}


export const createRefreshToken = ({userId, email})=>{
    const refreshToken = jwt.sign({userId,email}, config.REFRESH_TOKEN_SECRET, {expiresIn: "7Days"})

    return refreshToken
}


export const readRefreshToken = ({refreshToken})=>{
    return jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET)
}


export const readAccessToken = (accessToken)=>{
    return jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET)
}