import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { FiHeart, FiUser } from 'react-icons/fi';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { Menu } from '../utilities/svg';
import { shadow, color } from '../utilities';

export function Header() {
  return (
    <HeadWrapper>
      <Logo>Lux house</Logo>

      <Wrapper>
        <ListWrapper>
          <ul>
            <NavLink to="home">home</NavLink>
            <NavLink to="blog">stories</NavLink>
            <NavLink to="products">shop</NavLink>
            <NavLink to="contact">contact</NavLink>
          </ul>
        </ListWrapper>
        <ListWrapper>
          <ul>
            <ActionLink to="wichlist">
              <span>
                <FiHeart />
              </span>
              My Wichlist
            </ActionLink>
            <ActionLink to="login">
              &nbsp;
              <span>
                <FiUser />
              </span>
              account
            </ActionLink>
            <ActionLink to="cart">
              <span>
                <HiOutlineShoppingBag />
              </span>
              shoping cart
            </ActionLink>
          </ul>
        </ListWrapper>
      </Wrapper>
      <Menu />
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
  overflow: auto;
  position: relative;
  @media (max-width: 1030px) {
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1030px) {
    flex-direction: column;
    align-items: flex-start;
    position: fixed;
    top: 0;
    right: 0;
    margin-top: 5rem;
    background-color: ${color.white};
    z-index: 99;
    width: 100vw;
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
  font-family: 'avenir_semi';

  @media (max-width: 1030px) {
    border-bottom: 2px solid ${color.grey_400};
    :last-child {
      border: none;
    }
  }

  ul {
    display: flex;
    @media (max-width: 1030px) {
      flex-direction: column;
      padding-left: 0;
      transform: translateX(2rem);
    }
  }
`;
const ListStyle = css`
  text-decoration: none;
  color: inherit;
  padding-right: 3rem;
  font-size: 1.1rem;
  text-transform: capitalize;
  transition: all 0.3s ease-in-out;
  color: ${color.black};
  font-weight: 600;
  &:hover {
    color: rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 1250px) {
    padding-right: 2rem;
    font-size: 1rem;
    width: 100vw;
    &:hover {
      background-color: ${color.sugar_swi};
      color: ${color.black};
    }
  }
`;

const NavLink = styled(Link)`
  ${ListStyle}
  @media (max-width: 1030px) {
    padding-top: 1rem;
    :last-child {
      padding-bottom: 1rem;
    }
  }
`;

const ActionLink = styled(Link)`
  ${ListStyle}
  border-right:1px solid ${color.grey_300};

  padding: 0 1rem;
  @media (max-width: 1030px) {
    border: none;
    padding-top: 1rem;
    :last-child {
      padding-bottom: 1rem;
    }
  }
  :last-child {
    border: none;
    padding-right: 0rem;
  }
  span {
    font-size: 1.4rem;
    vertical-align: sub;
    padding-right: 0.5rem;
    font-weight: 600;
  }
`;
