import { useState } from 'react';

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-primary p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-black text-xl font-bold">تهران گلد</div>
          <div className="block lg:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-black focus:outline-none"
            >
              <svg 
                className="h-6 w-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                />
              </svg>
            </button>
          </div>
          <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? '' : 'hidden'} lg:block`}>
            <div className="text-sm lg:flex-grow">
              <a href="/" className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-700 mr-8">
                خانه
              </a>
              <a href="/ads" className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-700 mr-8">
                آگهی‌ها
              </a>
              <a href="/profile" className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-700 mr-8">
                پروفایل من
              </a>
            </div>
            <div>
              <a href="login" className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-gray-100 hover:bg-black mt-4 lg:mt-0">
                ورود/ثبت نام
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 bg-primary bg-opacity-75 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
        <div className="bg-primary p-4 h-full">
          <div className="flex justify-between items-center mb-4">
            <div className="text-black text-xl">Brand</div>
            <button onClick={toggleMenu} className="text-black focus:outline-none">
              <svg 
                className="h-6 w-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          </div>
          <div className="space-y-4">
            <a href="/" className="block text-black hover:text-gray-700">خانه</a>
            <a href="/ads" className="block text-black hover:text-gray-700">آگهی‌ها</a>
            <a href="/profile" className="block text-black hover:text-gray-700">پروفایل من</a>
            <a href="/login" className="block text-black border border-black px-4 py-2 rounded hover:bg-black hover:text-gray-100">ورود/ثبت نام</a>
          </div>
        </div>
      </div>
    </>
  );
}
