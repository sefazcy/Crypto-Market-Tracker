import React, { useState, useEffect } from 'react';

const ConverterModal = ({ stocks, onClose, t }) => {
    const [amount, setAmount] = useState('1');
    const [selectedCoinId, setSelectedCoinId] = useState(stocks[0]?.id || '');
    const [currency, setCurrency] = useState('TRY');
    const [mode, setMode] = useState('CURRENCY_TO_COIN'); // CURRENCY_TO_COIN or COIN_TO_CURRENCY

    // Approximate Exchange Rates (Fixed for Homework/Demo)
    const RATES = {
        TRY: 1,
        USD: 35.5,
        EUR: 38.2,
        GBP: 44.8,
    };

    useEffect(() => {
        if (stocks.length > 0 && !selectedCoinId) {
            setSelectedCoinId(stocks[0].id);
        }
    }, [stocks, selectedCoinId]);

    const selectedCoin = stocks.find(c => c.id === selectedCoinId);
    const coinPriceInTRY = selectedCoin ? parseFloat(selectedCoin.price) : 0;

    // Logic:
    // 1 Coin = coinPriceInTRY (TL)
    // 1 Currency = RATES[currency] (TL)
    // Price of 1 Coin in Selected Currency = coinPriceInTRY / RATES[currency]

    const coinPriceInCurrency = coinPriceInTRY / RATES[currency];

    const calculateResult = () => {
        if (!amount || isNaN(amount)) return 0;
        const val = parseFloat(amount);

        if (mode === 'CURRENCY_TO_COIN') {
            // I have X Currency, how many Coins?
            // X / Price_of_1_Coin_in_Currency
            return val / coinPriceInCurrency;
        } else {
            // I have X Coins, how much Currency?
            // X * Price_of_1_Coin_in_Currency
            return val * coinPriceInCurrency;
        }
    };

    const result = calculateResult();

    const displayResult = mode === 'CURRENCY_TO_COIN'
        ? result.toFixed(6)
        : result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '450px' }}>
                <button className="modal-close" onClick={onClose}>&times;</button>

                <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>🧮 {t.converter || 'Kripto Dönüştürücü'}</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                    {/* Toggle Direction */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
                        <button
                            onClick={() => setMode(mode === 'CURRENCY_TO_COIN' ? 'COIN_TO_CURRENCY' : 'CURRENCY_TO_COIN')}
                            style={{
                                background: 'var(--bg-secondary)',
                                border: '1px solid var(--glass-border)',
                                padding: '0.8rem 1.5rem',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                color: 'var(--text-primary)',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            {mode === 'CURRENCY_TO_COIN' ? `💱 ${currency} ➡ Coin` : `💱 Coin ➡ ${currency}`}
                        </button>
                    </div>

                    {/* Currency Selector */}
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                        {Object.keys(RATES).map(cur => (
                            <button
                                key={cur}
                                onClick={() => setCurrency(cur)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '8px',
                                    border: currency === cur ? '2px solid var(--accent-blue)' : '1px solid var(--glass-border)',
                                    background: currency === cur ? 'rgba(56, 189, 248, 0.2)' : 'var(--bg-primary)',
                                    color: 'var(--text-primary)',
                                    cursor: 'pointer',
                                    fontWeight: currency === cur ? 'bold' : 'normal'
                                }}
                            >
                                {cur}
                            </button>
                        ))}
                    </div>

                    {/* Input Section */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                {mode === 'CURRENCY_TO_COIN' ? `${currency} Miktarı` : 'Coin Miktarı'}
                            </label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    border: '1px solid var(--glass-border)',
                                    background: 'var(--bg-primary)',
                                    color: 'var(--text-primary)',
                                    fontSize: '1.2rem'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                Coin Seç
                            </label>
                            <select
                                value={selectedCoinId}
                                onChange={(e) => setSelectedCoinId(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    border: '1px solid var(--glass-border)',
                                    background: 'var(--bg-primary)',
                                    color: 'var(--text-primary)',
                                    fontSize: '1.1rem'
                                }}
                            >
                                {stocks.map(stock => (
                                    <option key={stock.id} value={stock.id}>
                                        {stock.name} ({stock.code})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Result */}
                    <div style={{
                        marginTop: '1rem',
                        padding: '1.5rem',
                        background: 'linear-gradient(145deg, rgba(56, 189, 248, 0.1), rgba(30, 41, 59, 0.4))',
                        borderRadius: '16px',
                        textAlign: 'center',
                        border: '1px solid rgba(56, 189, 248, 0.2)'
                    }}>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                            {mode === 'CURRENCY_TO_COIN' ? 'Alabileceğiniz Coin:' : 'Tahmini Değer:'}
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-green)' }}>
                            {isNaN(parseFloat(displayResult)) ? '0.00' : displayResult}
                            <span style={{ fontSize: '1rem', marginLeft: '0.5rem', color: 'var(--text-secondary)' }}>
                                {mode === 'CURRENCY_TO_COIN' ? selectedCoin?.code : currency}
                            </span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                            1 {selectedCoin?.code} ≈ {coinPriceInCurrency.toFixed(2)} {currency}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ConverterModal;
