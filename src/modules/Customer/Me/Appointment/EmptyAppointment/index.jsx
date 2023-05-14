import React from 'react';
import './EmptyAppointment.scss';

const EmptyAppointment = (props) => {
  const { status } = props;

  let titleName = '';
  let desc = '';
  switch (status) {
    case 'new-or-offered':
      titleName = 'Chưa có Yêu cầu nào.';
      desc = 'Hãy tiếp tục tìm Thợ để giúp bạn giải quyết vấn đề nhé!';
      break;
    case 'appointed':
      titleName = 'Chưa có Lịch hẹn nào.';
      desc = 'Bạn vẫn đang giải quyết các vấn đề một mình mà không cần bất kỳ Thợ nào?';
      break;
    case 'done':
      titleName = 'Chưa có lịch hẹn nào hoàn thành.';
      desc =
        'Hãy kiên nhẫn và đợi cho đến khi Thợ hoàn thành công việc của họ.  Và hãy nhớ nhấn “Hoàn thành Lịch hẹn” khi công việc đã hoàn tất.';
      break;
    case 'canceled':
      titleName = 'Chưa có lịch hẹn nào bị hủy.';
      desc = 'Thật tuyệt vời!';
      break;
    default:
      break;
  }
  return (
    <div className="empty-appointment">
      <img src="https://oddjob.vn/assets/images/trash.svg" alt="no-appointment" />
      <div className="empty-tab">
        <p>{titleName}</p>
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default EmptyAppointment;
