import React from "react";

export default function DeliveryDetails() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">🚚 Chi Tiết Giao Hàng</h1>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Tại Ecosoap, chúng tôi luôn nỗ lực mang đến cho khách hàng trải nghiệm
          mua sắm thuận tiện và nhanh chóng. Mọi đơn hàng được xử lý cẩn thận,
          đóng gói an toàn và giao đến tận tay bạn trong thời gian sớm nhất –
          xuất phát trực tiếp từ Cần Thơ.
        </p>
      </div>

      <div className="space-y-8">
        {/* Phương thức vận chuyển */}
        <section className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">
            📦 Phương Thức Vận Chuyển
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-4">
                1. Giao hàng tiêu chuẩn
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>Thời gian: 3 – 5 ngày làm việc</p>
                <p>Phí vận chuyển: 30.000đ</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-4">2. Giao hàng nhanh</h3>
              <div className="space-y-2 text-gray-600">
                <p>Thời gian: 1 – 2 ngày làm việc</p>
                <p>Phí vận chuyển: 45.000đ</p>
              </div>
            </div>
          </div>
        </section>

        {/* Khu vực giao hàng */}
        <section className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">🗺️ Khu Vực Giao Hàng</h2>
          <p className="mb-4 text-gray-600">
            Chúng tôi giao hàng toàn quốc thông qua các đối tác vận chuyển uy
            tín.
          </p>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <ul className="space-y-3 text-gray-600">
              <li>• Khu vực nội thành Cần Thơ: giao trong 24 giờ</li>
              <li>• Các tỉnh miền Tây: 1 – 2 ngày</li>
              <li>• Khu vực miền Trung & miền Nam khác: 3 – 5 ngày</li>
              <li>• Miền Bắc & vùng xa: 5 – 7 ngày</li>
            </ul>
          </div>
        </section>

        {/* Chính sách giao hàng */}
        <section className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">
            🌿 Chính Sách Giao Hàng
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <ul className="space-y-3 text-gray-600">
              <li>• Miễn phí giao hàng cho đơn hàng từ 500.000đ trở lên</li>
              <li>• Giao hàng từ Thứ Hai đến Thứ Bảy (trừ ngày lễ)</li>
              <li>
                • Theo dõi đơn hàng qua tin nhắn SMS hoặc ứng dụng vận chuyển
              </li>
              <li>
                • Hỗ trợ thanh toán khi nhận hàng (COD) hoặc chuyển khoản trước
              </li>
            </ul>
          </div>
        </section>

        {/* Lưu ý khi nhận hàng */}
        <section className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">
            🧾 Lưu Ý Khi Nhận Hàng
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <ul className="space-y-3 text-gray-600">
              <li>• Kiểm tra kỹ tình trạng gói hàng trước khi ký nhận</li>
              <li>
                • Quý khách có quyền từ chối nhận hàng nếu phát hiện gói hàng bị
                hư hỏng hoặc không đúng sản phẩm
              </li>
              <li>
                • Giữ lại biên nhận và hóa đơn để thuận tiện cho việc đổi/trả
                khi cần thiết
              </li>
            </ul>
          </div>
        </section>

        {/* Kết */}
        <section className="bg-green-50 p-6 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-6">
            💚 Ecosoap – Giao tận nơi, an toàn và tận tâm
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Từ Cần Thơ, chúng tôi mang đến cho bạn những bánh xà phòng
              handmade thuần khiết, gói ghém tình yêu dành cho làn da và môi
              trường.
            </p>
            <p>
              Dù bạn ở bất cứ đâu, Ecosoap luôn sẵn sàng giao hàng nhanh chóng,
              an toàn và trọn vẹn đến tay bạn.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
