export default function error(message, code, description, res) {
  var data = {
    success: false,
    message: message,
    code: code,
    description: description,
  };
  res.status(code);
  return res.json(data);
}
