export const validateUser = (req, res, next) => {
  let { firstName, lastName, userName } = req.body;

  const nameRegex = /^[A-Za-z ]{2,15}$/;
  const userNameRegex = /^[A-Za-z0-9_-]{3,10}$/;

  let forwaredPath = "";
  if (req.url == "/add") {
    forwaredPath = "/create";
  } else if (req.url.startsWith("/update/")) {
    const id = req.url.split("/")[2];
    forwaredPath = `/edit/${id}`;
  }

  if (!firstName || !lastName || !userName) {
    return res
      .status(308)
      .redirect(`${forwaredPath}?message=All fields are required`);
  }

  req.body.firstName = firstName = firstName.trim();
  req.body.lastName = lastName = lastName.trim();
  req.body.userName = userName = userName.trim();


  if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
    return res
      .status(308)
      .redirect(
        `${forwaredPath}?message=Your first name and last name must be alphabetic and in between 2 to 15`
      );
  }
  if (!userNameRegex.test(userName)) {
    return res
      .status(308)
      .redirect(
        `${forwaredPath}?message=Your username must be alphabetic, numbers, underscore and hyphen and in between 3 to 10`
      );
  }

  next();
};
