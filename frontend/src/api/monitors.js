import api from "./api";

export const getMonitors = async () => {
    const res = await api.get("/monitors");
    return res.data;
};

export const getMonitorResults = async (id) => {
    const res = await api.get(`/monitors/${id}/results`);
    return res.data.results;
};

export const getMonitorAlerts = async (id) => {
    const res = await api.get(`/monitors/${id}/alerts`);
    return res.data.alerts;
};

export const runCheckNow = async (id) => {
    const res = await api.post(`/monitors/${id}/check`);
    return res.data;
};