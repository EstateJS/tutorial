import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/navbar"
import LogBookEntries from "./pages/log-book-entries";
import SignLogBook from "./pages/sign-log-book";
import {EstateProvider} from 'estate-react';
import {createEstateClient} from "log-book-service";

const estateClient = createEstateClient();

function App() {
    return (        
        <EstateProvider client={estateClient}>
            <BrowserRouter>
                <div className="container">
                    <Navbar/>
                    <br/>
                    <Routes>
                        <Route index path="/" element={<LogBookEntries/>}/>
                        <Route path="/sign" element={<SignLogBook/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </EstateProvider>
    );
}

export default App;
