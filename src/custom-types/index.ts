export enum Platform {
  ALLNETWORKS = "All Networks",
  BITCOIN = "Bitcoin",
  ETHEREUM = "Ethereum",
  BSC = "SmartChain",
  AVALANCHE = "Avalanche",
  SOLANA = "Solana",
  POLKADOT = "Polkadot",
  POLYGON = "Polygon",
  ARBITRUM = "Arbitrum",
  OPTIMISM = "Optimism",
  BINANCE = "Binance",
  FTX = "FTX",
  GATEIO = "Gateio",
  KUCOIN = "Kucoin",
}

export enum Chain {
  BITCOIN = "Bitcoin",
  ETHEREUM = "Ethereum",
  BSC = "SmartChain",
  AVALANCHE = "Avalanche",
  SOLANA = "Solana",
  POLKADOT = "Polkadot",
  POLYGON = "Polygon",
  ARBITRUM = "Arbitrum",
  OPTIMISM = "Optimism",
}
export interface DexAsset {
  keyIdentifier: string;
  platform: Platform;
  name: string;
  symbol: string;
  logo: string;
  balance: number;
  price: number;
  value: number;
  walletName: string;
  contractAddress?: string;
  walletAddress: string;
  scan: string;
}

export interface CexAsset {
  keyIdentifier: string;
  cexName: Platform;
  name: string;
  symbol: string;
  logo: string;
  balance: number;
  price: number;
  value: number;
}
