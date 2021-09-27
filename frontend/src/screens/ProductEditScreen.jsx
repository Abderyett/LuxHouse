/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { FaDollarSign, FaSort } from 'react-icons/fa';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { BsTrash, BsChevronRight } from 'react-icons/bs';
import axios from 'axios';
import { Header, Loader, Message, Error, DropDownInput } from '../components';
import { updateUserAC } from '../actions/userActions';
import { color, rounded, shadow } from '../utilities';
import { USER_UPDATE_RESET } from '../actions/types';
import { detailProduct } from '../actions/productActions';

export function ProductEditScreen() {
  const [colorsList, setColorsList] = useState([]);
  const [addedColor, setAddedColor] = useState('');
  const [featuresList, setFeaturesList] = useState([]);
  const [addedFeature, setAddedFeature] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDownCategory, setShowDropDownCategory] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [imageList, setImageList] = useState([]);
  const [addedImages, setAddedImages] = useState([]);
  const [cloudinaryMainImg, setCloudinaryMainImg] = useState([]);

  const ref = useRef();
  const userInfo = useSelector((state) => state.userInfo);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: userInfos } = userLogin;
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

  const subcategoryList = [
    'decoration',
    'dining chair',
    'lounge chair',
    'coffe table',
    'dining table',
    'wall lamp',
    'bar stool',
    'sofa',
    'tableware',
    'cushion',
    'foor lamp',
  ];
  const categories = ['furniture', 'accessories', 'lighting'];

  //*   Colors functions /////////////////////////

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
      const newList = colorsList.filter((el) => el.objectID !== ID);
      setColorsList(newList);
    }
  };

  useEffect(() => {
    if (product && colors) {
      const cl = colors.map((el) => ({ objectID: uuidv4(), color: el }));

      setColorsList(cl);
    }
  }, [product, colors]);

  //* Features Functions ////////////////////////////

  const addFeatureHandler = (e) => {
    setAddedFeature(e.target.value.toLowerCase());
  };

  const submitFeatureHandler = (event) => {
    if (event.key === 'Enter') {
      if (addedFeature.length > 0) {
        setFeaturesList((prevState) => [...prevState, { Features: addedFeature, objectID: uuidv4() }]);

        setAddedFeature('');
      }
    }
  };
  const addFeatureFromBtn = (e) => {
    e.stopPropagation();
    if (addedFeature.length > 0) {
      setFeaturesList((prevState) => [...prevState, { Features: addedFeature, objectID: uuidv4() }]);
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

      setFeaturesList(newFeatureArray);
      setSelectedSubcategory(subcategory);
      setSelectedCategory(category);
      setMainImage(image[0].url);
    }

    setImageList(images);
  }, [product, Features, subcategory, category, image, images]);

  //* Category & Subcategory Dropdown ////////////////////////

  const selectedSubcategoryHandler = (e) => {
    setSelectedSubcategory(e.target.textContent);
    setShowDropDown(!showDropDown);
  };
  const selectedCategoryHandler = (e) => {
    setSelectedCategory(e.target.textContent);
    setShowDropDownCategory(!showDropDownCategory);
  };

  const deleteImageHandeler = (Id) => {
    const newImageList = imageList.filter((el) => el._id !== Id);
    setImageList(newImageList);
  };
  //* Submitting to Uploaded photos to backend ///////////////

  const uploadImage = async (base64EncodedImage) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfos.token}`,
      },
    };

    const jsonData = JSON.stringify({ uri: base64EncodedImage });

    try {
      const { data } = await axios.post('/api/v1/upload', jsonData, config);
      setCloudinaryMainImg([{ url: data }]);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(cloudinaryMainImg);

  //* Upload Multiple Images //////////////////////////////

  const uploadMultipleImages = async (imgArr) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfos.token}`,
      },
    };
    let arr;
    if (addedImages.length > 0) {
      arr = imgArr.map((el) => ({ uri: el.url }));
    }
    const payload = { dataList: arr };
    // const formData = new FormData();
    // for (let i = 0; i < arr.length; i++) {
    //   formData.append('image', arr[i]);
    // }

    try {
      const { data } = await axios.post('/api/v1/upload/multiple', payload, config);
      console.log('upload from multiple', data);
    } catch (error) {
      console.error(error);
    }
  };

  //* Display Uploaded Main Image  ////////////////////////

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setMainImage(reader.result);
      uploadImage(reader.result);
    };
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const fileToDataUri = (imgs) =>
    new Promise((res) => {
      const reader = new FileReader();
      const { type, imgName, size } = imgs;
      reader.addEventListener('load', () => {
        res({
          url: reader.result,
          imgName,
          type,
          size,
        });
      });

      reader.readAsDataURL(imgs);
    });

  const uploadImageHandler = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImagesPromises = [];
      for (let i = 0; i < e.target.files.length; i++) {
        newImagesPromises.push(fileToDataUri(e.target.files[i]));
      }
      const newImages = await Promise.all(newImagesPromises);
      const newImgArray = newImages.map((el) => ({ _id: uuidv4(), url: el.url }));
      setAddedImages(newImgArray);
      uploadMultipleImages(newImgArray);
      setImageList([...imageList, ...newImgArray]);
    }
    e.target.value = '';
  };

  const scrollRight = () => {
    ref.current.scrollBy(350, 0);
  };

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
                  Features: Yup.array().required('Please enter your features'),
                  name: Yup.string()
                    .min(2, 'Must at least 2 characters long.')
                    .max(255, 'Name Must less than 255 characters')
                    .required('Please enter your Name'),
                  colors: Yup.array(),
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
                      <NameInput
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
                      itemListFromState={colors}
                      itemsList={colorsList}
                      itemToAdd={addedColor}
                      addItemHandler={addColorHandler}
                      addItemFromBtn={addColorFromBtn}
                      keyPressItemHandler={submitColorsHandler}
                      removeItemHandler={removeColorHandler}
                      inputTextContent="Colors"
                      colorBool
                      featureBool={false}
                      maxLength={6}
                      uppercase
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
                      <label htmlFor="shipping">
                        <input
                          id="shipping"
                          type="checkbox"
                          name="shipping"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.shipping}
                        />{' '}
                        &nbsp; Shipping
                      </label>
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
                      featureBool
                      colorBool={false}
                      maxLength={30}
                    />
                    <PriceInputWrapper>
                      <div>
                        <label htmlFor="price">
                          {' '}
                          <b>Price</b>
                        </label>
                      </div>
                      <PriceInput
                        error={touched.price && errors.price}
                        id="price"
                        type="text"
                        price="price"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.price}
                        placeholder="Price"
                      />
                      <Dollar />
                      <Error touched={touched.price} message={errors.price} />
                    </PriceInputWrapper>
                    <AvailableInput>
                      <label htmlFor="available">
                        <input
                          id="available"
                          type="checkbox"
                          name="available"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.available}
                        />{' '}
                        &nbsp; Available
                      </label>
                    </AvailableInput>
                    <InputWrapper>
                      <label>
                        &nbsp; <b>Subcategory</b>
                      </label>
                      <SubcategoryInput
                        showDropDownSubCategory={showDropDown}
                        onClick={() => setShowDropDown(!showDropDown)}
                      >
                        <Arrow />

                        <ItemContent>{selectedSubcategory}</ItemContent>
                      </SubcategoryInput>
                      <SubcategoryWrap showDropDownSubCategory={showDropDown} onClick={selectedSubcategoryHandler}>
                        {subcategoryList.map((item, index) => (
                          <SubCategoryItems showDropDownSubCategory={showDropDown} key={index}>
                            <span>{item}</span>
                          </SubCategoryItems>
                        ))}
                      </SubcategoryWrap>
                    </InputWrapper>

                    <InputWrapper style={{ marginTop: '3rem' }}>
                      <label>
                        &nbsp; <b>Category</b>
                      </label>
                      <CategoryInput
                        showDropDownCategory={showDropDownCategory}
                        onClick={() => setShowDropDownCategory(!showDropDownCategory)}
                      >
                        <Arrow />
                        <ItemContent>{selectedCategory}</ItemContent>
                      </CategoryInput>
                      <CategoryWrap showDropDownCategory={showDropDownCategory} onClick={selectedCategoryHandler}>
                        {categories.map((item, i) => (
                          <CategoryItems showDropDownCategory={showDropDownCategory} key={i}>
                            <span>{item}</span>
                          </CategoryItems>
                        ))}
                      </CategoryWrap>
                    </InputWrapper>
                    <InputWrapper>
                      <div style={{ marginTop: '3rem' }}>
                        <b>Add Main Image</b>
                      </div>
                      <ImgLabel htmlFor="image">
                        <span>
                          <AiOutlineCloudUpload />
                          &nbsp;
                        </span>{' '}
                        Upload Image
                      </ImgLabel>

                      <ImageInput type="file" id="image" onChange={handleInputChange} value="" />
                    </InputWrapper>

                    <ImageWrapper image={mainImage.length > 0}>
                      <ImgWrapp />

                      <Image url={mainImage} />

                      <RemoveBtn onClick={() => setMainImage('')} />
                    </ImageWrapper>

                    <InputWrapper>
                      <div style={{ marginTop: '3rem' }}>
                        <b>Add Images</b>
                      </div>
                      <ImgLabel htmlFor="images">
                        <span>
                          <AiOutlineCloudUpload />
                          &nbsp;
                        </span>{' '}
                        Upload Images
                      </ImgLabel>

                      <ImageInput type="file" id="images" value="" onChange={uploadImageHandler} multiple />
                    </InputWrapper>
                    <RightBlur>
                      <ImagesContainer ref={ref}>
                        {imageList &&
                          imageList.map((img) => (
                            <ImagesWrapper key={img._id}>
                              <ImgWrapp />
                              <Image url={img.url} />

                              <RemoveBtn onClick={() => deleteImageHandeler(img._id)} />
                            </ImagesWrapper>
                          ))}
                      </ImagesContainer>
                      {imageList && imageList.length > 2 && <Chevron onClick={scrollRight} />}
                    </RightBlur>

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
  height: 200vh;
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
  background-color: ${color.white};
  font-family: 'avenir_regular';
  box-shadow: ${shadow.lg};
  margin-top: 1rem;
  ${'' /* margin-bottom: 2rem; */}
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
const ImageInput = styled.input`
  ${styledInput};
  display: none;
`;

const ImgLabel = styled.label`
  border: 2px solid ${color.grey_300};
  display: inline-block;
  padding: 1rem 2rem;
  cursor: pointer;
  border-radius: ${rounded.md};
  margin: 3rem 0;
  font-size: 1.2rem;
  transition: all 0.3s ease-in-out;
  svg {
    vertical-align: middle;
    font-size: 1.6rem;
    color: ${color.grey_600};
  }

  &:hover {
    background-color: ${color.black};
    color: ${color.white};
    svg {
      color: ${color.white};
    }
  }
`;

const NameInput = styled.input`
  ${styledInput}
  margin-bottom:2rem;
`;

const PriceInput = styled.input`
  ${styledInput}
  margin-bottom:2rem;
`;
const AvailableInput = styled.div`
  margin-bottom: 3rem;
  margin-top: 1rem;
`;

const PriceInputWrapper = styled.div`
  position: relative;
`;

const Dollar = styled(FaDollarSign)`
  position: absolute;
  top: 3rem;
  right: 12rem;
  color: ${color.grey_500};
  font-size: 1.2rem;
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

const Arrow = styled(FaSort)`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const SubcategoryInputMain = css`
  position: relative;
  cursor: pointer;
`;
const ItemContent = styled.div`
  position: absolute;
  top: 0.75rem;
  left: 0;
  width: 100%;
  text-transform: capitalize;
`;
const wrapper = css`
  width: 30rem;
  height: 100%;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  padding-right: 1rem;
  cursor: pointer;
  background-color: ${color.white};
`;

const items = css`
  position: relative;

  span {
    text-transform: capitalize;
    padding: 1.5rem;
    font-size: 1.2rem;
    width: 30ch;
  }
  &:first-of-type {
    margin-top: 1.2rem;
  }
  &:last-of-type {
    margin-bottom: 1rem;
  }
  &:hover {
    background-color: ${color.grey_100};
  }
`;

const wrap = css`
  width: 30rem;
  height: auto;
  background-color: ${color.white};
  padding-top: 0.125rem;

  box-shadow: ${shadow.xl};
`;

//! ////////////////////////////////

const SubcategoryInput = styled.div`
  ${styledInput}
  ${SubcategoryInputMain}
`;

const SubCategoryItems = styled.div`
  ${wrapper}
  ${items}
  display: ${({ showDropDownSubCategory }) => (showDropDownSubCategory ? 'block' : 'none')};
`;

const SubcategoryWrap = styled.div`
  ${wrap}

  display: ${({ showDropDownSubCategory }) => (showDropDownSubCategory ? 'block' : 'none')};
`;

const CategoryInput = styled.div`
  ${styledInput}
  ${SubcategoryInputMain}
`;

const CategoryItems = styled.div`
  ${wrapper}
  ${items}
  display: ${({ showDropDownCategory }) => (showDropDownCategory ? 'block' : 'none')};
`;

const CategoryWrap = styled.div`
  ${wrap}
  display: ${({ showDropDownCategory }) => (showDropDownCategory ? 'block' : 'none')};
`;

const ImgWrapp = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: ${rounded.sm};
  z-index: 3;
  cursor: pointer;
  &:hover {
    opacity: 1;
    transition: all 0.4s ease-in;
  }
`;
const RemoveBtn = styled(BsTrash)`
  font-size: 1.2rem;
  color: ${color.white};
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
  opacity: 0;
  z-index: 3;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 10rem;
  transition: all 0.3s ease-in-out;
  display: ${({ image }) => (image ? 'block' : 'none')};
  &:hover {
    ${RemoveBtn} {
      opacity: 1;
    }
    ${ImgWrapp} {
      opacity: 1;
      transition: all 0.4s ease-in;
    }
  }
`;
const Image = styled.div`
  width: 10rem;
  height: 10rem;

  border: 2px solid ${color.grey_400};
  border-radius: ${rounded.sm};
  cursor: pointer;
  background-image: url(${({ url }) => url});
  background-size: cover;
  background-repeat: no-repeat;
  transition: all 0.6s ease-in-out;
  position: relative;
`;

const ImagesWrapper = styled.div`
  position: relative;
  width: 10rem;
  transition: all 0.3s ease-in-out;
  display: block;
  margin-right: 1rem;
  &:last-of-type {
    margin-right: 7rem;
  }
  &:hover {
    ${RemoveBtn} {
      opacity: 1;
    }
    ${ImgWrapp} {
      opacity: 1;
      transition: all 0.4s ease-in;
    }
  }
`;

const ImagesContainer = styled.div`
  display: flex;
  width: 30rem;
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-behavior: smooth;
`;
const RightBlur = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 100px;
    height: 100%;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, #fff 100%);
  }
`;

const Chevron = styled(BsChevronRight)`
  font-size: 2rem;
  color: ${color.grey_500};
  position: absolute;
  right: -2.5rem;
  top: 4rem;
  cursor: pointer;
`;
