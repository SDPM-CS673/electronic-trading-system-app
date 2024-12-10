import { Button, DialogBody, DialogFooter, DialogHeader, Typography, Input, Select, Option } from "@material-tailwind/react";
import { post } from "../../services/api-call.service";
const OrderEntry = ({ close }) => {

    const saveData = () => {
        post("/order/add", {}, "http://localhost:7001").then((result) => {
            close(true);
        }).catch((error) => {
            console.error(error);
        })
    }
    
    return (
        <>
            <DialogHeader className="border-b border-gray-300">New Order Entry</DialogHeader>
            <DialogBody className="border-b border-gray-300">
                <form className="mb-2">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Order Side
                        </Typography>
                        <Select size="lg"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}>
                            <Option>Buy</Option>
                            <Option>Sell</Option>
                        </Select>
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Order Type
                        </Typography>
                        <Select size="lg"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}>
                            <Option>Limit</Option>
                            <Option>Feel Or Kill</Option>
                            <Option>Feel And Kill</Option>
                        </Select>
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Product Category
                        </Typography>
                        <Select size="lg"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}>
                            <Option>Buy</Option>
                            <Option>Sell</Option>
                        </Select>
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Product Name
                        </Typography>
                        <Select size="lg"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}>
                            <Option>Buy</Option>
                            <Option>Sell</Option>
                        </Select>
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Quantity
                        </Typography>
                        <Input
                            type="number"
                            size="lg"
                            placeholder="Quantity"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Price
                        </Typography>
                        <Input
                            type="number"
                            size="lg"
                            placeholder="Quantity"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                    </div>
                </form>
            </DialogBody>
            <DialogFooter>
                <Button
                    className="mr-1" onClick={() => { close(false) }}>
                    <span>Cancel</span>
                </Button>
                <Button onClick={saveData}>
                    <span>Save</span>
                </Button>
            </DialogFooter>
        </>
    )
}

export default OrderEntry;