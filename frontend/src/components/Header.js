import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { FiHeart, FiUser } from 'react-icons/fi';
import { HiOutlineShoppingBag, HiX } from 'react-icons/hi';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { Menu } from '../utilities/svg';
import { shadow, color } from '../utilities';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <HeadWrapper>
      <Logo>Lux house</Logo>

      <Wrapper isOpen={isOpen}>
        <ListWrapper onClick={() => setIsOpen(false)}>
          <ul>
            <NavLink to="/">
              home
              <span>
                <RiArrowDropRightLine />
              </span>
            </NavLink>
            <NavLink to="blog">
              stories
              <span>
                <RiArrowDropRightLine />
              </span>
            </NavLink>
            <NavLink to="products">
              shop
              <span>
                <RiArrowDropRightLine />
              </span>
            </NavLink>
            <NavLink to="contact">
              contact
              <span>
                <RiArrowDropRightLine />
              </span>
            </NavLink>
          </ul>
        </ListWrapper>
        <ListWrapper onClick={() => setIsOpen(false)}>
          <ul>
            <ActionLink to="wichlist">
              <span>
                <FiHeart />
                My Wichlist
              </span>

              <Arrow second="second">
                <RiArrowDropRightLine />
              </Arrow>
            </ActionLink>
            <ActionLink to="login">
              <span>
                <FiUser />
                account
              </span>
              <Arrow>
                <RiArrowDropRightLine />
              </Arrow>
            </ActionLink>
            <ActionLink to="cart">
              <span>
                <HiOutlineShoppingBag />
                shoping cart
              </span>
              <Arrow>
                <RiArrowDropRightLine />
              </Arrow>
            </ActionLink>
          </ul>
        </ListWrapper>
      </Wrapper>
      <Button type="button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <HiX /> : <Menu />}
      </Button>
    </HeadWrapper>
  );
}

const HeadWrapper = styled.header`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  box-shadow: ${shadow.md};
  background-color: ${color.white};
  z-index: 9999;
  overflow: auto;
  position: relative;
  position: sticky;
  top: 0;
  left: 0;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 999;

  @media (max-width: 1030px) {
    flex-direction: column;
    align-items: flex-start;
    position: fixed;
    top: 0;
    left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    margin-top: 5rem;
    background-color: ${color.white};
    z-index: 99;
    width: 50vw;
    box-shadow: ${shadow.lg};
    opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
    transition: all 0.3s ease-in-out;
    overflow: hidden;
  }
`;

const Logo = styled.h4`
  font-size: 1.6rem;
  font-family: 'playfair_bold';
  text-transform: uppercase;
  margin-bottom: 0;
  @media (max-width: 1200px) {
    font-size: 1.3rem;
  }
`;
const ListWrapper = styled.div`
  font-weight: 600;
  font-family: 'avenir_regular';

  span {
    font-size: 1rem;
  }
  @media (max-width: 1030px) {
  }

  ul {
    display: flex;

    @media (max-width: 1030px) {
      flex-direction: column;
      padding-left: 0;
    }
  }
`;
const ListStyle = css`
  text-decoration: none;
  color: inherit;
  padding-right: 3rem;
  font-size: 1.1rem;
  text-transform: capitalize;
  transition: all 0.6s ease-in-out;
  color: ${color.black};
  font-weight: 600;
  &:hover {
    color: rgba(0, 0, 0, 0.5);
  }
  @media (max-width: 1250px) {
    padding-right: 1rem;
    font-size: 1rem;
  }
  @media (max-width: 1030px) {
    padding: 1rem;
    width: 50vw;
    border: 0.5px solid ${color.grey_300};

    &:hover {
      background-color: ${color.sugar_swi};
      color: ${color.black};
    }
  }
`;

const NavLink = styled(Link)`
  ${ListStyle}

  &:hover {
    span {
      opacity: 1;
      transition: all 0.6s ease-in-out;
    }
    vertical-align: middle;
  }
  span {
    opacity: 0;
    font-size: 1.5rem;
  }
  @media (max-width: 1030px) {
    padding-top: 1rem;
    padding-left: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    :last-child {
      padding-bottom: 1rem;
    }
  }
`;
const Arrow = styled.span`
  opacity: 0;
  font-size: 1.5rem;
`;

const ActionLink = styled(Link)`
  ${ListStyle}
  border-right:0.5px solid ${color.grey_300};

  padding: 0 1rem;
  @media (max-width: 1030px) {
    border: none;
    padding-top: 1rem;
    padding-left: 1rem;
    border: 0.5px solid ${color.grey_300};
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:hover {
      ${Arrow} {
        opacity: 1;
        transition: all 0.6s ease-in-out;
      }
    }
    ${Arrow} {
      svg {
        font-size: 2rem;
      }
    }

    :last-child {
      padding-bottom: 1rem;
    }
  }
  :last-child {
    border: none;
    padding-right: 1rem;
  }
  svg {
    font-size: 1.5rem;
    vertical-align: sub;
    padding-right: 0.5rem;
    font-weight: 600;
  }
`;

const Button = styled.button`
  background-color: transparent;
  cursor: pointer;
  display: none;

  svg {
    font-size: 2rem;
  }
  @media (max-width: 1030px) {
    display: block;
  }
`;
