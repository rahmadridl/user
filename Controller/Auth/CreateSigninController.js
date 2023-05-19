import User from "../../Model/user.js";
import jwt from "jsonwebtoken";
import jwtsecret from "../../Config/auth_config.js";
import success from "../../Helper/Response/success.js";
import errorHandling from "../../Helper/Response/error.js";
import { CekPassword, FindUserByUsername } from "../../Services/Auth/AuthRepository.js";

export default async function createOne(req, res) {
  try {
    let user = await FindUserByUsername(req.body.username);
    if (!user) {
      return errorHandling("Failed Login", 500, "Username Not Found", res);
    }
    let cek_password = await CekPassword(req.body.password, user.password);
    if (!cek_password) {
      return errorHandling("Failed Login", 500, "Password Invalid", res);
    }
    var token = jwt.sign(
      {
        user_id: user.id,
      },
      jwtsecret,
      {
        expiresIn: 86400, //24 hours
      }
    );
    await User.update(
      {
        token: token,
      },
      { where: { id: user.id } }
    );

    var data = {
      username: user.username,
      accessToken: token,
    };
    return success("Success Login", 200, data, res);
  } catch (error) {
    console.log(error);
    return errorHandling("Failed Login", 500, error.message, res);
  }
}
