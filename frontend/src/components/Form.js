import React, { useState } from 'react';
import { styled } from 'styled-components';

/*
const FormContainer = styled.form`
  display: flex;
  justify-content: space-between;
  height: 40px;
  width: 100%;
`;

const LeftFormContainer = styled.div`
  width: 30px;
`;

const OuterInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 12px 0 7px;
`;

const InputContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #f6f6f6;
  border-radius: 3px;
  padding: 0 3px 0 3px;
`;

const RightFormContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
`;
*/

const FormContainer = styled.form`
  margin-top: 20px;
`;

const Container = styled.div`
  width: 400px;
  margin: auto;
  display: flex;
`;

const InputContainer = styled.div`
  width: 400px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 5px;
  padding-left: 15px;

  background-color: #ececec;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  margin-left: 10px;
  border: none;
  background-color: #dc1a51;
  color: white;
  border-radius: 5px;
  height: 40px;
  width: 100px;
  box-shadow: 0 4px 8px 0 rgba(200, 200, 200, 0.2),
    0 6px 20px 0 rgba(200, 200, 200, 0.19);
`;

const Form = ({ data, setData }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    if (input === '') {
      e.preventDefault();
      return;
    }
    setData([
      ...data,
      {
        task_id: 1,
        task_description: input,
        task_order: data.length,
        task_completed: false,
      },
    ]);

    const addTask = async () => {
      const response = await fetch(process.env.REACT_APP_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });
      const jsonResponse = await response.json();
      jsonResponse.sort(
        (a, b) => parseFloat(a.task_order) - parseFloat(b.task_order)
      );
      setData(jsonResponse);
      console.log(jsonResponse);
    };

    addTask();
    setInput('');
    e.preventDefault();
  };

  const handleInput = (text) => {
    setInput(text.target.value);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Container>
        <InputContainer>
          <Input
            type='text'
            onChange={handleInput}
            value={input}
            maxLength='30'
            placeholder='Enter task'
          />
        </InputContainer>
        <Button type='submit'>Add</Button>
      </Container>
    </FormContainer>
  );
};

export default Form;

/* 

    <FormContainer onSubmit={handleSubmit}>
      <LeftFormContainer></LeftFormContainer>
      <OuterInputContainer>
        <InputContainer>
          <Input
            type='text'
            onChange={handleInput}
            value={input}
            maxLength='30'
          />
        </InputContainer>
      </OuterInputContainer>
      <RightFormContainer>
        <Button type='submit'>Add</Button>
      </RightFormContainer>
    </FormContainer>

    */
