/*
 * @Author: zFei 
 * @Date: 2019-02-23 10:24:00 
 * @Last Modified by: zFei
 * @Last Modified time: 2019-02-26 22:14:14
 * @function [账单接口]
 */

var express = require('express');
var router = express.Router();
var billAPI = require('./bill_api');



/*添加账单接口 */
router.post('/api/addBill', billAPI.addBill);

/*查看账单接口 */
router.post('/api/getBill', billAPI.getBill);

/*删除账单接口 */
router.get('/api/delBill', billAPI.delBill);


module.exports = router;