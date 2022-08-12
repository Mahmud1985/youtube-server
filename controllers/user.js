import { createError } from "../error.js"
import User from "../models/User.js"

export const update = async (req, res, next) => {

    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true })
            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)
        }
    } else {
        return next(createError(403, "You can updale only your account."))
    }
}
export const deleteUser = async (req, res, next) => {

    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id,)
            res.status(200).json("User has been deleted.")
        } catch (error) {
            next(error)
        }
    } else {
        return next(createError(403, "You can delete only your account."))
    }
}
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return next(createError(404, "user not found."))
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        next(error)
    }

}
export const subscribe = async (req, res, next) => {
    try {
        //req.user.id is the user loged in
        //req.params.id is the user subscribed by the login user
        //push subscribed user id to the login user subscribedUsers field.
        await User.findByIdAndUpdate(req.user.id, {
            $push: {
                subscribedUsers: req.params.id
            }
        })
        //increase the number of subscribers in be subscribed user.
        await User.findByIdAndUpdate(req.params.id, {
            $inc: {
                subscribers: 1
            }
        })

        res.status(200).json("subscription successfull.")
    } catch (error) {
        next(error)
    }
}
export const unsubscribe = async (req, res, next) => {
    try {
        //req.user.id is the user loged in
        //req.params.id is the user subscribed by the login user
        //pull subscribed user id from the login user subscribedUsers field.
        await User.findByIdAndUpdate(req.user.id, {
            $pull: {
                subscribedUsers: req.params.id
            }
        })
        //decrease the number of subscribers in be subscribed user.
        await User.findByIdAndUpdate(req.params.id, {
            $inc: {
                subscribers: -1
            }
        })

        res.status(200).json("Unsubscription successfull.")

    } catch (error) {
        next(error)
    }
}
export const like = async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
}
export const dislike = async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
}
