/*cài đặt Axios để tương tác với API endpoint và thiết lập các yêu cầu tới Laravel API */
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

/* view all lessons*/
export async function fetchLessons() {
  const response = await axios.get(`${API_BASE_URL}/api/lessons`);
  return response.data;
}
/* getStaticProps: dùng để lấy data tại thời điểm build time và tạo pre-rendered HTML */
/* getStaticPaths: dùng khi có nhiều dynamic routes, 
giúp Next.js biết được những routes cần pre-render và sẽ generate trước những pages tương ứng */
/* getServerSideProps: dùng để fetch data từ server tại thời điểm request,
 không dùng được khi muốn pre-render HTML trước và cache lại */
/* useEffect: dùng khi muốn fetch data tại thời điểm component được mount */