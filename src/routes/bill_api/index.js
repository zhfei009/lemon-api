/*
 * @Author: zFei 
 * @Date: 2019-02-26 16:24:11 
 * @Last Modified by: zFei
 * @Last Modified time: 2019-02-26 16:39:50
 * @function [账单模块]
 */
var Mongo = require('Mongodb-curd');
var batabaseName = 'lemon';
var collcationName = 'bill'; // 账单集合

/**
 * [addBill 添加账单]
 */
function addBill(req, res, next) {
    var data = req.body;
    // 判断是否缺失参数
    if (!data.cId || !data.uID || !data.money || !data.time) {
        res.send({
            code: 3,
            msg: '缺少参数'
        });
        return;
    }
    // 调用mongodb-curd模块下的insert方法
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


/**
 * [getBill 查看账单]
 */
function getBill(req, res, next) {
    var data = req.body;
    // 判断是否缺失参数
    if (!data.uID) {
        res.send({
            code: 3,
            msg: '缺少参数'
        });
        return;
    }
    // 调用mongodb-curd模块下的insert方法
    Mongo.find(batabaseName, collcationName, data, function(result) {
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
    addBill: addBill,
    getBill: getBill
}