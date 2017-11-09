var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Goods = require('../models/goods');
var User = require('../models/user');

// 连接数据库
mongoose.connect('mongodb://localhost:27017/shop');

mongoose.connection.on('connected', function() {
    console.log("Mongodb connected success");
})

// 当连接发生错误的时候
mongoose.connection.on('error', function() {
    console.log('Mongodb connected fail');
})

// 当关闭连接数据库的时候
mongoose.connection.on('disconnected', function() {
    console.log('Mongodb connected disconnected');
})

router.get('/', function(req, res, next) {
    res.json({ data: '您现在访问的是goods api' })
})

router.get('/list', function(req, res, next) {
	let priceLevel = req.param('priceLevel');
	let currentPage = parseInt(req.param('page')) > 0 ? parseInt(req.param('page')) : 1;
	let pageSize = parseInt(req.param('pageSize')) > 0 ? parseInt(req.param('pageSize')) : 8;

	let skip = (currentPage - 1) * pageSize;
	
	
	
    let sort = req.param('sort');
    let priceGt = '',
        priceLte = '';
    let param = {};
    if (priceLevel != 'all') {
        switch (priceLevel) {
            case '0':
                priceGt = 0;
                priceLte = 100;
                break;
            case '1':
                priceGt = 100;
                priceLte = 500;
                break;
            case '2':
                priceGt = 500;
                priceLte = 1000;
                break;
            case '3':
                priceGt = 1000;
                priceLte = 2000;
                break;
        }

        param = {
            salePrice : {
                $gt: priceGt,
                $lte: priceLte
            }
        }
//      let priceItem = {
//      	[0,100]
//      	[0,100]
//      	[0,100]
//      	[0,100]
//      	[0,100]
//      }
//      param = {
//          salePrice : {
//              $gt: priceGt,
//              $lte: priceLte
//          }
//      }
        
    }

	
	
    let goodsModel = Goods.find( param );
    goodsModel.sort({ 'salePrice': sort }).skip(skip).limit(pageSize);
    
    goodsModel.exec({}, function(err, doc) {
        if (err) {
            res.json({ status: "1", msg: err.message })
        } else {
            res.json({ status: '0', msg: '', result: doc })
        }
    })	

})

//添加商品
router.post('/addCart',function (req,res,next) {
	
	var productId = req.body.productId;
	var userId = 100000077;

	User.findOne({userId:userId},function (err,userDoc) {
//		console.log(userDoc);
		let goodItem = "";
		userDoc.cartList.forEach(function (item) {
			console.log(item);
			//遍历商品列表判断是否存在商品  已存在+1
			if (item.productId == productId) {
				goodItem = item;
				item.productNum++; //给商品数量+1
//				console.log(item);	
			}
		})
		
		if (goodItem) {
			userDoc.save(function (err2,doc2) {
				if (err2) {
					res.json({status:"1",msg:err2.message})
				}else{
					res.json({status:'0',msg:'',result:"商品数量添加成功"})
				}
			})
		}else{
			Goods.findOne({'productId':productId},function (err,goodsDoc) {
				goodsDoc.productNum = 1;
				goodsDoc.checked = 0;
				userDoc.cartList.push(goodsDoc);
				userDoc.save(function (err2,doc2) {
					res.json({
						status:"0",
						mag:"",
						result:"加入购物车成功"
					})
				})
			})
		}
		
		
		
	})
})



module.exports = router;