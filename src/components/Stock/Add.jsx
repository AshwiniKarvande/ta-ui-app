import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axiosBaseUrl from '../AxiosConfig';

const Add = ({ stocks, setStocks, setIsAdding }) => {
  const [exchange, setExchange] = useState('');
  const [symbol, setSymbol] = useState('');
  const [labels, setLabels] = useState('');
  const [bhavData, setBhavdata] = useState('');  
  
  const handleAdd = e => {
    e.preventDefault();

    if (!exchange || !symbol) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Stock symbol is required with exchange.',
        showConfirmButton: true,
      });
    }

    const id = Math.max(...stocks.map(it => it.id)) + 1;
    const newStock = {
      id,
      exchange,
      symbol,
      labels: labels.split(',').map(label => label.trim()),
      bhavData,
    };
      
    console.log('New stock:', newStock);
    axiosBaseUrl.post('/stocks', newStock)
      .then(response => {
        console.log('Stock added successfully:', response.data);
      })
      .catch(error => {
        console.error('Error adding stock:', error);
      });
    stocks.push(newStock);
    setStocks(stocks);
    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${exchange}:${symbol}'s data has been added.`,
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
      <form onSubmit={handleAdd}>
        <h1>Add Stock</h1>
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
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
