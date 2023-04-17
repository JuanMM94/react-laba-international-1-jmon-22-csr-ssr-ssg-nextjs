import React from 'react';
import Image from 'next/image';
import addAvatarSvg from '@/assets/add-avatar-button.svg';
import classes from '@/styles/AddAvatarBtn.module.css';

export default function AddAvatarBtn(props) {
  return (
    <Image
      src={addAvatarSvg}
      alt="Add Avatar"
      className={classes.addAvatarBtn}
      onClick={props.addAvatar}
    />
  );
}
