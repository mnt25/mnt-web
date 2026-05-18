import React, { useState } from "react";
import { Mail, Phone, MapPin, AlertCircle, CheckCircle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { Reveal } from "../ui/Reveal";
import { FaFacebookF, FaTelegramPlane, FaGithub } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { api } from "../../../server/api";

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    const success = await api.sendMessage(formData);

    if (success) {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } else {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-transparent transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Reveal width="100%">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              {t('contact.desc')}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Info */}
          <Reveal width="100%">
            <div className="bg-slate-50/10 dark:bg-zinc-900/10 border border-slate-200/80 dark:border-zinc-800/80 p-8 h-full backdrop-blur-sm relative overflow-visible">
              {/* Corner grid bracket marks */}
              <div className="absolute -top-px -left-px w-2 h-2 -translate-x-1/2 -translate-y-1/2 border border-slate-300 dark:border-zinc-700 pointer-events-none bg-slate-50 dark:bg-zinc-900" />
              <div className="absolute -top-px -right-px w-2 h-2 translate-x-1/2 -translate-y-1/2 border border-slate-300 dark:border-zinc-700 pointer-events-none bg-slate-50 dark:bg-zinc-900" />
              <div className="absolute -bottom-px -left-px w-2 h-2 -translate-x-1/2 translate-y-1/2 border border-slate-300 dark:border-zinc-700 pointer-events-none bg-slate-50 dark:bg-zinc-900" />
              <div className="absolute -bottom-px -right-px w-2 h-2 translate-x-1/2 translate-y-1/2 border border-slate-300 dark:border-zinc-700 pointer-events-none bg-slate-50 dark:bg-zinc-900" />

              <div className="space-y-8 h-full flex flex-col justify-start">
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
                  {t('contact.infoTitle')}
                </h3>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-blue-500/10 p-3">
                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {t('contact.email')}
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
                  <div className="flex-shrink-0 bg-blue-500/10 p-3">
                    <Phone className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {t('contact.phone')}
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
                  <div className="flex-shrink-0 bg-blue-500/10 p-3">
                    <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {t('contact.address')}
                    </p>
                    <a
                      href="https://www.google.com/maps/place/Thịnh+Liệt,+Hoàng+Mai,+Hà+Nội"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {t('contact.addressText')}
                    </a>
                  </div>
                </div>
                
                <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex gap-4 mt-auto">
                  <a
                    href="https://www.facebook.com/phammvannsonn"
                    className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-white hover:bg-facebook dark:hover:bg-facebook transition-all"
                  >
                    <FaFacebookF className="w-6 h-6" />
                  </a>
                  <a
                    href="https://github.com/mnt25"
                    className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 hover:text-white  dark:text-slate-400 hover:bg-black dark:hover:bg-black transition-all"
                  >
                    <FaGithub className="w-6 h-6" />
                  </a>
                  <a
                    href="https://t.me/pvson03"
                    className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-telegram hover:text-white dark:hover:bg-telegram transition-all"
                  >
                    <FaTelegramPlane className="w-6 h-6" />
                  </a>
                  <a
                    href="https://zalo.me/0377309531"
                    className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-white hover:bg-blue-600 dark:hover:bg-blue-600 transition-all"
                  >
                    <SiZalo className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Contact Form */}
          <Reveal width="100%">
            <div className="bg-slate-50/10 dark:bg-zinc-900/10 p-8 border border-slate-200/80 dark:border-zinc-800/80 h-full backdrop-blur-sm relative overflow-visible">
              {/* Corner grid bracket marks */}
              <div className="absolute -top-px -left-px w-2 h-2 -translate-x-1/2 -translate-y-1/2 border border-slate-300 dark:border-zinc-700 pointer-events-none bg-slate-50 dark:bg-zinc-900" />
              <div className="absolute -top-px -right-px w-2 h-2 translate-x-1/2 -translate-y-1/2 border border-slate-300 dark:border-zinc-700 pointer-events-none bg-slate-50 dark:bg-zinc-900" />
              <div className="absolute -bottom-px -left-px w-2 h-2 -translate-x-1/2 translate-y-1/2 border border-slate-300 dark:border-zinc-700 pointer-events-none bg-slate-50 dark:bg-zinc-900" />
              <div className="absolute -bottom-px -right-px w-2 h-2 translate-x-1/2 translate-y-1/2 border border-slate-300 dark:border-zinc-700 pointer-events-none bg-slate-50 dark:bg-zinc-900" />

              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
                {t('contact.formTitle')}
              </h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    {t('contact.formName')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={t('contact.phName')}
                    required
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    {t('contact.formEmail')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={t('contact.phEmail')}
                    required
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    {t('contact.formMessage')}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder={t('contact.phMessage')}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
                >
                  {t('contact.sendBtn')}
                </button>
                {status === "success" && (
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mt-2 bg-green-50 dark:bg-green-900/20 p-3">
                    <CheckCircle className="w-5 h-5" />
                    <span>{t('contact.success')}</span>
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mt-2 bg-red-50 dark:bg-red-900/20 p-3">
                    <AlertCircle className="w-5 h-5" />
                    <span>{t('contact.error')}</span>
                  </div>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
