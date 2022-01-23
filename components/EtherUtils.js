import { ethers } from 'ethers';

export function weiToEther(wei) {
    return ethers.utils.formatEther(wei.toString());
}

export function etherToWei(ether) {
    return ethers.utils.parseEther(ether);
}