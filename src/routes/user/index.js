/*
 * @Author: zFei 
 * @Date: 2019-02-23 09:39:07 
 * @Last Modified by: zFei
 * @Last Modified time: 2019-02-25 00:02:08
 * @function [书写操作用户集合的业务逻辑]
 */
var Mongo = require('Mongodb-curd');
var batabaseName = 'lemon'; // 
var collcationName = 'user'; // 集合

/*
 * [queryUser 添加用户表]
 */
function addUser(req, res, next) {
    var data = req.body;
    Mongo.insert(batabaseName, collcationName, data, function(result) {
        if (!result) {
            res.send({
                code: 0,
                mes: "error"
            })
        } else {
            res.send({
                code: 1,
                mes: "success",
                data: result
            })
        }
    })
}




module.exports = {
    addUser: addUser
};