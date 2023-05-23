import React from 'react';
import closeIcon from '../../../../assets/images/closeIcon.png';
import onlineIcon from '../../../../assets/images/onlineIcon.png';
import DefaultAvatar from '../../../../assets/images/default-avatar.png';
import './InfoBar.css';
import { Close } from '@mui/icons-material';
export default function InfoBar(props) {
  const { providerInfo, handleCloseChat } = props;
  // const handleClose = () => {
  //   setIsShow(false);
  //   console.log('da dong');
  // };
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img
          className="messageAvatar"
          src={providerInfo?.avatar?.url ? providerInfo?.avatar?.url : DefaultAvatar}
          alt="close icon"
        />

        <h3>{providerInfo?.full_name}</h3>
        {/* <Icon color="white" /> */}
      </div>
      <div className="rightInnerContainer">
        <Close sx={{ color: 'white' }} onClick={handleCloseChat} />
      </div>
    </div>
  );
}
