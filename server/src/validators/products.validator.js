import { body } from 'express-validator'

export const productValidator = [
    body("title")
    .trim()
    .exists().withMessage("Title is required").bail()
    .isString().withMessage("Title must be a string value").bail()
    .isLength({min:10, max:50}).withMessage("title lenght must be between 10 to 50 character").bail()
    .isAlpha("en-US", {ignore: " "}).withMessage("title can have only english alphabets"),
    body("description")
    .trim()
    .exists().withMessage("description is required").bail()
    .isString().withMessage("description must be a string value").bail()
    .isLength({min:20,max:100}).withMessage("description must be between 20 to 100 character long").bail(),
    body("")
]