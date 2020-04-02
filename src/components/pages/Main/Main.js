import React,{ Component } from 'react';
import './Main.scss';

import Navbar from './../../Navbar/Navbar';
import MyStocks from './../../MyStocks/MyStocks';
import AddStocks from './../../AddStocks/AddStocks';
//import HorizantalLine from './../../common/HorizontalLine/HorizontalLine';
//import Modal from './../../common/modal/modal';

import Axios from 'axios';

 class Main extends Component {
    constructor(props){
        super(props);
        this.NoOfShares = React.createRef();
        this.BuyingPrice = React.createRef();
        this.BuyingDate = React.createRef();
    }

    state = {
        myStocks: {},
        allStocks: {},
        showModal: false,
        selectedStock: {},
        dateError:false,
        dateErrorMsg: null,
        formComplete: false,
        formIncompleteError: false
    }

    componentDidMount(){
        Axios.get('https://finanial-portfolio.firebaseio.com/allStocks.json')
            .then(response => {
                let allStocks = response.data;
                Axios.get('https://finanial-portfolio.firebaseio.com/myStocks.json')
                    .then(response => {
                        this.setState({
                            MyStocks: response.data,
                            allStocks: allStocks
                        })
                    })
            })
            .catch(error => {console.error(); });
    }

    addStockHandler = (stock) => {
        let selectedStock = {};
        selectedStock.symbol = stock.symbol;
        selectedStock.name = stock.name;

        this.setState({
            showModal:true,
            selectedStock: selectedStock
        })
    }

    modalCloseHandler = () =>{this.setState({showModal: false})};

    addStockToDBHandler = () => {
        if(this.BuyingPrice.current.value.length === 0 && this.BuyingDate.current.length === 0 && this.NoOfShares === 0){
            this.setState({
                formComplete:false,
                formIncompleteError: true
            })
        } else {
            let selectedStock = {...this.state.seletetStock};
            selectedStock.closingPrice = this.BuyingPrice.current.value;
            selectedStock.date = this.BuyingPrice.current.value;
            selectedStock.numberOfShares = this.NoOfShares.current.value;

            Axios.post('https://finanial-portfolio.firebaseio.com/myStocks.json',selectedStock)
                .then(response => {
                    let allStocks = {...this.state.selectedStock};
                    let newAllStocks =[];
                    for (let value in allStocks){
                        console.log('allstocks loop');
                        console.log(allStocks[value]);
                        if(allStocks[value].symbol !== this.state.selectedStock.symbol){
                            newAllStocks.push(allStocks[value]);
                        }
                    }

                    let newMyStocks = {};
                    
                    Axios.get('https://finanial-portfolio.firebaseio.com/myStocks.json')
                        .then(response =>{
                            newMyStocks = response.data;
                            Axios.put('https://finanial-portfolio.firebaseio.com/allStocks.json', newAllStocks)
                                .then(response => {
                                    this.setState({
                                        selectedStock: {},
                                        showModal: false,
                                        allStocks: newAllStocks,
                                        myStocks: newMyStocks
                                    })
                                }).catch(error => {console.log(error)});
                        }).catch(error =>{console.log(error)});

                }).catch(error => {console.log(error)});

        }
        
    }

    /*
















    */

    stopTrackingHandler = (symbol) =>{
        let myStocks = this.state.myStocks;
        let newMyStocks = {};
        let newAllStocksValue = {};
        for(let stock in myStocks){
            if(myStocks[stock] !== symbol){
                newMyStocks[stock] = (myStocks[stock]);
            }else {
                newAllStocksValue.name = myStocks[stock].name;
                newAllStocksValue.symbol = myStocks[stock].symbol;
            }
        }
        let newAllStocks = this.state.allStocks;
        newAllStocks.push(newAllStocksValue);
        Axios.put('https://finanial-portfolio.firebaseio.com/myStocks.json', newMyStocks)
            .then(response => {
                Axios.put('https://finanial-portfolio.firebaseio.com/allStocks.json',newAllStocks)
                    .then(response => response)
                    .catch(error => {console.log(error)})
            }).catch(error => {console.log(error)})
            this.setState({
                allStocks: newAllStocks,
                myStocks: newMyStocks
            })
    }

    render() {
        let today= new Date();
        let modalContent = this.state.showModal ? 
        (
            <React.Fragment>
                {this.state.formIncompleteError ? <p>Kindly complete the form before adding this for tr</p> : false}
                <div className="AddStockForm">
                    <div className="FormRow"><span className="label">Company : </span><span>{this.state.selectedStock}</span></div>
                    <div className="FormRow"><span className="label">No. of Shares :</span><input id="nooshares"></input></div>
                    <div className="FormRow"><span className="label">Buy Price : </span><input id="buyprice"></input></div>
                    <div className="FormRow"><span className="label">Buy Date : </span>{this.state.dateError ? this.state.date:null}</div>
                </div>
            <button className="AddButton" disabled={this.state.formComplete} onClick={this.addStockToDBHandler}/>
            </React.Fragment>
        )
        : null;

        let weekendWarning = (
            today.getDay() === 0 || today.getDay() === 7 ?
            <p>*Sicne today is a weekend, the current Price refers to last updated working day price.</p> :
            null
        )
        return (
            <div>
                {/* {
                    this.state.showModal ?
                    <Modal
                        title={`Add ${this.state.selectedStock.name} to My Stocks`}
                        content={modelContent}
                        close={this.modalCloseHandler}/> :
                        null
                } */}
                {weekendWarning}
                <Navbar title="Financial Portfolio Tracker" />
                <MyStocks myStocks={this.state.myStocks} stopTracking={this.stopTrackingHandler} />
                {/* <HorizontalLine /> */}
                {
                    Object.keys(this.state.myStocks).length < 5 ?
                    <AddStocks allStocks={this.state.allStocks} addStock={this.addStockHandler} /> :
                    <AddStocks error={'you can add only 5 stocks for tracking!'} />
                }



            </div>
        )
    }
}

export default Main
