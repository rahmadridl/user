import { AuthRoutes } from "../Services/Auth/AuthRouter.js";

const MainRoutes = (app) => {
    AuthRoutes(app);
};
  
export default MainRoutes;
  