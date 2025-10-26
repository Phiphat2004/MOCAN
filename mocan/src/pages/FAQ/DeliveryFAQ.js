import React from 'react';

export default function DeliveryFAQ() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Câu hỏi thường gặp về Quản lý giao hàng</h1>
      
      <div className="space-y-6">
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">1. Làm sao để theo dõi đơn hàng?</h2>
            <p>
              Đăng nhập vào tài khoản và vào mục "Đơn hàng của tôi". 
              Tại đây bạn có thể xem trạng thái và vị trí hiện tại của đơn hàng.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. Thời gian giao hàng là bao lâu?</h2>
            <p>
              - Nội thành: 1-2 ngày<br />
              - Các tỉnh lân cận: 2-3 ngày<br />
              - Tỉnh xa: 3-5 ngày<br />
              Lưu ý: Thời gian có thể thay đổi tùy theo điều kiện thời tiết và khu vực.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3. Có thể thay đổi địa chỉ giao hàng không?</h2>
            <p>
              Bạn có thể thay đổi địa chỉ giao hàng trước khi đơn hàng được xử lý. 
              Sau đó, vui lòng liên hệ trực tiếp với bộ phận CSKH để được hỗ trợ.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. Phí vận chuyển được tính như thế nào?</h2>
            <p>
              Phí vận chuyển được tính dựa trên:<br />
              - Khoảng cách giao hàng<br />
              - Trọng lượng đơn hàng<br />
              - Phương thức vận chuyển bạn chọn
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Tôi không nhận được đơn hàng đúng hẹn?</h2>
            <p>
              Nếu đơn hàng bị trễ, vui lòng:<br />
              - Kiểm tra trạng thái đơn hàng trong tài khoản<br />
              - Liên hệ bộ phận CSKH qua hotline hoặc email<br />
              - Chúng tôi sẽ kiểm tra và phản hồi trong vòng 24h
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6. Có giao hàng vào cuối tuần không?</h2>
            <p>
              Có, chúng tôi vẫn giao hàng vào thứ 7. 
              Tuy nhiên, chúng tôi không giao hàng vào Chủ nhật và các ngày lễ.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">7. Làm sao để hủy đơn hàng?</h2>
            <p>
              Bạn có thể hủy đơn hàng trong vòng 24h sau khi đặt hàng và trước khi đơn hàng được giao cho đơn vị vận chuyển. 
              Sau thời gian này, vui lòng liên hệ CSKH để được hỗ trợ.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}