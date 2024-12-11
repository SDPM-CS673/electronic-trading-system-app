import { useEffect, useState } from "react";
import { post } from "../../services/api-call.service";
import { Button, Card, Dialog, Input, Option, Select, Typography } from "@material-tailwind/react";
import OrderEntry from "./OrderEntry";

const OrderList = () => {
    const [orderList, setOrderList] = useState([]);
    const [openOrderEntry, setOpenOrderEntry] = useState(false);
    const TABLE_HEAD = ["Product Category", "Product Name", "Trade Date", "Type", "Quantity", "Price", "Status", "Action"];

    useEffect(() => {
        getOrderList();
    }, []);

    const getOrderList = () => {
        post("/orders/list", {}, "http://localhost:7001").then((response) => {
            setOrderList(response);
        }).catch((error) => {
            console.error(error);
        })
    }

    const openCloseOrderEntry = (show) => {
        setOpenOrderEntry(show);
    }

    const onDialogClose = (result) => {
        if (result) {
            getOrderList();
        }
        setOpenOrderEntry(false);
    }

    return (
        // <></>
        <>
            <div className="h-full w-full">
                <div className="grid grid-cols-6 gap-2 text-left">
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

                    <div className="pe-4 py-4">
                        <Select label="Order Status">
                            <Option>Open</Option>
                            <Option>Pending</Option>
                            <Option>Rejected</Option>
                            <Option>Cancel</Option>
                        </Select>
                    </div>

                    {/* <!-- Control 3 --> */}
                    <div className="pe-4 py-4">
                        <Input
                            type="date"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900 text-sm"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            placeholder="Start Date" // Added accessibility label
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
                            placeholder="End Date" // Added accessibility label
                        />
                    </div>
                </div>
                <div className="flex justify-end space-x-4 mt-2 mb-3">
                    <Button size="md">Search</Button>
                    <Button size="md" onClick={() => { openCloseOrderEntry(true) }}>New</Button>
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
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {orderList.map((obj, index) => {
                                const isLast = index === orderList.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={obj.order_id}>
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
                                                {obj.category_name}
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
                                                {obj.order_date_time}
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
                                                {obj.order_qty}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {obj.order_price}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {obj.order_status}
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
                                                Cancel
                                            </Typography>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Card>
            </div>

            <Dialog open={openOrderEntry} handler={() => {openCloseOrderEntry(!openOrderEntry)}} size="sm">
                <OrderEntry close={onDialogClose}/>
            </Dialog>
        </>

    );
}

export default OrderList;