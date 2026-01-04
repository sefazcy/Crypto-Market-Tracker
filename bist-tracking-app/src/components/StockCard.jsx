import React from 'react';

// Helper to create SVG path from data
const Sparkline = ({ data, color, isPositive }) => {
    if (!data || data.length === 0) return null;

    const width = 120;
    const height = 40;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1; // Avoid division by zero

    // Generate path points
    const points = data.map((val, index) => {
        const x = (index / (data.length - 1)) * width;
        const normalizedY = (val - min) / range;
        const y = height - (normalizedY * height); // Invert Y because SVG 0 is top
        return `${x},${y}`;
    }).join(' ');

    return (
        <div style={{ margin: '10px 0', height: '40px', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                <path
                    d={`M ${points}`}
                    fill="none"
                    stroke={isPositive ? '#34d399' : '#f87171'}
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        </div>
    );
};

const StockCard = ({ stock, onClick, isFavorite, onToggleFavorite }) => {
    const isPositive = parseFloat(stock.change) >= 0;

    return (
        <div className="stock-card" onClick={onClick} style={{ cursor: 'pointer' }}>
            <button
                onClick={onToggleFavorite}
                style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    zIndex: 10,
                    color: isFavorite ? '#ef4444' : 'var(--text-secondary)',
                    opacity: isFavorite ? 1 : 0.4,
                    transition: 'all 0.2s'
                }}
            >
                {isFavorite ? '❤️' : '🤍'}
            </button>

            <div className="stock-header">
                {stock.image && <img src={stock.image} alt={stock.name} style={{ width: '40px', height: '40px', marginRight: '1rem', borderRadius: '50%' }} />}
                <div>
                    <div className="stock-code">{stock.code}</div>
                    <div className="stock-name">{stock.name}</div>
                </div>
            </div>

            {/* Sparkline Graph */}
            <Sparkline data={stock.sparkline} isPositive={isPositive} />

            <div className="stock-price-container">
                <div className="stock-price">₺{stock.price}</div>
                <div className={`stock-change ${isPositive ? 'change-positive' : 'change-negative'}`}>
                    {isPositive ? '▲' : '▼'} %{Math.abs(stock.change)}
                </div>
            </div>
        </div>
    );
};

export default StockCard;
