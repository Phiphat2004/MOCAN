import React from "react";

export default function CustomerSupport() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">🤝 Hỗ trợ khách hàng</h1>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng bạn trong suốt quá
          trình mua sắm và trải nghiệm sản phẩm Ecosoap. Nếu bạn có bất kỳ thắc
          mắc hoặc cần hỗ trợ, đừng ngần ngại liên hệ với chúng tôi qua các kênh
          sau:
        </p>
      </div>

      <div className="space-y-12">
        {/* Contact Section */}
        <section className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">
            📞 Liên hệ với chúng tôi
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="font-medium min-w-[120px]">Email:</span>
              <span className="text-gray-600">mocan.naturalsoap@gmail.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-medium min-w-[120px]">Hotline:</span>
              <span className="text-gray-600">032 951 7752</span>
            </div>
            <div className="flex items-center space-x-3">
              <a
                href="https://www.facebook.com/profile.php?id=61581265658896"
                className="font-medium min-w-[120px]"
              >
                Facebook:
              </a>
              <span className="text-gray-600">EcoSoap</span>
            </div>
          </div>
        </section>

        {/* Working Hours Section */}
        <section className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">🕓 Thời gian làm việc</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="font-medium min-w-[180px]">
                Thứ Hai – Thứ Sáu:
              </span>
              <span className="text-gray-600">8:30 – 17:30</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-medium min-w-[180px]">
                Thứ Bảy – Chủ Nhật:
              </span>
              <span className="text-gray-600">8:30 – 16:00</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-medium min-w-[180px]">Ngày lễ:</span>
              <span className="text-gray-600">Nghỉ</span>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">
            💡 Các vấn đề thường gặp
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium mb-3">1. Theo dõi đơn hàng</h3>
              <p className="text-gray-600 leading-relaxed">
                Sau khi đặt mua thành công, Ecosoap sẽ gửi email xác nhận và cập
                nhật trạng thái đơn hàng của bạn. Bạn có thể theo dõi tiến trình
                giao hàng trực tiếp qua email được gửi từ chúng tôi – bao gồm
                thông tin vận chuyển, mã đơn và thời gian dự kiến giao. Nếu cần
                hỗ trợ thêm, vui lòng liên hệ đội ngũ chăm sóc khách hàng qua
                email hoặc hotline để được kiểm tra nhanh nhất.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3">
                2. Thay đổi thông tin đơn hàng
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Nếu bạn muốn chỉnh sửa địa chỉ giao hàng, số điện thoại hoặc
                thông tin thanh toán, vui lòng liên hệ với đội ngũ hỗ trợ trong
                vòng 24 giờ sau khi đặt hàng để được xử lý nhanh nhất.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3">
                3. Chính sách đổi trả
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Ecosoap chấp nhận đổi hoặc trả hàng trong vòng 7 ngày kể từ ngày
                nhận, với điều kiện sản phẩm chưa qua sử dụng, còn nguyên bao bì
                và tem nhãn. Chúng tôi cam kết mang đến cho bạn trải nghiệm mua
                sắm an tâm và hài lòng nhất.
              </p>
            </div>
          </div>
        </section>

        {/* Closing Message */}
        <section className="bg-green-50 p-6 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-6">
             Luôn bên bạn – Vì làn da và hành tinh xanh
          </h2>
          <div className="space-y-4 text-gray-600 max-w-3xl mx-auto">
            <p>Cảm ơn bạn đã tin tưởng và lựa chọn Ecosoap.</p>
            <p>
              Chúng tôi không chỉ mang đến sản phẩm chăm sóc da tự nhiên mà còn
              gửi gắm trong đó tình yêu với môi trường và sức khỏe con người.
            </p>
            <p>
              Nếu bạn cần hỗ trợ, góp ý hay chia sẻ trải nghiệm, hãy liên hệ với
              chúng tôi – Ecosoap luôn ở đây để lắng nghe và phục vụ bạn.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
