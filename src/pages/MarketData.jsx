import React, { useState, useEffect } from "react";
import { get } from "../services/api-call.service";
import { Button, Card, Dialog, Input, Typography } from "@material-tailwind/react";
import { showMessage } from "../services/message.service";

const MarketData = () => {
    const [activeTab, setActiveTab] = useState("Live"); // Tracks active tab
    const [searchText, setSearchText] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [marketData, setMarketData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetchMarketData();

        if (activeTab === "Historic") {
            // Pre-fill date filters for historic data
            const today = new Date();
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(today.getMonth() - 1);

            setStartDate(oneMonthAgo.toISOString().split("T")[0]);
            setEndDate(today.toISOString().split("T")[0]);
        }

        // Fetch data every 2 minutes if the active tab is "Live"
        let intervalId;
        if (activeTab === "Live") {
            intervalId = setInterval(() => {
                fetchMarketData();
            }, 120000); // 2 minutes in milliseconds
        }

        return () => {
            // Clear the interval when the component is unmounted or tab changes
            clearInterval(intervalId);
        };

    }, [activeTab]);

    const fetchMarketData = () => {
        const endpoint = activeTab === "Live" ? "/api/liveData" : "/api/historicData";
        const params = activeTab === "Historic" && startDate && endDate
            ? `?start_date=${startDate}&end_date=${endDate}`
            : "";

        get(endpoint + params, "team1")
            .then((response) => {
                setMarketData(response);
                setFilteredData(response);
            })
            .catch((error) => {
                console.error(error);
                showMessage("Failed to fetch market data", "error");
            });
    };

    const filterTableData = () => {
        const lowerSearch = searchText.toLowerCase();
        if (lowerSearch != '') {
            const filtered = marketData.filter((data) => {
                // Check if the product name includes the search text
                const productIdMatches = data.product_name.toLowerCase().includes(lowerSearch);

                // Check if the date range is valid for Historic data
                const dateMatches = startDate && endDate
                    ? new Date(data.trade_date) >= new Date(startDate) &&
                    new Date(data.trade_date) <= new Date(endDate)
                    : true;

                // Combine all conditions
                if (activeTab === "Live") {
                    return productIdMatches;
                } else {
                    return productIdMatches && dateMatches;
                }
            });

            setFilteredData(filtered);
        } else {
            setFilteredData(marketData);
        }
    };

    useEffect(() => {
        filterTableData();
    }, [searchText, startDate, endDate]);

    const resetDates = () => {
        setSearchText("");

        const today = new Date();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(today.getMonth() - 1);

        setStartDate(oneMonthAgo.toISOString().split("T")[0]);
        setEndDate(today.toISOString().split("T")[0]);
    };

    const dateChange = (e, type) => {
        if (type === "start") {
            setStartDate(e.target.value);
        } else {
            setEndDate(e.target.value);
        }
    };

    return (
        <div className="p-6 bg-gray-50">
            <div className="text-4xl font-bold text-gray-900 pb-6">Market Data</div>

            {/* Tabs */}
            <div className="flex mb-6">
                <Button
                    className={`${activeTab === "Live" ? "bg-blue-600" : ""}`}
                    onClick={() => { setActiveTab("Live"); resetDates(); }}
                >
                    Live
                </Button>
                <Button
                    className={`${activeTab === "Historic" ? "bg-blue-600" : ""}`}
                    onClick={() => { setActiveTab("Historic"); resetDates(); }}
                >
                    Historic
                </Button>
            </div>

            {/* Filters */}
            <div className="mb-6 flex justify-between">
                <div className="flex flex-row gap-4">
                    <div>
                        <Input
                            type="text"
                            label="Search by Product ID"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                </div>
                {activeTab === "Historic" && (
                    <div className="flex flex-row justify-between gap-4">
                        <div>
                            <Input
                                type="date"
                                value={startDate}
                                max={endDate || new Date().toISOString().split("T")[0]} // Ensure start date is before end date
                                onChange={(e) => dateChange(e, "start")}
                                label="Enter Start Date"
                            />
                        </div>
                        <div>
                            <Input
                                type="date"
                                value={endDate}
                                min={startDate || new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString().split("T")[0]} // Ensure end date is after start date
                                max={new Date().toISOString().split("T")[0]} // No future dates
                                onChange={(e) => dateChange(e, "end")}
                                label="Enter End Date"
                            />
                        </div>
                        <div>
                            <Button onClick={() => resetDates()}>Reset</Button>
                        </div>
                    </div>
                )}

            </div>

            {/* Table */}
            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-3 text-left">Sr No</th>
                        <th className="border p-3 text-left">Product ID</th>
                        <th className="border p-3 text-left">Category</th>
                        <th className="border p-3 text-left">Best Buy Price</th>
                        <th className="border p-3 text-left">Best Sell Price</th>
                        <th className="border p-3 text-left">Best Buy Volume</th>
                        <th className="border p-3 text-left">Best Sell Volume</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="text-center py-4 text-gray-600">
                                No data available
                            </td>
                        </tr>
                    ) : (
                        filteredData.map((data, index) => (
                            <tr key={index} className="hover:bg-gray-100 transition-all">
                                <td className="border p-3">{index + 1}</td>
                                <td className="border p-3">{data.product_name}</td>
                                <td className="border p-3">{data.category_name}</td>
                                <td className="border p-3">{data.best_buy_price}</td>
                                <td className="border p-3">{data.best_sell_price}</td>
                                <td className="border p-3">{data.best_buy_volume}</td>
                                <td className="border p-3">{data.best_sell_volume}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MarketData;