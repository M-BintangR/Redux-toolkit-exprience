import { BrowserRouter, Routes, Route } from "react-router-dom"
import Counter from "../view/Counter"
import Home from "../view/Home"
import Posts from "../view/Posts"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/latihan1" element={<Counter />} />
                <Route path="/latihan2" element={<Posts />} />
            </Routes>
        </BrowserRouter>

    )
}

export default Router