/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { FiHeart, FiUser, FiUsers, FiPackage } from 'react-icons/fi';
import { FaClipboardList } from 'react-icons/fa';
import { RiAdminLine, RiArrowDropRightLine, RiUserReceivedLine } from 'react-icons/ri';
import { HiX } from 'react-icons/hi';

import { useDispatch, useSelector } from 'react-redux';
import { BsCaretDownFill } from 'react-icons/bs';
import { CgProfile, CgLogOut } from 'react-icons/cg';
import { Menu } from '../utilities/svg';
import { shadow, color } from '../utilities';
import { CartIcon } from './CartIcon';
import { CartDropdown } from './CartDropdown';
import { toggleCart, toggleProfileDropdown } from '../actions/cartAction';
import { logOut, getUserDetails } from '../actions/userActions';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const toggleDropdown = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const userDetails = useSelector((state) => state.userDetails);
  const { showDropdown, toggleProfileDropDown } = toggleDropdown;
  const [toggleDropDown, setToggleDropDown] = useState(false);

  const { userInfo } = userLogin;
  const { user } = userDetails;

  useEffect(() => {
    dispatch(getUserDetails('profile'));
  }, [userInfo, dispatch]);

  return (
    <>
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
              <NavLink to="/blog">
                stories
                <span>
                  <RiArrowDropRightLine />
                </span>
              </NavLink>
              <NavLink to="/products">
                shop
                <span>
                  <RiArrowDropRightLine />
                </span>
              </NavLink>
              <NavLink to="/contact">
                contact
                <span>
                  <RiArrowDropRightLine />
                </span>
              </NavLink>
            </ul>
          </ListWrapper>
          <ListWrapper onClick={() => setIsOpen(false)}>
            <ul>
              {!user.isAdmin && (
                <ActionLink to="/wichlist">
                  <span>
                    <FiHeart />
                    My Wichlist
                  </span>

                  <Arrow second="second">
                    <RiArrowDropRightLine />
                  </Arrow>
                </ActionLink>
              )}
              <Account onClick={() => dispatch(toggleProfileDropdown())}>
                <span>
                  <FiUser />
                  {user && user.name ? user.name : 'Account'}
                </span>

                <StyledArrowDropdown />
                <Arrow />
                {toggleProfileDropDown && (
                  <ProfileDropdown>
                    {userInfo ? (
                      <>
                        <ProfileLink to="/profile">
                          {' '}
                          <span>
                            <CgProfile />
                          </span>
                          Profile
                        </ProfileLink>
                        <button type="button" onClick={() => dispatch(logOut())}>
                          <span>
                            <CgLogOut />
                          </span>
                          Logout
                        </button>
                      </>
                    ) : (
                      <ProfileLink to="/login">
                        {' '}
                        <span>
                          <RiUserReceivedLine />
                        </span>
                        Login
                      </ProfileLink>
                    )}
                  </ProfileDropdown>
                )}
              </Account>
              {user.isAdmin && (
                <Account onClick={() => setToggleDropDown(!toggleDropDown)}>
                  <span>
                    <RiAdminLine />
                    {user && user.isAdmin && 'Admin'}
                  </span>

                  <StyledArrowDropdown />
                  <Arrow />
                  {toggleDropDown && (
                    <ProfileDropdown>
                      {user && user.isAdmin && (
                        <>
                          <UsersLink to="/admin/userslist">
                            {' '}
                            <span>
                              <FiUsers />
                            </span>
                            Users
                          </UsersLink>
                          <ProductsLink to="/admin/products">
                            <span>
                              <FiPackage />
                            </span>
                            Products
                          </ProductsLink>
                          <OrdersLink to="/admin/orders">
                            <span>
                              <FaClipboardList />
                            </span>
                            orders
                          </OrdersLink>
                        </>
                      )}
                    </ProfileDropdown>
                  )}
                </Account>
              )}
              {!user.isAdmin && (
                <ShoppingCart onClick={() => dispatch(toggleCart())}>
                  <CartIcon />
                  <span>shoping cart</span>
                  <Arrow>
                    <RiArrowDropRightLine />
                  </Arrow>
                </ShoppingCart>
              )}
            </ul>
          </ListWrapper>
        </Wrapper>
        <Button type="button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX /> : <Menu />}
        </Button>
      </HeadWrapper>
      {showDropdown && <CartDropdown />}
    </>
  );
}

const HeadWrapper = styled.header`
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  box-shadow: ${shadow.md};
  max-width: 2880px;
  background-color: ${color.white};
  z-index: 9;
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
  z-index: 9;

  @media (max-width: 1030px) {
    flex-direction: column;
    align-items: flex-start;
    position: fixed;
    top: 0;
    left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    margin-top: 4.5rem;
    background-color: ${color.white};
    z-index: 9;
    width: 50vw;
    box-shadow: ${shadow.lg};
    opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
    transition: all 0.3s ease-in-out;
    overflow: hidden;
  }
  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const Logo = styled.h4`
  font-size: 1.6rem;
  font-family: 'playfair_bold';
  text-transform: uppercase;
  margin-bottom: 0;
  @media (max-width: 1289px) {
    font-size: 1.3rem;
  }
`;
const ListWrapper = styled.div`
  font-weight: 600;
  font-family: 'avenir_regular';

  span {
    font-size: 1rem;
  }
  @media (max-width: 1111px) {
    ul {
      padding-left: 0;
    }
  }

  ul {
    display: flex;

    @media (max-width: 1030px) {
      flex-direction: column;
      padding-left: 0;
    }
  }
`;

const ProfileDropdown = styled.div`
  width: 9rem;
  height: auto;
  background-color: ${color.white};
  padding: 1rem;
  position: fixed;
  top: 4.5rem;
  box-shadow: ${shadow.xxl};
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &:hover {
    color: ${color.grey_800};
  }

  button {
    cursor: pointer;
    color: ${color.black};
    background-color: transparent;
    font-size: 1rem;
    margin-top: 1rem;
    padding-left: 0;
    span {
      svg {
        vertical-align: middle;
      }
    }
    &:hover {
      color: ${color.grey_600};
    }
  }
`;

const StyledArrowDropdown = styled(BsCaretDownFill)`
  font-size: 1.5rem;
  padding: 0;
  margin-left: 1rem;
  opacity: 1;
`;

const StyledLinks = css`
  cursor: pointer;
  color: ${color.black};

  &:hover {
    color: ${color.grey_600};
  }
`;

const ProfileLink = styled(Link)`
  ${StyledLinks}
`;

const ListStyle = css`
  text-decoration: none;
  color: inherit;
  padding-right: 3rem;
  font-size: 1rem;
  text-transform: capitalize;
  transition: all 0.6s ease-in-out;
  color: ${color.black};
  font-weight: 600;
  display: flex;
  align-items: center;
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
  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const NavLink = styled(Link)`
  ${ListStyle}
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
    &:hover {
      span {
        opacity: 1;
        transition: all 0.6s ease-in-out;
      }
      vertical-align: middle;
    }
  }
`;
const Arrow = styled.span`
  opacity: 0;
  font-size: 1.5rem;
`;
const ShoppingCart = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;

  ${ListStyle};
`;

const ActionLink = styled(Link)`
  ${ListStyle}
  border-right:0.5px solid ${color.grey_300};

  padding: 0 0.75rem;

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
    font-size: 1.6rem;

    padding-right: 0.5rem;
    font-weight: 600;
    vertical-align: bottom;
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

const Account = styled.div`
  ${ListStyle}
  border-right:0.5px solid ${color.grey_300};
  cursor: pointer;
  padding: 0 0.75rem;

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
      ${StyledArrowDropdown} {
        opacity: 1;
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
    font-size: 1.6rem;

    padding-right: 0.5rem;
    font-weight: 600;
    vertical-align: bottom;
  }
`;

const UsersLink = styled(Link)`
  ${StyledLinks}
`;
const ProductsLink = styled(Link)`
  ${StyledLinks}
  padding-top:0.5rem
`;
const OrdersLink = styled(Link)`
  ${StyledLinks}
  padding-top:0.5rem
`;
