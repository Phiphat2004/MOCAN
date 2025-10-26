import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Chính sách bảo mật</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Thu thập thông tin</h2>
          <p className="mb-4">
            Chúng tôi thu thập các thông tin sau khi bạn cung cấp:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Họ tên</li>
            <li>Địa chỉ email</li>
            <li>Số điện thoại</li>
            <li>Địa chỉ giao hàng</li>
            <li>Thông tin thanh toán</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Mục đích sử dụng thông tin</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Xử lý đơn hàng và giao hàng</li>
            <li>Liên lạc về đơn hàng và dịch vụ</li>
            <li>Gửi thông tin khuyến mãi (nếu được cho phép)</li>
            <li>Cải thiện sản phẩm và dịch vụ</li>
            <li>Phân tích hành vi người dùng</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Bảo mật thông tin</h2>
          <p className="mb-4">
            Chúng tôi cam kết:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Mã hóa thông tin thanh toán</li>
            <li>Không chia sẻ thông tin với bên thứ ba</li>
            <li>Bảo vệ dữ liệu bằng các biện pháp an ninh hiện đại</li>
            <li>Chỉ cho phép nhân viên được ủy quyền truy cập thông tin</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Quyền của người dùng</h2>
          <p className="mb-4">
            Bạn có quyền:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Yêu cầu xem thông tin cá nhân của mình</li>
            <li>Yêu cầu cập nhật hoặc sửa đổi thông tin</li>
            <li>Yêu cầu xóa thông tin</li>
            <li>Từ chối nhận email marketing</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Cookie và công nghệ theo dõi</h2>
          <p className="mb-4">
            Website của chúng tôi sử dụng cookie để cải thiện trải nghiệm người dùng. 
            Bạn có thể tắt cookie trong trình duyệt, tuy nhiên điều này có thể ảnh hưởng đến một số tính năng của website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Liên hệ</h2>
          <p className="mb-4">
            Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật của chúng tôi, vui lòng liên hệ:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Email: privacy@ecosoap.company</li>
            <li>Điện thoại: 1900 xxxx</li>
          </ul>
        </section>
      </div>
    </div>
  );
}