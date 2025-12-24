import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: any = {
    solidity: "0.8.20",
    networks: {
        hardhat: {
            chainId: 1337,
        },
    },
};

export default config;
