
exports.generatePayment = function (currentPayment) {

    const payments = [
        { key: "crypto-wallet", label: "Crypto Wallet", selected: false },
        { key: "credit-card", label: "Credit Card", selected: false },
        { key: "debit-card", label: "Debit Card", selected: false },
        { key: "paypal", label: "PayPal", selected: false },
    ]

    const result = payments.map(x => x.key == currentPayment ? { ...x, selected: true } : x);

    return result

}