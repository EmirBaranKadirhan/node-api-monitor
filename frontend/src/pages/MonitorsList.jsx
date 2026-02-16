import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMonitors, runCheckNow } from "../api/monitors";
import "../css/MonitorsList.css"

export default function MonitorsList() {
    const [monitors, setMonitors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [runningId, setRunningId] = useState(null); // hangi monitor'de "Check Now" çalışıyor

    useEffect(() => {
        loadMonitors();

    }, []);

    const loadMonitors = async () => {
        try {
            setLoading(true);
            const data = await getMonitors();
            setMonitors(data || []);
        } catch (err) {
            alert("Monitors alınamadı");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckNow = async (id) => {
        try {
            setRunningId(id);
            const data = await runCheckNow(id);
            console.log("Check sonucu:", data);
            // kısa bir gecikme ver (isteğe bağlı) ya da direkt listeyi yenile
            await loadMonitors();
        } catch (err) {
            console.error("Check hatası:", err);
            alert("Check çalıştırılamadı.");
        } finally {
            setRunningId(null);
        }
    };

    return (
        <div className="ml-container">
            <div className="ml-card">
                <header className="ml-header">
                    <h1>Monitors</h1>
                    <button className="ml-refresh" onClick={loadMonitors} disabled={loading}>
                        {loading ? "Yükleniyor..." : "Yenile"}
                    </button>
                </header>

                {monitors.length === 0 ? (
                    <div className="ml-empty">
                        {loading ? "Monitors yükleniyor..." : "Henüz monitor yok."}
                    </div>
                ) : (
                    <div className="ml-list">
                        {monitors.map((m) => (
                            <article className="ml-item" key={m._id}>
                                <div className="ml-item-left">
                                    <div className="ml-name">{m.name}</div>
                                    <div className="ml-url">{m.url}</div>
                                </div>

                                <div className="ml-item-right">
                                    <div className={`ml-status ${m.enabled ? "online" : "disabled"}`}>
                                        {m.enabled ? "Enabled" : "Disabled"}
                                    </div>

                                    {/* Eğer backend monitor içinde son status alanı sağlıyorsa göster */}
                                    {m.status !== undefined && (
                                        <div className="ml-laststatus">HTTP {m.status}</div>
                                    )}

                                    <div className="ml-actions">
                                        <Link to={`/monitor/${m._id}`} className="ml-link">
                                            Detay
                                        </Link>

                                        <button
                                            className="ml-btn"
                                            onClick={() => handleCheckNow(m._id)}
                                            disabled={runningId === m._id}
                                            title="Manuel kontrol gerçekleştir"
                                        >
                                            {runningId === m._id ? "Çalışıyor..." : "Check Now"}
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
