import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Reveal } from "./UI/Reveal";
import { FaFacebookF, FaTelegramPlane, FaGithub } from "react-icons/fa";
import { SiZalo } from "react-icons/si";

const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Reveal width="100%">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Liên hệ
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Tôi luôn sẵn sàng cho các cơ hội mới. Hãy kết nối với tôi!
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Info */}
          <Reveal width="100%">
            <div className=" rounded-2xl p-8 space-y-8 h-full shadow-lg dark:shadow-none">
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
                Thông tin liên lạc
              </h3>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-blue-500/10 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Email
                  </p>
                  <a
                    href="mailto:mnt250723@gmail.com"
                    className="text-lg text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    mnt250723@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-blue-500/10 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Điện thoại
                  </p>
                  <a
                    href="tel:+84377309531"
                    className="text-lg text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    0377309531
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-blue-500/10 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Địa chỉ
                  </p>
                  <a
                    href="https://www.google.com/maps/place/Thịnh+Liệt,+Hoàng+Mai,+Hà+Nội"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Thịnh Liệt, Hoàng Mai, Hà Nội
                  </a>
                </div>
              </div>
              <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex gap-4">
                <a
                  href="https://www.facebook.com/phammvannsonn"
                  className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 hover:text-white hover:bg-facebook dark:hover:bg-facebook transition-all"
                >
                  <FaFacebookF className="w-6 h-6" />
                </a>
                <a
                  href="https://github.com/mnt25"
                  className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 hover:text-white  dark:text-slate-400 hover:bg-black dark:hover:bg-black transition-all"
                >
                  <FaGithub className="w-6 h-6" />
                </a>
                <a
                  href="https://t.me/pvson03"
                  className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-telegram hover:text-white dark:hover:bg-telegram transition-all"
                >
                  <FaTelegramPlane className="w-6 h-6" />
                </a>
                <a
                  href="https://zalo.me/0377309531"
                  className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 hover:text-white hover:bg-blue-600 dark:hover:bg-blue-600 transition-all"
                >
                  <SiZalo className="w-6 h-6" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Simple Form (Visual Only) */}
          <Reveal width="100%">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 h-full shadow-lg dark:shadow-none">
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
                Gửi tin nhắn
              </h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Nhập tên của bạn"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Nhập email của bạn"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Lời nhắn
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Bạn muốn trao đổi về vấn đề gì?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg shadow-blue-500/20"
                >
                  Gửi tin nhắn
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
