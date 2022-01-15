export const pazariMvpAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_factory',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_market',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_paymentRouter',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_stablecoin',
        type: 'address'
      },
      {
        internalType: 'address[]',
        name: '_admins',
        type: 'address[]'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'newAdmin',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'adminAuthorized',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'reason',
        type: 'string'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256'
      }
    ],
    name: 'AdminAdded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'oldAdmin',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'adminAuthorized',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'reason',
        type: 'string'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256'
      }
    ],
    name: 'AdminRemoved',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'contractID',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'uint16',
        name: 'contractType',
        type: 'uint16'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'creatorAddress',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'factoryAddress',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'cloneAddress',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256'
      }
    ],
    name: 'ContractCloned',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'itemID',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenContract',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenID',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'uri',
        type: 'string'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      }
    ],
    name: 'NewTokenListed',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'userAddress',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'routeID',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'tokenContractAddress',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256'
      }
    ],
    name: 'NewUserCreated',
    type: 'event'
  },
  {
    inputs: [],
    name: '_msgSender',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_newAddress',
        type: 'address'
      },
      {
        internalType: 'string',
        name: '_memo',
        type: 'string'
      }
    ],
    name: 'addAdmin',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'deployedContracts',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_itemID',
        type: 'uint256'
      }
    ],
    name: 'getMarketItem',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'itemID',
            type: 'uint256'
          },
          {
            internalType: 'address',
            name: 'tokenContract',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'tokenID',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256'
          },
          {
            internalType: 'address',
            name: 'paymentContract',
            type: 'address'
          },
          {
            internalType: 'bool',
            name: 'isPush',
            type: 'bool'
          },
          {
            internalType: 'bytes32',
            name: 'routeID',
            type: 'bytes32'
          },
          {
            internalType: 'bool',
            name: 'routeMutable',
            type: 'bool'
          },
          {
            internalType: 'bool',
            name: 'forSale',
            type: 'bool'
          },
          {
            internalType: 'uint256',
            name: 'itemLimit',
            type: 'uint256'
          }
        ],
        internalType: 'struct IMarketplace.MarketItem',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_userAddress',
        type: 'address'
      }
    ],
    name: 'getUserProfile',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'userAddress',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'tokenContract',
            type: 'address'
          },
          {
            internalType: 'bytes32',
            name: 'routeID',
            type: 'bytes32'
          },
          {
            internalType: 'uint256[]',
            name: 'itemIDs',
            type: 'uint256[]'
          }
        ],
        internalType: 'struct PazariMVP.UserProfile',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'iERC20',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'iFactoryPazariTokenMVP',
    outputs: [
      {
        internalType: 'contract FactoryPazariTokenMVP',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'iMarketplace',
    outputs: [
      {
        internalType: 'contract IMarketplace',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'iPaymentRouter',
    outputs: [
      {
        internalType: 'contract IPaymentRouter',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'isAdmin',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'itemIDs',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_URI',
        type: 'string'
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_price',
        type: 'uint256'
      }
    ],
    name: 'newTokenListing',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]'
      },
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]'
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes'
      }
    ],
    name: 'onERC1155BatchReceived',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes'
      }
    ],
    name: 'onERC1155Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_nftContract',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_tokenID',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address'
      }
    ],
    name: 'recoverNFT',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_oldAddress',
        type: 'address'
      },
      {
        internalType: 'string',
        name: '_memo',
        type: 'string'
      }
    ],
    name: 'removeAdmin',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4'
      }
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
];
