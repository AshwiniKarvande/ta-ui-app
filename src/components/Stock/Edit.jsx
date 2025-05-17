import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axiosBaseUrl from '../AxiosConfig';

const Edit = ({ stocks, selectedStock, setStocks, setIsEditing }) => {
  const id = selectedStock.id;

  const [exchange, setExchange] = useState(selectedStock.exchange);
  const [symbol, setSymbol] = useState(selectedStock.symbol);
  const [labels, setLabels] = useState(selectedStock.labels.join(', '));
  const [bhavData, setBhavdata] = useState('');  
  
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
      labels: labels.split(',').map(label => label.trim()),
      bhavData
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

    const tsvBhavdataPlaceholder = 
`Date	Open	High	Low	Close	Volume
06-Mar-2003	136.75	137.4	136.75	137	455
07-Mar-2003	135.5	135.5	134	134.15	2111
13-Mar-2003	131	131.15	131	131.15	45
17-Mar-2003	129.75	129.75	129.75	129.75	30
24-Mar-2003	122	128	122	128	1000
28-Mar-2003	131	131	131	131	10
31-Mar-2003	127.9	127.9	125	125	5000
03-Apr-2003	149	149	148	148	30
04-Apr-2003	131.75	134.5	131.6	131.6	3`

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Update Stock</h1>
        <label htmlFor="exchange">Exchange</label>
        <input
          id="exchange"
          type="text"
          name="exchange"
          value={exchange.toUpperCase()}
          placeholder="e.g. NSE or BSE or NYSE"
          onChange={e => setExchange(e.target.value)}
        />
        <label htmlFor="symbol">Symbol</label>
        <input
          id="symbol"
          type="text"
          name="symbol"
          value={symbol.toUpperCase()}
          placeholder="e.g. RELIANCE or AAPL"
          onChange={e => setSymbol(e.target.value)}
        />
        <label htmlFor="labels">Labels</label>
        <input
          id="labels"
          type="text"
          name="labels"
          value={labels}
          placeholder="Comma separated labels"
          onChange={e => setLabels(e.target.value)}
        />
        <label htmlFor="bhavData">Daily Bhav Data</label>
        <textarea
          id="bhavData"
          type="text"
          name="bhavData"
          value={bhavData}
          rows="10"
          placeholder={tsvBhavdataPlaceholder}
          onChange={e => setBhavdata(e.target.value)}
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
