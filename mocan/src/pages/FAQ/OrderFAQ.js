import React from 'react';

export default function OrderFAQ() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Câu hỏi thường gặp về Đơn hàng</h1>
      
      <div className="space-y-6">
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">1. Làm sao để đặt hàng?</h2>
            <p>
              - Chọn sản phẩm và thêm vào giỏ hàng<br />
              - Nhấp vào biểu tượng giỏ hàng<br />
              - Kiểm tra đơn hàng và nhấn "Thanh toán"<br />
              - Điền thông tin giao hàng<br />
              - Chọn phương thức thanh toán và hoàn tất
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. Làm sao để xem lịch sử đơn hàng?</h2>
            <p>
              Đăng nhập vào tài khoản và vào mục "Đơn hàng của tôi" để xem tất cả các đơn hàng trước đây và trạng thái hiện tại của chúng.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3. Có thể thay đổi hoặc hủy đơn hàng không?</h2>
            <p>
              - Thay đổi: Có thể trong vòng 24h sau khi đặt<br />
              - Hủy: Có thể trước khi đơn hàng được giao cho đơn vị vận chuyển<br />
              - Liên hệ CSKH để được hỗ trợ các trường hợp khác
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. Các trạng thái đơn hàng nghĩa là gì?</h2>
            <p>
              - Chờ xác nhận: Đơn hàng mới được đặt<br />
              - Đã xác nhận: Đơn hàng đã được duyệt<br />
              - Đang chuẩn bị: Đang đóng gói sản phẩm<br />
              - Đang giao: Đã giao cho đơn vị vận chuyển<br />
              - Đã giao: Khách hàng đã nhận hàng<br />
              - Đã hủy: Đơn hàng bị hủy
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Chính sách đổi/trả hàng?</h2>
            <p>
              - Thời gian: Trong vòng 7 ngày kể từ ngày nhận hàng<br />
              - Điều kiện: Sản phẩm còn nguyên vẹn, chưa sử dụng<br />
              - Cách thức: Liên hệ CSKH để được hướng dẫn
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6. Làm sao để nhận hóa đơn?</h2>
            <p>
              - Hóa đơn điện tử sẽ được gửi qua email<br />
              - Có thể tải về từ trang chi tiết đơn hàng<br />
              - Liên hệ CSKH nếu cần hóa đơn giấy
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">7. Đơn hàng tối thiểu là bao nhiêu?</h2>
            <p>
              Không có giá trị đơn hàng tối thiểu. Tuy nhiên, đơn hàng từ 500.000đ sẽ được miễn phí vận chuyển.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}