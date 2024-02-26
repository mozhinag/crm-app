import React from 'react';
import { useDispatch } from 'react-redux';
import { createCustomer, updateCustomer } from '../../redux/CustomerSlice';
import { Modal, Box, Typography, Button, TextField, FormControl, RadioGroup, FormControlLabel, Radio, FormLabel, MenuItem } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';



const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto', // Adjusted to 'auto' for potentially better layout
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    maxWidth: '90%', // Ensure the modal does not exceed the screen width
    maxHeight: '90%', // Ensure the modal does not exceed the screen height
    overflowY: 'auto', // Enable scrolling for overflow content
};

// Validation Schema
const CustomerSchema = Yup.object().shape({
    firstname: Yup.string().required('Required'),
    lastname: Yup.string().required('Required'),
    mobile: Yup.string().matches(/^[0-9]{10}$/, 'Must be exactly 10 digits').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    address: Yup.string().required('Required'),
    customerType: Yup.string().required('Required'),
    sex: Yup.string().required('Required'),
    status: Yup.string().required('Required'),
});

function AddCustomerModal({ open, handleClose, customer }) {
    const dispatch = useDispatch();
    const isEdit = Boolean(customer);
    const initialValues = {
        firstname: '',
        lastname: '',
        mobile: '',
        email: '',
        address: '',
        customerType: '',
        sex: '',
        status: '',
        ...customer // Spread the customer details if editing
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="customer-modal-title"
            aria-describedby="customer-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="customer-modal-title" variant="h6" component="h2">
                    {isEdit ? 'Edit Customer' : 'Add New Customer'}
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={CustomerSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        if (isEdit) {

                            dispatch(updateCustomer({ id: customer._id, updateData: values }));

                            console.log(customer._id);
                            alert('Upated successfully')
                            console.log(values);
                        } else {

                            dispatch(createCustomer(values));
                        }
                        setSubmitting(false);
                        resetForm();
                        handleClose();
                    }}

                >
                    {({ errors, touched, handleSubmit, isSubmitting, getFieldProps, resetForm }) => (
                        <Form onSubmit={handleSubmit}>


                            <Box display="flex" justifyContent="space-between" gap={2}>
                                <Field as={TextField} name="firstname" label="First Name" fullWidth error={touched.firstname && !!errors.firstname} helperText={touched.firstname && errors.firstname} {...getFieldProps('firstname')} />
                                <Field as={TextField} name="lastname" label="Last Name" fullWidth error={touched.lastname && !!errors.lastname} helperText={touched.lastname && errors.lastname} {...getFieldProps('lastname')} />
                            </Box>

                            <Box display="flex" justifyContent="space-between" gap={2} marginTop={'8px'}>
                                <Field as={TextField} name="email" label="Email" fullWidth error={touched.email && !!errors.email} helperText={touched.email && errors.email} {...getFieldProps('email')} />
                                <Field as={TextField} name="mobile" label="Mobile No." fullWidth error={touched.mobile && !!errors.mobile} helperText={touched.mobile && errors.mobile} {...getFieldProps('mobile')} />
                            </Box>
                            <label>Address</label>
                            <Field as={TextField} name="address" fullWidth error={touched.address && !!errors.address} helperText={touched.address && errors.address} />

                            <label>Customer Type</label>
                            <Field as={TextField}
                                name="customerType"

                                fullWidth
                                select

                            >
                                <MenuItem value="VIP">VIP</MenuItem>
                                <MenuItem value="Regular">Regular</MenuItem>
                                <MenuItem value="Vendor">Vendor</MenuItem>
                            </Field>                            <FormControl component="fieldset" error={touched.sex && !!errors.sex}>
                                <FormLabel component="legend">Sex</FormLabel>
                                <Field as={RadioGroup} row name="sex">
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </Field>
                            </FormControl>
                            <FormLabel component="legend">Status</FormLabel>
                            <Field as={RadioGroup} row name="status">
                                <FormControlLabel value="Active" control={<Radio />} label="Active" />
                                <FormControlLabel value="Inactive" control={<Radio />} label="Inactive" />
                            </Field>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                                <Button color="secondary" variant="contained" onClick={() => { resetForm(); handleClose(); }}>Reset</Button>
                                <Button color="secondary" variant="contained" disabled={isSubmitting} type="submit">Save</Button>
                            </div>

                        </Form>
                    )}
                </Formik>
            </Box>
        </Modal>
    );
}

export default AddCustomerModal;
