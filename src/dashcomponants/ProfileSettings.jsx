import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createProfile, updateProfile } from '../redux/ProfileSlice'; // Adjust the import path as necessary

function ProfileSettings({ profileData, onProfileUpdate }) {
    const dispatch = useDispatch(); // Use useDispatch hook to dispatch actions

    const initialValues = {
      name: profileData?.name || '',
      dob: profileData?.dob || '',
      gender: profileData?.gender || '',
      email: profileData?.email || '',
      mobileNo: profileData?.mobileNo || '',
      role: profileData?.role || '',
    };
    
const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  dob: Yup.date().required('Required').nullable(),
  gender: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email format').required('Required'),
  mobileNo: Yup.string().matches(/^[0-9]+$/, "Must be only digits").min(10, 'Must be exactly 10 digits').max(10, 'Must be exactly 10 digits').required('Required'),
  role: Yup.string().required('Required'),
});

const onSubmit = (values, { setSubmitting, resetForm }) => {
    console.log(values);

    // Decide whether to create a new profile or update an existing one
    if (profileData?._id) {
      // Update existing profile
      dispatch(updateProfile({ id: profileData._id, updateData: values }))
          .unwrap() // Unwrap the promise to handle errors
          .then(() => {
              onProfileUpdate(values); 
              console.log(onProfileUpdate); // Check what it is

          })
          .catch((error) => {
              console.error("Failed to update profile:", error);
              // Handle the error appropriately in your UI
          });
  } else {
      // Create new profile
      dispatch(createProfile(values))
          .unwrap() // Unwrap the promise to handle errors
          .then(() => {
              onProfileUpdate(values); // Handle any post-creation logic, if necessary
          })
          .catch((error) => {
              console.error("Failed to create profile:", error);
              // Handle the error appropriately in your UI
          });
  }

    setSubmitting(false);
    resetForm(); // Optionally reset the form to initial values
};

  return (
<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'pink', width: '80%', padding: '15px', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px', borderRadius: '10px'}}>
  <h3>User Profile Form</h3>
  <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
    {formik => (
      <Form style={{display: 'grid', gap: '15px', backgroundColor: 'white', padding: '20px', border: '2px solid #000', borderRadius: '10px', width: '100%'}}> <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" style={{ padding: '10px', marginBottom: '5px' }} />
           
              <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="dob">Date of Birth</label>
              <Field type="date" id="dob" name="dob" style={{ padding: '10px', marginBottom: '5px' }} />
            
              <ErrorMessage name="dob" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <Field type="radio" name="gender" value="Male" id="male" style={{ marginRight: '5px' }} />
              <label htmlFor="male">Male</label>
              <Field type="radio" name="gender" value="Female" id="female" style={{ marginLeft: '20px', marginRight: '5px' }} />
              <label htmlFor="female">Female</label>
              <ErrorMessage name="gender" component="div" style={{ color: 'red' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" style={{ padding: '10px', marginBottom: '5px' }} />
             
              <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="mobileNo">Mobile No</label>
              <Field type="text" id="mobileNo" name="mobileNo" style={{ padding: '10px', marginBottom: '5px' }} />
           
              <ErrorMessage name="mobileNo" component="div" style={{ color: 'red' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="role">Role</label>
              <Field as="select" id="role" name="role" style={{ padding: '10px', marginBottom: '5px' }}>
                <option value="">Select a role</option>
                <option value="administrator">Administrator</option>
                <option value="manager">Manager</option>
                <option value="customerService">Customer Service</option>
                <option value="salesRepresentative">Sales Representative</option>
              </Field>
           
              <ErrorMessage name="role" component="div" style={{ color: 'red' }} />
            </div>

            <button type="submit" style={{ marginTop: '20px', padding: '10px' }}>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ProfileSettings;
