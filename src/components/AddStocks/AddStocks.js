import React, { Component } from 'react'
import './AddStock.scss';

import AddstockButtons from './AddStockButtons/AddStockButtons';

export default class AddStocks extends Component {
    newAllStocksHandler =(newStocks) =>{
        this.setState({
            allStocks : newStocks
        })
        console.log("newStocks : "+ newStocks);
    }

    render() {
        return (
            <div className="AddStocks">
                <div className="AddStocksTitle">Add Stocks To My Stocks</div>
                {
                    this.props.error &&
                    <p>{this.props.error}</p>
                }
                {
                    this.props.allStocks && this.props.allStocks.length > 0 && 
                    <AddstockButtons 
                     addStock = {(stock) => {this.props.addStock(stock)}}
                     allStocks = {this.props.allStocks}
                     newAllStocks = {(newAllStocks)=>{console.log(newAllStocks);this.newAllStocksHandler(newAllStocks)}}
                     newMyStocks = {this.props.newMyStocks} />
                }
            </div>
        )
    }
}

