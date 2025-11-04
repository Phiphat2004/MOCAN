import React from "react";
import { Link } from "react-router-dom";

export default function CompanyProductsPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Tagline và giới thiệu */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">
          Ecosoap – Chăm sóc làn da bằng sự thuần khiết từ thiên nhiên
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-700 leading-relaxed mb-4">
            Mỗi bánh xà phòng của Ecosoap là sự kết hợp hài hòa giữa tinh dầu
            thực vật, chiết xuất thảo mộc và quy trình thủ công tỉ mỉ.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Chúng tôi tin rằng làn da khỏe đẹp bắt đầu từ những điều giản dị
            nhất – sự tinh khiết, chân thật và thân thiện với môi trường.
          </p>
        </div>
      </div>

      {/* Banner image */}
      <div className="relative mb-16 rounded-lg overflow-hidden">
        <img
          src="/assets/banner3.JPG"
          alt="Ecosoap Products"
          className="w-full h-auto max-h-80 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h2 className="text-3xl font-bold text-white text-center">
            Sản phẩm của chúng tôi
          </h2>
        </div>
      </div>

      <p className="text-gray-700 leading-relaxed text-center mb-16">
        Dưới đây là những dòng sản phẩm tiêu biểu của Ecosoap, được tạo nên để
        đáp ứng nhu cầu chăm sóc da tự nhiên, an toàn và bền vững.
      </p>

      {/* Sản phẩm chính */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        {/* Xà phòng tắm */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
          <div className="relative h-64 bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
            <img
              src="/assets/xaphong5.JPG"
              alt="Xà phòng tắm thảo mộc"
              className="max-h-56 max-w-full object-contain drop-shadow-lg"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-green-700">
              🧼 Xà phòng tắm thảo mộc
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li>
                • Dạng bánh handmade, chiết xuất từ các loại thảo mộc như trà
                xanh, nghệ, sả chanh, oải hương…
              </li>
              <li>
                • Giúp làm sạch dịu nhẹ, khử mùi cơ thể và dưỡng ẩm tự nhiên cho
                da.
              </li>
              <li>
                • Phù hợp sử dụng hằng ngày, mang lại cảm giác thư giãn và tươi
                mát sau mỗi lần tắm.
              </li>
            </ul>
          </div>
        </div>

        {/* Xà phòng rửa mặt */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
          <div className="relative h-64 bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
            <img
              src="/assets/xaphong6.JPG"
              alt="Xà phòng rửa mặt tự nhiên"
              className="max-h-56 max-w-full object-contain drop-shadow-lg"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-pink-700">
              🌸 Xà phòng rửa mặt tự nhiên
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li>
                • Công thức dịu nhẹ, cân bằng độ ẩm và giữ lại glycerin tự nhiên
                trong quá trình xà phòng hóa.
              </li>
              <li>
                • Làm sạch sâu, hỗ trợ giảm mụn, giúp da mềm mịn và sáng khỏe
                hơn mỗi ngày.
              </li>
              <li>• Phù hợp với mọi loại da, đặc biệt là da nhạy cảm.</li>
            </ul>
          </div>
        </div>

        {/* Bộ quà tặng */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
          <div className="relative h-64 bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center">
            <img
              src="/assets/xaphong7.JPG"
              alt="Bộ quà tặng EcoSet"
              className="max-h-56 max-w-full object-contain drop-shadow-lg"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-orange-700">
              🎁 Bộ quà tặng EcoSet
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li>
                • Bộ quà gồm những bánh xà phòng handmade được chọn lọc và đóng
                gói tinh tế trong hộp giấy tái chế.
              </li>
              <li>
                • Một món quà ý nghĩa dành cho người thân, bạn bè hoặc đối tác.
              </li>
              <li>
                • Gửi gắm thông điệp "Trao yêu thương, sống xanh mỗi ngày."
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Kêu gọi hành động */}
      <div className="bg-green-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-6">
          🌼 Trải nghiệm Ecosoap hôm nay
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <p className="text-gray-700">
            Hãy để làn da của bạn được chạm vào sự tinh khiết từ thiên nhiên.
          </p>
          <p className="text-gray-700">
            Khám phá các dòng sản phẩm của Ecosoap để cảm nhận sự khác biệt từ
            từng bánh xà phòng – nhỏ bé nhưng chứa đựng tình yêu và trách nhiệm
            với môi trường.
          </p>
          <p className="text-gray-700 font-medium">
            👉 Đến với Ecosoap – vì một làn da khỏe, một Trái Đất xanh.
          </p>
          <div className="mt-8">
            <Link
              to="/products"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors"
            >
              Khám phá sản phẩm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
