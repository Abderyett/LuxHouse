import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { FaSort } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { CgClose } from 'react-icons/cg';
import { color, rounded, shadow } from '../utilities';

export function DropDownInput({
  itemListFromState,
  itemsList,
  itemToAdd,
  addItemHandler,
  addItemFromBtn,
  keyPressItemHandler,
  removeItemHandler,
  inputTextContent,
  colors,
  maxLength,
}) {
  const [show, setShow] = useState(false);

  return (
    <MainInput show={show} onClick={() => setShow(!show)}>
      <Arrow />
      <ColorWrapper>
        <ColorContent>
          {(itemListFromState && itemListFromState.length === 0) || itemsList.length === 0
            ? `No ${inputTextContent} for this item`
            : inputTextContent}
        </ColorContent>
        <Wrap show={show} showWrapper={itemsList.length === 0 ? 0 : 1}>
          <AddColorInput
            type="text"
            onClick={(e) => e.stopPropagation()}
            show={show}
            value={itemToAdd}
            onChange={addItemHandler}
            maxLength={maxLength}
            onKeyPress={keyPressItemHandler}
            showInput={itemsList.length === 0 ? 0 : 1}
          />
          <Add onClick={addItemFromBtn} />
          {itemsList &&
            itemsList.map((item) => (
              <Colors show={show} key={item.objectID} onClick={(e) => e.stopPropagation()}>
                <Div>
                  <ColorDiv>
                    {colors && <ColorBox bg={item.color} />}
                    &nbsp;&nbsp;
                    <span>{item.Features}</span>
                  </ColorDiv>
                  <button type="button" onClick={() => removeItemHandler(item.objectID)}>
                    <Close />
                  </button>
                </Div>
              </Colors>
            ))}
        </Wrap>
      </ColorWrapper>
    </MainInput>
  );
}

const styledInput = css`
  border-radius: ${rounded.md};
  height: 3rem;
  width: 35rem;
  max-width: 30rem;
  text-indent: 5%;
  font-size: 1.2rem;
  color: ${color.grey_800};
  font-family: 'avenir_regular';
  box-shadow: ${shadow.lg};
  margin-top: 1rem;
  margin-bottom: 2rem;
  box-shadow: ${({ error }) =>
    error ? `0px 0px 0px 2px ${color.red_vivid_500}` : `0px 0px 0px 2px ${color.grey_300}`};

  @media (max-width: 768px) {
    width: 90vw;
  }
  outline: none;
  &:focus {
    box-shadow: 0px 0px 0px 2px ${color.grey_600};
  }
`;
const ColorWrapper = styled.div`
  display: grid;
  padding-bottom: 1rem;

  cursor: pointer;

  border-radius: ${rounded.md};
`;

const wrapper = css`
  width: 30rem;

  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-right: 1rem;

  overflow-y: scroll;
  background-color: ${color.white};
`;

const Colors = styled.div`
  ${wrapper}
  display:${({ show }) => (show ? 'block' : 'none')};
  position: relative;
  span {
    vertical-align: super;
    text-transform: ${({ colors }) => (colors ? 'uppercase' : 'capitalize')};
    width: 30ch;
  }
  &:first-of-type {
    margin-top: 3.5rem;
  }
  &:last-of-type {
    margin-bottom: 0.5rem;
  }
  &:hover {
    background-color: ${color.grey_100};
  }
`;

const MainInput = styled.div`
  ${styledInput}

  padding-top: 3.1rem;
  position: relative;
  cursor: pointer;
  z-index: 999;

  box-shadow: ${({ show }) => (show ? `0px 0px 0px 2px ${color.grey_400}` : '')};
`;

const Arrow = styled(FaSort)`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const ColorContent = styled.div`
  position: absolute;
  top: 0.75rem;
  left: 0;
  width: 100%;
`;

const ColorBox = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: ${rounded.sm};
  border: 1px solid ${color.grey_400};
  background-color: ${({ bg }) => bg};
  display: inline-block;
`;

const AddColorInput = styled.input`
  ${styledInput}
  height: 2.5rem;
  width: 28rem;
  position: absolute;
  text-transform: ${({ colors }) => (colors ? 'uppercase' : 'capitalize')};
  top: 4rem;
  right: 1rem;
  box-shadow: 0px 0px 0px 2px ${color.grey_300};
  opacity: ${({ show }) => (show ? 1 : 0)};
  &:focus {
    box-shadow: 0px 0px 0px 2px ${color.scallop_shell};
  }
`;

const Wrap = styled.div`
  width: 30rem;
  height: ${({ showWrapper }) => (showWrapper ? 'auto' : '6rem')};
  background-color: ${color.white};
  padding-top: 1.5rem;
  padding-right: 1rem;
  box-shadow: ${shadow.lg};
  margin-top: 0.125rem;
  opacity: ${({ show }) => (show ? 1 : 0)};
`;

const Add = styled(FiPlus)`
  color: ${color.grey_500};
  position: absolute;
  top: 5.5rem;
  right: 2.4rem;
  z-index: 9999;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    color: ${color.green_500};
  }
`;
const Close = styled(CgClose)`
  vertical-align: middle;
  margin-right: 0.8rem;
  color: ${color.grey_500};
  font-size: 1.5rem;
  &:hover {
    color: ${color.red_vivid_500};
  }
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    cursor: pointer;
    background: transparent;
  }
`;

const ColorDiv = styled.div`
  display: flex;
  align-items: center;
  padding-left: 1rem;
`;

DropDownInput.propTypes = {
  itemListFromState: PropTypes.array,
  itemsList: PropTypes.array,
  itemToAdd: PropTypes.func,
  addItemHandler: PropTypes.func,
  addItemFromBtn: PropTypes.func,
  keyPressItemHandler: PropTypes.func,
  removeItemHandler: PropTypes.func,
  inputTextContent: PropTypes.string,
  colors: PropTypes.bool,
  maxLength: PropTypes.number,
};
