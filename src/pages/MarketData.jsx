import React, { useState, useEffect } from "react";
import { get } from "../services/api-call.service";
import { Button, Card, Dialog, Input, Option, Select, Typography } from "@material-tailwind/react";

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
        const endpoint = activeTab === "Live" ? "/api/allMarketData" : "/api/historicMarketData";
        get(endpoint, "http://localhost:3000")
            .then((response) => {
                setMarketData(response);
                setFilteredData(response);
            })
            .catch((error) => console.error(error));
    };

    const filterTableData = () => {
        const lowerSearch = searchText.toLowerCase();
        const filtered = marketData.filter((data) => {
            const productIdMatches = data.product_name.toLowerCase().includes(lowerSearch);
            if (activeTab === "Live") {
                return productIdMatches;
            }
            else {
                const dateMatches = selectedDate ? data.date === selectedDate : true;
                return productIdMatches && dateMatches;
            }
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
                <Button
                    className={`${activeTab === "Live" ? "bg-blue-600" : ""
                        }`}
                    onClick={() => { setActiveTab("Live"); setSearchText("") }}
                >
                    Live
                </Button>
                <Button
                    className={`${activeTab === "Historic" ? "bg-blue-600" : ""
                        }`}
                    onClick={() => { setActiveTab("Historic"); setSearchText("") }}
                >
                    Historic
                </Button>
            </div>

            {/* Filters */}
            <div className="mb-6 flex justify-between">
                <div>
                    <Input
                        type="text"
                        label="Search by Product ID"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}

                    />
                </div>
                {activeTab === "Historic" && (
                    <div>
                        <Input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e)}
                            label="Enter Date"
                        /></div>
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
                            <td className="border p-3">{data.product_name}</td>
                            <td className="border p-3">{data.best_buy_price}</td>
                            <td className="border p-3">{data.best_sell_price}</td>
                            <td className="border p-3">{data.best_buy_volume}</td>
                            <td className="border p-3">{data.best_sell_volume}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MarketData;
