import React from 'react';

const Header = ({ setIsAdding }) => {
  return (
    <header className="bg-light py-3">
      <div class="container-fluid">
        <div class="row">
            <div class="col-md-6 text-left">
                <h2>Stock Management</h2>
            </div>
            <div class="col-md-6 text-right">
                <button class="btn btn-primary" type="button" onClick={() => setIsAdding(true)}>Add Stock</button>
            </div>
        </div>
    </div>
    </header>
  );
};

export default Header;
