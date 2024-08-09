module.exports = (type, event, message) => {
  const dateTime = require("./getDateTime")();
  let color;
  switch (type.toLowerCase()) {
    case "primary":
      color = "4";
      break;
    case "success":
      color = "2";
      break;
    case "info":
      color = "6";
      break;
    case "warning":
      color = "3";
      break;
    case "error":
      color = "1";
      break;
    default:
      color = "5";
      break;
  }
  console.log(
    `Kesalahan, Ada Yang Erorr`
  );
};
