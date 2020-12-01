// OrderPane.js
// Engineer: Joseph Ng

import React, { useState } from 'react';

function OrderPane(props) {
    // eslint-disable-next-line
    const [result, setResult] = useState({
        ...props.orderData
    })

    return (
        <div className="order_pane">
            <div className="order_description">
                <div className="row">
                    <div className="order_id">
                        Order Id: {result.order_id}
                    </div>
                    <div className="product_id">
                        Product Id: {result.product_id}
                    </div>
                </div>
                <div className="row">
                    <div className="buyer_id">
                        Buyer Id: {result.buyer_id}
                    </div>
                    <div className="seller_id">
                        Seller Id: {result.seller_id}
                    </div>
                </div>
                <div className="row">
                    <div className="status">
                        Status: {result.status}
                    </div>
                    <div className="seller_id">
                        Update Date: {result.update_date}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderPane;