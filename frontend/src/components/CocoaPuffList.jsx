import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FruityPebbleList from "./FruityPebbleList";

function CocoaPuffList() {
  return (
    <>
      <Row>
        {Array(5).fill(null).map((_, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card style={{ padding: "20px", borderRadius: "20px" }}>
              <Row>
                <Col>
                  Cocoa Puff 1: sim<br />
                  <a href="#">
                    Arquivar
                  </a>
                  <br />
                  Fruity Pebbles:
                </Col>
                <Col>
                  <Button variant="info">
                    Add Fruity Pebble
                  </Button>
                </Col>
              </Row>
              <FruityPebbleList />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default CocoaPuffList;
