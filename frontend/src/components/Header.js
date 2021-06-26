import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { FiHeart, FiUser } from 'react-icons/fi';
import { HiOutlineShoppingBag } from 'react-icons/hi';

import { shadow, color } from '../utilities';

export function Header() {
  return (
    <HeadWrapper>
      <Logo>Lux house</Logo>
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
`;

const Logo = styled.h4`
  font-size: 1.6rem;
  font-family: 'playfair_bold';

  text-transform: uppercase;
`;
const ListWrapper = styled.div`
  font-weight: 600;
  ul {
    display: flex;
    margin-right: 1rem;
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
`;

const NavLink = styled(Link)`
  ${ListStyle}
`;

const ActionLink = styled(Link)`
  ${ListStyle}
  border-right:1px solid ${color.grey_300};
  line-height: 5rem;
  padding: 0 2rem;

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
