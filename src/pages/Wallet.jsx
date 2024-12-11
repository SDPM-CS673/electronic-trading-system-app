import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserDetail } from "../services/user.service";

const BASE_URL = "https://cs673backend.onrender.com";

const Wallet = () => {
    const [userId, setUserId] = useState("");
    const [wallet, setWallet] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [amount, setAmount] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [filterType, setFilterType] = useState("this-week");
    const [isLoading, setIsLoading] = useState(false);

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
            const response = await axios.get(`${BASE_URL}/wallet/${userId}`);
            setWallet(response.data.wallet);
            setError("");
        } catch (error) {
            console.error("Error fetching wallet details:", error);
            setWallet(null);
            setError("Could not fetch wallet details. Please try again.");
        }
    };

    const fetchTransactions = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                `${BASE_URL}/wallet/logs/${userId}?filter=${filterType}`
            );
            const sortedTransactions = response.data.sort((a, b) => 
                new Date(b.date) - new Date(a.date)
            );
            setTransactions(sortedTransactions);
        } catch (error) {
            console.error("Error fetching transaction logs:", error);
            setTransactions([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchWalletDetails();
            fetchTransactions();
        }
    }, [userId, filterType]);

    const handleTransaction = async (type) => {
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            setError(`Please enter a valid amount to ${type}.`);
            return;
        }

        const numAmount = Number(amount);

        if (type === "deduct") {
            const availableBalance = Number(wallet.available_balance - wallet.current_softblock);
            if (availableBalance < numAmount) {
                setError(`Cannot deduct given amount as standing balance is lower than the amount ${numAmount.toFixed(2)}`);
                return;
            }
        }

        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.post(`${BASE_URL}/wallet/update`, {
                user_id: userId,
                type,
                amount: numAmount
            });

            setWallet({ ...wallet, available_balance: response.data.new_balance });
            await fetchTransactions();
            setAmount("");
            setSuccess(`Amount ${type}ed successfully!`);
        } catch (error) {
            console.error(`Error ${type}ing money:`, error);
            const errorMessage = error.response?.data?.error || `Failed to ${type} money. Please try again.`;
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdd = () => handleTransaction("add");
    const handleDeduct = () => handleTransaction("deduct");

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <div className="mb-6 p-4 bg-gray-100 rounded-md">
                <h1 className="text-2xl font-bold text-center mb-4">Available Balance</h1>
                <p className="text-4xl font-semibold text-center">
                    ${wallet && wallet.available_balance ? Number(wallet.available_balance).toFixed(2) : "0.00"}
                </p>
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        disabled={isLoading}
                    />
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <button
                            onClick={handleAdd}
                            className="p-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : "Add"}
                        </button>
                        <button
                            onClick={handleDeduct}
                            className="p-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : "Deduct"}
                        </button>
                    </div>
                </div>
                {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </div>

            <div className="p-6 bg-gray-100 rounded-md w-full mt-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Transaction Logs</h2>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md"
                        disabled={isLoading}
                    >
                        <option value="this-week">This Week</option>
                        <option value="this-month">This Month</option>
                        <option value="this-year">This Year</option>
                    </select>
                </div>
                <div className="max-h-80 overflow-y-auto">
                    {isLoading ? (
                        <p className="text-center py-4">Loading transactions...</p>
                    ) : transactions?.length > 0 ? (
                        <table className="w-full border border-gray-300 text-left">
                            <thead className="sticky top-0 bg-white">
                                <tr>
                                    <th className="p-2 border-b">Date/Time</th>
                                    <th className="p-2 border-b">Action</th>
                                    <th className="p-2 border-b">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
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
                                        <td className="p-2 border-b">{transaction.action}</td>
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
        </div>
    );
};

export default Wallet;
