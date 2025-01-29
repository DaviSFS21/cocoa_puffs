import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import PropTypes from 'prop-types';
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
})

function FruityPebbleList({ cocoaPuffID }) {
  const [fruityPebbles, setFruityPebbles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cocoaPuffID) {
      axiosInstance.get(`/cocoa_puffs/${cocoaPuffID}/fruity_pebbles`)
        .then(response => {
          if(response.status !== 200) {
            throw new Error("Error fetching CocoaPuffs");
          } else {
            setFruityPebbles(response.data);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error(err);
          setError(err.message);
          setLoading(false);
        });
    }
  }, [cocoaPuffID]);

  if (loading) {
    return <p>Loading Fruity Pebbles...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
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
              <th>Name</th>
              <th>Pebble Count</th>
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
  cocoaPuffID: PropTypes.number.isRequired,
};

export default FruityPebbleList