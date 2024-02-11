import React from 'react'
import '../css/Help/Help.css';

export function HelpPage({helpHeading, help}) {
  return (
    <div className='Help'>
      <div className='Help_Heading'>{helpHeading?.[0]}</div>
      <div className='Help_Text'>{help?.[0]}</div>
      <div className='Help_Heading'>{helpHeading?.[1]}</div>
      <div className='Help_Text'>{help?.[1]}</div>
      <div className='Help_Heading'>{helpHeading?.[2]}</div>
      <div className='Help_Text'>{help?.[2]}</div>

    </div>
  )
}
