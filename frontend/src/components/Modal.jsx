import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { IoClose } from 'react-icons/io5';
import { color, rounded } from '../utilities';
import { hideModal, hideModalProduct, removeUser } from '../actions/userActions';
import { removeProduct } from '../actions/productActions';

export function Modal({ text, products }) {
  const toggleModal = useSelector((state) => state.toggleModal);
  const selectedId = useSelector((state) => state.selectedId);

  const dispatch = useDispatch();
  const { show } = toggleModal;

  const deleteHandler = () => {
    if (products === 'deleteProduct') {
      dispatch(removeProduct(selectedId.id));
      dispatch(hideModalProduct());
      console.log('productId', selectedId.id);
      console.log('removed');
    } else {
      dispatch(removeUser(selectedId.id));
      dispatch(hideModal());
      console.log('not removed');
      console.log(selectedId.id, 'userId');
    }
  };
  return ReactDOM.createPortal(
    <Wrapper show={show}>
      <Container>
        <Close onClick={() => dispatch(hideModal())} />
        <Content>
          <b>{text}</b>
        </Content>
        <BtnWrapper>
          <Button type="button" onClick={() => deleteHandler()}>
            Delete
          </Button>
        </BtnWrapper>
      </Container>
    </Wrapper>,
    document.querySelector('#modal')
  );
}
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  z-index: ${({ show }) => (show ? 10 : -1)};
`;

const Container = styled.div`
  display: flex;
  width: 35%;
  height: 25%;
  max-width: 400px;
  background: ${color.white};
  border-radius: ${rounded.sm};
  position: relative;
`;
const Content = styled.div`
  font-size: 1.2rem;
  padding-top: 3rem;
  padding-left: 2rem;
`;
const Button = styled.button`
  background: ${color.red_vivid_500};
  color: ${color.white};
  padding: 0.75rem;
  border-radius: ${rounded.sm};
  cursor: pointer;
  letter-spacing: 0.1rem;
  font-size: 1.1rem;
`;

const Close = styled(IoClose)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
`;

const BtnWrapper = styled.div`
  position: absolute;
  right: 2rem;
  bottom: 1rem;
`;

Modal.propTypes = {
  text: PropTypes.string,
  id: PropTypes.string,
  products: PropTypes.string,
};
