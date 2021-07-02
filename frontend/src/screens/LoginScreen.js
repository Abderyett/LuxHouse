/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Error } from '../components';

export function LoginScreen() {
  return (
    <div className="form-container">
      <div className="wrap">
        <div className="form-wrapper">
          <Formik
            initialValues={{ email: '', name: '', password: '', confirmPassword: '' }}
            validationSchema={Yup.object({
              email: Yup.string().email('Please enter valide email adress').required('Please enter your email adrress'),

              password: Yup.string()
                .required('Please enter password')
                .min(5, 'Must at least 5 characters long.')
                .max(255, 'Name Must less than 255 characters'),
            })}
            onSubmit={(values, { resetForm, setSubmitting }) => {
              setSubmitting(true);
              setTimeout(() => {
                alert(JSON.stringify(values), null, 2);
                resetForm();
                setSubmitting(false);
              }, 1000);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <form autoComplete="off" onSubmit={handleSubmit}>
                <h2 className="form-heading">Sign in to your account</h2>
                <div className="email-input">
                  <label htmlFor="email"> Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className={touched.email && errors.email ? 'has-error' : null}
                  />
                  <Error touched={touched.email} message={errors.email} />
                </div>
                <div className="password-input">
                  <div className="password-text">
                    <label htmlFor="password"> Password</label>

                    <Link className="password-reset" to="/reset">
                      Forgot your password?
                    </Link>
                  </div>

                  <input
                    id="password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className={touched.password && errors.password ? 'has-error' : null}
                  />
                  <Error touched={touched.password} message={errors.password} />
                </div>
                <button className="submit-btn" type="submit" disabled={isSubmitting}>
                  Continue
                </button>
              </form>
            )}
          </Formik>
        </div>
        <div className="register-text">
          Don't have an account? &nbsp; <Link to="/register"> Sign up</Link>
        </div>
      </div>
    </div>
  );
}
