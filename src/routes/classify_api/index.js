/*
 * @Author: zFei 
 * @Date: 2019-02-26 11:00:15 
 * @Last Modified by: zFei
 * @Last Modified time: 2019-02-26 12:00:57
 * @function [分类业务模块]
 */

var Mongo = require('Mongodb-curd');
var batabaseName = 'lemon'; // 
var collcationName = 'custom'; // 自定义分类集合
var collcationName2 = 'classify'; // 分类集合
/**
 * 查询自定义分类
 *  */
function getCustom(req, res, next) {
    Mongo.find(batabaseName, collcationName, {}, function(result) {
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
 * 查询自定义分类
 *  */
function addCustom(req, res, next) {
    var params = req.body;
    // 判断参数是否齐全
    if (!params.icon || !params.type || !params.uID || !params.cName) {
        res.send({
            code: 3,
            msg: '缺少参数'
        });
        return;
    }
    isHasClassify();
    // 判断是否含有该分类:查询分类：条件  分类名   用户： all  个人用户
    function isHasClassify() {
        Mongo.find(batabaseName, collcationName2, {
                'cName': params.cName,
                'uID': { "$in": ['all', params.uID] }
            },
            function(result) {
                if (result.length) {
                    res.send({
                        code: 4,
                        msg: '该分类已存在'
                    });
                } else { // 添加分类
                    addClassify();
                }
            })
    }
    // 添加分类
    function addClassify() {
        Mongo.insert(batabaseName, collcationName2, params, function(result) {
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
    // 


}

/**
 * 查询所有的分类：条件:uID:{"$in":["all","个人ID"]}
 *  */
function getClassify(req, res, next) {
    var params = req.query;
    // 是否缺少参数
    if (!params.uID) {
        res.send({
            code: 3,
            msg: '缺少参数'
        });
        return;
    }
    // 查询个人用户下的所有分类：条件:uID:{"$in":["all","个人ID"]}
    Mongo.find(batabaseName, collcationName2, {
            'uID': { "$in": ['all', params.uID] }
        },
        function(result) {
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
    getCustom: getCustom,
    addCustom: addCustom,
    getClassify: getClassify
}