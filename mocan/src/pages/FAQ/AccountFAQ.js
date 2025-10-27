import React from 'react';

export default function AccountFAQ() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Câu hỏi thường gặp về Tài khoản</h1>
      
      <div className="space-y-6">
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">1. Làm thế nào để tạo tài khoản?</h2>
            <p>
              Bạn có thể tạo tài khoản bằng cách nhấp vào nút "Đăng ký" ở góc phải trên cùng của trang web. 
              Điền đầy đủ thông tin cá nhân và làm theo hướng dẫn để hoàn tất quá trình đăng ký.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. Tôi quên mật khẩu phải làm sao?</h2>
            <p>
              Nhấp vào liên kết "Quên mật khẩu?" trên trang đăng nhập. 
              Nhập địa chỉ email đã đăng ký và làm theo hướng dẫn để đặt lại mật khẩu.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3. Làm thế nào để thay đổi thông tin cá nhân?</h2>
            <p>
              Đăng nhập vào tài khoản, vào mục "Thông tin cá nhân" trong dashboard. 
              Tại đây bạn có thể cập nhật thông tin như địa chỉ, số điện thoại, v.v.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. Tài khoản của tôi bị khóa?</h2>
            <p>
              Tài khoản có thể bị khóa vì nhiều lý do như đăng nhập sai nhiều lần hoặc vi phạm điều khoản sử dụng. 
              Vui lòng liên hệ bộ phận hỗ trợ để được giúp đỡ.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Làm sao để xóa tài khoản?</h2>
            <p>
              Để xóa tài khoản, vui lòng liên hệ với bộ phận hỗ trợ khách hàng. 
              Lưu ý rằng hành động này không thể hoàn tác và tất cả dữ liệu sẽ bị xóa vĩnh viễn.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6. Làm sao để thay đổi email đăng nhập?</h2>
            <p>
              Hiện tại chúng tôi không hỗ trợ thay đổi email đăng nhập để đảm bảo tính bảo mật. 
              Nếu bạn cần sử dụng email khác, vui lòng tạo tài khoản mới.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">7. Tài khoản có thể dùng cho nhiều thiết bị không?</h2>
            <p>
              Có, bạn có thể đăng nhập tài khoản trên nhiều thiết bị khác nhau. 
              Tuy nhiên, vì lý do bảo mật, chúng tôi có thể giới hạn số lượng thiết bị đăng nhập cùng lúc.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}