const api = {
  async pay(data) {
    return fetch("/api/phonepe/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(r => r.json());
  },
  async status(txnId) {
    return fetch(`/api/phonepe/status/${txnId}`).then(r => r.json());
  },
};
export default api;
