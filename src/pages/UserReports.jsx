import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserDetail } from "../services/user.service";

const UserReports = () => {
    const [userId, setUserId] = useState("");
    const [tradeList, setTradeList] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const TABLE_HEAD = [
        "Order ID",
        "Trade Date & Time",
        "Quantity",
        "Side",
        "Product Name",
        "Trade Margin"
    ];

    useEffect(() => {
        const userDetail = getUserDetail();
        if (userDetail && userDetail.user_id) {
            setUserId(userDetail.user_id);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            fetchTradeList();
        }
    }, [userId]);

    const fetchTradeList = async () => {
        if (!userId) {
            setError("User ID not found. Please log in.");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const response = await axios.post(`https://cs673backend.onrender.com/report/${userId}`);
            if (!response.data.trades || response.data.trades.length === 0) {
                setError("No trades found.");
            }
            setTradeList(response.data.trades || []);
        } catch (error) {
            console.error("Error fetching trade reports:", error);
            setError("Failed to fetch trade data. Please try again.");
            setTradeList([]);
        } finally {
            setIsLoading(false);
        }
    };

    const downloadData = () => {
        const headers = TABLE_HEAD.join(",");
        const rows = tradeList.map((trade) =>
            [
                trade.order_id,
                trade.trade_date_time,
                trade.trade_qty,
                trade.side,
                trade.product_name,
                trade.trade_margin
            ].join(",")
        );
        const csvContent = [headers, ...rows].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "trade_reports.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="h-full w-full p-6">
            <h1 className="text-xl font-bold mb-4">User Trade Reports</h1>

            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

            <div className="flex flex-col">
                <div className="overflow-auto border rounded-md">
                    <table className="w-full table-auto text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="p-4 border-b font-medium text-gray-700">
                                        {head}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tradeList.map((trade, index) => {
                                const isLast = index === tradeList.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-gray-200";

                                return (
                                    <tr key={trade.order_id} className="hover:bg-gray-50">
                                        <td className={classes}>{trade.order_id}</td>
                                        <td className={classes}>{trade.trade_date_time}</td>
                                        <td className={classes}>{trade.trade_qty}</td>
                                        <td className={classes}>{trade.side}</td>
                                        <td className={classes}>{trade.product_name}</td>
                                        <td className={classes}>{trade.trade_margin}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {isLoading && <p className="text-gray-500 text-center mt-4">Loading...</p>}

                <div className="flex justify-end mt-4">
                    <button
                        onClick={downloadData}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        disabled={tradeList.length === 0}
                    >
                        Download Data
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserReports;
