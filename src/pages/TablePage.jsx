import React, { useState, useEffect } from 'react';
import '../scss/app.scss';
import EmployeeTable from '../components/EmployeeTable';

function TablePage() {
  const [persons, setPersons] = useState([]);
  console.log(persons);

  //получаем данные с фейкового бэка
  useEffect(() => {
    const fetchData = async () => {
      const responce = await fetch("http://localhost:8080/persons");
      const body = await responce.json();
      setPersons(body);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <EmployeeTable persons={persons}/>
    </div>
  );
};

export default TablePage;
