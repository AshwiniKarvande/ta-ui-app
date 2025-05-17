import React from 'react';

const Header = ({ setIsAdding }) => {
  return (
    <header className="bg-light py-3">
      <div className="container-fluid">
        <div className="row">
            <div className="col-md-6 text-left">
                <h2>Stock Management</h2>
            </div>
            <div className="col-md-6 text-right">
                <button className="btn btn-primary" type="button" onClick={() => setIsAdding(true)}>Add Stock</button>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
