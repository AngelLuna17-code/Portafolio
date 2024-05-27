"use client";
import React, { useEffect, useState } from 'react';

const AnimatedText = () => {
  const data = [
    'Welcome back to this channel',
    'Hope you enjoy our tutorials',
    'We are trying our best for you',
    'Give your suggestions to improve',
    'If you like it, comment below'
  ];

  const [displayedText, setDisplayedText] = useState('');
  const [dataIndex, setDataIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [clearing, setClearing] = useState(false);

  const writtingTime = 50;
  const delayTime = 2500;
  const clearingTime = 15;
  const caretBlinking = 700;

  useEffect(() => {
    const root = document.querySelector(':root');

    if (clearing) {
      if (displayedText === '') {
        setClearing(false);
        setDataIndex((prevIndex) => (prevIndex + 1) % data.length);
      } else {
        const clearIntervalId = setInterval(() => {
          setDisplayedText((prevText) => prevText.slice(0, -1));
          root.style.setProperty('--caret-display', 'inline-block');
        }, clearingTime);
        return () => clearInterval(clearIntervalId);
      }
    } else {
      if (charIndex < data[dataIndex].length) {
        const writeIntervalId = setInterval(() => {
          setDisplayedText((prevText) => prevText + data[dataIndex][charIndex]);
          setCharIndex((prevIndex) => prevIndex + 1);
          root.style.setProperty('--caret-display', 'inline-block');
        }, writtingTime);
        return () => clearInterval(writeIntervalId);
      } else {
        setTimeout(() => {
          setClearing(true);
          setCharIndex(0);
        }, delayTime);
      }
    }
  }, [displayedText, clearing, charIndex, dataIndex]);

  useEffect(() => {
    const root = document.querySelector(':root');
    const caretIntervalId = setInterval(() => {
      const prop = getComputedStyle(root).getPropertyValue('--caret-display');
      root.style.setProperty('--caret-display', prop === 'none' ? 'inline-block' : 'none');
    }, caretBlinking);
    return () => clearInterval(caretIntervalId);
  }, []);

  return (
    <div>
      <h1>
        {displayedText}
      </h1>
    </div>

  );
};

export default AnimatedText;
