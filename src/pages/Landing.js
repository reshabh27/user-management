import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { customFetch } from "../utils";

const Landing = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customFetch("http://localhost:3000/profiles");
        // console.log(response.data);
        setProfiles(response.data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="mt-4">
      <Row xs={1} md={2} lg={3} className="g-4">
        {profiles.map((profile) => (
          <Col key={profile.id}>
            <Card>
              <Card.Img variant="top" src={profile.userPic} />
              <Card.Body>
                <Card.Title>{profile.fullname}</Card.Title>
                <Card.Text>Email: {profile.email}</Card.Text>
                <Card.Text>Role: {profile.role}</Card.Text>
                <Card.Text>Bio: {profile.bio}</Card.Text>
                {profile.interest.length > 0 && (
                  <>
                    <Card.Text>Interests:</Card.Text>
                    <ul>
                      {profile.interest.map((interest, index) => (
                        <li key={index}>{interest}</li>
                      ))}
                    </ul>
                  </>
                )}
                {/* Render other details as needed */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Landing;
