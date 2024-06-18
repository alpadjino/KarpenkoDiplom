const chatModel = require("../models/ChatModel");
const messageModel = require("../models/MessageModel");
const UserModel = require("../models/UserModel");

module.exports.getAllChats = async (req, res) => {
    try {
      const chats = await chatModel.aggregate([
        { $sort: { updatedAt: -1 } },
        {
          $lookup: {
            from: "messages",
            localField: "messages",
            foreignField: "_id",
            as: "populatedMessages",
          },
        },
        {
          $lookup: {
            from: "user",
            localField: "lastMessage.sender",
            foreignField: "_id",
            as: "lastMessageSender",
          },
        },
        {
          $project: {
            chatIcon: 1,
            createdAt: 1,
            name: 1,
            updatedAt: 1,
            users: 1,
            __v: 1,
            _id: 1,
            lastMessage: { $arrayElemAt: ["$populatedMessages", -1] },
            lastMessageSender: { $first: "$lastMessageSender" },
          },
        },
      ]);

      if (!chats) return res.status(404).json({ message: "Нет чатов" });
        
      console.log(chats)

      return res.status(200).json(chats);
    } catch (err) {
        return res.status(500).json({message: `${err}`})
    }
}

module.exports.sendMessage = async (req, res) => {
    try {
        const message = await messageModel.create({
          text: req.body.text,
          sender: req.body.sender,
        });
        
        const currentChat = await chatModel.findById(req.body.chatId);

        if (!currentChat) {
        return res.status(404).json({ message: "Чата не существует" });
        }

        currentChat.messages.push(message._id);
        
        await currentChat.save();

        return res
          .status(200)
          .json({ message: "Сообщение передано", data: message });
    } catch (error) {
        return res
          .status(500)
          .json({ message: "Ошибка сохранения комментария", error: error });
    }
}

module.exports.getCurrentChatMessages = async (req, res) => {
    try {
        const currentChat = await chatModel.findById(req.headers.chatid);
        
        if (!currentChat) {
            return res.status(404).json({message: "Чат не найден"});
        }

        const chatMessages = currentChat.messages;

        const findChatMessages = await messageModel
          .find({
            _id: {
              $in: chatMessages,
            },
          })
          .populate("sender")

          if (findChatMessages.length === 0) {
            return res.status(200).json({message: "Нет сообщений", data: []});
          }

          const itemsPerPage = 20;
          let currentPage = req.headers.currentpage;
          const totalCount = findChatMessages.length; 
          const totalPages = Math.ceil(totalCount / itemsPerPage);
          let limit;

          if (currentPage > totalPages) {
            currentPage = totalPages;
            return res
              .status(200)
              .json({
                message: "Все сообщения выгружены",
                data: findChatMessages,
              });
          } 

          const skip = (totalPages - currentPage) * itemsPerPage;
          
          if (currentPage * itemsPerPage > totalCount) {
            limit = totalCount;
          }
          else {
            limit = currentPage * itemsPerPage;
          }

          const lastMessages = await messageModel.find({
            _id: {
              $in: chatMessages,
            },
          })
          .populate("sender")
          .skip(skip)
          .limit(limit)


        res.status(200).json({ message: "Все сообщения", data: lastMessages });
    } catch (error) {
        res.status(500).json({message: "Серверная ошибка", error: error});
    }
}

module.exports.getUserChats = async (req, res) => {
  try {
    const userId = req.headers.userid;

    const findedUser = await UserModel.findById(userId);



    const userChats = await chatModel.find({ _id: { $in: findedUser.chats } });
    console.log(userChats)
    const aggregatedChats = await chatModel.aggregate([
      { $match: { _id: { $in: userChats.map((chat) => chat._id) } } },
      { $sort: { updatedAt: -1 } },
      {
        $lookup: {
          from: "messages",
          localField: "messages",
          foreignField: "_id",
          as: "populatedMessages",
        },
      },
      {
        $lookup: {
          from: "user",
          localField: "lastMessage.sender",
          foreignField: "_id",
          as: "lastMessageSender",
        },
      },
      {
        $project: {
          chatIcon: 1,
          name: 1,
          updatedAt: 1,
          createdAt: 1,
          users: 1,
          admins: 1,
          __v: 1,
          _id: 1,
          lastMessage: { $arrayElemAt: ["$populatedMessages", -1] },
        },
      },
    ]);
    console.log("-------------------------------")
    console.log(aggregatedChats);
    return res.status(200).json({message: "Все ок", data: aggregatedChats})
  } catch (error) {
    res.status(500).json({message: "Серверная ошибка", data: error});
  }
}