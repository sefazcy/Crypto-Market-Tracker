import React, { useState } from 'react';

const CoinDetailModal = ({ coin, onClose, t, portfolio = {}, onBuy, onSell, onSetAlert }) => {
    if (!coin) return null;
    const [amount, setAmount] = useState('');

    const isPositive = parseFloat(coin.change) >= 0;
    const ownedAmount = portfolio[coin.id] || 0;

    // Format big numbers (e.g. Market Cap)
    const formatNumber = (num) => {
        return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(num);
    };

    const currentPrice = parseFloat(coin.price);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>

                <div className="modal-header">
                    <img src={coin.image} alt={coin.name} className="modal-logo" />
                    <div>
                        <h2>{coin.name} <span className="modal-code">({coin.code})</span></h2>
                        <div className={`modal-price ${isPositive ? 'positive' : 'negative'}`}>
                            ₺{coin.price}
                            <span className="modal-change">
                                {isPositive ? '▲' : '▼'} %{Math.abs(coin.change)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="modal-stats">
                    <div className="stat-item">
                        <span className="stat-label">{t.high24h || '24s En Yüksek'}</span>
                        <span className="stat-value">{formatNumber(coin.high24h)}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">{t.low24h || '24s En Düşük'}</span>
                        <span className="stat-value">{formatNumber(coin.low24h)}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">{t.marketCap || 'Piyasa Değeri'}</span>
                        <span className="stat-value">{formatNumber(coin.marketCap)}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">{t.volume || '24s Hacim'}</span>
                        <span className="stat-value">{formatNumber(coin.volume)}</span>
                    </div>
                </div>

                {/* Alert Section */}
                <div className="alert-section" style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                    <h3>{t.setAlert || 'Fiyat Alarmı Kur'}</h3>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                        <input
                            type="number"
                            placeholder={t.priceAbove || 'Fiyat şunun üzerine çıkınca:'}
                            id={`alert-${coin.id}`}
                            style={{
                                flex: 1,
                                padding: '0.8rem',
                                borderRadius: '12px',
                                border: '1px solid var(--glass-border)',
                                background: 'var(--bg-primary)',
                                color: 'var(--text-primary)'
                            }}
                        />
                        <button
                            onClick={() => {
                                const val = document.getElementById(`alert-${coin.id}`).value;
                                if (val) onSetAlert(coin.id, val, 'ABOVE');
                            }}
                            style={{ background: 'var(--accent-green)', padding: '0.8rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                        >
                            📈 Alert &gt;
                        </button>
                        <button
                            onClick={() => {
                                const val = document.getElementById(`alert-${coin.id}`).value;
                                if (val) onSetAlert(coin.id, val, 'BELOW');
                            }}
                            style={{ background: 'var(--accent-red)', padding: '0.8rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                        >
                            📉 Alert &lt;
                        </button>
                    </div>
                </div>

                {/* Portfolio Section */}
                <div className="portfolio-section" style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                    <h3>{t.wallet || 'Cüzdan İşlemleri'}</h3>
                    <div style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                        {t.owned || 'Sahip Olunan'}: <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{ownedAmount} {coin.code}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <input
                            type="number"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            style={{
                                flex: 1,
                                padding: '0.8rem',
                                borderRadius: '12px',
                                border: '1px solid var(--glass-border)',
                                background: 'var(--bg-primary)',
                                color: 'var(--text-primary)',
                                fontSize: '1.1rem'
                            }}
                        />
                        <button
                            onClick={() => onBuy(coin.id, amount, currentPrice)}
                            style={{
                                background: 'var(--accent-green)',
                                color: 'white',
                                border: 'none',
                                padding: '0 1.5rem',
                                borderRadius: '12px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            {t.buy || 'Al'}
                        </button>
                        <button
                            onClick={() => onSell(coin.id, amount, currentPrice)}
                            style={{
                                background: 'var(--accent-red)',
                                color: 'white',
                                border: 'none',
                                padding: '0 1.5rem',
                                borderRadius: '12px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            {t.sell || 'Sat'}
                        </button>
                    </div>
                    {amount > 0 && (
                        <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                            Total: {formatNumber(amount * currentPrice)}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default CoinDetailModal;
