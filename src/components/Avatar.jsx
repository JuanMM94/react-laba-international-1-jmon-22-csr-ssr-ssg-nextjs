import React from 'react';
import Image from 'next/image';
import Loader from '@/components/Loader';
import refreshAvatarSvg from '@/assets/refresh-avatar-button.svg';
import classes from '@/styles/Avatar.module.css';

export default function Avatar(props) {
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleRefresh = async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);

    try {
      const response = await fetch(`${props.apiURL}?limit=1&quality=0`);

      if (response.status === 429) {
        alert('Too many requests!');
      }

      const json = await response.json();
      const avatar = json[0];

      if (avatar) {
        props.refreshAvatar(props.avatar, avatar);
      }

      setIsRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.avatar}>
      {!isLoading && (
        <>
          <div className={classes.avatar__opacity} />
          <div className={classes.avatar__onTop} onClick={handleRefresh}>
            <Image src={refreshAvatarSvg} alt="Refresh Avatar" />
          </div>
        </>
      )}
      <img
        src={props.avatar.url}
        onLoad={handleImageLoad}
        className={classes.avatar__img}
      />
      {isLoading && <Loader />}
    </div>
  );
}
