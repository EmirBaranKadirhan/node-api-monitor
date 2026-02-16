import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMonitors } from "../api/monitors";

export default function MonitorsList() {
    const [monitors, setMonitors] = useState([]);

    useEffect(() => {
        loadMonitors();
    }, []);

    const loadMonitors = async () => {
        try {
            const data = await getMonitors();
            setMonitors(data);
        } catch (err) {
            alert("Monitors alınamadı");
            console.log(err);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Monitors</h1>

            {monitors.map((m) => (
                <div key={m._id} style={{ border: "1px solid #ccc", marginBottom: 10, padding: 10 }}>
                    <div><b>{m.name}</b></div>
                    <div>{m.url}</div>
                    <div>Status: {m.status}</div>

                    <Link to={`/monitor/${m._id}`}>Detay</Link>
                </div>
            ))}
        </div>
    );
}
