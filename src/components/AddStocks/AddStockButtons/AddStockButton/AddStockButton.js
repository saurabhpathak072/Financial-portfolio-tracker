import React from 'react'
import './AddStockButton.scss'

const AddStockButton = (props) => {
    console.log("AddStockButton Render");
    console.log("props")
    return (
        <div className="AddStockButton">
            <button className="StockButton" onClick={()=>{props.clicked(props.stock)}}>{props.stock.symbol}</button>
            {props.stock.name}
        </div>
    )
}

export default AddStockButton;
