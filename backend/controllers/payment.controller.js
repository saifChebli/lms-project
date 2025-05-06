import crypto from 'crypto'

 import asyncHandler from '../middleware/asyncHAndler.middleware.js';
import Payment from '../models/payment.model.js';
import User from '../models/user.model.js';
import AppError from "../utils/error.utils.js";

// Remove Razorpay import
// import { razorpay } from "../server.js";  // Disabled Razorpay logic

/**
 * @GET_RAZORPAY_ID
 * Returns a mock response for API key (disable Razorpay logic)
 */
export const getRaZorpayApikey =asyncHandler(async(req, res, next)=>{
    try {
        res.status(200).json({
            success:true,
            message:'Razarpay API key (disabled)',
            key: 'Mock API Key (Disabled)'
        });
    } catch (error) {
        return next(
            new AppError(error.message, 500)
        ) 
    }
  
});

/**
 * @ACTIVATE_SUBSCRIPTION
 * Disabling Razorpay subscription logic
 */
export const buySubscription =asyncHandler(async(req, res, next)=>{

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
        
        // Mock subscription status
        if (user.subscription.id && user.subscription.status === 'created') {
            await user.save()
            res.status(200).json({
                success: true,
                message: "subscribed successfully",
                subscription_id: user.subscription.id
            })
        }
        else{
            // Removed Razorpay subscription creation
            user.subscription.id = 'mock-subscription-id'; // Placeholder for subscription ID
            user.subscription.status = 'created';
        
            await user.save();
            res.status(200).json({
                success:true,
                message:'Subscribed successfully (mock)',
                subscription_id: user.subscription.id
            });
      }
    } catch (error) {
        return next(
            new AppError(error.message, 500)
        ) 
    }
 
});

/**
 * @VERIFY_SUBSCRIPTION
 * Disabling Razorpay subscription verification
 */
export const verifySubscription =asyncHandler(async(req, res, next)=>{

    try {
        const {id }= req.user;
        const {razorpay_payment_id, razorpay_signature , razorpay_subscription_id }= req.body;
    
        const user =await User.findById(id);
        if(!user){
            return next(
                new AppError("Unauthorize , please login")
            )
        }
        
        // Mock verification (disabled Razorpay logic)
        const generateSignature = 'mock-signature';
        if (generateSignature !== razorpay_signature) {
            return next(createError(400, "payment not verified , please try again"))
        }
      
        await Payment.create({
            razorpay_payment_id: razorpay_payment_id || 'mock-payment-id',
            razorpay_signature: razorpay_signature || 'mock-signature',
            razorpay_subscription_id: razorpay_subscription_id || 'mock-subscription-id',
        })

        user.subscription.status='active';
    
        await user.save();
        res.status(200).json({
            success:true,
            message:'Payment verified (mock) successfully',
        });
    } catch (error) {
        return next(
            new AppError(error.message, 500)
        ) 
    }
  
});

/**
 * @CANCEL_SUBSCRIPTION
 * Disabling Razorpay subscription cancellation
 */
export const cancelSubscription =asyncHandler(async(req, res, next)=>{

    try {
        const {id}= req.user;

        const user = await User.findById(id);
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

        // Mock cancel subscription logic (disabled Razorpay logic)
        user.subscription.status='Inactive';

        await user.save();

        res.status(200).json({
            success:true,
            message:'Unsubscribed (mock) successfully',
        });
    } catch (error) {
        return next(
            new AppError(error.message, 500)
        ) 
    }
    
});

/**
 * @GET_RAZORPAY_ID
 * Disabling Razorpay API for fetching subscription details
 */
export const allPayments =asyncHandler(async(req, res, next)=>{
    try {
        const{count,skip}=req.query;
    
        // Mock payment data (disabled Razorpay logic)
        const allPayments = {
            items: []
        };

        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];

        const finalMonths = {
            January: 0,
            February: 0,
            March: 0,
            April: 0,
            May: 0,
            June: 0,
            July: 0,
            August: 0,
            September: 0,
            October: 0,
            November: 0,
            December: 0,
        };

        const monthlyWisePayments = allPayments.items.map((payment) => {
            // We are using payment.start_at which is in unix time, so we are converting it to Human readable format using Date()
            const monthsInNumbers = new Date(payment.start_at * 1000);
        
            return monthNames[monthsInNumbers.getMonth()];
        });

        monthlyWisePayments.map((month) => {
            Object.keys(finalMonths).forEach((objMonth) => {
                if (month === objMonth) {
                    finalMonths[month] += 1;
                }
            });
        });

        const monthlySalesRecord = [];

        Object.keys(finalMonths).forEach((monthName) => {
            monthlySalesRecord.push(finalMonths[monthName]);
        });
        
        res.status(200).json({
            success: true,
            message: 'All payments (mock)',
            allPayments,
            finalMonths,
            monthlySalesRecord,
        });
    } catch (error) {
        return next(
            new AppError(error.message, 500)
        ) 
    }
});
