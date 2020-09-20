import React from 'react';
import Button from '@material-ui/core/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Field, Form, Formik} from "formik";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { TextField } from 'formik-material-ui'
import fetchApi from '../api/fetchApi'
import {useEffect,useState} from 'react';
import './structure.css';

export default() => {


    const initialState = {
        euramount: '',
        startcurrencypost: '',
        endcurrencypost: '',
    }

    const [currencyList, setCurrencyList] = useState([]);

    const useStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(1),
          minWidth: 120,
        },
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
      }));

    const classes = useStyles();


    

    const [startCurrency, setStartCurrency] = React.useState('');

    const [exchangedCurrency, setExchangedCurrency] = React.useState('');
 
      
    const handleChangeFromCurrency = (event) => {
      setStartCurrency(event.target.value);
    };

    const [endCurrency, setEndCurrency] = React.useState('');

    const handleChangeToCurrency = (event) => {
      setEndCurrency(event.target.value);
    };

    useEffect(() => {
        fetchApi.fetchCurrencies()
            .then(response => setCurrencyList(response.data))
      }, [])


    const currenciesFrom = currencyList.map(currencyFrom => {
        return(
           <MenuItem value={currencyFrom.currency}>{currencyFrom.currency}</MenuItem>
        )
      })

    const currenciesTo = currencyList.map(currencyTo => {
        return(
           <MenuItem value={currencyTo.currency}>{currencyTo.currency}</MenuItem>
        )
    })


    return(
        
        <div className = "structure">
            <Formik initialValues={initialState}
                        onSubmit={values=> {
                          fetchApi.exchangeCurrency(startCurrency,endCurrency,values).then(response => setExchangedCurrency(response.data)) 
                        }}
                        >
              {(props) => (
                <Form>
                  <div>
                    <Field name="user" type="text" component={TextField} placeholder="Amount" required="true" disabled={false}/>
                  </div>
                  <div>
                  <FormControl className={classes.formControl}>    
                    <InputLabel id="demo-simple-select-label">Start currency</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={startCurrency}
                        required="true"
                        onChange={handleChangeFromCurrency}
                      >
                        {currenciesFrom}
                      </Select>
                      </FormControl>

                      <FormControl className={classes.formControl}>  
                    <InputLabel id="demo-simple-select-label">End currency</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={endCurrency}
                        required="true"
                        onChange={handleChangeToCurrency}
                      >
                        {currenciesTo}
                      </Select>
                      </FormControl>
                  </div>
                  <Button type="submit" variant="contained" color="primary" disableElevation className="createTravelButton">Exchange</Button>
                </Form>
              )}
            </Formik>
            <div className="exchanged">Exchanged</div>
            {exchangedCurrency.rate} {exchangedCurrency.currency}
        </div>
    )

}