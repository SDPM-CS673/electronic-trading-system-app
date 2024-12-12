import { Button, DialogBody, DialogFooter, DialogHeader, Typography, Input, Select, Option } from "@material-tailwind/react";
import { post, get } from "../../services/api-call.service";
import { showMessage } from "../../services/message.service";
import { useEffect, useState } from "react";
const OrderEntry = ({ close }) => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        product_category: "",
        product_name: "",
        order_type: "",
        side: "",
        order_price: "",
        order_qty: ""
    });
    useEffect(() => {
        // Fetch category list
        categoryList();
    }, []);

    const categoryList = () => {
        get("/api/productCategoryWise", "team1").then((response) => {
            if (response.categories) {
                setCategories(response.categories);
            }
        }).catch((error) => {
            showMessage("Error ocurred while getting category list!", 'error')
        });
    }

    const saveData = () => {
        console.log(formData);
        post("/order/add", formData, "team3").then((result) => {
            showMessage("Order added successfully", "success");
            close(true);
        }).catch((error) => {
            showMessage("Error ocurred while adding order!", "success");
            console.error(error);
        })
    }

    const handleChange = (e, name) => {
        const value = e.target ? e.target.value : e;
        formData[name] = value;
        setFormData(formData);
    };

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
                            }} name="side" id="side" onChange={(e) => { handleChange(e, "side") }} >
                            <Option value="B">Buy</Option>
                            <Option value="S">Sell</Option>
                        </Select>
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Order Type
                        </Typography>
                        <Select size="lg"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }} name="order_type" id="order_type" onChange={(e) => { handleChange(e, "order_type") }}>
                            <Option value="L">Limit</Option>
                            <Option value="FOK">Feel Or Kill</Option>
                            <Option value="FAK">Feel And Kill</Option>
                        </Select>
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Product Category
                        </Typography>
                        <Select size="lg"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }} name="product_category" id="product_category" onChange={(e) => { handleChange(e, "product_category"); handleChange("", "product_name") }}>
                            {categories.map((category, index) => (
                                <Option value={category.id} onClick={() => { setProducts(category.products) }}>{category.name}</Option>
                            ))}
                        </Select>
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Product Name
                        </Typography>
                        <Select size="lg"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }} name="product_name" id="product_name" onChange={(e) => { handleChange(e, "product_name") }}>
                            {products.map((product, index) => (
                                <Option value={product.name}>{product.name}</Option>
                            ))}
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
                            name="order_qty" id="order_qty" onChange={(e) => { handleChange(e, "order_qty") }}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Price
                        </Typography>
                        <Input
                            type="number"
                            size="lg"
                            placeholder="Price"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            name="order_price" id="order_price" onChange={(e) => { handleChange(e, "order_price") }}
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