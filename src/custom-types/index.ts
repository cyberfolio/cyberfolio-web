export enum Cex {
  NO = "No",
  BINANCE = "Binance",
  BINANCETR = "BinanceTR",
  FTX = "FTX",
  GATEIO = "Gateio",
  KUCOIN = "Kucoin",
}

export enum Chain {
  NO = "No",
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

export enum AllNetworks {
  ALLNETWORKS = "All Networks",
}

export interface DexAsset {
  keyIdentifier: string;
  chain: Chain;
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
  cexName: Cex;
  name: string;
  symbol: string;
  logo: string;
  balance: number;
  price: number;
  value: number;
  accountName: string;
}

export enum Keys {
  Escape = "Escape",
}
