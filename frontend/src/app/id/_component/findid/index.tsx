"use client"

import React, { useState } from 'react'
import Header from '../../../_components/header/header'
import styled from './findid.module.css'
import { Valiation } from '../../../signup/valiation'
import axios from 'axios'
import Auth from '../../../signup/_component/Auth'
import { useRouter } from 'next/navigation'

const Findid = ({ setFn }: { setFn: Function }) => {

  const [formDataValue, setFormDataValue] = useState({
    email: "" as string,
    userName: "" as string,
    nickName: "" as string,
    birthDate: "" as string,
    phoneNumber: "" as string,
    password: "" as string,
    checkPassword: "" as string,
  })

  //에러 상태 
  const [phoneError, setPhoneError] = useState("");
  const [phoneAuth, setPhoneAuth] = useState(false)
  const router = useRouter()

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
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
        switch (name) {
          case 'phoneNumber':
            setPhoneError("")
        }
      } catch (error) {
        if (error instanceof Error) {
          switch (name) {
            case 'phoneNumber':
              setPhoneError(error.message);
              break;
          }
        }
      }
    }
  }


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // console.log(formData.email);


    try {
      await Valiation(new FormData(event.currentTarget)); // 전체 폼 validation
      await Valiation(formData);
      setPhoneError("")

      // 이거 axios 확안해보기!!!!!!!!!!!!!!!!!!!!
      const respones = await axios.post("http://localhost:3000/user/duplication", { phone: formDataValue.phoneNumber })
      const phoneNumberData = respones.data
      if (formDataValue && (phoneNumberData && phoneAuth)) {

        setFn("fixedID")
        // router.push("findid/foundid")
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message, "findid 오류");
      }
    }
  };


  return (<>
    <form className={styled.find_userid} onSubmit={handleSubmit}>
      <span>본인인증</span>
      <input type="text" placeholder='이름' name='useName' />
      <div className={styled.find_id}>
        <Auth type="text" phoneAuth={phoneAuth} value={setPhoneAuth} formData={formDataValue} placeholder='휴대폰 번호 (01012345678)' name='phoneNumber' maxLength={11} onChange={handleInputChange} />
        {phoneError && <p className={styled.error}>{phoneError}</p>}
      </div>
      <button>이메일 찾기</button>
    </form>
  </>
  )
}

export default Findid