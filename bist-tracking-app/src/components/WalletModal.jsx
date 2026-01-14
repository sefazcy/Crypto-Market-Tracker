import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

const WalletModal = ({ onClose, portfolio, stocks, t, balance, badges }) => {
    // Prepare data for PieChart
    const data = Object.entries(portfolio).map(([coinId, amount]) => {
        const coin = stocks.find(s => s.id === coinId);
        if (!coin || amount <= 0) return null;
        return {
            name: coin.code,
            value: amount * parseFloat(coin.price),
            amount: amount,
            price: coin.price
        };
    }).filter(item => item !== null);

    const totalValue = data.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content wallet-modal" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>

                <div className="wallet-header">
                    <h2>💰 {t.wallet || 'Cüzdanım'}</h2>
                    <div className="total-balance">
                        <div className="balance-label">{t.totalBalance || 'Toplam Varlık'}</div>
                        <div className="balance-value">₺{(balance + totalValue).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</div>
                        <div className="balance-breakdown">
                            (Nakit: ₺{balance.toLocaleString('tr-TR')} + Kripto: ₺{totalValue.toLocaleString('tr-TR')})
                        </div>
                    </div>
                </div>

                <div className="wallet-body">
                    {/* Pie Chart Section */}
                    {data.length > 0 ? (
                        <div className="chart-section">
                            <h3>Portföy Dağılımı</h3>
                            <div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie
                                            data={data}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => `₺${value.toLocaleString()}`} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    ) : (
                        <div className="no-assets">
                            <p>Henüz kripto varlığınız yok.</p>
                        </div>
                    )}

                    {/* Badge Section */}
                    <div className="badges-section">
                        <h3>🏆 Rozetler</h3>
                        <div className="badges-grid">
                            {badges.length > 0 ? badges.map((badge, idx) => (
                                <div key={idx} className="badge-item">
                                    <span className="badge-icon">{badge.icon}</span>
                                    <span className="badge-name">{badge.name}</span>
                                </div>
                            )) : (
                                <p className="no-badges">Henüz rozet kazanmadınız. İşlem yaparak kazanabilirsiniz!</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletModal;
