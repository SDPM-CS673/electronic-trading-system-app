import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserDetail } from "../services/user.service";

const Wallet = () => {
    const [userId, setUserId] = useState("");
    const [wallet, setWallet] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [amount, setAmount] = useState("");
    const [transactions, setTransactions] = useState([]); // Initialize transactions as an empty array

    useEffect(() => {
        const userDetail = getUserDetail();
        if (userDetail && userDetail.user_id) {
            setUserId(userDetail.user_id);
        }
    }, []);

    const fetchWalletDetails = async () => {
        if (!userId) {
            setWallet(null);
            return;
        }
        try {
            const response = await axios.get(`http://localhost:3000/wallet/${userId}`);
            setWallet(response.data.wallet);
            setError("");
            setSuccess("");
        } catch (error) {
            console.error("Error fetching wallet details:", error);
            setWallet(null);
            setError("Could not fetch wallet details. Please try again.");
        }
    };

    const fetchTransactions = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/wallet/logs/${userId}`);
            setTransactions(response.data);
        } catch (error) {
            console.error("Error fetching transaction logs:", error);
            setTransactions([]); // Set as empty array in case of error
        }
    };

    useEffect(() => {
        if (userId) {
            fetchWalletDetails();
            fetchTransactions();
        }
    }, [userId]);

    const handleAdd = async () => {
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            setError("Please enter a valid amount to add.");
            return;
        }
        try {
            const response = await axios.post("http://localhost:3000/wallet/update", {
                user_id: userId,
                type: "add",
                amount: Number(amount),
            });
            setWallet({ ...wallet, available_balance: response.data.new_balance });
            fetchTransactions(); // Refresh transactions after add
            setAmount(""); // Clear the input field
            setError("");
            setSuccess("Amount added successfully!");
        } catch (error) {
            console.error("Error adding money:", error);
            setError("Failed to add money. Please try again.");
        }
    };

    const handleDeduct = async () => {
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            setError("Please enter a valid amount to deduct.");
            return;
        }
        if (Number(amount) > wallet.available_balance) {
            setError("Insufficient balance.");
            return;
        }
        try {
            const response = await axios.post("http://localhost:3000/wallet/update", {
                user_id: userId,
                type: "deduct",
                amount: Number(amount),
            });
            setWallet({ ...wallet, available_balance: response.data.new_balance });
            fetchTransactions(); // Refresh transactions after deduct
            setAmount(""); // Clear the input field
            setError("");
            setSuccess("Amount deducted successfully!");
        } catch (error) {
            console.error("Error deducting money:", error);
            setError("Failed to deduct money. Please try again.");
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            {/* Account Balance Section */}
            <div className="mb-6 p-4 bg-gray-100 rounded-md">
                <h1 className="text-2xl font-bold text-center mb-4">Available Balance</h1>
                <p className="text-4xl font-semibold text-center">${wallet && wallet.available_balance ? Number(wallet.available_balance).toFixed(2) : "0.00"}</p>
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <div className="flex justify-between mt-2">
                        <button
                            onClick={handleAdd}
                            className="w-1/2 p-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 mr-2"
                        >
                            Add
                        </button>
                        <button
                            onClick={handleDeduct}
                            className="w-1/2 p-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 ml-2"
                        >
                            Deduct
                        </button>
                    </div>
                </div>
                {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </div>

            {/* Transaction Logs Section */}
            <div className="p-6 bg-gray-100 rounded-md w-full mt-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Transaction Logs</h2>
                </div>
                {transactions?.length > 0 ? (
                    <table className="w-full border border-gray-300 text-left">
                        <thead>
                            <tr>
                                <th className="p-2 border-b">Date/Time</th>
                                <th className="p-2 border-b">Action</th>
                                <th className="p-2 border-b">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td className="p-2 border-b">
                                        {new Date(transaction.date).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                    </td>
                                    <td className={`p-2 border-b ${transaction.action === "credit" ? "text-green-500" : "text-red-500"}`}>
                                        {transaction.action === "credit" ? "Add" : "Deduct"}
                                    </td>
                                    <td className="p-2 border-b">${Number(transaction.amount).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500 text-center">No transactions available for this period.</p>
                )}
            </div>
        </div>
    );
};

export default Wallet;