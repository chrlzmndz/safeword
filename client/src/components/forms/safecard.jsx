import React, { useImperativeHandle, forwardRef, useEffect } from 'react';

import Axios from 'axios';
import Swal from 'sweetalert2';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const SafeCard = forwardRef((props, ref) => {

    const [values, setValues] = React.useState({
        type: 0,
        id: 0,
        title: '',
        name: '',
        number: '',
        month: 1,
        year: 0,
        cvv: '',
        note: '',
        prompt: false
    });

    const handleChange = (props) => (event) => {
        event.preventDefault();
        setValues({ ...values, [props]: event.target.value });
    };
    
    const handlePromptChange = (event) => {
        setValues({ ...values, prompt: event.target.checked });
    };

    useEffect(() => {
        if (props.prop1) {
            setValues({
                type: props.prop1.type || 0,
                id: props.prop1.id || 0,
                title: props.prop1.title || '',
                name: props.prop1.name || '',
                number: props.prop1.number || '',
                year: props.prop1.year || 0,
                month: props.prop1.month || 1,
                cvv: props.prop1.cvv || '',
                note: props.prop1.note || '',
                prompt: Boolean(props.prop1.prompt) || false
            });
        }
    }, [props]);

    useImperativeHandle(ref, () => ({
        addItem() {
            var title = values.title;
            var name = values.name;
            var number = values.number;
            var month = values.month;
            var year = values.year;
            var cvv = values.cvv;
            var note = values.note;
            var prompt = values.prompt;

            if (title === '' || name === '' || number === '' ||
                month === '' || year === '' || cvv === '') {
                return Swal.fire({
                    title: 'Error!',
                    text: 'Please fill out the fields.',
                    icon: 'error',
                    showConfirmButton: false,
                    showCloseButton: true,
                    closeButtonHtml: '&times;',
                    timer: 1500
                });
            }

            Axios.post("http://localhost:3001/addcard", {
                title: title,
                name: name,
                number: number,
                month: month,
                year: year,
                cvv: cvv,
                note: note,
                prompt: prompt
            }).then(res => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Password has been added to your vault.',
                    icon: 'success',
                    // showConfirmButton: false,
                    confirmButtonColor: '#318ce7',
                    confirmButtonText: 'Okay',
                    showCloseButton: true,
                    closeButtonHtml: '&times;',
                    timer: 5000
                }).then((result) => {
                    window.location.reload();
                });
            });
        },
        updateItem() {
            Axios.post(`http://localhost:3001/updatecard/${values.id}`, {
                title: values.title,
                name: values.name,
                number: values.number,
                month: values.month,
                year: values.year,
                cvv: values.cvv,
                note: values.note,
                prompt: values.prompt
            }).then(() => {
                Swal.fire({
                title: 'Success!',
                text: 'Card has been updated.',
                icon: 'success',
                confirmButtonColor: '#318ce7',
                confirmButtonText: 'Okay',
                showCloseButton: 'true',
                closeButtonHtml: '&times;',
                timer: 5000
                }).then((result) => {
                    props.onChange(values);
                });
            });
        },
        deleteItem() {
            Axios.delete(`http://localhost:3001/deletecard/${values.id}`)
            .then(() => {
                Swal.fire({
                title: 'Success!',
                text: 'Card has been removed from your vault.',
                icon: 'success',
                confirmButtonColor: '#318ce7',
                confirmButtonText: 'Okay',
                showCloseButton: 'true',
                closeButtonHtml: '&times;',
                timer: 5000
                }).then((result) => {
                    window.location.reload();
                });
            });
        },
    }))

    return (
        <>
            <Box
                component="form"
                noValidate
                autoComplete="on"
                sx={{ mb: 1.5 }}
            >
                <TextField
                    fullWidth
                    id="outlined-brand"
                    label="Brand"
                    placeholder="eg: Visa, MasterCard"
                    value={values.title}
                    onChange={handleChange('title')}
                />
            </Box>

            <Box>
                <TextField
                    fullWidth
                    label="Name of Cardholder"
                    value={values.name}
                    onChange={handleChange('name')}
                    sx={{ mb: 1.5 }}
                />
            </Box>

            <FormControl fullWidth sx={{ mb: 1.5 }}
                variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Card Number</InputLabel>
                <OutlinedInput
                    id="outlined-number"
                    label="Card Number"
                    type="number"
                    value={values.number}
                    onChange={handleChange('number')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="copy input"
                                onClick={() => navigator.clipboard.writeText(values.number)}
                                edge="end"
                            >
                                <ContentCopyRoundedIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>

            <Grid container spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="select-month-label">Month</InputLabel>
                        <Select
                            labelId="select-month-label"
                            id="select-month"
                            value={values.month}
                            label="Month"
                            onChange={handleChange('month')}
                        >
                            <MenuItem value={1}>Jan</MenuItem>
                            <MenuItem value={2}>Feb</MenuItem>
                            <MenuItem value={3}>Mar</MenuItem>
                            <MenuItem value={4}>Apr</MenuItem>
                            <MenuItem value={5}>May</MenuItem>
                            <MenuItem value={6}>Jun</MenuItem>
                            <MenuItem value={7}>Jul</MenuItem>
                            <MenuItem value={8}>Aug</MenuItem>
                            <MenuItem value={9}>Sep</MenuItem>
                            <MenuItem value={10}>Oct</MenuItem>
                            <MenuItem value={11}>Nov</MenuItem>
                            <MenuItem value={12}>Dec</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth
                        variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-year">Year</InputLabel>
                        <OutlinedInput
                            id="outlined-year"
                            label="Year"
                            type="number"
                            inputProps={{ min: 0, max: 99 }}
                            value={values.year}
                            onChange={handleChange('year')}
                            startAdornment={
                                <InputAdornment position="start">
                                    <Typography variant="body1">20</Typography>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>
            </Grid>

            <FormControl fullWidth sx={{ mb: 1.5 }}
                variant="outlined">
                <InputLabel htmlFor="outlined-adornment-ccv">CVV/CVC</InputLabel>
                <OutlinedInput
                    id="outlined-ccv"
                    label="CCV/CVC"
                    type="number"
                    inputProps={{ min: 0, max: 9999 }}
                    value={values.cvv}
                    onChange={handleChange('cvv')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="copy input"
                                onClick={() => navigator.clipboard.writeText(values.ccv)}
                                edge="end"
                            >
                                <ContentCopyRoundedIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>

            <Box sx={{ mb: 1.5 }}>
                <TextField
                    label="Note"
                    id="outlined-end-adornment"
                    position="end"
                    placeholder="Note"
                    multiline
                    rows={3}
                    style={{ minWidth: '25%', width: '100%' }}
                    value={values.note}
                    onChange={handleChange('note')}
                />
            </Box>

            <Box sx={{ width: '100%', mb: 3 }}>
                <Grid container spacing={1} alignItems="center">
                    <Grid item xs>
                        <Typography id="masterpassword-re">
                            Master Password Re-prompt?
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={values.prompt}
                            onChange={handlePromptChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
});

export default SafeCard;