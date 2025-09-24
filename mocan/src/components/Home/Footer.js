export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-700 pt-12 pb-6 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">

        {/* Logo + text */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-extrabold mb-4">SHOP.CO</h2>
          <p className="text-sm text-gray-600 mb-4">
            We have clothes that suits your style and which you&apos;re proud to wear.
            From women to men.
          </p>

          {/* Social icons */}
          <div className="flex space-x-4">
            <a href="#" className="p-2 rounded-full bg-white shadow hover:shadow-md">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.12 9.12 0 01-2.88 1.1A4.52 4.52 0 0016.5 0c-2.6 0-4.5 2.24-3.92 4.64A12.94 12.94 0 013 2.15a4.52 4.52 0 001.4 6.05 4.48 4.48 0 01-2-.55v.05c0 2.2 1.57 4.05 3.67 4.47a4.5 4.5 0 01-2 .08 4.52 4.52 0 004.22 3.12A9.05 9.05 0 012 19.54a12.8 12.8 0 006.92 2.03c8.3 0 12.84-7.17 12.55-13.6A9.32 9.32 0 0023 3z" />
              </svg>
            </a>
            <a href="#" className="p-2 rounded-full bg-white shadow hover:shadow-md">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.5.57-2.25.67a3.92 3.92 0 001.72-2.14 7.72 7.72 0 01-2.48.95 3.88 3.88 0 00-6.72 3.54A11 11 0 013 4.47a3.88 3.88 0 001.2 5.17c-.65-.02-1.26-.2-1.8-.5v.05c0 1.9 1.36 3.48 3.17 3.85a3.9 3.9 0 01-1.75.07c.49 1.53 1.9 2.64 3.57 2.67A7.8 7.8 0 012 18.4a11 11 0 006 1.76c7.2 0 11.2-6.07 11.2-11.35 0-.17 0-.35-.01-.52A7.9 7.9 0 0022.46 6z" />
              </svg>
            </a>
            <a href="#" className="p-2 rounded-full bg-white shadow hover:shadow-md">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.34-3.37-1.34-.45-1.14-1.1-1.45-1.1-1.45-.9-.61.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.54 2.35 1.1 2.92.84.09-.65.35-1.1.63-1.35-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.99 1.03-2.7-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.6 9.6 0 015 0c1.9-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.71 1.03 1.61 1.03 2.7 0 3.85-2.34 4.7-4.56 4.95.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.49A10 10 0 0022 12c0-5.5-4.46-9.96-9.96-9.96z" />
              </svg>
            </a>
            <a href="#" className="p-2 rounded-full bg-white shadow hover:shadow-md">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .3a12 12 0 00-3.79 23.42c.6.11.82-.26.82-.58 0-.29-.01-1.06-.02-2.08-3.34.73-4.05-1.61-4.05-1.61-.55-1.38-1.35-1.74-1.35-1.74-1.1-.75.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.08 1.85 2.83 1.31 3.52 1 .11-.8.42-1.31.76-1.61-2.66-.3-5.46-1.34-5.46-5.96 0-1.32.47-2.4 1.23-3.25-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.47 11.47 0 016 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.85 1.23 1.93 1.23 3.25 0 4.64-2.81 5.66-5.48 5.96.44.38.82 1.12.82 2.26 0 1.63-.01 2.95-.01 3.35 0 .32.22.7.82.58A12 12 0 0012 .3z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-3">COMPANY</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">About</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Works</a></li>
            <li><a href="#">Career</a></li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="font-semibold mb-3">HELP</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Customer Support</a></li>
            <li><a href="#">Delivery Details</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        {/* FAQ */}
        <div>
          <h3 className="font-semibold mb-3">FAQ</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Account</a></li>
            <li><a href="#">Manage Deliveries</a></li>
            <li><a href="#">Orders</a></li>
            <li><a href="#">Payments</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-3">RESOURCES</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Free eBooks</a></li>
            <li><a href="#">Development Tutorial</a></li>
            <li><a href="#">How to - Blog</a></li>
            <li><a href="#">Youtube Playlist</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom row */}
      <div className="max-w-7xl mx-auto mt-10 border-t pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>Shop.co © 2000-2023, All Rights Reserved</p>

        {/* Payment methods */}
        <div className="flex space-x-3 mt-4 md:mt-0">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Mastercard-logo.png" alt="Mastercard" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Apple_Pay_logo.svg" alt="ApplePay" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="GooglePay" className="h-6" />
        </div>
      </div>
    </footer>
  );
}
