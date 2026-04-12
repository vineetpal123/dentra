import React, { useEffect, useRef, useState } from 'react';
import {
  Container,
  Card,
  Title,
  Input,
  Button,
  OtpContainer,
  OtpInput,
  LinkText,
  ErrorText,
} from './login.styled';
import { loginRequest, sendOtpRequest } from '../store/login/slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectIsLoading, selectStep } from '../store/login/selectors';

const LoginPage = () => {
  const dispatch = useDispatch();
  const step = useSelector(selectStep);
  const [phone, setphone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const isValidphone = phone.length === 10;
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    if (step === 'otp') {
      inputRefs.current[0]?.focus();
    }
  }, [step]);

  const handleSendOtp = () => {
    if (!isValidphone) return;
    if (phone.length !== 10) {
      alert('Enter valid phone number');
      return;
    }

    dispatch(sendOtpRequest({ phone }));

    // call API here
    console.log('Send OTP to:', phone);
  };

  // 👉 OTP change + auto submit
  const handleOtpChange = async (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // 🔥 AUTO VERIFY when OTP complete
    const finalOtp = newOtp.join('');
    if (finalOtp.length === 4 && !newOtp.includes('') && !loading) {
      //await verifyOtpHandler(finalOtp);
      dispatch(loginRequest({ phone, otp: finalOtp }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // 👉 Paste support
  const handlePaste = async (e: React.ClipboardEvent) => {
    const pasteData = e.clipboardData.getData('text').slice(0, 4);

    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = pasteData.split('');
    setOtp(newOtp);

    const finalOtp = newOtp.join('');

    if (finalOtp.length === 4) {
      alert('OTP Entered: ' + finalOtp);
      //await verifyOtpHandler(finalOtp);
    }
  };

  const handleVerifyOtp = () => {
    if (otp.some((d) => d === '')) {
      alert('Enter complete OTP');
      return;
    }
  };

  return (
    <Container>
      <Card>
        <Title>Login</Title>

        {step === 'phone' && (
          <>
            <Input
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setphone(e.target.value.replace(/\D/g, ''))}
              maxLength={10}
            />
            {error && <ErrorText>{error}</ErrorText>}

            <Button onClick={handleSendOtp} disabled={!isValidphone || loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </Button>
          </>
        )}

        {step === 'otp' && (
          <>
            <p>Enter OTP sent to {phone}</p>

            <OtpContainer onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <OtpInput
                  key={i}
                  maxLength={1}
                  value={digit}
                  disabled={loading}
                  ref={(el) => (inputRefs.current[i] = el)}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                />
              ))}
            </OtpContainer>

            {loading && <p>Verifying OTP...</p>}

            {error && <ErrorText>{error}</ErrorText>}
            <LinkText onClick={() => setStep('phone')}>Change phone number</LinkText>
          </>
        )}
      </Card>
    </Container>
  );
};

export default LoginPage;
