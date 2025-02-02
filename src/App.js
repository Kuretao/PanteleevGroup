import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {useState} from "react";
import {NewOrderPage} from "./components/pages/NewOrderPage/OrderPage";
import {TableCard} from "./components/pages/TableCard/TableCard";
import {Login, Registration} from "./components/pages/Login/LoginPage";
import {Header} from "./components/Header/Header";
import {MainPage} from "./components/pages/MainPage/MainPage";
import {Category} from "./components/pages/Category/Category";
import {Modal, PostModal} from "./components/Modal/Modal";
import {History} from "./components/pages/History/History";
import {ErrorPage} from "./components/pages/Error/ErrorPage";

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const handleSendEmailClick = () => {
        setIsEmailModalOpen(true);
    };
  return (
    <div className="App">
        <Router>
          <Routes>
              <Route path="/Registration" element={<Registration/>}/>
              <Route path="/" element={<Login/>}/>
              <Route path="/Main" element={
                  <>
                      <Header/>
                      <MainPage/>
              </>}/>
              <Route path="/NewOrder" element={
                  <>
                      <Header/>
                      <NewOrderPage  setIsModalOpen={setIsModalOpen}/>
                  </>}/>
              <Route path="/History" element={
                  <>
                      <Header/>
                      <History  setIsModalOpen={setIsModalOpen}/>
                  </>}/>
              <Route path="/Table" element={
                  <>
                      <Header/>
                      <TableCard handleSendEmailClick={handleSendEmailClick} setIsModalOpen={setIsModalOpen}/>
                  </>}/>
              <Route path="/Category" element={
                  <>
                      <Header/>
                      <Category/>
                  </>}/>
              <Route path="*" element={<>
                  <Header/>
                  <ErrorPage/>
              </>}/>
          </Routes>
        </Router>

        {isModalOpen && <Modal setIsModalOpen={setIsModalOpen}/>}
        {isEmailModalOpen && <PostModal setIsEmailModalOpen={setIsEmailModalOpen}/>}
    </div>
  );
}

export default App;
