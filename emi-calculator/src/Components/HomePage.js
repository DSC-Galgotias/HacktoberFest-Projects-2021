import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useState, useEffect } from 'react';

import './HomePage.css';
import { checkNumber } from '../utils';
const HomePage = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [rateOfIntereset, setRateOfIntereset] = useState('');
  const [buttonText, setButtonText] = useState('Calculate');
  const [emi, setEmi] = useState(0);
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (
      !checkNumber(loanAmount) &&
      !checkNumber(loanTenure) &&
      !checkNumber(rateOfIntereset)
    ) {
      alert('Please add  a valid number');
      return;
    }
    if (buttonText === 'Calculate') {
      let year = loanTenure;
      let roi = rateOfIntereset / 1200.0;

      let result = Math.round(
        (loanAmount * roi * Math.pow(1 + roi, year)) /
          (Math.pow(1 + roi, year) - 1)
      );

      setEmi(result);
      setButtonText('Reset');
    }
    if (buttonText === 'Reset') {
      document.getElementById('loan-form').reset();
      setEmi('');
      setLoanAmount('');
      setLoanTenure('');
      setRateOfIntereset('');
      setButtonText('Calculate');
    }
  };

  return (
    <div className='bodyContainer'>
      <div className='formContainer'>
        <div className='formTitle'>Loan EMI Calculator</div>
        <form
          noValidate
          autoComplete='off'
          className='form'
          onSubmit={onSubmitHandler}
          id='loan-form'
        >
          <div className='formBody'>
            <div className='formLeft'>Loan Amount</div>
            <div className='formMiddle'>
              <TextField
                id='loan-amount'
                label='Enter Amount'
                size='small'
                variant='outlined'
                onChange={(event) => {
                  setLoanAmount(event.target.value);
                }}
              />
            </div>
            <div className='formRight'>INR</div>
          </div>
          <div className='formBody'>
            <div className='formLeft'>Loan Tenure</div>
            <div className='formMiddle'>
              <TextField
                id='months'
                label='Enter Months'
                size='small'
                variant='outlined'
                onChange={(event) => {
                  setLoanTenure(event.target.value);
                }}
              />
            </div>
            <div className='formRight'>Months</div>
          </div>
          <div className='formBody'>
            <div className='formLeft'>Intrest Rate</div>
            <div className='formMiddle'>
              <TextField
                id='Interest Rate'
                label='NN NN'
                size='small'
                variant='outlined'
                onChange={(event) => {
                  setRateOfIntereset(event.target.value);
                }}
              />
            </div>
            <div className='formRight'>%</div>
          </div>
          <br />
          <br />
          <div className='formButtonContainer'>
            <button className='calculate'>{buttonText}</button>
          </div>
        </form>
        <br />
        <br />
        <div style={{ width: '100%', borderBottom: '0.1vh solid gray' }}></div>
      </div>
      {buttonText === 'Reset' ? (
        <div className='resultContainer'>
          <div className='resultTitle'>EMI Loan Calculator</div>
          <div className='resultTop'>
            <div className='resultLeft'>
              <div style={{ width: '100%' }}>
                <div>Loan EMI</div>
                <div>&#8377; {emi}</div>
              </div>
            </div>
            <div className='resultRight'>
              <div style={{ width: '100%' }}>
                <div>Total Interest Payable</div>
                <div>&#8377; {emi * loanTenure - loanAmount}</div>
              </div>
            </div>
          </div>
          <div className='resultBottom'>
            <div style={{ width: '100%' }}>
              <div>Total Payment (Principal + Interest)</div>
              <div>&#8377; {emi * loanTenure}</div>
            </div>
          </div>
        </div>
      ) : (
        <div> </div>
      )}
    </div>
  );
};

export default HomePage;
