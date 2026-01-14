const MOCK_COINS = [
    { id: 'bitcoin', code: 'BTC', name: 'Bitcoin', price: '3450000.00', change: '2.5', image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png', sparkline: [], high24h: 3500000, low24h: 3400000, marketCap: 65000000000000, volume: 1500000000000 },
    { id: 'ethereum', code: 'ETH', name: 'Ethereum', price: '112000.50', change: '-1.2', image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png', sparkline: [], high24h: 115000, low24h: 110000, marketCap: 12000000000000, volume: 800000000000 },
    { id: 'tether', code: 'USDT', name: 'Tether', price: '34.15', change: '0.1', image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png', sparkline: [], high24h: 34.20, low24h: 34.10, marketCap: 3500000000000, volume: 2000000000000 },
    { id: 'binancecoin', code: 'BNB', name: 'BNB', price: '21500.00', change: '0.5', image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png', sparkline: [], high24h: 21600, low24h: 21400, marketCap: 3000000000000, volume: 50000000000 },
    { id: 'solana', code: 'SOL', name: 'Solana', price: '4850.25', change: '5.4', image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png', sparkline: [], high24h: 4900, low24h: 4700, marketCap: 2000000000000, volume: 150000000000 },
    { id: 'ripple', code: 'XRP', name: 'XRP', price: '85.50', change: '-0.8', image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png', sparkline: [], high24h: 86.50, low24h: 84.50, marketCap: 1500000000000, volume: 80000000000 },
    { id: 'cardano', code: 'ADA', name: 'Cardano', price: '18.40', change: '1.2', image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png', sparkline: [], high24h: 18.60, low24h: 18.20, marketCap: 900000000000, volume: 20000000000 },
    { id: 'avalanche-2', code: 'AVAX', name: 'Avalanche', price: '1250.75', change: '3.8', image: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png', sparkline: [], high24h: 1280, low24h: 1220, marketCap: 600000000000, volume: 30000000000 },
    { id: 'dogecoin', code: 'DOGE', name: 'Dogecoin', price: '5.20', change: '-2.5', image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png', sparkline: [], high24h: 5.40, low24h: 5.10, marketCap: 700000000000, volume: 40000000000 },
    { id: 'polkadot', code: 'DOT', name: 'Polkadot', price: '240.50', change: '0.0', image: 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png', sparkline: [], high24h: 242, low24h: 238, marketCap: 300000000000, volume: 15000000000 },

    // Additional 32 items to define 42 total
    { id: 'tron', code: 'TRX', name: 'TRON', price: '4.25', change: '1.1', image: 'https://assets.coingecko.com/coins/images/1094/large/tron-logo.png', sparkline: [], high24h: 4.30, low24h: 4.20, marketCap: 370000000000, volume: 12000000000 },
    { id: 'chainlink', code: 'LINK', name: 'Chainlink', price: '520.60', change: '-0.5', image: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png', sparkline: [], high24h: 530, low24h: 515, marketCap: 280000000000, volume: 9000000000 },
    { id: 'matic-network', code: 'MATIC', name: 'Polygon', price: '28.90', change: '2.1', image: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png', sparkline: [], high24h: 29.50, low24h: 28.50, marketCap: 260000000000, volume: 8000000000 },
    { id: 'shiba-inu', code: 'SHIB', name: 'Shiba Inu', price: '0.00032', change: '4.5', image: 'https://assets.coingecko.com/coins/images/11939/large/shiba.png', sparkline: [], high24h: 0.00033, low24h: 0.00031, marketCap: 190000000000, volume: 5000000000 },
    { id: 'litecoin', code: 'LTC', name: 'Litecoin', price: '2450.00', change: '-1.8', image: 'https://assets.coingecko.com/coins/images/2/large/litecoin.png', sparkline: [], high24h: 2500, low24h: 2400, marketCap: 180000000000, volume: 10000000000 },
    { id: 'bitcoin-cash', code: 'BCH', name: 'Bitcoin Cash', price: '12500.00', change: '0.9', image: 'https://assets.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png', sparkline: [], high24h: 12700, low24h: 12400, marketCap: 170000000000, volume: 8000000000 },
    { id: 'cosmos', code: 'ATOM', name: 'Cosmos', price: '340.20', change: '-2.2', image: 'https://assets.coingecko.com/coins/images/1481/large/cosmos_hub.png', sparkline: [], high24h: 350, low24h: 335, marketCap: 130000000000, volume: 4000000000 },
    { id: 'uniswap', code: 'UNI', name: 'Uniswap', price: '210.50', change: '1.5', image: 'https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png', sparkline: [], high24h: 215, low24h: 208, marketCap: 125000000000, volume: 3000000000 },
    { id: 'stellar', code: 'XLM', name: 'Stellar', price: '4.10', change: '-0.3', image: 'https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png', sparkline: [], high24h: 4.15, low24h: 4.05, marketCap: 110000000000, volume: 2000000000 },
    { id: 'okb', code: 'OKB', name: 'OKB', price: '1750.00', change: '0.0', image: 'https://assets.coingecko.com/coins/images/4463/large/WeChat_Image_20220118095654.png', sparkline: [], high24h: 1760, low24h: 1740, marketCap: 100000000000, volume: 1000000000 },
    { id: 'filecoin', code: 'FIL', name: 'Filecoin', price: '185.30', change: '-3.5', image: 'https://assets.coingecko.com/coins/images/12817/large/filecoin.png', sparkline: [], high24h: 195, low24h: 180, marketCap: 95000000000, volume: 3000000000 },
    { id: 'hedera', code: 'HBAR', name: 'Hedera', price: '3.45', change: '5.1', image: 'https://assets.coingecko.com/coins/images/3688/large/hbar.png', sparkline: [], high24h: 3.60, low24h: 3.30, marketCap: 90000000000, volume: 2000000000 },
    { id: 'aptos', code: 'APT', name: 'Aptos', price: '315.60', change: '8.2', image: 'https://assets.coingecko.com/coins/images/26455/large/aptos_round.png', sparkline: [], high24h: 340, low24h: 300, marketCap: 85000000000, volume: 4000000000 },
    { id: 'lido-dao', code: 'LDO', name: 'Lido DAO', price: '85.20', change: '-1.5', image: 'https://assets.coingecko.com/coins/images/13573/large/Lido_DAO.png', sparkline: [], high24h: 88, low24h: 84, marketCap: 75000000000, volume: 1500000000 },
    { id: 'near', code: 'NEAR', name: 'NEAR', price: '115.40', change: '3.3', image: 'https://assets.coingecko.com/coins/images/10365/large/near.png', sparkline: [], high24h: 120, low24h: 112, marketCap: 70000000000, volume: 2000000000 },
    { id: 'arbitrum', code: 'ARB', name: 'Arbitrum', price: '58.90', change: '0.8', image: 'https://assets.coingecko.com/coins/images/16547/large/photo_2023-03-29_21.47.00.jpeg', sparkline: [], high24h: 60, low24h: 58, marketCap: 68000000000, volume: 3000000000 },
    { id: 'quant-network', code: 'QNT', name: 'Quant', price: '3450.00', change: '-0.2', image: 'https://assets.coingecko.com/coins/images/3370/large/5563.png', sparkline: [], high24h: 3500, low24h: 3400, marketCap: 65000000000, volume: 800000000 },
    { id: 'vechain', code: 'VET', name: 'VeChain', price: '1.25', change: '2.4', image: 'https://assets.coingecko.com/coins/images/1167/large/VET_Token_Icon.png', sparkline: [], high24h: 1.30, low24h: 1.20, marketCap: 60000000000, volume: 1000000000 },
    { id: 'the-graph', code: 'GRT', name: 'The Graph', price: '6.80', change: '6.7', image: 'https://assets.coingecko.com/coins/images/13397/large/Graph_Token.png', sparkline: [], high24h: 7.00, low24h: 6.50, marketCap: 55000000000, volume: 1500000000 },
    { id: 'optimism', code: 'OP', name: 'Optimism', price: '118.50', change: '-4.1', image: 'https://assets.coingecko.com/coins/images/25244/large/Optimism.png', sparkline: [], high24h: 125, low24h: 115, marketCap: 50000000000, volume: 1200000000 },
    { id: 'monero', code: 'XMR', name: 'Monero', price: '4850.00', change: '1.0', image: 'https://assets.coingecko.com/coins/images/69/large/monero_logo.png', sparkline: [], high24h: 4900, low24h: 4800, marketCap: 48000000000, volume: 900000000 },
    { id: 'algorand', code: 'ALGO', name: 'Algorand', price: '6.45', change: '-0.9', image: 'https://assets.coingecko.com/coins/images/4380/large/download.png', sparkline: [], high24h: 6.60, low24h: 6.30, marketCap: 45000000000, volume: 800000000 },
    { id: 'fantom', code: 'FTM', name: 'Fantom', price: '24.30', change: '9.5', image: 'https://assets.coingecko.com/coins/images/4001/large/Fantom_round.png', sparkline: [], high24h: 26, low24h: 22, marketCap: 40000000000, volume: 2000000000 },
    { id: 'the-sandbox', code: 'SAND', name: 'The Sandbox', price: '15.60', change: '0.5', image: 'https://assets.coingecko.com/coins/images/12129/large/sandbox_logo.jpg', sparkline: [], high24h: 16.00, low24h: 15.20, marketCap: 35000000000, volume: 1000000000 },
    { id: 'decentraland', code: 'MANA', name: 'Decentraland', price: '14.80', change: '-1.3', image: 'https://assets.coingecko.com/coins/images/878/large/decentraland-mana.png', sparkline: [], high24h: 15.20, low24h: 14.50, marketCap: 32000000000, volume: 800000000 },
    { id: 'eos', code: 'EOS', name: 'EOS', price: '25.50', change: '0.2', image: 'https://assets.coingecko.com/coins/images/738/large/eos-eos-logo.png', sparkline: [], high24h: 26.00, low24h: 25.00, marketCap: 28000000000, volume: 600000000 },
    { id: 'aave', code: 'AAVE', name: 'Aave', price: '3250.00', change: '3.4', image: 'https://assets.coingecko.com/coins/images/12645/large/AAVE.png', sparkline: [], high24h: 3300, low24h: 3100, marketCap: 25000000000, volume: 500000000 },
    { id: 'elrond-erd-2', code: 'EGLD', name: 'MultiversX', price: '1650.00', change: '-2.8', image: 'https://assets.coingecko.com/coins/images/11976/large/EGLD-Token-Logo.png', sparkline: [], high24h: 1700, low24h: 1600, marketCap: 22000000000, volume: 400000000 },
    { id: 'theta-token', code: 'THETA', name: 'Theta Network', price: '45.20', change: '1.7', image: 'https://assets.coingecko.com/coins/images/2538/large/theta-token-logo.png', sparkline: [], high24h: 47, low24h: 44, marketCap: 20000000000, volume: 300000000 },
    { id: 'axie-infinity', code: 'AXS', name: 'Axie Infinity', price: '210.00', change: '-5.5', image: 'https://assets.coingecko.com/coins/images/13029/large/axie_infinity_logo.png', sparkline: [], high24h: 225, low24h: 205, marketCap: 18000000000, volume: 600000000 },
    { id: 'flow', code: 'FLOW', name: 'Flow', price: '28.50', change: '0.4', image: 'https://assets.coingecko.com/coins/images/13446/large/5f6294c0c7a8cda55cb1c936_Flow_Wordmark.png', sparkline: [], high24h: 29.00, low24h: 28.00, marketCap: 16000000000, volume: 200000000 },
    { id: 'tezos', code: 'XTZ', name: 'Tezos', price: '32.10', change: '0.6', image: 'https://assets.coingecko.com/coins/images/976/large/Tezos-Logo.png', sparkline: [], high24h: 33.00, low24h: 31.50, marketCap: 15000000000, volume: 150000000 },
    { id: 'pepe', code: 'PEPE', name: 'Pepe', price: '0.000045', change: '12.5', image: 'https://assets.coingecko.com/coins/images/29850/large/pepe-token.jpeg', sparkline: [], high24h: 0.00005, low24h: 0.00004, marketCap: 12000000000, volume: 5000000000 },
    { id: 'kucoin-shares', code: 'KCS', name: 'KuCoin', price: '280.00', change: '0.3', image: 'https://assets.coingecko.com/coins/images/1047/large/sa9QgOxP.png', sparkline: [], high24h: 285, low24h: 275, marketCap: 10000000000, volume: 100000000 },
    { id: 'render-token', code: 'RNDR', name: 'Render', price: '145.60', change: '7.8', image: 'https://assets.coingecko.com/coins/images/14238/large/render-token.png', sparkline: [], high24h: 150, low24h: 135, marketCap: 9000000000, volume: 1000000000 },
    { id: 'neo', code: 'NEO', name: 'NEO', price: '385.00', change: '-1.1', image: 'https://assets.coingecko.com/coins/images/480/large/NEO_512_512.png', sparkline: [], high24h: 395, low24h: 380, marketCap: 8000000000, volume: 150000000 },
    { id: 'maker', code: 'MKR', name: 'Maker', price: '48500.00', change: '2.0', image: 'https://assets.coingecko.com/coins/images/1364/large/Mark_Maker.png', sparkline: [], high24h: 49000, low24h: 48000, marketCap: 7000000000, volume: 200000000 },
    { id: 'chiliz', code: 'CHZ', name: 'Chiliz', price: '3.40', change: '4.2', image: 'https://assets.coingecko.com/coins/images/8834/large/Chiliz.png', sparkline: [], high24h: 3.50, low24h: 3.30, marketCap: 6000000000, volume: 300000000 },
    { id: 'synthetix-network-token', code: 'SNX', name: 'Synthetix', price: '105.00', change: '-2.5', image: 'https://assets.coingecko.com/coins/images/3406/large/SNX.png', sparkline: [], high24h: 110, low24h: 100, marketCap: 5000000000, volume: 100000000 },
    { id: 'mina-protocol', code: 'MINA', name: 'Mina Protocol', price: '28.50', change: '1.6', image: 'https://assets.coingecko.com/coins/images/15628/large/mina.png', sparkline: [], high24h: 29.50, low24h: 27.50, marketCap: 4000000000, volume: 50000000 },
    { id: 'sui', code: 'SUI', name: 'Sui', price: '45.20', change: '8.5', image: 'https://assets.coingecko.com/coins/images/26375/large/sui_asset.jpeg', sparkline: [], high24h: 46.00, low24h: 43.50, marketCap: 3800000000, volume: 800000000 }
];

export const fetchStocks = async () => {
    try {
        // Fetch top 100 cryptocurrencies in TRY with 7d sparkline
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=try&order=market_cap_desc&per_page=100&page=1&sparkline=true');

        if (!response.ok) {
            throw new Error(`CoinGecko API Error: ${response.statusText}`);
        }

        const data = await response.json();

        return data.map(coin => {
            return {
                id: coin.id,
                code: coin.symbol.toUpperCase(), // e.g., btc -> BTC
                name: coin.name,                 // e.g., Bitcoin
                price: (coin.current_price || 0).toFixed(2),
                change: (coin.price_change_percentage_24h || 0).toFixed(2),
                image: coin.image, // Bonus: CoinGecko gives us logos!
                sparkline: coin.sparkline_in_7d ? coin.sparkline_in_7d.price : [],
                high24h: coin.high_24h,
                low24h: coin.low_24h,
                marketCap: coin.market_cap,
                volume: coin.total_volume
            };
        });

    } catch (error) {
        console.warn('Error fetching crypto data, using mock data:', error);

        // Return mock data if API fails (e.g. rate limit)
        return MOCK_COINS;
    }
};
