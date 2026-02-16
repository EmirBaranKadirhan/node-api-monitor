import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMonitorResults, getMonitorAlerts } from "../api/monitors";

export default function MonitorDetail() {
    const { id } = useParams();

    const [results, setResults] = useState([]);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {
        try {
            const resultsData = await getMonitorResults(id);
            console.log(resultsData)
            const alertsData = await getMonitorAlerts(id);

            setResults(resultsData);
            setAlerts(alertsData);
        } catch (err) {
            alert("Detaylar alınamadı");
            console.log(err);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Check Results</h2>

            {results.map((r) => (
                <div key={r._id} style={{ borderBottom: "1px solid #eee", padding: 6 }}>
                    {r.ok ? "🟢 OK" : "🔴 FAIL"} || Status: {r.status} || {r.latencyMs} ms || {r.checkedAt ? new Date(r.checkedAt).toLocaleString() : "-"}
                </div>
            ))}

            <h2 style={{ marginTop: 30 }}>Alerts</h2>

            {alerts.map((a) => (
                <div key={a._id} style={{ borderBottom: "1px solid #eee", padding: 6 }}>
                    {a.type} — {a.toStatus} — {new Date(a.createdAt).toLocaleString()}
                </div>
            ))}
        </div>
    );
}
