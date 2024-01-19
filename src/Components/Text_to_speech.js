import React, { useEffect, useState } from 'react'
import styled from 'styled-components';


const Container = styled.div`
  width:100%;
  min-height:100vh;
  background:linear-gradient(45deg, #010758, #490d61);
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  color: #fff;
`;

const Title = styled.h1`
  font-size:45px;
  font-weight:500;
  margin-top:-50px;
  margin-bottom:50px;
`;
const Span = styled.span`
  color: #ff2963;
`;
const Textarea = styled.textarea`
  width: 600px;
  height: 250px;
  background: #403d84;
  color: #fff;
  font-size:15px;
  border:0;
  outline:0;
  padding:20px;
  border-radius:10px;
  resize: none;
  margin-bottom: 30px;
`;

const Innercontainer = styled.div`
  width:600px;
  display:flex;
  align-items:center;
  gap:20px;
`;
const Button = styled.button`
  background:#ff2963;
  color:#fff;
  font-size:16px;
  padding:10px 30px;
  border-radius: 35px;
  border: 0;
  outline: 0;
  cursor: pointer;
  display:flex;
  align-items:center;
`;
const Select = styled.select`
  flex:1;
  color:#fff;
  background:#403d84;
  height:50px;
  padding:0 20px;
  outline: 0;
  border:0;
  border-radius:35px;
  appearance:none;
  background-repeat:no-repeat;
  background-size:15px;
  background-position-x:calc(100%-20px);
  background-position-y:20px;
`;

function Text_to_speech() {

  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedvoiceIndex, setselectedvoiceIndex] = useState(1);

  const speech = new SpeechSynthesisUtterance();

  useEffect(() => {
    const handlevoiceChanged = () => {
      setVoices(window.speechSynthesis.getVoices());
      speech.voice = window.speechSynthesis.getVoices()[0];
    };

    window.speechSynthesis.addEventListener('voiceschanged', handlevoiceChanged);

    return ()=>{
      window.speechSynthesis.removeEventListener('voiceschanged', handlevoiceChanged);
    };

  }, [speech]);


  const speakText = () => {
    speech.text = text;
    window.speechSynthesis.speak(speech);
  }
  const handlevoiceChange = (event) => {
    setselectedvoiceIndex(event.target.value);
    speech.voice = voices[event.target.value];
  }

  return (
    <Container>
      <Title>Text to Speech <Span>Converter</Span></Title>
      <Textarea 
      value={text}
      onChange={(e)=> setText(e.target.value)}
      placeholder='Enter text to be spoken...'
      />
      <Innercontainer>
        <Select 
        value={selectedvoiceIndex} 
        onChange={handlevoiceChange}>
        {voices.map((voice, index)=>(
          <option key={index} value={index}>
            {voice.name}
          </option>
        ))}
        </Select>
        <Button onClick={speakText}>Listen</Button>
      </Innercontainer>
    </Container>
  )
}

export default Text_to_speech
