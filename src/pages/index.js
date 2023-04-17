import React from 'react';
import AddAvatarBtn from '@/components/AddAvatarBtn';
import AvatarList from '@/components/AvatarList';
import RefreshAllBtn from '@/components/RefreshAllBtn';
import classes from '@/styles/MainContainer.module.css';

const apiURL = 'https://tinyfac.es/api/data';

export async function getServerSideProps() {
  try {
    const response = await fetch(`${apiURL}?limit=5&quality=0`);
    const json = await response.json();

    if (response.status === 429) {
      return {
        props: {
          initialAvatars: [],
        },
      };
    }

    return {
      props: {
        initialAvatars: json,
      },
    };
  } catch (error) {
    console.error('getServerSideProps', error);
  }
}

export default function MainContainer(props) {
  const [avatars, setAvatars] = React.useState([]);
  const [isFetchingAvatar, setIsFetchingAvatar] = React.useState(false);

  React.useEffect(() => {
    if (props.initialAvatars.length > 0) setAvatars(props.initialAvatars);
  }, []);

  const handleFetchAvatar = async () => {
    if (isFetchingAvatar) return;

    setIsFetchingAvatar(true);

    try {
      const response = await fetch(`${apiURL}?limit=1&quality=0`);

      if (response.status === 429) {
        alert('Too many requests!');
      }

      const json = await response.json();
      const avatar = json[0];

      if (avatar) setAvatars(prevState => [...prevState, avatar]);
    } catch (error) {
      console.log(error);
    }

    setIsFetchingAvatar(false);
  };

  const refreshAvatar = (oldAvatar, newAvatar) => {
    const oldAvatarIndex = avatars.findIndex(
      avatar => avatar.id === oldAvatar.id,
    );

    const avatarsArray = [...avatars];
    avatarsArray[oldAvatarIndex] = newAvatar;

    setAvatars(avatarsArray);
  };

  const refreshAll = async () => {
    if (avatars.length < 1) return;

    try {
      const response = await fetch(
        `${apiURL}?limit=${avatars.length}&quality=0`,
      );

      if (response.status === 429) {
        return alert('Too many requests!');
      }

      const newAvatars = await response.json();
      setAvatars(newAvatars);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.avatars}>
        <AvatarList
          avatars={avatars}
          refreshAvatar={refreshAvatar}
          apiURL={apiURL}
        />
        <AddAvatarBtn addAvatar={handleFetchAvatar} />
      </div>
      <RefreshAllBtn refreshAll={refreshAll} />
    </div>
  );
}
