import { Router } from "express";
import { isLoggedIn } from "../middleware/auth.middleware.js";
const router = Router();

import { cancelSubscription, verifyUserSubscription} from "../controllers/subscription.controller.js";


router.route('/verify')
    .post(isLoggedIn, verifyUserSubscription)

router.route('/unsubscribe')
    .post(isLoggedIn, cancelSubscription)



export default router;