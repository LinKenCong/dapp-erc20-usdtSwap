import { HardhatRuntimeEnvironment } from "hardhat/types"; // this add the type from hardhat runtime environment
import { DeployFunction } from "hardhat-deploy/types"; // this add the type that a deploy function is expected to fullfil

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // 部署函数把hardhat运行时作为参数
  const { deployments, getNamedAccounts } = hre; // we get the deployments and getNamedAccounts which are provided by hardhat-deploy
  const { deploy } = deployments; // the deployments field itself contains the deploy function

  const { deployer } = await getNamedAccounts(); // we fetch the accounts. These can be configured in hardhat.config.ts as explained above

  const token = "";
  const usdt = "";

  await deploy("SwapToken", {
    // this will create a deployment called 'Token'. By default it will look for an artifact with the same name. the contract option allows you to use a different artifact
    from: deployer, // deployer will be performing the deployment transaction
    args: [token, usdt], // tokenOwner is the address used as the first argument to the Token contract's constructor
    log: true, // display the address and gas used in the console (not when run in test though)
  });
};
export default func;
func.tags = ["SwapToken"]; // this setup a tag so you can execute the script on its own (and its dependencies)
