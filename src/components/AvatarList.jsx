import React from 'react';
import Avatar from '@/components/Avatar';

export default function AvatarList(props) {
  return (
    <>
      {props.avatars?.map(avatar => (
        <Avatar
          key={avatar.id}
          avatar={avatar}
          refreshAvatar={props.refreshAvatar}
          apiURL={props.apiURL}
        />
      ))}
    </>
  );
}
