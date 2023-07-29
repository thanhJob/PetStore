"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const keys_1 = __importDefault(require("../../../ultis/keys"));
const userModel_1 = __importDefault(require("../../models/user/userModel"));
const app = (0, express_1.default)();
const router = express_1.default.Router();
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.use(new GoogleStrategy({
    clientID: keys_1.default.googleClientID,
    clientSecret: keys_1.default.googleClientSecret,
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback: true,
    scope: ["profile"],
}, async (req, accessToken, refreshToken, profile, cb) => {
    if (profile) {
        userModel_1.default.findOne({ googleID: profile.id }).then((exitstingUser) => {
            if (exitstingUser) {
                cb(null, exitstingUser);
            }
            else {
                new userModel_1.default({
                    googleId: profile.id,
                    email: Object.values(profile.emails)[0].value,
                    name: Object.values(profile.name)[0] +
                        " " +
                        Object.values(profile.name)[1],
                })
                    .save()
                    .then((user) => cb(null, user));
            }
        });
        // console.log(profile);
    }
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => {
    userModel_1.default.findById(id).then((user) => {
        done(null, user);
    });
});
exports.default = passport_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW5HZy5Db250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS9jb250cm9sbGVycy9sb2dpbkdHL2xvZ2luR2cuQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUFtRTtBQUNuRSx3REFBa0M7QUFDbEMsc0ZBQWlEO0FBQ2pELCtEQUF1QztBQUN2Qyw0RUFBK0M7QUFFL0MsTUFBTSxHQUFHLEdBQUcsSUFBQSxpQkFBTyxHQUFFLENBQUM7QUFDdEIsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxNQUFNLGNBQWMsR0FBRyxpQ0FBVSxDQUFDLFFBQVEsQ0FBQztBQUMzQyxHQUFHLENBQUMsR0FBRyxDQUFDLGtCQUFVLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztBQUNqQyxHQUFHLENBQUMsR0FBRyxDQUFDLGtCQUFVLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUU5QixrQkFBVSxDQUFDLEdBQUcsQ0FDWixJQUFJLGNBQWMsQ0FDaEI7SUFDRSxRQUFRLEVBQUUsY0FBSSxDQUFDLGNBQWM7SUFDN0IsWUFBWSxFQUFFLGNBQUksQ0FBQyxrQkFBa0I7SUFDckMsV0FBVyxFQUFFLDRDQUE0QztJQUN6RCxpQkFBaUIsRUFBRSxJQUFJO0lBQ3ZCLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQztDQUNuQixFQUNELEtBQUssRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUU7SUFDcEQsSUFBSSxPQUFPLEVBQUU7UUFDWCxtQkFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxhQUFrQixFQUFFLEVBQUU7WUFDakUsSUFBSSxhQUFhLEVBQUU7Z0JBQ2pCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7YUFDekI7aUJBQU07Z0JBQ0wsSUFBSSxtQkFBSSxDQUFDO29CQUNQLFFBQVEsRUFBRSxPQUFPLENBQUMsRUFBRTtvQkFDcEIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7b0JBQzlDLElBQUksRUFDRixNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQy9CLEdBQUc7d0JBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNsQyxDQUFDO3FCQUNDLElBQUksRUFBRTtxQkFDTixJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNuQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsd0JBQXdCO0tBQ3pCO0FBQ0gsQ0FBQyxDQUNGLENBQ0YsQ0FBQztBQUVGLGtCQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBUyxFQUFFLElBQVMsRUFBRSxFQUFFO0lBQ2hELElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3RCLENBQUMsQ0FBQyxDQUFDO0FBRUgsa0JBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFPLEVBQUUsSUFBUyxFQUFFLEVBQUU7SUFDaEQsbUJBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7UUFDbkMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsa0JBQWUsa0JBQVUsQ0FBQyJ9