<?php
return [
    'rpc_url' => env('RPC_URL', 'https://rpc-mumbai.maticvigil.com'),
    'contract_address' => env('CONTRACT_ADDRESS', '0x92027fAe9300a58e690B0E9eE02fEe3A21007050'),
    'contract_abi' => env('CONTRACT_ABI', '[{"inputs":[{"internalType":"string[4]","name":"colors","type":"string[4]"},{"internalType":"string[4]","name":"comments","type":"string[4]"},{"internalType":"int8","name":"happiness","type":"int8"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"addEntry","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"entries","outputs":[{"internalType":"int8","name":"happiness","type":"int8"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"startTimestamp","type":"uint256"},{"internalType":"uint256","name":"endTimestamp","type":"uint256"}],"name":"getEntries","outputs":[{"components":[{"internalType":"string[4]","name":"colors","type":"string[4]"},{"internalType":"string[4]","name":"comments","type":"string[4]"},{"internalType":"int8","name":"happiness","type":"int8"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"internalType":"struct SoulPalette.Entry[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"}]'),
    'colors' => [
        "#ee8592",
        "#f1df61",
        "#db5686",
        "#eaa944",
        "#9b1b59",
        "#e0654c",
        "#4b1e49",
        "#a73e35",
        "#1c3a94",
        "#4c3c2d",
        "#35749e",
        "#242328",
        "#71c6c4",
        "#4f503a",
        "#54a76b",
        "#ffffff",
        "#fff575",
    ]
];

