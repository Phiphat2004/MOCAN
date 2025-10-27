import React from "react";

export default function FeaturesPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">
           Tính Năng Nổi Bật Của Ecosoap
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Trang này giới thiệu những đặc điểm khác biệt tạo nên giá trị của
          Ecosoap – xà phòng thảo mộc handmade từ thiên nhiên, được tạo ra với
          tình yêu dành cho làn da và môi trường sống xanh.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Feature 1 */}
        <div className="bg-green-50 p-8 rounded-xl">
          <div className="flex items-start">
            <div>
              <h2 className="text-xl font-bold mb-4">
                Thành phần tự nhiên, thuần khiết
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li>
                  Ecosoap được làm từ 100% nguyên liệu thiên nhiên như dầu dừa,
                  dầu ô liu, bơ hạt mỡ và các chiết xuất thảo mộc (nghệ, trà
                  xanh, sả chanh, oải hương...).
                </li>
                <li>
                  Không sử dụng paraben, sulfate, hay hương liệu tổng hợp, mang
                  đến sự an toàn cho mọi loại da, kể cả da nhạy cảm.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="bg-green-50 p-8 rounded-xl">
          <div className="flex items-start">
            <div>
              <h2 className="text-xl font-bold mb-4">
                Dịu nhẹ – phù hợp cho da nhạy cảm
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li>
                  Công thức của Ecosoap được cân bằng độ pH lý tưởng, giúp làm
                  sạch nhẹ nhàng mà không gây khô hay kích ứng.
                </li>
                <li>
                  Sản phẩm thích hợp cho cả da mặt, da cơ thể và da em bé.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="bg-green-50 p-8 rounded-xl">
          <div className="flex items-start">
            <div>
              <h2 className="text-xl font-bold mb-4">
                Bao bì thân thiện môi trường
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li>
                  Chúng tôi lựa chọn chất liệu giấy tái chế và bao gói tối giản,
                  hạn chế tối đa việc sử dụng nhựa.
                </li>
                <li>
                  Mỗi sản phẩm đều thể hiện cam kết của Ecosoap trong việc bảo
                  vệ Trái Đất và hướng tới lối sống bền vững.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="bg-green-50 p-8 rounded-xl">
          <div className="flex items-start">
            <div>
              <h2 className="text-xl font-bold mb-4">
                Dưỡng ẩm & chăm sóc da tự nhiên
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li>
                  Quá trình xà phòng hóa thủ công giúp giữ lại glycerin tự
                  nhiên, giúp da luôn mềm mịn, ẩm mượt sau khi tắm rửa.
                </li>
                <li>
                  Hương thơm dịu nhẹ từ tinh dầu thiên nhiên giúp bạn thư giãn
                  và tái tạo năng lượng mỗi ngày.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Feature 5 */}
        <div className="bg-green-50 p-8 rounded-xl">
          <div className="flex items-start">
            <div>
              <h2 className="text-xl font-bold mb-4">
                Thủ công tỉ mỉ – Mỗi bánh xà phòng là độc bản
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li>
                  Ecosoap được làm hoàn toàn bằng tay, ủ chín tự nhiên trong
                  nhiều tuần để đạt được độ mịn, độ cứng và hương thơm hoàn hảo.
                </li>
                <li>
                  Không có hai bánh xà phòng nào hoàn toàn giống nhau – mỗi
                  chiếc đều là một tác phẩm nhỏ từ thiên nhiên và bàn tay con
                  người.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Feature 6 */}
        <div className="bg-green-50 p-8 rounded-xl">
          <div className="flex items-start">
            <div>
              <h2 className="text-xl font-bold mb-4">
                Hướng dẫn sử dụng & mẹo bảo quản
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li>
                  Làm ướt da và xoa nhẹ bánh xà phòng để tạo bọt tự nhiên.
                </li>
                <li>Massage lên da rồi rửa sạch bằng nước.</li>
                <li>Đặt bánh xà phòng nơi khô ráo, thoáng khí sau khi dùng.</li>
              </ul>
            </div>
          </div>
        </div>
        <p className="text-gray-950 text-xl">
          <span className="font-medium">💡Mẹo nhỏ:</span> Dùng cùng túi tạo bọt
          hoặc xơ mướp để tăng hiệu quả làm sạch và tẩy da chết nhẹ nhàng.
        </p>
      </div>
    </div>
  );
}
