import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Product} from "./pages/Product";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/product/:id/:chatId"} element={<Product/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
