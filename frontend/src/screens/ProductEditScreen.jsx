/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { FaSort } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { CgClose } from 'react-icons/cg';
import { Header, Loader, Message, Error, DropDownInput } from '../components';
import { updateUserAC } from '../actions/userActions';
import { color, rounded, shadow } from '../utilities';
import { USER_UPDATE_RESET } from '../actions/types';
import { detailProduct } from '../actions/productActions';

export function ProductEditScreen() {
  const [showColor, setShowColor] = useState(false);
  const [colorsList, setColorsList] = useState([]);
  const [addedColor, setAddedColor] = useState('');
  const [featuresList, setFeaturesList] = useState([]);
  const [addedFeature, setAddedFeature] = useState('');
  // const [validatedColor, setValidatedColor] = useState(false);
  const userInfo = useSelector((state) => state.userInfo);
  const { loading, user, error } = userInfo;
  const updateUser = useSelector((state) => state.updateUser);
  const { success } = updateUser;
  const productDetail = useSelector((state) => state.productDetail);
  const { loading: loadingProduct, error: errorProduct, product } = productDetail;
  const {
    name,
    colors,
    Features,
    reviews,
    starts,
    shipping,
    _id,
    image,
    images,
    description,
    price,
    subcategory,
    available,
    category,
  } = product;

  const letters = ['a', 'b', 'c', 'd', 'e', 'f', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(detailProduct(id));
    if (success) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/userslist');
    }
  }, [dispatch, success, id, history]);

  let currentValues;
  if (user) {
    currentValues = {
      name,
      colors,
      Features,
      reviews,
      starts,
      shipping,
      _id,
      image,
      images,
      description,
      price,
      subcategory,
      available,
      category,
    };
  } else {
    currentValues = {
      name: '',
      colors: '',
      Features: '',
      reviews: '',
      starts: '',
      shipping: '',
      _id: '',
      image: '',
      images: '',
      description: '',
      price: '',
      subcategory: '',
      available: '',
      category: '',
    };
  }

  //!   Colors functions
  const addColorHandler = (e) => {
    const addColor = e.target.value.toLowerCase();
    const clrs = [...addColor];
    const isFounded = clrs.some((cl) => !letters.includes(cl));
    if (!isFounded) {
      setAddedColor(addColor);
    }
  };

  const submitColorsHandler = (event) => {
    if (event.key === 'Enter') {
      if (addedColor.length === 6) {
        setColorsList((prevState) => [...prevState, { color: `#${addedColor}`, objectID: uuidv4() }]);
        setAddedColor('');
      }
    }
  };
  const addColorFromBtn = (e) => {
    e.stopPropagation();
    if (addedColor.length === 6) {
      setColorsList((prevState) => [...prevState, { color: `#${addedColor}`, objectID: uuidv4() }]);
      setAddedColor('');
    }
  };
  const removeColorHandler = (ID) => {
    if (ID) {
      const newList = featuresList.filter((el) => el.objectID !== ID);
      setColorsList(newList);
    }
  };

  useEffect(() => {
    if (product && colors) {
      const cl = colors.map((el) => ({ objectID: uuidv4(), color: el }));

      setColorsList(cl);
    }
  }, [product, colors]);

  //! Features Functions
  const addFeatureHandler = (e) => {
    setAddedFeature(e.target.value.toLowerCase());
  };

  const submitFeatureHandler = (event) => {
    if (event.key === 'Enter') {
      if (addedFeature.length > 0) {
        setFeaturesList((prevState) => [...prevState, { Features: { addedFeature }, objectID: uuidv4() }]);
        setAddedFeature('');
      }
    }
  };
  const addFeatureFromBtn = (e) => {
    e.stopPropagation();
    if (addedFeature.length > 0) {
      setFeaturesList((prevState) => [...prevState, { Features: { addedFeature }, objectID: uuidv4() }]);
      setAddedFeature('');
    }
  };
  const removeFeatureHandler = (ID) => {
    if (ID) {
      const newList = featuresList.filter((el) => el.objectID !== ID);
      setFeaturesList(newList);
    }
  };

  useEffect(() => {
    if (product && Features) {
      const newFeatureArray = Features.map((el) => ({ objectID: uuidv4(), Features: el }));
      console.log(newFeatureArray);
      setFeaturesList(newFeatureArray);
    }
  }, [product, Features]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message bg="danger">{error}</Message>
      ) : (
        <>
          <Header />
          {loadingProduct && <Loader />}
          {errorProduct && <Message bg="danger">{errorProduct}</Message>}
          <Container>
            <UserProfile>
              <Formik
                initialValues={currentValues}
                validationSchema={Yup.object({
                  Features: Yup.string().required('Please enter your Name'),
                  name: Yup.string()
                    .min(2, 'Must at least 2 characters long.')
                    .max(255, 'Name Must less than 255 characters')
                    .required('Please enter your Name'),
                  colors: Yup.string(),
                  shipping: Yup.boolean().required('Please confim if shipping is included'),
                  image: Yup.array().required('Please add main image'),
                  description: Yup.string().required('Please add description'),
                  iamges: Yup.array(),
                  price: Yup.number().required('Please add product price'),
                  available: Yup.boolean().required('Please confirm if the product is available'),
                  category: Yup.string().required('Please add category'),
                  subcategory: Yup.string().required('Please add subcategory'),
                })}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                  setSubmitting(true);
                  // const newUser = updateUserAC(id, { name: values.name, email: values.email, isAdmin: values.isAdmin });

                  // dispatch(newUser);

                  resetForm();
                  setSubmitting(false);
                }}
                enableReinitialize
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                  <form autoComplete="off" onSubmit={handleSubmit}>
                    <Back to="/admin/products"> &larr; Go Back</Back>

                    <Heading>Product Details</Heading>

                    <InputWrapper>
                      <div>
                        <label htmlFor="name">
                          {' '}
                          <b>Name</b>
                        </label>
                      </div>
                      <Input
                        error={touched.name && errors.name}
                        id="name"
                        type="text"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        placeholder="Name"
                      />
                      <Error touched={touched.name} message={errors.name} />
                    </InputWrapper>
                    <DropDownInput
                      itemListFromState={Features}
                      itemsList={featuresList}
                      itemToAdd={addedFeature}
                      addItemHandler={addFeatureHandler}
                      addItemFromBtn={addFeatureFromBtn}
                      keyPressItemHandler={submitFeatureHandler}
                      removeItemHandler={removeFeatureHandler}
                      inputTextContent="Features"
                      colors={false}
                      maxLength={30}
                    />

                    <InputWrapper>
                      <div>
                        <label htmlFor="description">
                          {' '}
                          <b>Description</b>
                        </label>
                      </div>
                      <Textarea
                        cols="50"
                        error={touched.description && errors.description}
                        id="description"
                        type="description"
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        placeholder="Description"
                      />

                      <Error touched={touched.email} message={errors.email} />
                    </InputWrapper>

                    <InputWrapper>
                      <label htmlFor="isAdmin">
                        <input
                          id="isAdmin"
                          type="checkbox"
                          name="isAdmin"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.isAdmin}
                        />{' '}
                        &nbsp; Is Admin
                      </label>
                    </InputWrapper>

                    <ColorsInput showColor={showColor} onClick={() => setShowColor(!showColor)}>
                      <Arrow />
                      <ColorWrapper>
                        <ColorContent>
                          {colors && colors.length === 0 ? 'No Colors for this item' : 'Colors'}
                        </ColorContent>
                        <Wrap showColor={showColor} showWrapper={colorsList.length === 0 ? 0 : 1}>
                          <AddColorInput
                            type="text"
                            onClick={(e) => e.stopPropagation()}
                            showColor={showColor}
                            value={addedColor}
                            onChange={addColorHandler}
                            maxLength="6"
                            onKeyPress={submitColorsHandler}
                            showInput={colorsList.length === 0 ? 0 : 1}
                          />
                          <Add onClick={addColorFromBtn} />
                          {colorsList &&
                            colorsList.map((clr) => (
                              <Colors showColor={showColor} key={clr.objectID} onClick={(e) => e.stopPropagation()}>
                                <Div>
                                  <ColorDiv>
                                    <ColorBox bg={clr.color} />
                                    &nbsp;&nbsp;
                                    <span>{clr.color}</span>
                                  </ColorDiv>
                                  <button type="button" onClick={() => removeColorHandler(clr.objectID)}>
                                    <Close />
                                  </button>
                                </Div>
                              </Colors>
                            ))}
                        </Wrap>
                      </ColorWrapper>
                    </ColorsInput>

                    <ButtonWrapper>
                      <SubmitBtn className="submit-btn" type="submit" disabled={isSubmitting}>
                        Update
                      </SubmitBtn>
                    </ButtonWrapper>
                  </form>
                )}
              </Formik>
            </UserProfile>
          </Container>
        </>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  place-items: center;
  padding: 2rem;
  margin-top: 4rem;
  height: 150vh;
`;
const UserProfile = styled.section``;

const Heading = styled.h3`
  font-family: 'avenir_bold';
  line-height: 1rem;
  margin-top: 3rem;
  padding-bottom: 2rem;
`;

const InputWrapper = styled.div``;

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

const Input = styled.input`
  ${styledInput}
`;
const Textarea = styled.textarea`
  ${styledInput}
  height: 10rem;
  padding: 1rem;
`;

const SubmitBtn = styled.button`
  background: transparent;
  border: 2.5px solid ${color.black};
  border-radius: ${rounded.sm};
  padding: 0.75rem 4rem;
  text-transform: uppercase;
  font-size: 1.2rem;
  font-family: 'avenir_semi';
  cursor: pointer;
  margin-top: 1.5rem;
  transition: all 0.6s ease-in-out;
  &:hover {
    background-color: ${color.black};
    color: ${color.white};
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 1rem;
`;

const Back = styled(Link)`
  margin-bottom: 3rem;
  font-size: 1.2rem;
  color: ${color.grey_700};
  &:hover {
    color: ${color.scallop_shell};
    text-decoration: underline;
    text-underline-offset: 5px;
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
  display:${({ showColor }) => (showColor ? 'block' : 'none')};
  position: relative;
  span {
    vertical-align: super;
    text-transform: uppercase;
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

const ColorsInput = styled.div`
  ${styledInput}

  padding-top: 3.1rem;
  position: relative;
  cursor: pointer;
  z-index: 999;

  box-shadow: ${({ showColor }) => (showColor ? `0px 0px 0px 2px ${color.grey_400}` : '')};
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
  text-transform: uppercase;
  top: 4rem;
  right: 1rem;
  box-shadow: 0px 0px 0px 2px ${color.grey_300};
  opacity: ${({ showColor }) => (showColor ? 1 : 0)};
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
  opacity: ${({ showColor }) => (showColor ? 1 : 0)};
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
