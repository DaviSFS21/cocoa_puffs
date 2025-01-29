import {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FruityPebbleList from "./FruityPebbleList";
import FruityPebbleModal from "./FruityPebbleModal";
import Alert from 'react-bootstrap/Alert';
import axiosInstance from "../services/axiosInstance.js";

function CocoaPuffList() {
  const [showModal, setShowModal] = useState(false);
  const [cocoaPuffs, setCocoaPuffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertState, setAlertState] = useState(false);
  const [cocoaPuffID, setCocoaPuffID] = useState(0);

  useEffect(() => {
    axiosInstance.get("/cocoa_puffs")
      .then(response => {
        if(response.status !== 200) {
          throw new Error("Error fetching CocoaPuffs");
        } else {
          setCocoaPuffs(response.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleArchive = (id, data) => {
    if (!id) {
      alert("Create a Cocoa Puff and provide a valid ID.");
      return;
    }

    axiosInstance.patch(`/cocoa_puffs/${id}`, data)
      .then((response) => {
        console.log("CocoaPuff archived:", response.data);

        setCocoaPuffs((prevCocoaPuffs) =>
          prevCocoaPuffs.map((cocoaPuff) =>
            cocoaPuff.id === id ? {...cocoaPuff, archived: true} : cocoaPuff
          )
        );

        setAlertState(true);
        setTimeout(() => {
          setAlertState(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error archiving CocoaPuff:", error);
        alert("Error archiving CocoaPuff");
      });
  };

  if (loading) {
    return <p>Loading Cocoa Puffs...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Alert key="warning" variant="warning" show={alertState}>
        The Cocoa Puff has been archived!
      </Alert>
      {cocoaPuffs.length === 0 ? (
        <p>No Cocoa Puffs were found...</p>
      ) : (
        <Row>
          {cocoaPuffs.filter(cocoaPuff => !cocoaPuff.archived).map((cocoaPuff) => (
            <Col key={cocoaPuff.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
              <Card className="border-info" style={{padding: "20px", borderRadius: "20px"}}>
                <Row>
                  <Col>
                    Cocoa Puff {cocoaPuff.id}: {cocoaPuff.name}<br/>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleArchive(cocoaPuff.id, { archived: true }); }}>
                      Archive
                    </a>
                    <br/>
                    Fruity Pebbles:
                  </Col>
                  <Col>
                    <Button variant="info" onClick={() => {
                      setShowModal(true);
                      setCocoaPuffID(cocoaPuff.id);
                    }}>
                      Add Fruity Pebble
                    </Button>
                  </Col>
                </Row>
                <FruityPebbleList cocoaPuffID={cocoaPuff.id}/>
              </Card>
            </Col>
          ))}
          <FruityPebbleModal show={showModal} handleClose={() => setShowModal(false)} cocoaPuffID={cocoaPuffID}/>
        </Row>
      )}
    </>
  );
}

export default CocoaPuffList;
