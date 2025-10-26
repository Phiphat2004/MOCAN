export default function Hero() {
  return (
    <section className="bg-[#fef8f8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        {/* Left Text */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-black leading-tight">
            DISCOVER SOAPS <br /> THAT NURTURE <br /> YOUR SKIN & SOUL
          </h1>
          <p className="text-gray-600 text-base lg:text-lg max-w-md mx-auto lg:mx-0">
            Khám phá những thỏi xà phòng thiên nhiên tinh khiết, mang đến sự thư
            giãn và chăm sóc làn da mỗi ngày.
          </p>
          <button className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition">
            Shop Now
          </button>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8">
            <div>
              <h3 className="text-2xl font-bold">100%</h3>
              <p className="text-gray-600 text-sm">Nguyên liệu thiên nhiên</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">100%</h3>
              <p className="text-gray-600 text-sm">Sản phẩm chất lượng cao</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">100%</h3>
              <p className="text-gray-600 text-sm">Khách hàng hài lòng</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 mt-10 lg:mt-0">
          <img
            src="/mocan_banner.jpg"
            alt="Fashion Models"
            className="w-full h-663 max-w-md mx-auto lg:max-w-lg"
          />
        </div>
      </div>
    </section>
  );
}
