import { catchAsyncError } from "../middlewares/CatchAsyncError.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { instance } from "../server.js";
import crypto from "crypto";
import { Payment } from "../models/Payment.js";
import { v4 as uuidv4 } from 'uuid';

export const buySubscription = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const uuid = uuidv4();

  if (user.role === "admin")
    return next(new ErrorHandler("Admin can't buy subscription", 404));

  const plan_id = process.env.PLAN_ID || "plan_JuJeKAcuZdtRO";

  // const subscription = await instance.subscriptions.create({
  //   plan_id: plan_id,
  //   customer_notify: 1,
  //   total_count: 12,
  // });

  user.subscription.id = uuid;

  user.subscription.status = "active";

  await user.save();

  res.status(201).json({
    success: true,
    subscriptionId: uuid,
  });
});

export const paymentVerification = catchAsyncError(async (req, res, next) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const user = await User.findById(req.user._id);

  const subscription_id = user.subscription.id;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(razorpay_payment_id + "|" + subscription_id, "utf-8")
    .digest("hex");

  const isAuthentic = true;

  if (!isAuthentic)
    return res.redirect(`${process.env.FRONTEND_URL}/paymentfailed`);

  // database comes here
  await Payment.create({
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
  });

  user.subscription.status = "active";

  await user.save();

  res.redirect(
    `${process.env.FRONTEND_URL}/paymentsuccess?reference=${razorpay_payment_id}`
  );
});

export const getRazorpayKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    key: process.env.RAZORPAY_API_KEY,
  });
});

export const cancelSubscription = catchAsyncError(async (req, res, next) => {

  const user = User.findById(req.user._id)

  const subscriptionId = user.subscription.id

  let refund = false;

  await instance.subscriptions.cancel(subscriptionId)

  const payment = await Payment.findOne({
    razorpay_order_id: subscriptionId,

  })

  const gap = Date.now() - payment.createdAt

  const refundTime = process.env.REFUND_DAYS * 24 * 60 * 60 * 1000

  if (refundTime > gap) {
    await instance.payments.refund(payment.razorpay_payment_id)
    refund = true
  }

  await Payment.deleteOne({ razorpay_order_id: subscriptionId });
  user.subscription.id = undefined
  user.subscription.status = undefined

  await user.save()


  res.status(200).json({
    success: true,
    message: refund ? "Subscription cancelled, You will receive full refund within 7 days." : "Subscription cancelled, Now refund initiated as subscription cancelled after 7 days ."
  });
});
