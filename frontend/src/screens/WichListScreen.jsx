import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';
import { color, shadow, rounded } from '../utilities';
import { Header } from '../components';
import { formatter } from '../helper/CurrencyFormat';

export function WichListScreen() {
  const wichlist = useSelector((state) => state.wichlist);
  const { items } = wichlist;
  return (
    <>
      <Header />
      <Container>
        <Heading>My Wichlist</Heading>
        <WrapperList>
          {items && items.length > 0 ? (
            items.map((el) => (
              <Card>
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
                <RemoveBtn type="button">
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
`;
