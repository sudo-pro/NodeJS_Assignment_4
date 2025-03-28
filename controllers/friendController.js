import User from "../models/user.js";

export class FriendControllerRequest {
  add = async (req, res) => {
    try {
      const user = await User.findByPk(req.params?.userId);
      const friend = await User.findByPk(req.params?.friendId);

      if (!user) {
        return res.redirect("/users?message=User not found!");
      }
      if (!friend) {
        return res.redirect(
          `/users/${req.params?.userId}?message=Friend not found!`
        );
      }

      await user.addFriend(friend);

      res.status(200).json({ message: "Friend added successfully!" });
    } catch (error) {
      res.redirect(`/user/${req.params?.userId}?message=Something went wrong!`);
    }
  };

  remove = async (req, res) => {
    try {
      const user = await User.findByPk(req.params?.userId);
      const friend = await User.findByPk(req.params?.friendId);

      if (!user) {
        return res.redirect("/users?message=User not found!");
      }
      if (!friend) {
        return res.redirect(
          `/users/${req.params?.userId}?message=Friend not found!`
        );
      }

      await user.removeFriend(friend); // This method is generated by Sequelize

      res.status(200).json({ message: "Friend removed successfully!" });
    } catch (error) {
      res.redirect(`/user/${req.params?.userId}?message=Something went wrong!`);
    }
  };
}
