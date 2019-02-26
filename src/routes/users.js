/*
 * @Author: zFei 
 * @Date: 2019-02-23 10:24:00 
 * @Last Modified by: zFei
 * @Last Modified time: 2019-02-26 08:04:55
 * @function [注册用户接口]
 */

var express = require('express');
var router = express.Router();
var userAPI = require('./user');



/*添加用户接口 */
router.post('/api/addUser', userAPI.addUser);
module.exports = router;