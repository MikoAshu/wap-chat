const path = require('path');
const catchAsync = require('../utils/catchAsync');

const CHAT_VIEW_PAGE = '../views/chat/index.ejs';

const chatView = catchAsync((req, res) => {
  res.render(path.join(__dirname, CHAT_VIEW_PAGE));
});

module.exports = {
  chatView,
};
