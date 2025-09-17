import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User.js';

// Export the following passport configuration functions so it can be used in our app
export const configurePassport = function (passport) {
  // Configure a local authentication strategy (email/password)
  passport.use(
    // local Strategy to use "email"
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        // Find a user in the database by email and include password field (select:false in schema)
        const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

        // if no user found, auth fails
        if (!user) {
          return done(null, false, { message: `Email ${email} not found.` });
        }
        if (!user.password) {
          return done(null, false, {
            message:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        // Compare provided password with hashed password in DB
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, { message: "Invalid email or password." });
        });
      } catch (err) {
        return done(err);
      }
    })
  );
  // Serialize user to session (store user id)
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  // Deserialize user from session by user id
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};
