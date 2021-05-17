const Yald = artifacts.require("Yald");

module.exports = function(deployer) {
  deployer.deploy(Yald);
};