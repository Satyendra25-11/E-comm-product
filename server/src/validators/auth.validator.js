import { body, validationResult } from 'express-validator'

export const registerValidator = [
    body("email")
    .exists().withMessage("Email is required").bail()
    .isEmail().withMessage("Invalid Email address").bail()
    .trim(),
    body("name")
    .exists().withMessage("Name is required")
    .isString().withMessage("Name must be a string value")
    .trim()
    .isLength({min:2, max:50}).withMessage("Name length must be between 2 to 50 "),
    body("password")
    .exists().withMessage("Password is required")
    .isString().withMessage("password must be a string value")
    .trim()
    .isLength({min:6}).withMessage("Password must contain 6 letters"),
    body("confirmPassword")
    .exists().withMessage("Password is required")
    .isString().withMessage("password must be a string value")
    .trim()
    .isLength({min:6}).withMessage("Password must contain 6 letters"),
    (req,res,next)=>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"Invalid register request",
                errors: errors.array()
            })
        }
        next()
    }
]




export const loginValidator = [
    body("email")
    .exists().withMessage("Email is required").bail()
    .isEmail().withMessage("Invalid Email address").bail()
    .trim(),
    body("password")
    .exists().withMessage("Password is required")
    .isString().withMessage("password must be a string value")
    .trim()
    .isLength({min:6}).withMessage("Password must contain 6 letters"),
    (req,res,next)=>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"Invalid login request",
                errors: errors.array()
            })
        }
        next()
    }
]