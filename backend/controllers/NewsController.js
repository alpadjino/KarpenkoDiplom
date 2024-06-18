const newsModel = require("../models/NewsModel");
const chatModel = require("../models/ChatModel");
const userModel = require("../models/UserModel");

module.exports.createNews = async (req, res) => {
  try {
    const findedChat = await chatModel.findOne({ name: req.body.owner });

    if (!findedChat) res.status(404).json({ message: "Группа не найдена" });

    const news = await newsModel.create({
      text: req.body.text,
      owner: findedChat._id,
    });

    findedChat.news.push(news._id);
    await findedChat.save();

    return res.status(200).json({ message: "", chat: findedChat, news: news });
  } catch (error) {
    return res.status(500).json({ message: "Серверная ошибка", data: error });
  }
};

module.exports.showNews = async (req, res) => {
  try {
    const news = await newsModel.aggregate([
      {
        $lookup: {
          from: "chats",
          localField: "owner",
          foreignField: "_id",
          as: "extendedOwner",
        },
      },
      {
        $addFields: {
          extendedOwner: { $arrayElemAt: ["$extendedOwner", 0] }, // Получаем первый элемент массива
        },
      },
      {
        $project: {
          avatar: 1,
          createdAt: 1,
          images: 1,
          likes: 1,
          text: 1,
          updatedAt: 1,
          comments: 1,
          _id: 1,
          "extendedOwner._id": 1,
          "extendedOwner.name": 1,
          "extendedOwner.chatIcon": 1,
          "extendedOwner.admins": 1,
          "extendedOwner.createdAt": 1,
          "extendedOwner.updatedAt": 1,
        },
      },
    ]);

    if (!news)
      return res.status(200).json({ message: "Нет новостей", data: {} });

    return res.status(200).json({ message: "Все новости", data: news });
  } catch (error) {
    return res.status(500).json({ message: "Серверная ошибка", data: error });
  }
};

module.exports.getOneNews = async (req, res) => {
try {
  const news = await newsModel.findById(req.params.id);

  if (!news) {
    return res.status(404).json({ message: "Новость не найдена" });
  }

  const aggregatedNews = await newsModel.aggregate([
    {
      $match: {
        _id: news._id,
      },
    },
    {
      $lookup: {
        from: "chats",
        localField: "owner",
        foreignField: "_id",
        as: "extendedOwner",
      },
    },
    {
      $addFields: {
        extendedOwner: { $arrayElemAt: ["$extendedOwner", 0] },
      },
    },
    {
      $project: {
        avatar: 1,
        createdAt: 1,
        images: 1,
        likes: 1,
        text: 1,
        updatedAt: 1,
        comments: 1,
        _id: 1,
        "extendedOwner._id": 1,
        "extendedOwner.name": 1,
        "extendedOwner.chatIcon": 1,
        "extendedOwner.admins": 1,
        "extendedOwner.createdAt": 1,
        "extendedOwner.updatedAt": 1,
      },
    },
  ]);

  if (aggregatedNews.length === 0) {
    return res.status(404).json({ message: "Новость не найдена" });
  }

  const newsWithAggregation = aggregatedNews[0];
  console.log(newsWithAggregation);
  return res
    .status(200)
    .json({ message: "Найденная новость", data: newsWithAggregation });
} catch (error) {
  return res
    .status(500)
    .json({ message: "Серверная ошибка", error: error.message });
}
};

module.exports.deleteOneNews = async (req, res) => {
  try {
    const news = await newsModel.findById(req.body.newsId);

    if (!news)
      return res.status(404).json({ message: "Новость не найдена", data: {} });

    await newsModel.deleteOne(news._id);

    return res.status(200).json({ message: "Новость удалена", data: {} });
  } catch (error) {
    return res.status(500).json({ message: "Серверная ошибка", data: error });
  }
};

module.exports.setLike = async (req, res) => {
  try {
    const newsId = req.body.newsId;
    const userId = req.body.userId;

    const findedNews = await newsModel.findById(newsId);
    const findedUser = await userModel.findById(userId);

    if (!findedNews || !findedUser) {
      return res
        .status(404)
        .json({
          message: "Новость или пользователь не найдены",
          pressedLike: false,
        });
    }

    const newsLikeIndex = findedNews.likes.indexOf(userId);
    const userLikeIndex = findedUser.likes.indexOf(newsId);

    if (newsLikeIndex !== -1 && userLikeIndex !== -1) {
      findedNews.likes.splice(newsLikeIndex, 1);
      findedUser.likes.splice(userLikeIndex, 1);

      await findedNews.save();
      await findedUser.save();

      return res
        .status(200)
        .json({ message: "Лайк удален", pressedLike: false });
    }

    findedNews.likes.push(userId);
    findedUser.likes.push(newsId);

    await findedNews.save();
    await findedUser.save();

    return res
      .status(200)
      .json({ message: "Лайк поставлен", pressedLike: true });
  } catch (error) {
    res.status(500).json({ message: "Серверная ошибка", pressedLike: false });
  }
};