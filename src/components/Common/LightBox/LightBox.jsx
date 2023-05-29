import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import ImageExample from '../../../assets/images/image-example.png';
export default function LightBox(props) {
  const { isOpen, src, handleSetOpen } = props;
  return <div>{isOpen && <Lightbox mainSrc={src ? src : ImageExample} onCloseRequest={handleSetOpen} />}</div>;
}
