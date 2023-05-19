import User from "../../Model/user.js";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import sequelize from "sequelize";
import pkg from "lodash";
const { groupBy, forEach, find } = pkg;

// Start Session Create Data User
const createSignUp = async (data, transaction) => {
  const t = transaction ? transaction : await User.sequelize.transaction();
  try {
    let result = await User.create(data, { transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error("[EXCEPTION] createSignUp", error);
    throw new Error(error);
  }
};
// End Session Create Data User

// Start Session Update Data User
const updateUser = async (data, filter, transaction) => {
  const t = transaction ? transaction : await User.sequelize.transaction();
  try {
    let result = await User.update(data, { ...filter, transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error("[EXCEPTION] updateUser", error);
    throw new Error(error);
  }
};
// End Session Update Data User

// Start Session User By Email
const FindUserByUsername = async (email) => {
  try {
    let result = await User.findOne({
      where: {
        username: { [Op.iLike]: `${email}` },
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] FindUserByUsername", error);
    throw new Error(error);
  }
};
// End Session User By Email

const FindnotById = async (id) => {
  try {
    let result = await User.findAll({
      where: {
        id: { [Op.not]: id },
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] FindnotById", error);
    throw new Error(error);
  }
};

// Start Session User By Id
const FindUserbyid = async (id) => {
  try {
    let result = await User.findByPk(id, {
      raw: true,
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] findUserById", error);
    throw new Error(error);
  }
};
// End Session User By Id

// Start Session Cek Password
const CekPassword = async (pass_body, pass_user) => {
  try {
    let result = bcrypt.compareSync(pass_body, pass_user);
    return result;
  } catch (error) {
    console.error("[EXCEPTION] CekPassword", error);
    throw new Error(error);
  }
};
// End Session Cek Password

const readUser = async ({ search }, page, page_size) => {
  try {
    let result = await User.findAndCountAll({
      where: {
        [Op.or]: [
          {
            username: search
              ? sequelize.where(
                  sequelize.fn("LOWER", sequelize.col("username")),
                  "LIKE",
                  "%" + search + "%"
                )
              : { [Op.like]: `%%` },
          },
        ],
      },
      offset: page_size * (page - 1),
      limit: page_size,
      order: [["id", "DESC"]],
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] readUser", error);
    throw new Error(error);
  }
};

export {
  createSignUp,
  FindUserByUsername,
  CekPassword,
  FindUserbyid,
  updateUser,
  FindnotById,
  readUser
};
