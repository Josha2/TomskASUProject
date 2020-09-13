import React from 'react';
import '../scss/app.scss';
import PersonsTable from '../components/PersonsTable';

function TablePage() {
  return (
    <div className="container">
      <PersonsTable/>
    </div>
  );
};

export default TablePage;
