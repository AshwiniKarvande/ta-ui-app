import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axiosBaseUrl from '../AxiosConfig';

const Edit = ({ stocks, selectedStock, setStocks, setIsEditing }) => {
  const id = selectedStock.id;

  const [exchange, setExchange] = useState(selectedStock.exchange);
  const [symbol, setSymbol] = useState(selectedStock.symbol);
  const [labels, setLabels] = useState(selectedStock.labels.join(', '));
  
  const handleUpdate = e => {
    e.preventDefault();

    if (!exchange || !symbol) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const stock = {
      id,
      exchange,
      symbol,
      labels: labels.split(',').map(label => label.trim())
    };

    for (let i = 0; i < stocks.length; i++) {
      if (stocks[i].id === id) {
        stocks.splice(i, 1, stock);
        break;
      }
    }

    axiosBaseUrl.put(`/stocks/${id}`, stock)
      .then(response => {
        console.log('Stock updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating stock:', error);
      });
    setStocks(stocks);
    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${stock.exchange}:${stock.symbol}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Employee</h1>
        <label htmlFor="exchange">Exchange</label>
        <input
          id="exchange"
          type="text"
          name="exchange"
          value={exchange}
          onChange={e => setExchange(e.target.value)}
        />
        <label htmlFor="symbol">Symbol</label>
        <input
          id="symbol"
          type="text"
          name="symbol"
          value={symbol}
          onChange={e => setSymbol(e.target.value)}
        />
        <label htmlFor="labels">Labels</label>
        <input
          id="labels"
          type="text"
          name="labels"
          value={labels}
          onChange={e => setLabels(e.target.value)}
        />
        
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
