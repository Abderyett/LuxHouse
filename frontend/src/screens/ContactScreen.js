/* eslint-disable import/no-unresolved */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ReactMapGL, { Marker } from 'react-map-gl';

import { HiOutlinePhone, HiOutlineMailOpen } from 'react-icons/hi';
import { RiMapPin2Fill } from 'react-icons/ri';
import mapboxgl from 'mapbox-gl'; // This is a dependency of react-map-gl even if you didn't explicitly install it
import { Header, Error } from '../components';
import { color, rounded, shadow } from '../utilities';
import contactImg from '../assets/contact_image.jpg';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

export function ContactScreen() {
  const [viewport, setViewport] = useState({
    latitude: 40.8115504,
    longitude: -73.9464769,
    zoom: 12,
    width: '50vw',
    height: '45vh',
  });
  const [secondViewport, setSecondViewport] = useState({
    latitude: 43.65107,
    longitude: -79.347015,
    zoom: 12,
    width: '50vw',
    height: '45vh',
  });
  const [thirdViewport, setThirdViewport] = useState({
    latitude: 45.516109,
    longitude: -73.643059,
    zoom: 12,
    width: '50vw',
    height: '45vh',
  });
  return (
    <>
      <Header />
      <Container>
        <FormWrapper>
          <ContactImg>
            <h1>
              We <br />
              are here <br />
              to help you !
            </h1>
          </ContactImg>
          <FromContainer>
            <Wrap>
              <Formik
                initialValues={{ email: '', question: '' }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .email('Please enter valide email adress')
                    .required('Please enter your email adrress'),

                  question: Yup.string().required('Please enter text').min(3, 'Must at least 3 characters long.'),
                })}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                  setSubmitting(true);
                  setTimeout(() => {
                    alert(JSON.stringify(values), null, 2);
                    resetForm();
                    setSubmitting(false);
                  }, 1000);
                }}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                  <form autoComplete="off" onSubmit={handleSubmit}>
                    <Heading>You can write to us</Heading>
                    <TextHeading>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos, onsectetur adipisicing elit.
                        Quos,
                      </p>
                    </TextHeading>
                    <InputWrapper>
                      <Input
                        error={touched.email && errors.email}
                        id="email"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder="Your email"
                      />
                      <Error touched={touched.email} message={errors.email} />
                    </InputWrapper>
                    <InputWrapper>
                      <Textarea
                        id="question"
                        rows="5"
                        cols="33"
                        error={touched.question && errors.question}
                        name="question"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="Your question"
                      />
                      <Error touched={touched.question} message={errors.question} />
                    </InputWrapper>

                    <ButtonWrapper>
                      <SubmitBtn type="submit" disabled={isSubmitting}>
                        send
                      </SubmitBtn>
                    </ButtonWrapper>
                  </form>
                )}
              </Formik>
            </Wrap>
          </FromContainer>
          {/* First ShowRoom */}
        </FormWrapper>

        <MapContainer>
          <Location>
            <Adress>
              <h3>Showroom at West Harlem</h3>
              <p>
                <span>
                  <HiOutlinePhone />
                </span>
                &nbsp;+1 365 965 9874
              </p>
              <p>
                <span>
                  <HiOutlineMailOpen />
                </span>
                &nbsp; herlem@luxhouse.com
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus adipisci accusantium assumenda
                debitis velit ipsam iusto error consectetur. Totam, laudantium!
              </p>
            </Adress>
            <Map>
              <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                onViewportChange={(viewport) => setViewport(viewport)}
                scrollZoom={false}
              >
                <Marker latitude={40.8115504} longitude={-73.9464769}>
                  <RiMapPin2Fill />
                </Marker>
              </ReactMapGL>
            </Map>
          </Location>

          {/* Second showroom */}

          <Location>
            <Map>
              <ReactMapGL
                {...secondViewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                onViewportChange={(secondViewport) => setSecondViewport(secondViewport)}
                scrollZoom={false}
              >
                <Marker latitude={43.65107} longitude={-79.347015}>
                  <RiMapPin2Fill />
                </Marker>
              </ReactMapGL>
            </Map>
            <Adress>
              <h3>Showroom at Toronto</h3>
              <p>
                <span>
                  <HiOutlinePhone />
                </span>
                &nbsp;+1 334 645 2354
              </p>
              <p>
                <span>
                  <HiOutlineMailOpen />
                </span>
                &nbsp; toronto@luxhouse.com
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus adipisci accusantium assumenda
                debitis velit ipsam iusto error consectetur. Totam, laudantium!
              </p>
            </Adress>
          </Location>

          {/* Third Shaowroom */}

          <Location>
            <Adress>
              <h3>Showroom at Montreal</h3>
              <p>
                <span>
                  <HiOutlinePhone />
                </span>
                &nbsp;+1 985 124 3587
              </p>
              <p>
                <span>
                  <HiOutlineMailOpen />
                </span>
                &nbsp; montreal@luxhouse.com
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus adipisci accusantium assumenda
                debitis velit ipsam iusto error consectetur. Totam, laudantium!
              </p>
            </Adress>
            <Map>
              <ReactMapGL
                {...thirdViewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                onViewportChange={(thirdViewport) => setThirdViewport(thirdViewport)}
                scrollZoom={false}
              >
                <Marker latitude={45.516109} longitude={-73.643059}>
                  <RiMapPin2Fill />
                </Marker>
              </ReactMapGL>
            </Map>
          </Location>
        </MapContainer>
      </Container>
    </>
  );
}
const Container = styled.div`
  height: 100%;

  background: ${color.grey_050};
  padding-bottom: 10rem;
  margin-left: auto;
  margin-right: auto;

  /* @media (max-width: 1030px) {
    flex-direction: column;
  } */
`;

const FormWrapper = styled.div`
  display: grid;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  align-items: center;

  grid-template-columns: repeat(2, 1fr);
  @media (max-width: 1400px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(2, 50vh);
  }
`;
const MapContainer = styled.div`
  grid-template-columns: repeat(2, 1fr);
`;

const ContactImg = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${contactImg});
  background-size: cover;
  position: relative;
  @media (max-width: 1400px) {
    background-position: right;
  }
  @media (max-width: 768px) {
    background-size: contain;
    background-repeat: no-repeat;
    height: 50vh;
    top: 0;
  }

  h1 {
    text-transform: uppercase;
    font-family: 'avenir_bold';
    color: ${color.white};
    position: absolute;
    bottom: 0;
    padding-left: 3rem;
    padding-bottom: 3rem;
    font-size: 4rem;
    line-height: 4.2rem;
    @media (max-width: 768px) {
      font-size: 2rem;
      top: 40%;
      line-height: 2.5rem;
    }
  }
`;

const FromContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  place-items: center;
  @media (max-width: 1030px) {
    width: 100vw;
    height: 85vh;
  }
`;
const Wrap = styled.div`
  padding: 4rem 2rem;
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Heading = styled.h3`
  font-family: 'avenir_bold';
  line-height: 1rem;
`;
const TextHeading = styled.p`
  color: ${color.grey_700};
  padding-top: 1rem;
  width: 50ch;
`;

const InputWrapper = styled.div``;
const Inputstyle = css`
  border-radius: ${rounded.md};

  width: 30rem;
  max-width: 30rem;
  text-indent: 5%;
  font-size: 1.2rem;
  color: ${color.grey_800};
  font-family: 'avenir_regular';
  box-shadow: ${shadow.lg};
  margin-top: 1rem;
  box-shadow: ${({ error }) => error && `0px 0px 0px 2px ${color.red_vivid_500}`};

  @media (max-width: 768px) {
    width: 90vw;
  }
  outline: none;
  &:focus {
    box-shadow: 0px 0px 0px 2px ${color.grey_400};
  }
`;
const Input = styled.input`
  ${Inputstyle}
  height: 3rem;
`;
const Textarea = styled.textarea`
  ${Inputstyle}
`;

const SubmitBtn = styled.button`
  background: transparent;
  border: 2.5px solid ${color.black};
  border-radius: ${rounded.sm};
  padding: 0.75rem 4rem;
  text-transform: uppercase;
  font-size: 1.2rem;
  font-family: 'avenir_semi';
  cursor: pointer;
  a {
    text-decoration: none;
    color: ${color.black};
  }
  &:hover {
    background: ${color.white};
  }
`;

const ButtonWrapper = styled.div`
  display: grid;
  place-items: center;
`;

const Adress = styled.div`
  padding: 3rem;
  h3 {
    font-family: 'avenir_bold';
  }
  p {
    width: 50ch;
    color: ${color.grey_800};
  }
`;
const Map = styled.div`
  svg {
    font-size: 2rem;
    cursor: pointer;
    color: ${color.blue_grey_600};
  }
`;
const Location = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 1fr);
  @media (max-width: 1400px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    &:nth-child(2) {
      ${Map} {
        order: 1;
      }
    }
  }
`;
