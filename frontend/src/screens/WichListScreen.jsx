import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';
import { color, shadow, rounded } from '../utilities';
import { Header } from '../components';
import { formatter } from '../helper/CurrencyFormat';
import { removeFromWichlist, emptyWichList } from '../actions/wichlistAction';

export function WichListScreen() {
  const wichlist = useSelector((state) => state.wichlist);
  const dispatch = useDispatch();
  const { items } = wichlist;
  return (
    <>
      <Header />
      <Container>
        <Heading>My Wichlist</Heading>

        {items.length > 0 && (
          <ClearBtn type="button" onClick={() => dispatch(emptyWichList())}>
            Clear All
          </ClearBtn>
        )}
        <WrapperList>
          {items && items.length > 0 ? (
            items.map((el) => (
              <Card key={el.id}>
                <ImgWrapper>
                  <Img src={el.image[0].url} alt={el.name} />
                  <Name>
                    <div>
                      {el.name} {el.subcategory}
                    </div>
                    <div>{formatter.format(el.price)}</div>
                  </Name>
                  <Description>{`${el.description.substring(0, 150)} ...`}</Description>
                </ImgWrapper>
                <RemoveBtn type="button" onClick={() => dispatch(removeFromWichlist(el.id))}>
                  <FaTrashAlt />
                </RemoveBtn>
              </Card>
            ))
          ) : (
            <Text>You haven't add any items to your wichlist</Text>
          )}
        </WrapperList>
      </Container>
    </>
  );
}

const Container = styled.div`
  padding-top: 2rem;
  padding-left: 2rem;
  margin-bottom: 5rem;
  position: relative;
`;

const Heading = styled.h3`
  font-family: 'avenir_semi';
  margin-bottom: 3rem;
`;

const WrapperList = styled.div`
  border: 1px solid ${color.grey_400};
  border-radius: ${rounded.sm};
  box-shadow: ${shadow.md};
  width: 70%;

  padding: 2rem;
  @media (max-width: 1030px) {
    width: 95%;
    padding: 1rem;
  }
`;

const Card = styled.div`
  /* display: flex; */

  align-items: center;
  border-bottom: 1px solid ${color.grey_500};
  margin-top: 2rem;
  position: relative;
`;
const Img = styled.img`
  width: 10rem;
  border: 1px solid ${color.grey_300};
  margin-bottom: 1rem;
  @media (max-width: 1030px) {
    width: 7rem;
  }
`;
const Name = styled.div`
  font-weight: bold;
  display: flex;
  width: 60%;
  justify-content: space-between;
  margin-bottom: 1rem;
  margin-left: 2rem;
`;

const ImgWrapper = styled.div`
  display: flex;
  position: relative;
`;

const Description = styled.div`
  width: 60%;
  margin-bottom: 1rem;
  position: absolute;
  top: 4rem;
  left: 12rem;
  @media (max-width: 1030px) {
    top: 2rem;
    left: 9rem;
  }
`;
const Text = styled.p``;

const RemoveBtn = styled.button`
  color: ${color.red_vivid_400};
  font-size: 1.5rem;

  position: absolute;
  background: transparent;
  top: 3rem;
  left: 90%;
  cursor: pointer;
  @media (max-width: 1030px) {
    top: 1.5rem;
    right: 0;
  }
`;

const ClearBtn = styled.button`
  background-color: ${color.red_vivid_500};
  color: ${color.white};
  padding: 0.5rem 1rem;
  border-radius: ${rounded.sm};
  margin-bottom: 2rem;
  position: absolute;
  top: 4rem;
  left: 60%;
  cursor: pointer;
  @media (max-width: 1030px) {
    left: 75%;
  }
  &:hover {
    background-color: ${color.red_vivid_400};
  }
`;
