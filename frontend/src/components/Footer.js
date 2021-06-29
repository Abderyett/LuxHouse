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
            <a href="mailto:contact@luxhouse.com">contact@luxhouse.com</a>
          </Conatcts>

          <Social>
            <SocialWrapper>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer">
                <FaPinterest />
              </a>
            </SocialWrapper>
            <div>
              <p>Social media</p>
            </div>
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
    transition: all 0.3s ease-in-out;
    &:hover {
      color: ${color.grey_700};
    }
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
  display: flex;
  padding: 2rem;
  width: 50%;
  background-color: ${color.white};
  p {
    text-transform: capitalize;
    position: relative;
    top: 2rem;
    left: 3rem;
    transform: rotate(90deg);
  }
  p::after {
    content: '';
    width: 3px;
    color: ${color.grey_400};
    height: 4rem;
    background: ${color.grey_400};
    transform: rotate(90deg);
    position: absolute;
    left: 8rem;
    top: -1.2rem;
  }
`;

const ContactWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 35%;
  background: ${color.grey_200};
`;
const InfoWrapper = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-evenly;
  padding: 3rem 3rem 1rem 3rem;
  background: ${color.grey_200};
`;

const SocialWrapper = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  font-size: 1.7rem;
`;
