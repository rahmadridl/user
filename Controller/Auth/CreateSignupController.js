import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import jwtsecret from "../../Config/auth_config.js";
import success from "../../Helper/Response/success.js";
import errorHandling from "../../Helper/Response/error.js";
import {
  FindUserByUsername,
  FindUserbyid,
  createSignUp,
  updateUser,
} from "../../Services/Auth/AuthRepository.js";

export default async function createOne(req, res) {
  try {
    function convertTZ(date, tzString) {
      return new Date(
        (typeof date === "string" ? new Date(date) : date).toLocaleString(
          "en-US",
          { timeZone: tzString }
        )
      );
    }

    // Validasi username
    let checkUser = await FindUserByUsername(req.body.username);
    if (checkUser) {
      return errorHandling("Failed Login", 409, "Username Already Exists", res);
    }
    if (!req.body.username || req.body.username.length < 2) {
      return errorHandling(
        "Failed Login",
        400,
        "Username minimum 2 characters",
        res
      );
    }

    // Validasi password
    if (!req.body.password || req.body.password.length < 5) {
      return errorHandling(
        "Failed Login",
        400,
        "Password minimum 5 characters",
        res
      );
    }

    var create_SignUp = {
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password),
      fullname: req.body.fullname,
      created_at: convertTZ(new Date(Date.now()), "Asia/Jakarta"),
      updated_at: convertTZ(new Date(Date.now()), "Asia/Jakarta"),
    };
    let SignUp = await createSignUp(create_SignUp);
    var token = jwt.sign(
      {
        user_id: SignUp.id,
      },
      jwtsecret,
      {
        expiresIn: 86400, //24 hours
      }
    );
    let updateToken = await updateUser({ token }, { where: { id: SignUp.id } });
    let user = await FindUserbyid(SignUp.id);
    let result = {
      fullname: req.body.fullname,
      username: req.body.username,
      token: user.token,
    };
    return success("Success Register", 200, result, res);
  } catch (error) {
    console.log(error);
    return errorHandling("Failed Register!", 500, error.message, res);
  }
}
