import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import ShoppingCartProvider from "../context/CartProvider";
import ShoppingCart from "../pages/cart/ShoppingCart";
import ListProducts from "../pages/listProducts";
import { Render } from "../pages/render/render";
import SearchApi from "../pages/searchApi/searchApi";
import Snap from "../pages/snap/snap";
import SnapProvider from "../context/SnapProvider";

const RoutesConfig = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/render" element={<Render />} />
                <Route path="/login" element={<Login />} />
                <Route path="/searchApi" element={<SearchApi />} />
                <Route path="/cart" element={
                    <ShoppingCartProvider>
                        <ShoppingCart />
                    </ShoppingCartProvider>
                } />
                <Route path="/products" element={
                    <ShoppingCartProvider>
                        <ListProducts />
                    </ShoppingCartProvider>
                } />
                <Route path="/snap" element={
                    <SnapProvider>
                        <Snap />
                    </SnapProvider>
                } />
            </Routes>
        </BrowserRouter>
    );
};

export default RoutesConfig;