import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Navbar from "./components/navbar"
import LogBook from "./pages/log-book";
import SignLogBook from "./pages/sign-log-book";

// 1
import {EstateProvider} from 'estate-react';
import {createEstateClient} from "log-book-service";
const estateClient = createEstateClient();

function App() {
    return (        
        // 2
        <EstateProvider client={estateClient}>

            <BrowserRouter>
                <div className="container">
                    <Navbar/>
                    <br/>
                    <Routes>
                        <Route index path="/" element={<LogBook/>}/>
                        <Route path="/sign" element={<SignLogBook/>}/>
                    </Routes>
                </div>
            </BrowserRouter>

        </EstateProvider>
    );
}

export default App;
