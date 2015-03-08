var _ = require('lodash');
var moment = require('moment');
var Strategy = require('./strategy/strategy');

function Cart() {
  this.cartItems = [];
}

Cart.prototype.addCartItem = function (cartItem) {
  this.cartItems.push(cartItem);
  return this.cartItems;
};


Cart.prototype.getList = function() {
  var cartItems = this.cartItems;
  var list = '';
  _.forEach(cartItems, function(cartItem) {
    list += cartItem.printCartItemText();
  });
  return list;
};

Cart.prototype.getTotalSaved = function () {
  var totalSaved = 0;
  var cartItems = this.cartItems;
  _.forEach(cartItems, function(cartItem) {
    totalSaved += cartItem.savedMoney;
  });
  return totalSaved.toFixed(2);
};

Cart.prototype.getTotalMoney = function () {
  var totalMoney = 0;
  var cartItems = this.cartItems;
  _.forEach(cartItems, function(cartItem) {
    totalMoney += cartItem.getPrice() * cartItem.count - cartItem.savedMoney;
  });
  return totalMoney.toFixed(2);
};

Cart.prototype.getTotalText = function () {
  return '总计：' + this.getTotalMoney() + '(元)\n';
};

Cart.prototype.getSavedText = function () {
  return '节省：' + this.getTotalSaved() + '(元)\n';
};

Cart.prototype.printText = function () {
  return '***<没钱赚商店>购物清单***\n' + '打印时间：' +
  moment().format('YYYY年MM月DD日 HH:mm:ss') +
  '\n\n----------------------\n' +
  this.getList() +
  '\n----------------------\n' + '优惠信息：\n' +
  Strategy.getStrategyFourText(this.cartItems) +
  '\n----------------------\n' +
  this.getTotalText() +
  this.getSavedText() +
  '**********************\n';
};

module.exports = Cart;
