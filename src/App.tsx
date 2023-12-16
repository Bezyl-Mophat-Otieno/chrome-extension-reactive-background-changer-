import './App.css'
import { useEffect, useState } from 'react'
import { HexAlphaColorPicker } from 'react-colorful'

function App() {

  const [color,setColor] = useState("");

  const clickMe = async ()=>{
    let [tab] = await chrome.tabs.query({active:true})

    chrome.scripting.executeScript<string[],void>({
      target:{tabId:tab.id!},
      args:[color],
      func:(color)=>{
        document.body.style.backgroundColor = color;
      }
    })
  }

  useEffect(()=>{
    const changeColor = async()=>{
          await clickMe()
    }
    changeColor();
  },[color])

  return (
    <>
        <HexAlphaColorPicker color={color} onChange={setColor}/>
    </>
  )
}

export default App
