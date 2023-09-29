import { useEffect, useState } from 'react'
import '../App.css'
import axios from "axios";
// import { MDBIcon} from 'mdbreact';


const TableData = () => {
    const [exchangeCoin, setExechangeCoin] = useState([])
    const [query, setQuery] = useState(null)
    const [results, setResults] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);


    const fetchapiData = async () => {
        const response = await axios.get('/api/get_exechangecryptolist');
        console.log("response", response)
        let filterData = await response.data.data
        console.log("filterData", filterData)
        setExechangeCoin(filterData)

    }


    //  //pagination functionality
    const recordPerPage = 20;
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const records = exchangeCoin.slice(firstIndex, lastIndex);
    const nPage = Math.ceil(exchangeCoin.length / recordPerPage);
    const numbers = [...Array(nPage + 1).keys()].slice(1)
    console.log("numbers", numbers)


    //search feature
    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setQuery(searchTerm);

        const filteredResults = records.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResults(filteredResults);
    };


    //pagination
    const previousPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const changeCurPage = (id) => {
        setCurrentPage(id)
    }

    const nextPage = () => {
        if (currentPage !== 10) {
            setCurrentPage(currentPage + 1)
        }
    }

    const exportData = async () => {
        const response = await axios.post('/api/create_cryptoexchange');
        console.log("response", response)
        let filterData = await response.data.data
        console.log("filterData", filterData)
        setExechangeCoin(filterData)
    }


    useEffect(() => {
        fetchapiData()
    }, [])


    return (
        <>
            <h1>Top Crypto Exchanges</h1>
            <p1> Compare all 190 top crypto exchanges. The list is ranked by trading valume</p1>
            <div className="container">

                {/* search features */}
                <div style={{ paddingTop: "25px", textAlign: "center", height: "80px" }}>
                    <input
                        type="text" style={{ width: "500px", borderRadius: "40px", height: "35px" }}
                        placeholder="Search..."

                        onChange={handleSearch}
                    />
                    {/* <MDBIcon icon="lightbulb" size="4x"/> */}
                </div>

                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#Id</th>
                            <th scope="col">Exchange_Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Volume_1hrs_usd</th>
                            <th scope="col">Volume_1day_usd</th>
                            <th scope="col">Volume_1mth_usd</th>
                            <th scope="col">data_trade_start</th>
                            <th scope="col">data_trade_end</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            results ? results.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.exchange_id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.volume_1hrs_usd}</td>
                                        <td>{item.volume_1day_usd}</td>
                                        <td>{item.volume_1mth_usd}</td>
                                        <td>{item.data_trade_start}</td>
                                        <td>{item.data_trade_end}</td>
                                    </tr>
                                )
                            }) :
                                records.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.exchange_id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.volume_1hrs_usd}</td>
                                            <td>{item.volume_1day_usd}</td>
                                            <td>{item.volume_1mth_usd}</td>
                                            <td>{item.data_trade_start}</td>
                                            <td>{item.data_trade_end}</td>
                                        </tr>
                                    )
                                })
                        }
                    </tbody>
                </table>

                <button className="btn btn-info" onClick={exportData}>Export Data</button>
                {/* <div className="pagination">
                    <Pagination items={exchangeCoin} buttonShow={"setShowButton"} itemEventId={"setItemId"} />
                </div> */}

                <nav>
                    <ul className="pagination">
                        <li className="page-item" >
                            <a href="#" className="page-link" onClick={previousPage} style={{ borderRadius: "40px" }}> ← Previous </a>
                        </li>
                        {
                            numbers.map((n, i) => (
                                <li className={
                                    `pagination-item${currentPage === n ? 'active' : ""}`} style={{ padding: "10px" }} key={i}>
                                    <a href="#" className="page-item" onClick={() => changeCurPage(n)}> {n} </a>
                                </li>
                            ))
                        }
                        <li className="page-item" >
                            <a href="#" className="page-link" onClick={nextPage} style={{ borderRadius: "40px" }}> Next → </a>
                        </li>
                    </ul>
                </nav>
            </div>

        </>
    );
}

export default TableData;