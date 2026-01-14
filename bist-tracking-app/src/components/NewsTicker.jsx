import React, { useEffect, useState } from 'react';

const NEWS_ITEMS = [
    "🚀 Bitcoin (BTC) tüm zamanların en yüksek seviyesine yaklaşıyor!",
    "⚠️ Ethereum Vakfı yeni güncellemeyi duyurdu: Gas ücretleri düşüyor.",
    "📈 Kripto piyasası toplam değeri 3 Trilyon Doları aştı.",
    "🐕 Dogecoin bir tweet sonrası %15 yükseliş yaşadı.",
    "🌍 El Salvador'dan sonra bir ülke daha Bitcoin'i yasal para birimi yapabilir.",
    "🏦 Büyük bankalar kripto saklama hizmeti sunmaya başlıyor.",
    "💡 Solana ağındaki işlem hızı rekor kırdı.",
    "🐻 Analistler ayı sezonunun sona erdiğini öngörüyor.",
    "🔥 Shiba Inu topluluğu büyük bir yakım etkinliği düzenledi.",
    "🛡️ DeFi protokollerinde kilitli toplam değer (TVL) artıyor."
];

const NewsTicker = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % NEWS_ITEMS.length);
        }, 5000); // Change news every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="news-ticker-container">
            <div className="news-label">SON DAKİKA</div>
            <div className="news-content fade-key">
                {NEWS_ITEMS[currentIndex]}
            </div>
        </div>
    );
};

export default NewsTicker;
