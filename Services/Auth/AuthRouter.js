import sign_up from "../../Controller/Auth/CreateSignupController.js";
import sign_in from "../../Controller/Auth/CreateSigninController.js";
import read_list from "../../Controller/Auth/ReadProfileController.js";
import AuthMiddleware from "../../Middleware/Authentication.js";

const AuthRoutes = (app) => {
  app.route(`/auth/signup`).post(sign_up);
  app.route(`/auth/login`).post(sign_in);
  app.route(`/user/userlist`).get(AuthMiddleware, read_list);
};

export { AuthRoutes };
