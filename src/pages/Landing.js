import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { customFetch } from "../utils";
import { useGlobalContext } from "../context";

const Landing = () => {
  const [profiles, setProfiles] = useState([]);
  const { state } = useGlobalContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customFetch("http://localhost:3000/profiles");
        setProfiles(response.data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = (profileId) => {
    // Implement the update logic based on the profileId
    console.log(`Update profile with id: ${profileId}`);
  };

  const handleDelete = async (profileId) => {
    try {
      // Implement the delete logic based on the profileId
      await customFetch.delete(`http://localhost:3000/profiles/${profileId}`);
      setProfiles((prevProfiles) =>
        prevProfiles.filter((profile) => profile.id !== profileId)
      );
    } catch (error) {
      console.error(`Error deleting profile with id ${profileId}:`, error);
    }
  };

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

                {/* Render update and delete buttons based on the user's role */}
                {state.loggedUser?.role === "admin" && (
                  <>
                    <Button
                      variant="danger"
                      className="me-2"
                      onClick={() => handleDelete(profile.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleUpdate(profile.id)}
                    >
                      Update
                    </Button>
                  </>
                )}
                {state.loggedUser?.role === "editor" && (
                  <Button
                    variant="primary"
                    onClick={() => handleUpdate(profile.id)}
                  >
                    Update
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Landing;
