import React from 'react';
import { Link } from 'react-router-dom';

const Table = ({ stocks, handleEdit, handleDelete }) => {

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Symbol</th>
            <th>Labels</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {stocks.length > 0 ? (
            stocks.map((stock, i) => (
              <tr key={stock.id}>
                <td>{i + 1}</td>
                <td>
                  <Link to={`/symbols/${stock.symbol}?exchange=${stock.exchange}`}>
                    {stock.symbol}
                  </Link>
                </td>
                <td>{stock.labels.join(', ')}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(stock.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(stock.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Stocks</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
