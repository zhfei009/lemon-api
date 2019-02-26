/*
 * @Author: zFei 
 * @Date: 2019-02-26 16:24:11 
 * @Last Modified by: zFei
 * @Last Modified time: 2019-02-26 22:17:50
 * @function [账单模块]
 */
var Mongo = require('Mongodb-curd');
var batabaseName = 'lemon';
var collcationName = 'bill'; // 账单集合

var querystring = require('querystring');
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
    var data = req.body,
        timer = data.timer, // 时间
        uID = data.uID, // 用户ID
        classify = data.classify, // 分类["按摩","餐饮"]
        query = null, // 条件
        timeReg = new RegExp('^' + timer); // 年月日正则
    // console.log(querystring.parse(data.classify));
    // 判断是否缺失参数
    if (!uID || !timer) {
        res.send({
            code: 3,
            msg: '缺少参数'
        });
        return;
    }
    // 判断是否只按用户+日期 来查
    if (!classify) { // 按用户+日期来查
        query = {
            "uID": uID,
            "timer": timeReg
        };
    } else { // 按用户+日期+分类来查
        query = {
            "uID": uID,
            "timer": timeReg,
            "cName": { "$in": classify.split(',') }
        };
    }

    // 调用mongodb-curd模块下的insert方法
    Mongo.find(batabaseName, collcationName, query, function(result) {
        if (!result) {
            res.send({
                code: 0,
                mes: "error"
            })
        } else {
            if (result.length) {
                res.send({
                    code: 1,
                    mes: "success",
                    data: result
                })
            } else {
                res.send({
                    code: 0,
                    mes: "没有查询到相关信息",
                    data: result
                })
            }

        }
    })



}


/**
 * [delBill 删除账单]
 */
function delBill(req, res, next) {
    var id = req.query.id;
    if (!id) {
        res.send({
            code: 3,
            msg: '缺少参数'
        });
        return;
    }
    Mongo.remove(batabaseName, collcationName, { "_id": id }, function(result) {
        if (!result) {
            res.send({
                code: 0,
                mes: "error"
            })
        } else {
            res.send({
                code: 1,
                mes: "删除成功",
                data: result
            })
        }
    })
}

module.exports = {
    addBill: addBill,
    getBill: getBill,
    delBill: delBill
}