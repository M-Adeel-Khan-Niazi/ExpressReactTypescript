import {
  Strategy as JWTStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import { UserModel } from "../modules/auth/model";

const jwtOpts: StrategyOptions = {
  // Tell passport to take the jwt token from the Authorization headers
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWTKEY || "testing_key",
};

export default new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    const user$ = await UserModel.findOne({ where: { user_id: payload } });
    if (user$) {
      done(null, user$);
    } else {
      done(null, false);
    }
  } catch (e) {
    return done(e, false);
  }
});
