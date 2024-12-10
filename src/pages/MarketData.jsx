import React, { useState, useEffect } from "react";
import { get } from "../services/api-call.service";

const MarketData = () => {
    const [activeTab, setActiveTab] = useState("Live"); // Tracks active tab
    const [searchText, setSearchText] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [marketData, setMarketData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetchMarketData();
    }, [activeTab]);

    const fetchMarketData = () => {
        const endpoint = activeTab === "Live" ? "/api/liveMarketData" : "/api/historicMarketData";
        get(endpoint, "http://localhost:3000")
            .then((response) => {
                setMarketData(response.data);
                setFilteredData(response.data);
            })
            .catch((error) => console.error(error));
    };

    const filterTableData = () => {
        const lowerSearch = searchText.toLowerCase();
        const filtered = marketData.filter((data) => {
            const productIdMatches = data.productId.toLowerCase().includes(lowerSearch);
            const dateMatches = selectedDate ? data.date === selectedDate : true;
            return productIdMatches && dateMatches;
        });
        setFilteredData(filtered);
    };

    useEffect(() => {
        filterTableData();
    }, [searchText, selectedDate]);

    return (
        <div className="p-6 bg-gray-50">
            <div className="text-4xl font-bold text-gray-900 pb-6">Market Data</div>

            {/* Tabs */}
            <div className="flex space-x-4 mb-6">
                <button
                    className={`px-6 py-2 rounded-md text-white ${activeTab === "Live" ? "bg-blue-600" : "bg-gray-300"
                        }`}
                    onClick={() => setActiveTab("Live")}
                >
                    Live
                </button>
                <button
                    className={`px-6 py-2 rounded-md text-white ${activeTab === "Historic" ? "bg-blue-600" : "bg-gray-300"
                        }`}
                    onClick={() => setActiveTab("Historic")}
                >
                    Historic
                </button>
            </div>

            {/* Filters */}
            <div className="mb-6 flex justify-between">
                <input
                    type="text"
                    placeholder="Search by Product ID"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="p-3 border rounded-md w-1/3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {activeTab === "Historic" && (
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="p-3 border rounded-md w-1/3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                )}
            </div>

            {/* Table */}
            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-3 text-left">Sr No</th>
                        <th className="border p-3 text-left">Product ID</th>
                        <th className="border p-3 text-left">Best Buy Price</th>
                        <th className="border p-3 text-left">Best Sell Price</th>
                        <th className="border p-3 text-left">Best Buy Volume</th>
                        <th className="border p-3 text-left">Best Sell Volume</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((data, index) => (
                        <tr key={index} className="hover:bg-gray-100 transition-all">
                            <td className="border p-3">{index + 1}</td>
                            <td className="border p-3">{data.productId}</td>
                            <td className="border p-3">{data.bestBuyPrice}</td>
                            <td className="border p-3">{data.bestSellPrice}</td>
                            <td className="border p-3">{data.bestBuyVolume}</td>
                            <td className="border p-3">{data.bestSellVolume}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MarketData;
