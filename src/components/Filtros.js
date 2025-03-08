import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './Filtros.css';

const Filtros = ({ filters, handleFilterChange }) => {
  return (
    <div className="filter-container">
      <Form className="d-flex flex-wrap align-items-center gap-3">
        <Form.Control type="text" name="location" placeholder="Ubicación" value={filters.location} onChange={handleFilterChange} />
        <Form.Select name="type" value={filters.type} onChange={handleFilterChange}>
          <option value="">Tipo</option>
          <option value="Nuevo listado">Nuevo listado</option>
          <option value="Desarrollo">Desarrollo</option>
        </Form.Select>
        <Form.Control type="number" name="priceMin" placeholder="Precio Mín" value={filters.priceMin} onChange={handleFilterChange} />
        <Form.Control type="number" name="priceMax" placeholder="Precio Máx" value={filters.priceMax} onChange={handleFilterChange} />
        <Button variant="primary">Más Filtros</Button>
      </Form>
    </div>
  );
};

export default Filtros;
