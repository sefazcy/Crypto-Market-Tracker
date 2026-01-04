import React from 'react';
import StockCard from './StockCard';

const StockList = ({ stocks, emptyMessage, onStockClick, favorites, onToggleFavorite }) => {
    if (!stocks || stocks.length === 0) {
        return <div className="loading-container">{emptyMessage}</div>;
    }

    return (
        <div className="stock-grid">
            {stocks.map((stock) => (
                <StockCard
                    key={stock.id}
                    stock={stock}
                    onClick={() => onStockClick(stock)}
                    isFavorite={favorites?.includes(stock.id)}
                    onToggleFavorite={(e) => onToggleFavorite(e, stock.id)}
                />
            ))}
        </div>
    );
};

export default StockList;
