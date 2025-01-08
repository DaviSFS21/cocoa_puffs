import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import PropTypes from 'prop-types';

function FruityPebbleList({ CocoaPuffID }) {
  const [fruityPebbles, setFruityPebbles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (CocoaPuffID) {
      fetch(`http://localhost:3000/api/cocoa_puffs/${CocoaPuffID}/fruity_pebbles`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao buscar Fruity Pebbles");
          }
          return response.json();
        })
        .then((data) => {
          setFruityPebbles(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError(err.message);
          setLoading(false);
        });
    }
  }, [CocoaPuffID]); // Atualiza os dados sempre que CocoaPuffID mudar

  if (loading) {
    return <p>Carregando Fruity Pebbles...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <>
      {fruityPebbles.length === 0 ? (
        <p>No fruity pebbles here...</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {fruityPebbles.map((pebble) => (
              <tr key={pebble.id}>
                <td>{pebble.id}</td>
                <td>{pebble.name}</td>
                <td>{pebble.pebble_count}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

FruityPebbleList.propTypes = {
  CocoaPuffID: PropTypes.number.isRequired,
};

export default FruityPebbleList