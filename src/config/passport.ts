import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../modules/user/user.model";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_REDIRECT_URI!,
    },
    async (_, __, profile, done) => {
      let user = await User.findOne({ email: profile.emails?.[0].value });

      if (!user) {
        
        user = await User.create({
          name: profile.displayName,
          email: profile.emails?.[0].value,
          authProvider: "google",
          isVerified: true,
        });
      }

      done(null, user);
    }
  )
);

passport.serializeUser((user: any, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

export default passport;
