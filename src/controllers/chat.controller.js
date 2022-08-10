// utils
const makeValidation = require('@withvoid/make-validation');
// models
const path = require('path');
const ChatRoomModel = require('../models/chatroom.model');
const ChatMessageModel = require('../models/chatmessage.model');
const UserModel = require('../models/user.model');

const logger = require('../config/logger');
const catchAsync = require('../utils/catchAsync');

const CHAT_VIEW_PAGE = '../views/chat/index.ejs';

const chatView = catchAsync((req, res) => {
  res.render(path.join(__dirname, CHAT_VIEW_PAGE));
});

// const CHAT_ROOM_TYPES = {
//   CONSUMER: 'consumer',
//   SUPPORT: 'support',
// };

const CHAT_ROOM_TYPES = {
  CONSUMER_TO_CONSUMER: 'consumer-to-consumer',
  CONSUMER_TO_SUPPORT: 'consumer-to-support',
};

const initiate = async (req, res) => {
  try {
    const validation = makeValidation((types) => ({
      payload: req.body,
      checks: {
        userIds: {
          type: types.array,
          options: { unique: true, empty: false, stringOnly: true },
        },
        type: { type: types.enum, options: { enum: CHAT_ROOM_TYPES } },
      },
    }));
    if (!validation.success) return res.status(400).json({ ...validation });

    const { userIds, type } = req.body;
    const { userId: chatInitiator } = req;
    const allUserIds = [...userIds, chatInitiator];
    const chatRoom = await ChatRoomModel.initiateChat(allUserIds, type, chatInitiator);
    return res.status(200).json({ success: true, chatRoom });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
const postMessage = async (req, res) => {
  try {
    const { roomId } = req.params;
    const validation = makeValidation((types) => ({
      payload: req.body,
      checks: {
        messageText: { type: types.string },
      },
    }));
    if (!validation.success) return res.status(400).json({ ...validation });

    const messagePayload = {
      messageText: req.body.messageText,
    };
    const currentLoggedUser = req.userId;
    const post = await ChatMessageModel.createPostInChatRoom(roomId, messagePayload, currentLoggedUser);
    global.io.sockets.in(roomId).emit('new message', { message: post });
    return res.status(200).json({ success: true, post });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
const getRecentConversation = async (req, res) => {
  try {
    const currentLoggedUser = req.userId;
    const options = {
      page: parseInt(req.query.page, 10) || 0,
      limit: parseInt(req.query.limit, 10) || 10,
    };
    const rooms = await ChatRoomModel.getChatRoomsByUserId(currentLoggedUser);
    const roomIds = rooms.map((room) => room._id);
    const recentConversation = await ChatMessageModel.getRecentConversation(roomIds, options, currentLoggedUser);
    return res.status(200).json({ success: true, conversation: recentConversation });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
const getConversationByRoomId = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await ChatRoomModel.getChatRoomByRoomId(roomId);
    if (!room) {
      return res.status(400).json({
        success: false,
        message: 'No room exists for this id',
      });
    }
    const users = await UserModel.getUserByIds(room.userIds);
    const options = {
      page: parseInt(req.query.page, 10) || 0,
      limit: parseInt(req.query.limit, 10) || 10,
    };
    const conversation = await ChatMessageModel.getConversationByRoomId(roomId, options);
    return res.status(200).json({
      success: true,
      conversation,
      users,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
const markConversationReadByRoomId = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await ChatRoomModel.getChatRoomByRoomId(roomId);
    if (!room) {
      return res.status(400).json({
        success: false,
        message: 'No room exists for this id',
      });
    }

    const currentLoggedUser = req.userId;
    const result = await ChatMessageModel.markMessageRead(roomId, currentLoggedUser);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ success: false, error });
  }
};
// const deleteRoomById = async (req, res) => {};
// const deleteMessageById = async (req, res) => {};

module.exports = {
  chatView,
  initiate,
  postMessage,
  getRecentConversation,
  getConversationByRoomId,
  markConversationReadByRoomId,
  // deleteRoomById,
  // deleteMessageById,
};
