const chatModel = require("../models/ChatModel");
const userModel = require("../models/UserModel");

module.exports.createChat = async (req, res) => {
  const { chatName, chatIcon, users, admins } = req.body;

  try {
    const chat = await chatModel.create({
      name: chatName,
      chatIcon: chatIcon,
      users: users,
      admins: admins,
    });

    if (!chat) {
      return res.status(500).json({ message: "Не удалось создать чат" });
    }

    const chatId = chat._id;

    const promises = users.map(async (userId) => {
      try {
        const user = await userModel.findById(userId);
        if (!user) {
          console.error(`Пользователь с id ${userId} не найден`);
          return;
        }

        user.chats.push(chatId);

        await user.save();
      } catch (error) {
        console.error(
          `Ошибка при обновлении пользователя с id ${userId}:`,
          error
        );
        throw error; 
      }
    });

    await Promise.all(promises);

    return res.status(200).json({ message: `Чат ${chatName} создан` });
  } catch (error) {
    console.error("Ошибка при создании чата:", error);
    return res
      .status(500)
      .json({ message: "Серверная ошибка при создании чата", error: error });
  }
};

module.exports.addRoles = async (req, res) => {
  try {
    const admins = req.body.admins;
    const roleForChange = req.body.role;

    const users = await userModel.find({ _id: { $in: admins } });


    const updatedUsers = users.map((user) => {
      if (!user.roles.includes(roleForChange)) {
        user.roles.push(roleForChange);
      }

      return user;
    });

    const promises = updatedUsers.map((user) => user.save());
    await Promise.all(promises);

    res.status(200).json({ message: "Роли успешно добавлены" });
  } catch (error) {
    res.status(500).json({ message: "Серверная ошибка", error: error });
  }
};