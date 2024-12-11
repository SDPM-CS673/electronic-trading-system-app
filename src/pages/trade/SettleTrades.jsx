import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserDetail } from "../../services/user.service";

const WalletTrade = () => {
    const [userId, setUserId] = useState("");
    const [tradeList, setTradeList] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const TABLE_HEAD = [
        "Trade ID", 
        "Buyer ID", 
        "Seller ID", 
        "Trade Date", 
        "Trade Price", 
        "Trade Quantity",
        "Market ID",
        "Product Name",
        "Trade Margin",
        "Adjusted Quantity",
        "Adjusted Margin Buyer",
        "Actions",
    ];

    useEffect(() => {
        const userDetail = getUserDetail();
        if (userDetail && userDetail.user_id) {
            setUserId(userDetail.user_id);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            fetchTradeList(); // Fetch all trades for the user when the page loads
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
            const response = await axios.post(`https://cs673backend.onrender.com/trades/settle/${userId}`);
            if (response.data.settled_trades.length === 0) {
                setError("No trades found.");
            }
            setTradeList(response.data.settled_trades || []);
        } catch (error) {
            console.error("Error fetching settled trades:", error);
            setError("Failed to fetch trade data. Please try again.");
            setTradeList([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCurtail = (tradeId) => {
        console.log("Curtailing trade:", tradeId);
    };

    const handleAcceptAll = () => {
        console.log("Accepting all trades");
    };

    return (
        <div className="h-full w-full">
            <h1 className="text-xl font-bold mb-4">Settled Trades</h1>

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
                                    <tr key={trade.trade_id} className="hover:bg-gray-50">
                                        <td className={classes}>{trade.trade_id}</td>
                                        <td className={classes}>{trade.buyer_id}</td>
                                        <td className={classes}>{trade.seller_id}</td>
                                        <td className={classes}>{trade.trade_date}</td>
                                        <td className={classes}>{trade.trade_price}</td>
                                        <td className={classes}>{trade.trade_qty}</td>
                                        <td className={classes}>{trade.market_id}</td>
                                        <td className={classes}>{trade.product_name}</td>
                                        <td className={classes}>{trade.trade_margin}</td>
                                        <td className={classes}>{trade.adjusted_quantity}</td>
                                        <td className={classes}>{trade.adjusted_margin_buyer}</td>
                                        <td className={classes}>
                                            <button 
                                                onClick={() => handleCurtail(trade.trade_id)}
                                                className="px-4 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                                            >
                                                CURTAIL
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end mt-4 pb-4">
                    <button 
                        onClick={handleAcceptAll}
                        className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        disabled={isLoading}
                    >
                        ACCEPT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WalletTrade;
