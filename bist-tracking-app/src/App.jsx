import React, { useState, useEffect } from 'react';
import { fetchStocks } from './services/api';
import StockList from './components/StockList';
import CoinDetailModal from './components/CoinDetailModal';
import ConverterModal from './components/ConverterModal';

function App() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('az');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');
  const [language, setLanguage] = useState('tr');
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [showConverter, setShowConverter] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('cryptoFavorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Portfolio State
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('cryptoBalance');
    return saved ? parseFloat(saved) : 100000;
  });
  const [portfolio, setPortfolio] = useState(() => {
    const saved = localStorage.getItem('cryptoPortfolio');
    return saved ? JSON.parse(saved) : {};
  });

  // Alert State
  const [alerts, setAlerts] = useState(() => {
    const saved = localStorage.getItem('cryptoAlerts');
    return saved ? JSON.parse(saved) : [];
  });
  const [notification, setNotification] = useState(null);

  const translations = {
    tr: {
      title: 'Kripto Piyasası İzleyici 🚀',
      lightMode: '☀️ Aydınlık Mod',
      darkMode: '🌙 Karanlık Mod',
      lastUpdated: 'Son güncelleme',
      topGainer: '🔥 Günün Yükseleni',
      topLoser: '❄️ Günün Düşeni',
      searchPlaceholder: 'Coin ara (Örn: BTC, Bitcoin)...',
      sortAZ: 'Alfabetik (A-Z)',
      sortZA: 'Alfabetik (Z-A)',
      sortGain: 'En Çok Artan',
      sortLoss: 'En Çok Azalan',
      loading: 'Piyasa verileri yükleniyor...',
      footerProject: 'BTE313 Final Projesi | Kripto Veri İzleme Uygulaması',
      footerUni: 'Sefa Usta',
      coinNotFound: 'Coin bulunamadı.',
      langBtn: '🇺🇸 EN',
      high24h: '24s En Yüksek',
      low24h: '24s En Düşük',
      marketCap: 'Piyasa Değeri',
      volume: '24s Hacim',
      favorites: '❤️ Favorilerim',
      allCoins: '🌐 Tüm Coinler',
      noFavorites: 'Henüz favori eklemediniz.',
      wallet: 'Cüzdan',
      buy: 'Satın Al',
      sell: 'Sat',
      amount: 'Miktar',
      owned: 'Sahip Olunan',
      insufficientBalance: 'Yetersiz Bakiye!',
      insufficientAsset: 'Yetersiz Coin!',
      successTransaction: 'İşlem Başarılı!',
      converter: 'Kripto Dönüştürücü',
      setAlert: '🔔 Fiyat Alarmı Kur',
      priceAbove: 'Fiyat şunun üzerine çıkınca:',
      priceBelow: 'Fiyat şunun altına düşünce:',
      alertSet: 'Alarm kuruldu!',
      alertTriggered: '🔔 FİYAT ALARMI!',
    },
    en: {
      title: 'Crypto Market Tracker 🚀',
      lightMode: '☀️ Light Mode',
      darkMode: '🌙 Dark Mode',
      lastUpdated: 'Last updated',
      topGainer: '🔥 Top Gainer',
      topLoser: '❄️ Top Loser',
      searchPlaceholder: 'Search coin (e.g. BTC, Bitcoin)...',
      sortAZ: 'Alphabetical (A-Z)',
      sortZA: 'Alphabetical (Z-A)',
      sortGain: 'Top Gainers',
      sortLoss: 'Top Losers',
      loading: 'Loading market data...',
      footerProject: 'BTE313 Final Project | Crypto Data Tracking App',
      footerUni: 'Sefa Usta',
      coinNotFound: 'Coin not found.',
      langBtn: '🇹🇷 TR',
      high24h: '24h High',
      low24h: '24h Low',
      marketCap: 'Market Cap',
      volume: '24h Volume',
      favorites: '❤️ Favorites',
      allCoins: '🌐 All Coins',
      noFavorites: 'No favorites added yet.',
      wallet: 'Wallet',
      buy: 'Buy',
      sell: 'Sell',
      amount: 'Amount',
      owned: 'Owned',
      insufficientBalance: 'Insufficient Balance!',
      insufficientAsset: 'Insufficient Asset!',
      successTransaction: 'Transaction Successful!',
      converter: 'Crypto Converter',
      setAlert: '🔔 Set Price Alert',
      priceAbove: 'Price goes above:',
      priceBelow: 'Price goes below:',
      alertSet: 'Alert set!',
      alertTriggered: '🔔 PRICE ALERT!',
    }
  };

  const t = translations[language];

  useEffect(() => {
    localStorage.setItem('cryptoFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('cryptoBalance', balance.toString());
    localStorage.setItem('cryptoPortfolio', JSON.stringify(portfolio));
  }, [balance, portfolio]);

  useEffect(() => {
    localStorage.setItem('cryptoAlerts', JSON.stringify(alerts));
  }, [alerts]);

  const checkAlerts = (currentStocks) => {
    if (!currentStocks || currentStocks.length === 0) return;

    const newAlerts = alerts.filter(alert => {
      const coin = currentStocks.find(c => c.id === alert.coinId);
      if (!coin) return true; // Keep alert if coin not found (maybe temporary)

      const currentPrice = parseFloat(coin.price);
      let triggered = false;

      if (alert.type === 'ABOVE' && currentPrice >= alert.targetPrice) {
        setNotification(`${t.alertTriggered} ${coin.name} > ${alert.targetPrice} TL`);
        triggered = true;
      } else if (alert.type === 'BELOW' && currentPrice <= alert.targetPrice) {
        setNotification(`${t.alertTriggered} ${coin.name} < ${alert.targetPrice} TL`);
        triggered = true;
      }

      if (triggered) {
        setTimeout(() => setNotification(null), 5000); // Hide after 5s
        return false; // Remove alert
      }
      return true; // Keep alert
    });

    if (newAlerts.length !== alerts.length) {
      setAlerts(newAlerts);
    }
  };

  useEffect(() => {
    // Theme management
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchStocks();
        if (data && data.length > 0) {
          setStocks(data);
          checkAlerts(data); // Check alerts on new data
          const now = new Date();
          setLastUpdated(now.toLocaleTimeString(language === 'tr' ? 'tr-TR' : 'en-US'));
        }
      } catch (error) {
        console.error('Veri yüklenirken hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, [language, alerts]); // Re-run if alerts change to ensure latest alerts are checked against next update

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'tr' ? 'en' : 'tr');
  };

  const toggleFavorite = (e, coinId) => {
    e.stopPropagation(); // Prevent opening modal
    setFavorites(prev =>
      prev.includes(coinId) ? prev.filter(id => id !== coinId) : [...prev, coinId]
    );
  };

  const handleBuy = (coinId, amount, price) => {
    const cost = amount * price;
    if (cost > balance) {
      alert(t.insufficientBalance);
      return;
    }
    setBalance(prev => prev - cost);
    setPortfolio(prev => ({
      ...prev,
      [coinId]: (prev[coinId] || 0) + parseFloat(amount)
    }));
    alert(t.successTransaction);
  };

  const handleSell = (coinId, amount, price) => {
    const currentOwned = portfolio[coinId] || 0;
    if (amount > currentOwned) {
      alert(t.insufficientAsset);
      return;
    }
    const earnings = amount * price;
    setBalance(prev => prev + earnings);
    setPortfolio(prev => ({
      ...prev,
      [coinId]: prev[coinId] - parseFloat(amount)
    }));
    alert(t.successTransaction);
  };

  // Compute stats
  const topGainer = stocks.length > 0 ? [...stocks].sort((a, b) => parseFloat(b.change) - parseFloat(a.change))[0] : null;
  const topLoser = stocks.length > 0 ? [...stocks].sort((a, b) => parseFloat(a.change) - parseFloat(b.change))[0] : null;

  // Filter and Sort
  const getProcessedStocks = () => {
    let result = stocks;

    // Filter by favorites if enabled
    if (showFavoritesOnly) {
      result = result.filter(stock => favorites.includes(stock.id));
    }

    result = result.filter(stock =>
      stock.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortOption) {
      case 'az':
        return result.sort((a, b) => a.code.localeCompare(b.code));
      case 'za':
        return result.sort((a, b) => b.code.localeCompare(a.code));
      case 'gain':
        return result.sort((a, b) => parseFloat(b.change) - parseFloat(a.change));
      case 'loss':
        return result.sort((a, b) => parseFloat(a.change) - parseFloat(b.change));
      default:
        return result;
    }
  };

  const processedStocks = getProcessedStocks();

  return (
    <div className="container">
      <header className="app-header">
        <h1>{t.title}</h1>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div className="wallet-badge" style={{
            background: 'var(--bg-secondary)',
            padding: '0.5rem 1rem',
            borderRadius: '12px',
            border: '1px solid var(--glass-border)',
            fontWeight: 'bold',
            color: 'var(--accent-green)'
          }}>
            💰 {t.wallet}
          </div>
          <button className="theme-toggle" onClick={toggleLanguage}>
            {t.langBtn}
          </button>
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? t.lightMode : t.darkMode}
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', margin: '1rem 0' }}>
        <button
          className={`theme-toggle ${showFavoritesOnly ? 'active' : ''}`}
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          style={{ background: showFavoritesOnly ? 'var(--accent-red)' : 'var(--bg-secondary)', border: showFavoritesOnly ? 'none' : '1px solid var(--glass-border)' }}
        >
          {showFavoritesOnly ? t.allCoins : t.favorites}
        </button>
        <button
          className="theme-toggle"
          onClick={() => setShowConverter(true)}
          style={{ background: 'var(--bg-secondary)' }}
        >
          🧮 {t.converter}
        </button>
      </div>

      {lastUpdated && (
        <div className="last-updated">
          {t.lastUpdated}: {lastUpdated}
        </div>
      )}

      {!loading && topGainer && (
        <div className="market-summary">
          <div className="summary-card positive">
            <h3>{t.topGainer}</h3>
            <div className="summary-info">
              {topGainer.image && <img src={topGainer.image} alt={topGainer.code} style={{ width: 32, height: 32, borderRadius: '50%' }} />}
              <div>
                <span className="summary-code">{topGainer.code}</span>
                <span className="summary-change">%{topGainer.change}</span>
              </div>
            </div>
          </div>
          <div className="summary-card negative">
            <h3>{t.topLoser}</h3>
            <div className="summary-info">
              {topLoser.image && <img src={topLoser.image} alt={topLoser.code} style={{ width: 32, height: 32, borderRadius: '50%' }} />}
              <div>
                <span className="summary-code">{topLoser.code}</span>
                <span className="summary-change">%{topLoser.change}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="control-bar">
        <input
          type="text"
          className="search-bar"
          placeholder={t.searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="sort-select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="az">{t.sortAZ}</option>
          <option value="za">{t.sortZA}</option>
          <option value="gain">{t.sortGain}</option>
          <option value="loss">{t.sortLoss}</option>
        </select>
      </div>

      {loading ? (
        <div className="loading-container">
          {t.loading}
        </div>
      ) : (
        <StockList
          stocks={processedStocks}
          emptyMessage={showFavoritesOnly ? t.noFavorites : t.coinNotFound}
          onStockClick={coin => setSelectedCoin(coin)}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      )}

      <CoinDetailModal
        coin={selectedCoin}
        onClose={() => setSelectedCoin(null)}
        t={t}
        portfolio={portfolio}
        onBuy={handleBuy}
        onSell={handleSell}
        onSetAlert={(coinId, targetPrice, type) => {
          setAlerts(prev => [...prev, { coinId, targetPrice: parseFloat(targetPrice), type }]);
          alert(t.alertSet);
        }}
      />

      {showConverter && (
        <ConverterModal
          stocks={stocks}
          onClose={() => setShowConverter(false)}
          t={t}
        />
      )}

      {/* Toast Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--accent-red)',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '12px',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          zIndex: 2000,
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          animation: 'fadeInUp 0.5s ease'
        }}>
          {notification}
        </div>
      )}

      <footer className="app-footer">
        <p>{t.footerProject}</p>
        <p>{t.footerUni}</p>
      </footer>
    </div>
  );
}

export default App;
