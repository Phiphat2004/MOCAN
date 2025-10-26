import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Điều khoản & Điều kiện</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Điều khoản sử dụng</h2>
          <p className="mb-4">
            Bằng cách truy cập và sử dụng website này, bạn đồng ý tuân theo các điều khoản và điều kiện sau đây. 
            Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, vui lòng không sử dụng website của chúng tôi.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Tài khoản người dùng</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Bạn phải đủ 18 tuổi để tạo tài khoản</li>
            <li>Thông tin tài khoản phải chính xác và cập nhật</li>
            <li>Bạn chịu trách nhiệm bảo mật tài khoản của mình</li>
            <li>Chúng tôi có quyền từ chối dịch vụ hoặc xóa tài khoản vi phạm điều khoản</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Đơn hàng và thanh toán</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Giá sản phẩm có thể thay đổi mà không cần báo trước</li>
            <li>Đơn hàng chỉ được xác nhận sau khi thanh toán thành công</li>
            <li>Chúng tôi có quyền từ chối hoặc hủy đơn hàng vì lý do bảo mật</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Sở hữu trí tuệ</h2>
          <p className="mb-4">
            Tất cả nội dung trên website bao gồm hình ảnh, logo, văn bản đều thuộc quyền sở hữu của ECOSOAP.COMPANY. 
            Nghiêm cấm sao chép, sử dụng mà không được sự cho phép.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Giới hạn trách nhiệm</h2>
          <p className="mb-4">
            ECOSOAP.COMPANY không chịu trách nhiệm về bất kỳ thiệt hại nào phát sinh từ việc sử dụng hoặc không thể sử dụng website này.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Thay đổi điều khoản</h2>
          <p className="mb-4">
            Chúng tôi có quyền cập nhật hoặc thay đổi các điều khoản này bất cứ lúc nào. 
            Việc tiếp tục sử dụng website sau khi thay đổi đồng nghĩa với việc bạn chấp nhận những thay đổi đó.
          </p>
        </section>
      </div>
    </div>
  );
}