import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Home from "./Home";
import StudentReport from "./StudentReport";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="student-report" element={<StudentReport />} />
            </Routes>
        </Router>
    );
}
