// Captures 0x + 4 characters, then the last 4 characters.
const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

export const truncateEthAddress = (address) => {
  const match = String(address).match(truncateRegex);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const chainsInfo = [
  {
    name: "All Networks",
    image: "http://localhost:3000/blockchain.svg",
  },
  {
    name: "Ethereum",
    image: "https://chain-icons.s3.amazonaws.com/ethereum.png",
  },
  {
    name: "Avalanche",
    image: "https://chain-icons.s3.amazonaws.com/avalanche.png",
  },
  {
    name: "Solana",
    image: "http://localhost:3000/solana.svg",
  },
  {
    name: "Polkadot",
    image: "http://localhost:3000/polkadot.svg",
  },
  {
    name: "Polygon",
    image: "http://localhost:3000/polygon.svg",
  },
  {
    name: "BSC",
    image: "https://chain-icons.s3.amazonaws.com/bsc.png",
  },
  {
    name: "Arbitrum",
    image: "https://chain-icons.s3.amazonaws.com/arbitrum.png",
  },
  {
    name: "Optimism",
    image: "https://chain-icons.s3.amazonaws.com/optimism.png",
  },
];
