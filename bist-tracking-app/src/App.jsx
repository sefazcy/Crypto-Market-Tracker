import React, { useState, useEffect } from 'react';
import { fetchStocks } from './services/api';
import StockList from './components/StockList';
import CoinDetailModal from './components/CoinDetailModal';
import ConverterModal from './components/ConverterModal';
import NewsTicker from './components/NewsTicker';
import WalletModal from './components/WalletModal';

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
  const [showWallet, setShowWallet] = useState(false);
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

  // Gamification: Badges
  const [badges, setBadges] = useState(() => {
    const saved = localStorage.getItem('cryptoBadges');
    return saved ? JSON.parse(saved) : [];
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
      badgeUnlocked: '🏆 YENİ ROZET KAZANILDI:',
      totalBalance: 'Toplam Varlık'
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
      badgeUnlocked: '🏆 NEW BADGE UNLOCKED:',
      totalBalance: 'Total Assets'
    },
    es: {
      title: 'Rastreador de Mercado Cripto 🚀',
      lightMode: '☀️ Modo Claro',
      darkMode: '🌙 Modo Oscuro',
      lastUpdated: 'Última actualización',
      topGainer: '🔥 Mayor Ganador',
      topLoser: '❄️ Mayor Perdedor',
      searchPlaceholder: 'Buscar moneda (ej. BTC, Bitcoin)...',
      sortAZ: 'Alfabético (A-Z)',
      sortZA: 'Alfabético (Z-A)',
      sortGain: 'Mayores Ganadores',
      sortLoss: 'Mayores Perdedores',
      loading: 'Cargando datos del mercado...',
      footerProject: 'Proyecto Final BTE313 | App de Rastreo de Datos Cripto',
      footerUni: 'Sefa Usta',
      coinNotFound: 'Moneda no encontrada.',
      langBtn: '🇪🇸 ES',
      high24h: 'Máx 24h',
      low24h: 'Mín 24h',
      marketCap: 'Cap. de Mercado',
      volume: 'Volumen 24h',
      favorites: '❤️ Favoritos',
      allCoins: '🌐 Todas',
      noFavorites: 'Aún no hay favoritos.',
      wallet: 'Billetera',
      buy: 'Comprar',
      sell: 'Vender',
      amount: 'Cantidad',
      owned: 'Propiedad',
      insufficientBalance: '¡Saldo Insuficiente!',
      insufficientAsset: '¡Activo Insuficiente!',
      successTransaction: '¡Transacción Exitosa!',
      converter: 'Convertidor Cripto',
      setAlert: '🔔 Alerta de Precio',
      priceAbove: 'Precio sube por encima de:',
      priceBelow: 'Precio baja por debajo de:',
      alertSet: '¡Alerta configurada!',
      alertTriggered: '🔔 ¡ALERTA DE PRECIO!',
      badgeUnlocked: '🏆 NUEVA INSIGNIA DESBLOQUEADA:',
      totalBalance: 'Activos Totales'
    },
    fr: {
      title: 'Suivi du Marché Crypto 🚀',
      lightMode: '☀️ Mode Clair',
      darkMode: '🌙 Mode Sombre',
      lastUpdated: 'Dernière mise à jour',
      topGainer: '🔥 Meilleure Hausse',
      topLoser: '❄️ Meilleure Baisse',
      searchPlaceholder: 'Rechercher (ex. BTC, Bitcoin)...',
      sortAZ: 'Alphabétique (A-Z)',
      sortZA: 'Alphabétique (Z-A)',
      sortGain: 'Meilleurs Gains',
      sortLoss: 'Meilleures Pertes',
      loading: 'Chargement des données...',
      footerProject: 'Projet Final BTE313 | App de Suivi Crypto',
      footerUni: 'Sefa Usta',
      coinNotFound: 'Monnaie non trouvée.',
      langBtn: '🇫🇷 FR',
      high24h: 'Haut 24h',
      low24h: 'Bas 24h',
      marketCap: 'Cap. Marché',
      volume: 'Volume 24h',
      favorites: '❤️ Favoris',
      allCoins: '🌐 Toutes',
      noFavorites: 'Pas encore de favoris.',
      wallet: 'Portefeuille',
      buy: 'Acheter',
      sell: 'Vendre',
      amount: 'Montant',
      owned: 'Possédé',
      insufficientBalance: 'Solde Insuffisant!',
      insufficientAsset: 'Actif Insuffisant!',
      successTransaction: 'Transaction Réussie!',
      converter: 'Convertisseur Crypto',
      setAlert: '🔔 Alerte Prix',
      priceAbove: 'Prix dépasse:',
      priceBelow: 'Prix descend sous:',
      alertSet: 'Alerte définie!',
      alertTriggered: '🔔 ALERTE PRIX!',
      badgeUnlocked: '🏆 NOUVEAU BADGE DÉBLOQUÉ:',
      totalBalance: 'Actifs Totaux'
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

  useEffect(() => {
    localStorage.setItem('cryptoBadges', JSON.stringify(badges));
  }, [badges]);

  // Live Price Simulation Effect
  useEffect(() => {
    if (loading || stocks.length === 0) return;

    const interval = setInterval(() => {
      setStocks(prevStocks => prevStocks.map(stock => {
        // Random change between -0.5% and +0.5%
        const changePercent = (Math.random() * 1) - 0.5;
        const currentPrice = parseFloat(stock.price);
        const newPrice = currentPrice * (1 + changePercent / 100);

        return {
          ...stock,
          price: newPrice.toFixed(2),
          // Update change percentage slightly too
          change: (parseFloat(stock.change) + changePercent).toFixed(2)
        };
      }));
    }, 3000); // Live update every 3 seconds

    return () => clearInterval(interval);
  }, [loading]); // We don't depend on stocks directly to avoid infinite re-render loop if we did it wrong, but here functional update is safe.
  // Actually, dependency on `loading` is enough to start it once mock data is loaded.

  const unlockBadge = (badgeName, badgeIcon) => {
    if (!badges.some(b => b.name === badgeName)) {
      const newBadge = { name: badgeName, icon: badgeIcon, date: new Date().toISOString() };
      setBadges(prev => [...prev, newBadge]);
      setNotification(`${t.badgeUnlocked} ${badgeName}`);
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const checkAlerts = (currentStocks) => {
    if (!currentStocks || currentStocks.length === 0) return;

    const newAlerts = alerts.filter(alert => {
      const coin = currentStocks.find(c => c.id === alert.coinId);
      if (!coin) return true; // Keep alert if coin not found

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
        setTimeout(() => setNotification(null), 5000);
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
          checkAlerts(data);
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

    // Re-fetch clean data every 60s
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, [language, alerts]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
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

    // Badge Logic
    unlockBadge('İlk Yatırımcı', '🌱');
    if (cost > 50000) unlockBadge('Balina', '🐳');
    if (Object.keys(portfolio).length >= 2) unlockBadge('Çeşitlilik Uzmanı', '💼');
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

    // Badge Logic
    if (earnings > 10000) unlockBadge('Kâr Ustası', '💰');
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
        <div className="header-actions">
          <div className="wallet-badge" onClick={() => setShowWallet(true)} style={{ cursor: 'pointer' }}>
            <span className="wallet-icon">💰</span> {t.wallet}
          </div>
          <select
            className="nav-btn"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              appearance: 'none',
              backgroundImage: 'none',
              textAlign: 'center',
              cursor: 'pointer'
            }}
          >
            <option value="tr">🇹🇷 TR</option>
            <option value="en">🇺🇸 EN</option>
            <option value="es">🇪🇸 ES</option>
            <option value="fr">🇫🇷 FR</option>
          </select>
          <button className="nav-btn" onClick={toggleTheme}>
            {isDarkMode ? t.lightMode : t.darkMode}
          </button>
        </div>
      </header>

      {/* News Ticker */}
      <NewsTicker />

      <div className="main-actions">
        <button
          className={`action-btn ${showFavoritesOnly ? 'active' : ''}`}
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
        >
          {showFavoritesOnly ? t.allCoins : t.favorites}
        </button>
        <button
          className="action-btn"
          onClick={() => setShowConverter(true)}
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
              {topGainer.image && <img src={topGainer.image} alt={topGainer.code} style={{ width: 32, height: 32, borderRadius: '50%' }} className="summary-img" />}
              <div>
                <span className="summary-code">{topGainer.code}</span>
                <span className="summary-change">%{topGainer.change}</span>
              </div>
            </div>
          </div>
          <div className="summary-card negative">
            <h3>{t.topLoser}</h3>
            <div className="summary-info">
              {topLoser.image && <img src={topLoser.image} alt={topLoser.code} style={{ width: 32, height: 32, borderRadius: '50%' }} className="summary-img" />}
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

      {showWallet && (
        <WalletModal
          onClose={() => setShowWallet(false)}
          portfolio={portfolio}
          stocks={stocks}
          t={t}
          balance={balance}
          badges={badges}
        />
      )}

      {/* Toast Notification */}
      {notification && (
        <div className="toast-notification">
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
