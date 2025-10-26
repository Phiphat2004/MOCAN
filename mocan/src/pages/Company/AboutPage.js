import React from "react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Giới thiệu</h1>

      <div className="space-y-6">
        <p className="text-gray-700 leading-relaxed">
          Tại EcoSoap, chúng tôi tin rằng làn da xứng đáng được chăm sóc bằng
          những gì tinh khiết nhất từ thiên nhiên. Mỗi bánh xà phòng được tạo
          nên từ nguyên liệu thực vật tự nhiên, tinh dầu nguyên chất và quy
          trình thủ công tỉ mỉ, mang đến trải nghiệm dịu nhẹ, an toàn và đầy thư
          giãn.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Chúng tôi không chỉ làm xà phòng — chúng tôi tạo ra sự kết nối giữa
          con người và thiên nhiên, giữa sự chăm sóc bản thân và bảo vệ môi
          trường. Từng sản phẩm đều được sản xuất với tâm huyết, không thử
          nghiệm trên động vật và nói không với hóa chất độc hại.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Hãy để EcoSoap đồng hành cùng bạn trên hành trình sống xanh, sạch và
          lành — từ những điều nhỏ bé nhất mỗi ngày.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">Tự nhiên</h3>
            <p className="text-gray-600">
              100% nguyên liệu từ thiên nhiên, an toàn cho mọi loại da
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">Thủ công</h3>
            <p className="text-gray-600">
              Quy trình sản xuất thủ công, tỉ mỉ từng chi tiết
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">Bền vững</h3>
            <p className="text-gray-600">
              Thân thiện với môi trường, đóng gói tối giản
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Đội ngũ của chúng tôi
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Thành viên 1 */}
            <div className="text-center">
              <img
                src="/assets/hueanh.jpg"
                alt="Huệ Anh"
                className="w-32 h-32 mx-auto mb-4 rounded-full object-cover border-2 border-green-200"
              />
              <h3 className="font-semibold text-lg">Huệ Anh</h3>
              <p className="font-medium text-gray-700">CFO</p>
              <p className="text-gray-600">
                Quản lý tài chính & kế hoạch đầu tư
              </p>
            </div>

            {/* Thành viên 2 */}
            <div className="text-center">
              <img
                src="/assets/phiphat2.jpg"
                alt="Phi Phát"
                className="w-32 h-32 mx-auto mb-4 rounded-full object-cover border-2 border-green-200"
              />
              <h3 className="font-semibold text-lg">Phi Phát</h3>
              <p className="font-medium text-gray-700">CEO, CTO</p>
              <p className="text-gray-600">
                Giám đốc điều hành & phát triển công nghệ
              </p>
            </div>

            {/* Thành viên 3 */}
            <div className="text-center">
              <img
                src="/assets/phuongvy.jpg"
                alt="Phượng Vy"
                className="w-32 h-32 mx-auto mb-4 rounded-full object-cover border-2 border-green-200"
              />
              <h3 className="font-semibold text-lg">Phượng Vy</h3>
              <p className="font-medium text-gray-700">COO</p>
              <p className="text-gray-600">Vận hành & quản lý hệ thống</p>
            </div>

            {/* Thành viên 4 */}
            <div className="text-center">
              <img
                src="/assets/thanhdat.jpg"
                alt="Thành Đạt"
                className="w-32 h-32 mx-auto mb-4 rounded-full object-cover border-2 border-green-200"
              />
              <h3 className="font-semibold text-lg">Thành Đạt</h3>
              <p className="font-medium text-gray-700">CMO</p>
              <p className="text-gray-600">
                Chiến lược marketing & phát triển thương hiệu
              </p>
            </div>

            {/* Thành viên 5 */}
            <div className="text-center">
              <img
                src="/assets/trungnhan.jpg"
                alt="Trung Nhân"
                className="w-32 h-32 mx-auto mb-4 rounded-full object-cover border-2 border-green-200"
              />
              <h3 className="font-semibold text-lg">Trung Nhân</h3>
              <p className="font-medium text-gray-700">Brand Designer</p>
              <p className="text-gray-600">
                Thiết kế nhận diện & định hình thương hiệu
              </p>
            </div>

            {/* Thành viên 6 */}
            <div className="text-center">
              <img
                src="/assets/minhkhoi2.jpg"
                alt="Minh Khôi"
                className="w-32 h-32 mx-auto mb-4 rounded-full object-cover border-2 border-green-200"
              />
              <h3 className="font-semibold text-lg">Minh Khôi</h3>
              <p className="font-medium text-gray-700">Creative Designer</p>
              <p className="text-gray-600">Thiết kế sáng tạo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
