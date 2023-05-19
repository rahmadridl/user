import success from "../../Helper/Response/success.js";
import errorHandling from "../../Helper/Response/error.js";
import { readUser } from "../../Services/Auth/AuthRepository.js";

export default async function get(req, res) {
  try {
    const search = req.query.search ? req.query.search.toLowerCase() : "";
    const page = req.query.page || 1;
    const page_size = req.query.page_size || 10;

    let requirement = {};    
    if (search) requirement.search = search; //Filter By Search
    let tax = await readUser(requirement, page, page_size);
    let result = []
    tax.rows.forEach(element => {
        result.push({
            id: element.id,
            fullname: element.fullname,
            username: element.username,
        })
    });
    return success("Success Read List User", 200, result, res, tax.count, page, page_size);
  } catch (error) {
    console.log(error);
    return errorHandling("Failed Read List User", 500, error.message, res);
  }
}
