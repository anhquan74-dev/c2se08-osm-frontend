import React from 'react';
import closeIcon from '../../../../assets/images/closeIcon.png';
import onlineIcon from '../../../../assets/images/onlineIcon.png';
import DefaultAvatar from '../../../../assets/images/default-avatar.png';
import './InfoBar.css';
export default function InfoBar(props) {
  const { providerInfo, setIsShow } = props;
  const handleClose = () => {
    setIsShow(false);
    console.log('da dong');
  };
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img
          className="messageAvatar"
          src={providerInfo?.avatar?.url ? providerInfo?.avatar?.url : DefaultAvatar}
          alt="close icon"
        />

        <h3>{providerInfo?.full_name}</h3>
      </div>
      <div className="rightInnerContainer" onClick={handleClose}>
        <img src={closeIcon} alt="close icon" />
      </div>
    </div>
  );
}
