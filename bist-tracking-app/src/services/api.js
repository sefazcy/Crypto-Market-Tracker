const MOCK_STOCKS = [
    { code: 'THYAO', name: 'Türk Hava Yolları', basePrice: 268.50 },
    { code: 'GARAN', name: 'Garanti BBVA', basePrice: 143.50 },
    { code: 'AKBNK', name: 'Akbank', basePrice: 69.80 },
    { code: 'EREGL', name: 'Ereğli Demir Çelik', basePrice: 48.90 },
    { code: 'SISE', name: 'Şişecam', basePrice: 38.38 },
    { code: 'ASELS', name: 'Aselsan', basePrice: 231.70 },
    { code: 'KCHOL', name: 'Koç Holding', basePrice: 168.80 },
    { code: 'BIMAS', name: 'BİM Mağazalar', basePrice: 522.00 },
    { code: 'TUPRS', name: 'Tüpraş', basePrice: 147.00 },
    { code: 'SAHOL', name: 'Sabancı Holding', basePrice: 87.50 },
    { code: 'TOASO', name: 'Tofaş Oto. Fab.', basePrice: 188.00 },
    { code: 'FROTO', name: 'Ford Otosan', basePrice: 940.00 },
    { code: 'PETKM', name: 'Petkim', basePrice: 19.45 },
    { code: 'TCELL', name: 'Turkcell', basePrice: 90.00 },
    { code: 'TTKOM', name: 'Türk Telekom', basePrice: 45.30 },
    { code: 'ISCTR', name: 'İş Bankası (C)', basePrice: 12.80 },
    { code: 'YKBNK', name: 'Yapı Kredi Bank.', basePrice: 26.50 },
    { code: 'HALKB', name: 'Halkbank', basePrice: 14.80 },
    { code: 'EKGYO', name: 'Emlak Konut GMYO', basePrice: 11.20 },
    { code: 'VESTL', name: 'Vestel', basePrice: 72.40 },
    { code: 'ARCLK', name: 'Arçelik', basePrice: 128.00 },
    { code: 'KOZAL', name: 'Koza Altın', basePrice: 21.30 },
    { code: 'KRDMD', name: 'Kardemir (D)', basePrice: 24.80 },
    { code: 'SASA', name: 'SASA Polyester', basePrice: 38.00 },
    { code: 'HEKTS', name: 'Hektaş', basePrice: 12.50 },
    { code: 'ENKAI', name: 'Enka İnşaat', basePrice: 41.20 },
    { code: 'PGSUS', name: 'Pegasus', basePrice: 840.00 },
    { code: 'MGROS', name: 'Migros Ticaret', basePrice: 495.00 },
    { code: 'ULKER', name: 'Ülker Bisküvi', basePrice: 155.00 },
    { code: 'TAVHL', name: 'TAV Havalimanları', basePrice: 230.00 },
    { code: 'AEFES', name: 'Anadolu Efes', basePrice: 195.00 },
    { code: 'SOKM', name: 'Şok Marketler', basePrice: 48.00 },
    { code: 'CCOLA', name: 'Coca-Cola İçecek', basePrice: 58.80 },
    { code: 'TKFEN', name: 'Tekfen Holding', basePrice: 56.40 },
    { code: 'ALARK', name: 'Alarko Holding', basePrice: 92.00 },
    { code: 'ODAS', name: 'Odaş Elektrik', basePrice: 8.50 },
    { code: 'DOHOL', name: 'Doğan Holding', basePrice: 16.30 },
    { code: 'ASTOR', name: 'Astor Enerji', basePrice: 82.50 },
    { code: 'EUPWR', name: 'Europower Enerji', basePrice: 118.00 },
    { code: 'GWIND', name: 'Galata Wind', basePrice: 25.00 },
    { code: 'KONTR', name: 'Kontrolmatik', basePrice: 145.00 },
    { code: 'GESAN', name: 'Girişim Elektrik', basePrice: 52.00 },
    { code: 'SMART', name: 'Smart Güneş Tek.', basePrice: 48.00 },
    { code: 'OYAKC', name: 'Oyak Çimento', basePrice: 55.00 },
    { code: 'CIMSA', name: 'Çimsa', basePrice: 28.00 },
    { code: 'AKSEN', name: 'Aksa Enerji', basePrice: 32.50 },
    { code: 'ZOREN', name: 'Zorlu Enerji', basePrice: 4.80 },
    { code: 'CANTE', name: 'Çan2 Termik', basePrice: 14.20 },
    { code: 'GUBRF', name: 'Gübre Fabrikaları', basePrice: 160.00 },
    { code: 'ISMEN', name: 'İş Yatırım', basePrice: 29.50 },
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
        console.error('Error fetching crypto data:', error);

        // Fallback if API rate limited (CoinGecko has a rate limit)
        // Return an empty array or basic error state to handle in UI
        throw error;
    }
};
