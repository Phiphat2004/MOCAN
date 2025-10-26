import React from 'react';

export default function PaymentFAQ() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Câu hỏi thường gặp về Thanh toán</h1>
      
      <div className="space-y-6">
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">1. Các phương thức thanh toán?</h2>
            <p>
              Chúng tôi chấp nhận các hình thức thanh toán sau:<br />
              - Thanh toán khi nhận hàng (COD)<br />
              - Chuyển khoản ngân hàng<br />
              - Thẻ tín dụng/ghi nợ<br />
              - Ví điện tử (Momo, ZaloPay, VNPay)
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. Thanh toán online có an toàn không?</h2>
            <p>
              Có, tất cả các giao dịch đều được mã hóa và bảo mật. 
              Chúng tôi sử dụng các cổng thanh toán uy tín và đảm bảo an toàn cho thông tin của khách hàng.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3. Làm sao để nhận hóa đơn VAT?</h2>
            <p>
              - Chọn option "Xuất hóa đơn VAT" khi thanh toán<br />
              - Điền đầy đủ thông tin công ty<br />
              - Hóa đơn sẽ được gửi qua email trong vòng 3-5 ngày làm việc
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. Giao dịch bị lỗi phải làm sao?</h2>
            <p>
              Nếu gặp lỗi khi thanh toán:<br />
              - Chụp màn hình lỗi<br />
              - Lưu lại mã giao dịch (nếu có)<br />
              - Liên hệ CSKH để được hỗ trợ
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Thời gian hoàn tiền?</h2>
            <p>
              - Hủy đơn: 3-5 ngày làm việc<br />
              - Đổi/trả hàng: 5-7 ngày làm việc<br />
              Thời gian có thể khác nhau tùy theo ngân hàng và phương thức thanh toán.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6. Có thể thay đổi phương thức thanh toán không?</h2>
            <p>
              Có thể thay đổi phương thức thanh toán trước khi đơn hàng được xác nhận. 
              Sau đó, vui lòng hủy đơn hàng cũ và đặt lại đơn mới.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">7. Mã giảm giá không hoạt động?</h2>
            <p>
              Kiểm tra:<br />
              - Mã có còn hiệu lực không<br />
              - Đơn hàng có đủ điều kiện áp dụng<br />
              - Mã đã được nhập chính xác<br />
              Liên hệ CSKH nếu vẫn gặp vấn đề.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}