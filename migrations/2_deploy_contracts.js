const Snake = artifacts.require("Snake");
const SnakeLib = artifacts.require("SnakeLib");
const Base64 = artifacts.require("Base64")

module.exports = function (deployer) {
  // deployer.deploy(SnakeLib);
  // deployer.link(SnakeLib, Snake);
  deployer.deploy(Snake);
};

