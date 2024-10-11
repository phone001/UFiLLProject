"use client"

import React, { useRef, useState } from 'react'
import styled from './signup.module.css'
import { Valiation } from './valiation'
import axios from 'axios'
import Auth from './_component/Auth'

const Signup = () => {
  // input 상태
  const [formDataValue, setFormDataValue] = useState({
    email: "" as string,
    userName: "" as string,
    nickName: "" as string,
    birthDate: "" as string,
    phoneNumber: "" as string,
    password: "" as string,
    checkPassword: "" as string,
  });


  // 중복검사 샹태
  const [emailCheck, setEmailCheck] = useState<boolean | null>(null); // 이메일 중복 체크 상태
  const [nickNameCheck, setNickNameCheck] = useState<boolean | null>(null); // 이메일 중복 체크 상태


  // 에러 상태
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [checkPassword, setCheckPasswordError] = useState("")
  const [nickNameError, setNickNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [birthError, setBirthError] = useState("");

  const [phoneAuth, setPhoneAuth] = useState(false)


  // input태그 handler 함수
  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = event.target;
    // console.log(name, value);
    setFormDataValue({
      ...formDataValue,
      [name]: value
    })

    const formElement = event.currentTarget.form;
    if (formElement) {
      const formData = new FormData(formElement);
      const name = event.target.name;
      try {
        await Valiation(formData, name);
        // 특정 필드의 오류를 초기화
        switch (name) {
          case 'email':
            setEmailError("");
            break;
          case 'password':
            setPasswordError("");
            break;
          // case 'nickName':
          //   setNickNameError("");
          //   break;
          case 'phoneNumber':
            setPhoneError("");
            break;
          case 'birthDate':
            setBirthError("");
            break;
          case 'checkPassword':
            setCheckPasswordError("");
            break;
        }
      } catch (err) {
        if (err instanceof Error) {
          switch (name) {
            case 'email':
              setEmailError(err.message);
              break;
            case 'password':
              setPasswordError(err.message);
              break;
            // case 'nickName':
            //   setNickNameError(err.message);
            //   break;
            case 'phoneNumber':
              setPhoneError(err.message);
              break;
            case 'birthDate':
              setBirthError(err.message);
              break;
            case 'checkPassword':
              setCheckPasswordError(err.message);
          }
        }
      }
    }
  };

  // email중복체크
  const DuplicateCheck = async (type: string, name: string) => {
    const teg = document.querySelector(`input[name=${name}]`) as HTMLInputElement;
    const respose = await axios.post("http://localhost:3000/user/duplication", {
      // nickName: formDataValue.nickName,
      // email: formDataValue.email
      type,
      data: teg.value
    })
    const { data } = respose.data;
    setEmailCheck(data)
  }

  // 닉네임 중복확인
  // const nickNameDuplicateCheck = async () => {
  //   const respose = await axios.post("http://localhost:3000/user/duplication", {
  //     nickName: formDataValue.nickName
  //   })
  // }


  // form태그 event
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // console.log(formData.email);


    try {
      await Valiation(new FormData(event.currentTarget)); // 전체 폼 validation

      await Valiation(formData);
      setEmailError("");
      setPasswordError("");
      setNickNameError("");
      setPhoneError("");
      setBirthError("");
      setCheckPasswordError("");

      // 이거 axios 확안해보기!!!!!!!!!!!!!!!!!!!!
      if (formDataValue && (((!nickNameCheck && !emailCheck) && phoneAuth) && (formDataValue.checkPassword === formDataValue.password))) {
        const respones = await axios.post("http://localhost:3000/user/signup", formDataValue)
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  };

  return (
    <>
      <form className={styled.sign_up} onSubmit={handleSubmit}>
        <span>회원가입</span>
        <div className={styled.check_box}>
          <div className={styled.check_wrap}>
            <input type="text" placeholder='Email을 입력해주세요' name='email' onChange={handleInputChange} />
            <button type="button" onClick={() => { DuplicateCheck('email', 'email') }}>중복확인</button>
            {emailCheck !== null && (
              <p>{emailCheck ? '이미 존재하는 이메일입니다.' : '사용할 수 있는 이메일입니다.'}</p>
            )}
          </div>
          {emailError && <p className={styled.error}>{emailError}</p>}
        </div>
        <input type="text" placeholder='이름' name='userName' onChange={handleInputChange} />
        <div className={styled.check_box}>
          <div className={styled.check_wrap}>
            <input type="text" placeholder='닉네임(5글자 이내)' name='nickName' maxLength={5} onChange={handleInputChange} />
            <button type="button" onClick={() => { DuplicateCheck('nickName', 'nickName') }}>중복확인</button>
            {emailCheck !== null && (
              <p>{nickNameCheck ? '이미 존재하는 닉네임입니다.' : '사용할 수 있는 닉네임입니다.'}</p>
            )}
          </div>
        </div>
        <div className={styled.error}>
          <input type="text" placeholder='생년월일 (예시_020213)' name='birthDate' maxLength={6} onChange={handleInputChange} />
          {birthError && <p className={styled.error}>{birthError}</p>}
        </div>
        <div className={styled.error}>
          {/* <input type="text" placeholder='휴대폰 번호 (01012345678)' name='phoneNumber' maxLength={11} onChange={handleInputChange} /> */}
          <Auth type="text" phoneAuth={phoneAuth} value={setPhoneAuth} formData={formDataValue} placeholder='휴대폰 번호 (01012345678)' name='phoneNumber' maxLength={11} onChange={handleInputChange} />
          {phoneError && <p className={styled.error}>{phoneError}</p>}
        </div>
        <div className={styled.error}>
          <input type="password" placeholder='비밀번호 (영문+숫자+특수기호 8자이상20자이내 )' name='password' maxLength={20} onChange={handleInputChange} />
          {passwordError && <p className={styled.error}>{passwordError}</p>}
        </div>
        <div className={styled.error}>
          <input type="password" placeholder='비밀번호 확인' name='checkPassword' maxLength={20} onChange={handleInputChange} />
          {checkPassword && <p className={styled.error}>{checkPassword}</p>}
        </div>


        <button type="submit">회원가입</button>
      </form >
    </>
  )
}

export default Signup;
