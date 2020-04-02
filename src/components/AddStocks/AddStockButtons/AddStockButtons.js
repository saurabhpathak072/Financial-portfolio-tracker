import React, { Component } from 'react';
import './AddStockButtons.scss';

import AddStockButton from './AddStockButton/AddStockButton';

export default class AddStockButtons extends Component {
    state = {
        allStocksData : {}
    }

    render() {
        let buttons = this.props.allStocks.map(stock => {
            return stock ? <AddStockButton key={stock.symbol} stock={stock} clicked={(stock)=>this.props.addStock(stock)} />: null
        })

        return (
            <div className="AddStockButtons">
                {buttons}
            </div>
        )
    }
}
