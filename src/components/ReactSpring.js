import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import '../../src/tester.css'

const ReactSpring = () => {
  const [isVisible, setIsvisible] = useState(false);
  const transition = useTransition(isVisible, {
    from: { x: -100, y: 800, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: 100, y: 800, opacity: 0 }
  })

  return (
    <div id='tester'>
      <button onClick={() => {setIsvisible(v => !v)}}>
        {isVisible ? 'un-mount' : 'mount'}    
      </button>
      <div className='container'>
          {transition((style, item) => 
              item ? <animated.div style={style} className="item" /> : ""
          )}
      </div>
    </div>
  )
}

export default ReactSpring