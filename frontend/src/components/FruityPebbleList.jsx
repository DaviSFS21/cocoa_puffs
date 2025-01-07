import Table from "react-bootstrap/Table";

function FruityPebbleList() {
  return <Table striped bordered hover>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Pebble count</th>
      </tr>
    </thead>
    <tbody>
      {Array(3).fill(null).map((_,index) => (
        <tr key={index}>
          <th>{index}</th>
          <th>sim</th>
          <th>5</th>
        </tr>
      ))}
    </tbody>
  </Table>;
}

export default FruityPebbleList
