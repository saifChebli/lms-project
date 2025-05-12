import asyncHandler from '../middleware/asyncHAndler.middleware.js';
import User from '../models/user.model.js';
import AppError from "../utils/error.utils.js";



/**
 * @ACTIVATE_SUBSCRIPTION
 */
export const verifyUserSubscription =asyncHandler(async(req, res, next)=>{
    try {
        const {id}= req.user;
        const user =await User.findById(id);
        if(!user){
            return next(
                new AppError("Unauthorize , please login")
            )
        }
        if(user.role==='ADMIN'){
            return next(
                new AppError(" Admin cannot purchase a subscription", 400)
            ) 
        }
        
        user.subscription.status='active';
        await user.save();
        res.status(200).json({
            success:true,
            message:'Subscription verified successfully',
        });
    } catch (error) {
        return next(
            new AppError(error.message, 500)
        ) 
    }
  
});

/**
 * @CANCEL_SUBSCRIPTION
 */
export const cancelSubscription =asyncHandler(async(req, res, next)=>{
    try {
        const {id}= req.user;
        const user =await User.findById(id);
        if(!user){
            return next(
                new AppError("Unauthorize , please login")
            )
        }
        if(user.role==='ADMIN'){
            return next(
                new AppError(" Admin cannot cancel a subscription", 400)
            ) 
        }
        
        user.subscription.status='canceled';
        await user.save();
        res.status(200).json({
            success:true,
            message:'Subscription canceled successfully',
        });
    } catch (error) {
        return next(
            new AppError(error.message, 500)
        ) 
    }
  
});
