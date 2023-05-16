import React from 'react';
import './EmptyAppointment.scss';

const EmptyAppointment = (props) => {
  const { status, type } = props;

  let titleName = '';
  let desc = '';
  if (type === 'customer') {
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
  } else {
    switch (status) {
      case 'new':
        titleName = 'Chưa nhận được lịch hẹn nào.';
        desc = 'Khi có khách hàng yêu cầu, lịch hẹn sẽ xuất hiện.';
        break;
      case 'offered':
        titleName = 'Chưa có lịch hẹn nào đã báo giá';
        desc = 'Hãy gửi báo giá đến một yêu cầu bất kỳ từ khách hàng.';
        break;
      case 'appointed':
        titleName = 'Chưa có lịch hẹn nào.';
        desc = 'Hãy đợi khách hàng chấp nhận báo giá của bạn.';
        break;
      case 'done':
        titleName = 'Chưa có lịch hẹn nào hoàn thành.';
        desc = 'Hãy hoàn thành công việc và đợi xác nhận từ khách hàng.';
        break;
      case 'canceled':
        titleName = 'Chưa có lịch hẹn nào bị hủy.';
        desc = 'Thật tuyệt vời!';
        break;
      default:
        break;
    }
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
