import { useEffect, useState } from "react";
import { post } from "../../services/api-call.service";
import { Button, Input, Option, Select, Typography, Card } from "@material-tailwind/react";

const TradeList = () => {
    const [tradeList, setTradeList] = useState([]);
    const TABLE_HEAD = ["Product Category", "Product Name", "Side", "Trade Date", "Trade Price", "Trade Qty", "Trade Margin", ""];
    useEffect(() => { 
        getTradeList();
    }, []);

    const getTradeList = () => {
        post("/trades/list", {}, "team3").then((result) => {
            setTradeList(result);
        }).catch((error) => {
            console.error(error);
        })
    }

    const goToSettledTrades = () => {   
        
    }

    return (
        <div className="h-full w-full">
            <div className="grid grid-cols-5 gap-2 text-left">
                {/* <!-- Control 1 --> */}
                <div className="pe-4 py-4">
                    <Select label="Product Category">
                        <Option>Material Tailwind HTML</Option>
                        <Option>Material Tailwind React</Option>
                        <Option>Material Tailwind Vue</Option>
                        <Option>Material Tailwind Angular</Option>
                        <Option>Material Tailwind Svelte</Option>
                    </Select>

                </div>

                {/* <!-- Control 2 --> */}
                <div className="pe-4 py-4">
                    <Select label="Product Name">
                        <Option>Material Tailwind HTML</Option>
                        <Option>Material Tailwind React</Option>
                        <Option>Material Tailwind Vue</Option>
                        <Option>Material Tailwind Angular</Option>
                        <Option>Material Tailwind Svelte</Option>
                    </Select>
                </div>

                <div className="pe-4 py-4">
                    <Select label="Order Side">
                        <Option>Buy</Option>
                        <Option>Sell</Option>
                    </Select>
                </div>

                {/* <div className="pe-4 py-4">
                    <Select label="Order Status">
                        <Option>Open</Option>
                        <Option>Pending</Option>
                        <Option>Rejected</Option>
                        <Option>Cancel</Option>
                    </Select>
                </div> */}

                {/* <!-- Control 3 --> */}
                <div className="pe-4 py-4">
                    <Input
                        type="date"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900 text-sm"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        label="Start Date" // Added accessibility label
                    />
                </div>

                {/* <!-- Control 4 --> */}
                <div className="pe-4 py-4">
                    <Input
                        type="date"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900 text-sm"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        label="End Date" // Added accessibility label
                    />
                </div>
            </div>
            <div className="flex justify-end space-x-4 mt-2 mb-3">
                <Button size="md">Search</Button>
                <Button size="md" onClick={goToSettledTrades}>Settled Trades</Button>
            </div>
            <Card className="overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-bold leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tradeList.map((obj, index) => {
                            const isLast = index === tradeList.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={obj.trade_id} className="even:bg-blue-gray-50/50">
                                    {/* <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {obj.member_id}
                                    </Typography>
                                </td> */}
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {obj.market_id}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {obj.product_name}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {obj.side}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {obj.trade_date_time}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {obj.trade_price}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {obj.trade_qty}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {obj.trade_margin}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            as="a"
                                            href="#"
                                            variant="small"
                                            color="blue-gray"
                                            className="font-medium"
                                        >
                                            Accept
                                        </Typography>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}

export default TradeList;