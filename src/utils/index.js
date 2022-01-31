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
    image: "http://localhost:3000/logos/blockchain.svg",
  },
  {
    name: "Bitcoin",
    image: "http://localhost:3000/logos/bitcoin.svg",
  },
  {
    name: "Ethereum",
    image: "http://localhost:3000/logos/ethereum.svg",
  },
  {
    name: "BSC",
    image: "http://localhost:3000/logos/bsc.svg",
  },
  {
    name: "Avalanche",
    image: "http://localhost:3000/logos/avalanche.svg",
  },
  {
    name: "Solana",
    image: "http://localhost:3000/logos/solana.svg",
  },
  {
    name: "Polkadot",
    image: "http://localhost:3000/logos/polkadot.svg",
  },
  {
    name: "Polygon",
    image: "http://localhost:3000/logos/polygon.svg",
  },

  {
    name: "Arbitrum",
    image: "http://localhost:3000/logos/arbitrum.svg",
  },
  {
    name: "Optimism",
    image: "http://localhost:3000/logos/optimism.svg",
  },
];
