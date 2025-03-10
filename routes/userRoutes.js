import express from "express";
import {
  UserControllerView,
  UserControllerRequest,
} from "../controllers/userController.js";
import { FriendControllerRequest } from "../controllers/friendController.js";
import { validateUser } from "../middlewares/userMiddleware.js";

const router = express.Router();
const UCV = new UserControllerView();
const UCR = new UserControllerRequest();
const FCR = new FriendControllerRequest();

router.get("/", (req, res) => {
  try {
    const greatMsg = req.query.message;
    return res.render("home", {
      pageTitle: "Home - Assignment-4",
      path: "/",
      styles: [],
      message: greatMsg || null,
    });
  } catch (error) {
    return res.render("home", {
      pageTitle: "Home - Assignment-4",
      path: "/",
      styles: [],
      message: null,
    });
  }
});

router.get("/create", UCV.create);
router.post("/add", validateUser, UCR.create);

router.get("/users", UCV.allUsers);

router.get("/edit/:id", UCV.update);
router.post("/update/:id", validateUser, UCR.update);

router.delete("/delete/:id", UCR.deleteUser);

router.get("/user/:id", UCV.user);
router.post("/user/:userId/friend/:friendId", FCR.add);
router.delete("/user/:userId/friend/:friendId", FCR.remove);

export default router;
