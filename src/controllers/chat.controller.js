const path = require('path');
const catchAsync = require('../utils/catchAsync');

const CHAT_VIEW_PAGE = '../views/chat/index.ejs';

const chatView = catchAsync((req, res) => {
  res.render(path.join(__dirname, CHAT_VIEW_PAGE));
});

const initiate = async (req, res) => { };
const postMessage = async (req, res) => { };
const getRecentConversation = async (req, res) => { };
const getConversationByRoomId = async (req, res) => { };
const markConversationReadByRoomId = async (req, res) => { };
const deleteRoomById = async (req, res) => {};
const deleteMessageById = async (req, res) => {};

module.exports = {
  chatView,
  initiate,
  postMessage,
  getRecentConversation,
  getConversationByRoomId,
  markConversationReadByRoomId,
  deleteRoomById,
  deleteMessageById
};
