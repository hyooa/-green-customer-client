import './App.css';
import CustomerList from './conponents/CustomerList';
import DetailCustomer from './conponents/DetailCustomer';
import Footer from './conponents/Footer';
import Header from './conponents/Header';
import { Route, Routes } from 'react-router-dom';
import CreateCustomer from './conponents/CreateCustomer';
import EditCustomer from './conponents/EditCustomer';
import CustomerContainer from './conponents/CustomerContainer';
import CreateCustomerContainer from './conponents/CreateCustomerContainer';

const customers =[
  {
    no : 1,
    name : "곰인형",
    phone : "010-0000-0000",
    birth : "20001212",
    gender : "여성",
    add : "울산 남구"
  },
  {
    no : 2,
    name : "호랑이",
    phone : "010-0000-0000",
    birth : "19990101",
    gender : "남성",
    add : "울산 동구"
  },
  {
    no : 3,
    name : "돌고래",
    phone : "010-0000-0000",
    birth : "20080312",
    gender : "여성",
    add : "울산 울주군"
  }
]

function App() {
  return (
    <div className="App">
      <Header></Header>

      <Routes>
        <Route path="/" element={<CustomerContainer />} />
        <Route path="/writer" element={<CreateCustomerContainer />} />
        {/* <Route path="/" element={<CustomerList customers={customers} />} /> */}
        {/* <Route path="/writer" element={<CreateCustomer />} /> */}
        <Route path="/customer/:no" element={<DetailCustomer />} />
        <Route path="/editCustomer/:no" element={<EditCustomer />} />
      </Routes>

      <Footer></Footer>
    </div>
  );
}

export default App;
