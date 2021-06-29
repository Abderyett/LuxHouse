import React from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaInstagram, FaPinterest } from 'react-icons/fa';
import { color } from '../utilities';

export function Footer() {
  return (
    <>
      <FooterWrapper>
        <InfoWrapper>
          <CustomerRelation>
            <h4>customer relations</h4>
            <a href="/">Contact us</a>
            <a href="/">return poacy</a>
          </CustomerRelation>
          <Service>
            <h4>customer relations</h4>
            <a href="/">Assembly service</a>
            <a href="/">deavery</a>
          </Service>
          <Products>
            <h4>products</h4>
            <a href="/">All products</a>
            <a href="/">bathrom</a>
          </Products>
        </InfoWrapper>
        {/* Contact */}
        <ContactWrapper>
          <Separtor />
          <Conatcts>
            <h4>contacts</h4>
            <a href="/">1-844-962-1453</a>
            <a href="/">contact@luxhouse.com</a>
          </Conatcts>

          <Social>
            <FaFacebookF />
            <FaInstagram />
            <FaPinterest />

            <p>Social media</p>
          </Social>
        </ContactWrapper>
      </FooterWrapper>
    </>
  );
}

const FooterWrapper = styled.footer`
  display: flex;
  justify-content: space-evenly;

  background: ${color.grey_200};
  h4 {
    font-family: 'avenir_semi';
    margin-bottom: 2rem;
  }
  a {
    text-align: start;
    padding-left: 0;
    display: block;
    text-transform: capitalize;
    color: ${color.grey_600};
    margin-bottom: 1rem;
  }
`;

const CustomerRelation = styled.div``;
const Service = styled.div``;
const Products = styled.div``;
const Conatcts = styled.div`
  padding: 3rem 2rem;
  a {
    text-transform: none;
  }
`;
const Separtor = styled.div`
  width: 2.5rem;
  height: 100%;
  background: ${color.grey_400};
`;
const Social = styled.div`
  color: ${color.grey_600};
  padding: 2rem;
  width: 50%;
  background-color: ${color.white};
  p {
    text-transform: capitalize;
    position: relative;
    top: 5rem;
    left: 3rem;
    transform: rotate(90deg);
  }
  p::after {
    content: '';
    width: 3px;
    color: ${color.grey_400};
    height: 4rem;
    background: red;
    position: absolute;
    transform: rotate(90deg);
  }
`;

const ContactWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 40%;
  background: ${color.grey_200};
`;
const InfoWrapper = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-evenly;
  padding: 3rem;
  background: ${color.grey_200};
`;
