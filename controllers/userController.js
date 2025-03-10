import getProfilePicture from "../utils/getProfilePicture.js";
import User from "../models/user.js";

const PageTitleTemplate = "Assignment-4";

export class UserControllerView {
  create(req, res) {
    const greatMsg = req.query.message;
    res.render("create", {
      pageTitle: `Create - ${PageTitleTemplate}`,
      path: "/create",
      styles: ["/css/form.css"],
      message: greatMsg || null,
    });
  }

  user = async (req, res) => {
    try {
      const userId = req.params?.id;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.redirect(`/users?message=User not found`);
      }
      const users = (await User.findAll()) || [];
      const userWithFriends = await User.findByPk(userId, {
        include: [{ model: User, as: "friends" }],
      });
      const friends = userWithFriends.friends || [];

      const friendsIds = friends.map((friend) => friend.id);
      const finalUsers = users
        .map((u) => ({
          ...u.toJSON(),
          isFriend: friendsIds.includes(u.id),
        }))
        .filter((u) => u.id != userId)
        .sort((a, b) => a.firstName.localeCompare(b.firstName));

      const greatMsg = req.query.message;

      res.render("user", {
        user,
        users: finalUsers,
        pageTitle: `User Profile - ${PageTitleTemplate}`,
        path: `user/${userId}`,
        styles: ["/css/user.css"],
        message: greatMsg || null,
      });
    } catch (error) {
      return res.status(500).redirect(`/users?message=Something went wrong!`);
    }
  };

  allUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      const greatMsg = req.query.message;
      res.set("Location", req.path);
      res.status(200).render("users", {
        users: users || [],
        pageTitle: `All Users - ${PageTitleTemplate}`,
        path: "/users",
        styles: [],
        message: greatMsg || null,
      });
    } catch (err) {
      res.status(500).redirect(`/?message=Something went wrong!`);
    }
  };

  update = async (req, res) => {
    try {
      const user = (await User.findByPk(req.params?.id)) || [];
      if (!user) {
        return res.redirect(`/users?message=User not found`);
      }
      const greatMsg = req.query.message;
      res.set("Location", req.path);
      res.render("edit", {
        user,
        pageTitle: `Edit User Profile - ${PageTitleTemplate}`,
        styles: ["/css/form.css"],
        path: `/edit/${req.params.id}`,
        message: greatMsg || null,
      });
    } catch (err) {
      res.status(500).redirect(`/users?message=Something went wrong!`);
    }
  };
}

export class UserControllerRequest {
  create = async (req, res) => {
    try {
      const { firstName, lastName, userName } = req.body;
      const profilePicture = getProfilePicture();
      await User.create({ firstName, lastName, userName, profilePicture });
      res
        .status(200)
        .redirect(`/users?message=User has been created successfully!`);
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res
          .status(400)
          .redirect(`/create?message=Username already exists!`);
      }
      res.status(500).redirect(`/users?message=Something went wrong!`);
    }
  };

  update = async (req, res) => {
    try {
      const user = await User.findByPk(req.params?.id);
      if (!user) {
        return res.redirect(`/users?message=User not found`);
      }
      user.firstName = req.body?.firstName;
      user.lastName = req.body?.lastName;
      user.userName = req.body?.userName;
      await user.save();
      res
        .status(200)
        .redirect(`/users?message=User has been updated successfully!`);
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res
          .status(400)
          .redirect(`/edit/${req.params?.id}?message=Username already exists!`);
      }
      res.status(500).redirect(`/users?message=Something went wrong!`);
    }
  };

  deleteUser = async (req, res) => {
    try {
      const user = await User.findByPk(req.params?.id);
      if (!user) {
        return res.status(404).redirect(`/users?message=User not found`);
      }
      const deleteUser = await user.destroy();
      res.status(200).json(deleteUser);
    } catch (err) {
      res.status(500).redirect(`/users?message=Something went wrong!`);
    }
  };
}
