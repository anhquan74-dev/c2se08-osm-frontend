import { AccessTime } from '@mui/icons-material';
import { Breadcrumbs, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import NewsItem from '../../components/NewsItem';
import './NewsDetailPage.scss';

const NewsDetailPage = () => {
  return (
    <div className="news-detail">
      <div className="container">
        <div className="news-content">
          <div className="break-crum">
            <Breadcrumbs aria-label="breadcrumb">
              <NavLink to="/">Trang chủ</NavLink>
              <NavLink to="/">Blog</NavLink>
              <Typography color="text.primary">NHỮNG THÓI QUEN XẤU KHI DỌN DẸP NHÀ CỬA</Typography>
            </Breadcrumbs>
          </div>
          <div className="main">
            <p className="category">Dọn dẹp nhà cửa</p>
            <h3 className="title">NHỮNG THÓI QUEN XẤU KHI DỌN DẸP NHÀ CỬA</h3>
            <div className="time">
              <AccessTime />
              <span>2022-06-22</span>
            </div>
            <div className="content">
              Những thói quen xấu trong việc vệ sinh nhà ở sẽ làm bạn cảm thấy mất thời gian và mệt mỏi. Chỉ cần sửa
              được những thói quen sau sẽ giúp bạn tiết kiệm được nhiều thời gian trong việc dọn dẹp căn nhà của mình,
              đồng thời cũng mang lại hiệu quả cao. Tích tụ giấy tờ lộn xộn Báo cũ, tạp chí, giấy kiểm tra, tài liệu hay
              các loại hóa đơn… nằm rải rác ở khắp mọi nơi trong nhà. Để tránh tình trạng này, hãy chọn một vị trí gần
              lối đi, đặt một thùng rác chuyên để giấy tờ ở đó. Ít nhất một lần mỗi tuần, hãy phân loại giấy tờ và thực
              hiện hành động cần thiết, chẳng hạn chụp ảnh các tranh vẽ của trẻ con để lưu trữ hoặc đóng khung treo
              tường. Để khăn ướt cạnh rèm phòng tắm Bạn muốn dành ít thời gian hơn trong phòng giặt là và chà sạch nấm
              mốc trên bề mặt phòng tắm? Đừng để rèm phòng tắm ướt bó lại và khăn ướt chất thành đống trên sàn. Đây là
              một trong những thói quen xấu căn bản nhất cần được loại bỏ. Bằng cách đóng rèm phòng tắm sau mỗi lần sử
              dụng, rèm sẽ nhanh khô hơn và ngăn nấm mốc phát triển. Bằng cách treo khăn ướt cho khô, bạn sẽ có lần sử
              dụng thứ hai hoặc thứ ba với một chiếc khăn không hề ẩm mốc cũng không có mùi hôi khó chịu. Tích trữ thực
              phẩm thừa trong tủ lạnh Nếu bạn biết gia đình mình ghét ăn lại một món cũ, vậy tại sao lại phải cất đồ ăn
              thừa vào tủ lạnh? Hãy điều chỉnh lượng nguyên liệu dùng để nấu cho mỗi bữa, hoặc nếu lỡ dư thì nên tìm
              cách xử lý sớm nhất có thể. Thực phẩm được bảo quản không đúng cách sẽ khiến vi khuẩn và nấm mốc phát
              triển. Để bát đĩa bẩn trong bồn rửa Bồn rửa là nơi sinh sôi vi khuẩn dễ dàng và mời gọi ruồi muỗi kéo đến
              nếu bạn tiếp tục giữ thói quen để bát đĩa bẩn mà không rửa ngay. Mọi thành viên trong gia đình cần rèn
              thói quen tráng bát đĩa và cho vào bồn rửa, hoặc rửa bằng tay ngay sau khi sử dụng. Dùng quá nhiều sản
              phẩm tẩy rửa Sử dụng quá nhiều chất tẩy rửa hoặc bột giặt thực sự có thể gây hại nhiều hơn lợi. Nếu lượng
              sản phẩm tẩy rửa dư thừa không được rửa sạch hoàn toàn, cặn bẩn sẽ trở thành nam châm hút bụi bẩn, bám
              chặt đất. Đó là lý do tại sao bạn nên đọc hướng dẫn và luôn sử dụng số lượng được khuyến nghị hoặc thậm
              chí ít hơn một chút. Bạn đang lãng phí thời gian và tiền bạc vào sản phẩm bổ sung và nước để rửa sạch
              chúng. Làm sạch bằng các dụng cụ bẩn Làm thế nào bạn có thể mong đợi kết quả sạch sẽ khi bạn đang sử dụng
              các công cụ làm sạch bẩn? Nếu máy giặt của bạn có mùi do vi khuẩn tích tụ trong cặn bột giặt, quần áo của
              bạn sẽ bốc mùi. Nếu túi hoặc bộ lọc chân không của bạn chứa đầy bụi, nó sẽ không hoạt động tốt trong việc
              hút bụi nữa. Một cây lau nhà hoặc miếng bọt biển bẩn chỉ đơn giản là đẩy nhiều đất và vi khuẩn xung quanh
              hơn. Do đó, bạn cần đảm bảo dụng cụ dọn dẹp luôn sạch sẽ trước khi bạn muốn làm sạch bất cứ thứ gì trong
              nhà. Cất trữ sản phẩm làm sạch không đúng cách Bạn có phải loay hoay tìm chai xịt lau kính hay nước lau
              nhà mỗi khi cần đến chúng? Thay vì đặt các sản phẩm làm sạch ở lung tung trong nhà, bạn nên hình thành
              thói quen gom chúng thành từng nhóm nhỏ và để riêng ở các khu vực liên quan. Hãy sắm thêm xô đựng hoặc các
              kệ nhỏ dành riêng cho việc cất sản phẩm làm sạch khi không sử dụng. Dọn giường ngủ quá gọn gàng Ngay cả
              khi phần còn lại của phòng ngủ gọn gàng và sạch sẽ, một chiếc giường không được kê gọn dàng cũng sẽ khiến
              cả phòng trông lộn xộn. Chỉ dọn giường vào mỗi buổi sáng là một thói quen sẽ thúc đẩy việc giữ cho phần
              còn lại của căn phòng (và có thể là toàn bộ ngôi nhà) được ngăn nắp. Làm cho công việc trở nên đơn giản
              bằng cách chọn bộ đồ giường dễ trải lên một cách gọn gàng. Một chiếc giường với chăn bông và gối ôm đơn
              giản sẽ dễ làm hơn nhiều so với một chiếc giường có nhiều gối cầu kỳ.
            </div>
          </div>
        </div>
      </div>
      <div className="shared">
        <div className="content">
          <p>Hãy chia sẻ bài viết này cho</p>
          <div>
            <img src="https://oddjob.vn/blog/wp-content/themes/oddjob-blog-theme/img/facebook.svg" />
            <img src="https://oddjob.vn/blog/wp-content/themes/oddjob-blog-theme/img/zalo.svg" />
          </div>
        </div>
      </div>
      <div className="related container">
        <h3>Bài viết liên quan</h3>
        <div className="news-grid">
          <NewsItem />
          <NewsItem />
          <NewsItem />
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
