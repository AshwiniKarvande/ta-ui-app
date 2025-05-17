import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axiosBaseUrl from '../AxiosConfig';
import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

const Stock = () => {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
        axiosBaseUrl.get("/stocks")
            .then((response) => {
                setStocks(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleEdit = id => {
    const [stock] = stocks.filter(stock => stock.id === id);

    setSelectedStock(stock);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        const [stock] = stocks.filter(stock => stock.id === id);

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${stock.exchange}:${stock.symbol}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const stocksCopy = stocks.filter(stock => stock.id !== id);
        axiosBaseUrl.delete(`/stocks/${id}`)
          .then(response => {
            console.log('Stock deleted successfully:', response.data);
          })
          .catch(error => {
            console.error('Error deleting stock:', error);
          });
        setStocks(stocksCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
          />
          <Table
            stocks={stocks}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          stocks={stocks}
          setStocks={setStocks}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          stocks={stocks}
          selectedStock={selectedStock}
          setStocks={setStocks}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Stock;
