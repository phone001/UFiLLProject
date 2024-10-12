"use client"
import React, {useState,useEffect} from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import styled from './style.module.css'

// 인풋과 버튼에 넣을 동적 상태 값을 파악하여 props로 전달받기
const ChangePlace = ({name,inputype,className,inputholder,onChange,value}:{value:any,onChange:any,name:string, inputype : string, className: string,inputholder:string | undefined}) => {
  
  const [inputTypes,setInputTypes] = useState('')
  const [inputHolder,setInputHolder] = useState(inputholder)
  const [inputValue, setInputValue] = useState(value)

    // props로 받은 value가 변경되면 inputValue도 업데이트
    useEffect(() => {
      setInputValue(value)
    }, [value])

  // input 필드의 값이 변경될 때 상태 업데이트
  const inputChangeHeader = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    onChange(e.target.value)
    
    
  }

  // 버튼 클릭 시 onSubmit 함수 호출
  // const submitHeader = () => {
  //   onSubmit(inputValue) // 입력된 값으로 onSubmit 함수 호출
  //   console.log('버튼 호출');
    
  // }


  return (
        <div className={styled.changestyl}>
            {/* input에 동적으로 관리하는 value할당 및 이벤트 핸들러 함수 속성 부여하기 */}
            <Input 
            name={name} 
            inputype={inputTypes} 
            className={className} 
            inputholder={inputHolder} 
            value={inputValue}
            onChange={inputChangeHeader} 
            />
        </div>

  )
}

export default ChangePlace
