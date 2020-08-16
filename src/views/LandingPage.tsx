import * as React from "react";
import { useEffect } from "react";
import Navbar from "../components/Layout/NavBar";
import Loading from "../components/Layout/Loading";
import { Container, Image, Row, Col } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

const LandingPage = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  /**
   * Imitates lifecycle method, method only gets called when the value of isAuthenticated changes
   */
  useEffect(
    function () {
      if (!isLoading && isAuthenticated) {
      }
    },
    [isAuthenticated, isLoading]
  );

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  } else {
    return (
      <div>
        <Navbar />
        <Container fluid>
          <div className="m-5 p-5 floating-icon">
            <h1>Welcome to TrackIT</h1>
            <p>
              Interactive real-time solution to remotely delivering event
              content and tracking user progress
            </p>
            <Image
              onClick={loginWithRedirect}
              src="https://www.acmutd.co/brand/Development/Raw_Assets/btn.png"
              fluid
              style={{ width: 150 }}
              className="mb-3"
            />
            <hr />
            <br />
            <h3 className="ml-sm-3 ml-lg-5 mr-sm-3 mr-lg-5">The TrackIT Advantage</h3>
            <Row>
              <Col xs={12} md={6} className="p-sm-3 p-lg-5">
                <h4>For Students</h4>
                <p>
                  Access to high quality curated workshop content from our team
                  of experts. Workshops and events using TrackIT are certified
                  by{" "}
                  <a href="mailto:development@acmutd.co">
                    <strong>ACM Development</strong>
                  </a>{" "}
                  and{" "}
                  <a href="mailto:education@acmutd.co">
                    <strong>ACM Education</strong>
                  </a>{" "}
                  to meet the highest standards of quality. We are invested in
                  your success by filtering the vast quantity of content out
                  there to find the best material. In many situations our expert
                  workshop coordinators design their own custom content to
                  maximize your learning potential.
                </p>
                <hr />
                <p>
                  Access to workshop content <strong>24/7</strong> from
                  anywhere. After the conclusion of the workshop you will have{" "}
                  <strong>permanent access</strong> to the resources created by
                  our expert coordinators forever. Our team prioritizes the
                  importance of having content{" "}
                  <strong>easily accessible</strong> by everyone at all times.
                  Using the same workshop code provided by the coordinator you
                  can always retrieve workshop content at all times.
                </p>
              </Col>
              <Col xs={12} md={6} className="p-sm-3 p-lg-5">
                <h4>For Hosts</h4>
                <p>
                  Use TrackIT to engage with workshop attendees in a more
                  interactive manner. Our platforms supports{" "}
                  <strong>real-time analytics</strong>
                  to help you stay aware of the progress made by students.
                  Whether your event has 10 students or a 1000, our serverless
                  architecture will ensure <strong>smooth tracking</strong> to
                  help you empower the most number of students. We support
                  multiple <strong>visualization tools</strong> to best
                  represent our analytics. If you have a preferred 3rd party
                  tool we also support analytics export.
                </p>
                <hr />
                <p>
                  Our rich UI allows for the{" "}
                  <strong>maximum customizability</strong> when creating
                  workshop content. With a dynamic <i>wysiwyg</i> editor built
                  in, you can build beautiful and high quality custom workshops.
                  Embed images, attach links, format it to match your
                  organization's <strong>brand and style</strong>. Need to save
                  your workshops? We offer <strong>export tools</strong> to help
                  you save your content. Learn more about using TrackIT for your
                  events <a href="/pricing">here</a>
                </p>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
};

export default LandingPage;
