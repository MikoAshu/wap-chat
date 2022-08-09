const express = require('express');
const chatController = require('../../controllers/chat.controller');

const router = express.Router();

router.get('/', chatController.chatView);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Chat related operations
 */

/**
 * @swagger
 * /chat:
 * get:
 *     summary: Get chat view
 *     description: get chat view
 *     tags: [Chat]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           text/html:
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */