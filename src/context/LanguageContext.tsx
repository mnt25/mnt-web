import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Language = 'vi' | 'en';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simple dictionary for translations
const translations: Record<Language, Record<string, string>> = {
    vi: {
        // Meta
        'meta.title': 'Phạm Sơn | Lập trình viên Software & AI',
        'meta.description': 'Phạm Sơn - Lập trình viên Software & AI, chuyên phát triển hệ thống web hiện đại và tích hợp các mô hình AI.',

        'nav.about': 'Giới thiệu',
        'nav.skills': 'Kỹ năng',
        'nav.projects': 'Dự án',
        'nav.contact': 'Liên hệ',
        'theme.light': 'Sáng',
        'theme.dark': 'Tối',
        'theme.system': 'Hệ thống',
        'theme.system_full': 'Theo hệ thống',
        'lang.vi': 'Tiếng Việt',
        'lang.en': 'Tiếng Anh',

        // Hero
        'hero.badge': 'Đang tìm kiếm cơ hội Software & AI Engineer',
        'hero.greeting': 'Xin chào, tôi là',
        'hero.desc': 'Được đào tạo chuyên sâu về Kỹ thuật phần mềm và Ứng dụng AI, đam mê xây dựng hệ thống web hiện đại, tích hợp giải pháp AI vào thực tiễn.',
        'hero.viewProjects': 'Xem Dự Án',
        'hero.downloadCV': 'CV',
        'hero.cvDisabled': 'Tính năng tải xuống CV tạm thời không khả dụng.\nVui lòng liên hệ trực tiếp để biết thêm thông tin.',

        // About
        'about.title': 'Về bản thân',
        'about.journeyTitle': 'Hành trình phát triển',
        'about.journeyDesc1': 'Tôi đã tốt nghiệp chuyên ngành Kỹ thuật phần mềm tại',
        'about.journeyDesc1School': 'Cao Đẳng Anh Quốc BTEC FPT',
        'about.journeyDesc1End': ' và hiện đang theo học chuyên sâu Track AI Applications tại Chương trình Đào tạo Nhân tài AI Thực chiến (VinUni & Vingroup).',
        'about.journeyDesc2': 'Mục tiêu của tôi là phát triển phần mềm toàn diện, ứng dụng các giải pháp AI tiên tiến để giải quyết các bài toán thực tế của doanh nghiệp. Tôi là người cầu tiến, ham học hỏi và luôn sẵn sàng đối mặt với thử thách mới.',
        'about.ageUnit': 'tuổi',
        'about.roleValue': 'Software & AI Engineer',
        'about.passion.coding': 'Lập trình',
        'about.passion.uiux': 'UI/UX',
        'about.passion.solving': 'Giải quyết vấn đề',
        'about.value.cleanCode': 'Clean Code',
        'about.value.teamwork': 'Làm việc nhóm',
        'about.value.dedication': 'Tận tâm',

        // Skills
        'skills.title': 'Kỹ năng chuyên môn',
        'skills.desc': 'Các công nghệ và công cụ tôi sử dụng thường xuyên trong quá trình học tập và làm việc.',
        'skills.html': 'Html5, Css & Javascript',
        'skills.htmlDesc': 'Framework web tôi thường dùng là React hoặc Next.js tùy yêu cầu.',
        'skills.net': '.Net Core, Microservice',
        'skills.netDesc': 'Ứng dụng được triển khai trên .NET, container hóa với Docker, định hướng microservice khi phù hợp quy mô.',
        'skills.db': 'Sql Server, MongoDB, Redis',
        'skills.dbDesc': '3 công nghệ này đáp ứng hầu hết bài toán lưu trữ, hiệu năng và bảo mật dữ liệu.',
        'skills.os': 'Linux, Windows, Network',
        'skills.osDesc': 'Ưu tiên Linux trong triển khai, vẫn hỗ trợ Windows Server miễn có Docker.',

        // Projects
        'projects.title': 'Dự án nổi bật',
        'projects.desc': 'Một số dự án cá nhân mà tôi đã thực hiện để rèn luyện kỹ năng.',
        'projects.code': 'Code',
        'projects.demo': 'Demo',
        'projects.loading': 'Đang tải dự án...',

        // Contact
        'contact.title': 'Liên hệ',
        'contact.desc': 'Tôi luôn sẵn sàng cho các cơ hội mới. Hãy kết nối với tôi!',
        'contact.infoTitle': 'Thông tin liên lạc',
        'contact.email': 'Email',
        'contact.phone': 'Điện thoại',
        'contact.address': 'Địa chỉ',
        'contact.addressText': 'Hà Nội, Việt Nam',
        'contact.formTitle': 'Gửi tin nhắn',
        'contact.formName': 'Họ và tên',
        'contact.phName': 'Nhập tên của bạn',
        'contact.formEmail': 'Email',
        'contact.phEmail': 'Nhập email của bạn',
        'contact.formMessage': 'Lời nhắn',
        'contact.phMessage': 'Bạn muốn trao đổi về vấn đề gì?',
        'contact.sendBtn': 'Gửi tin nhắn',
        'contact.success': 'Tin nhắn đã được gửi thành công!',
        'contact.error': 'Có lỗi xảy ra, có thể server chưa chạy.',

        // Common
        'common.close': 'Đóng',
        'common.notice': 'Thông báo',
        'common.name': 'Phạm Sơn',
        'footer.rights': 'All rights reserved.',
        'lang.toggleAria': 'Chuyển ngôn ngữ',
        'nav.openMenu': 'Mở menu',
        // 404 Not Found Page
        'notfound.errorCode': '[ MÃ_LỖI: 404_TRANG_KHÔNG_TỒN_TẠI ]',
        'notfound.title': 'Trang không tồn tại // Target Unresolved',
        'notfound.diagnostics': 'Rất tiếc, máy chủ không thể giải quyết đường dẫn (route) bạn yêu cầu. Liên kết có thể đã bị thay đổi, bị xóa, hoặc không tồn tại trên máy chủ lưu trữ.',
        'notfound.returnBtn': 'QUAY VỀ TRANG CHỦ // RET_MAIN',
    },
    en: {
        // Meta
        'meta.title': 'Pham Son | Software & AI Engineer',
        'meta.description': 'Pham Son - Software & AI Engineer focused on building modern web applications and integrating AI models.',

        'nav.about': 'About',
        'nav.skills': 'Skills',
        'nav.projects': 'Projects',
        'nav.contact': 'Contact',
        'theme.light': 'Light',
        'theme.dark': 'Dark',
        'theme.system': 'System',
        'theme.system_full': 'System Theme',
        'lang.vi': 'Vietnamese',
        'lang.en': 'English',

        // Hero
        'hero.badge': 'Looking for a Software & AI Engineer Opportunity',
        'hero.greeting': 'Hello, I am',
        'hero.desc': 'Trained in Software Engineering and AI Applications, passionate about building modern web systems and integrating AI solutions into practice.',
        'hero.viewProjects': 'View Projects',
        'hero.downloadCV': 'CV',
        'hero.cvDisabled': 'The CV download feature is currently disabled.\nPlease contact directly for more information.',

        // About
        'about.title': 'About Me',
        'about.journeyTitle': 'My Journey',
        'about.journeyDesc1': 'I graduated with a Software Engineering degree from',
        'about.journeyDesc1School': 'BTEC FPT British College',
        'about.journeyDesc1End': ' and am currently pursuing the AI Applications Track at the AI Elite Program (VinUni & Vingroup).',
        'about.journeyDesc2': 'My goal is to develop comprehensive software, applying advanced AI solutions to solve real-world business challenges. I am ambitious, eager to learn, and always ready to face new challenges.',
        'about.ageUnit': 'years old',
        'about.roleValue': 'Software & AI Engineer',
        'about.passion.coding': 'Coding',
        'about.passion.uiux': 'UI/UX',
        'about.passion.solving': 'Problem Solving',
        'about.value.cleanCode': 'Clean Code',
        'about.value.teamwork': 'Teamwork',
        'about.value.dedication': 'Dedication',

        // Skills
        'skills.title': 'Technical Skills',
        'skills.desc': 'Technologies and tools I use frequently during my learning and work.',
        'skills.html': 'Html5, Css & Javascript',
        'skills.htmlDesc': 'My preferred web frameworks are React or Next.js depending on requirements.',
        'skills.net': '.Net Core, Microservice',
        'skills.netDesc': 'Applications deployed on .NET, containerized with Docker, microservices oriented when appropriate.',
        'skills.db': 'Sql Server, MongoDB, Redis',
        'skills.dbDesc': 'These 3 technologies cover most storage, performance, and data security needs.',
        'skills.os': 'Linux, Windows, Network',
        'skills.osDesc': 'I prioritize Linux for deployment but support Windows Server if Docker is available.',

        // Projects
        'projects.title': 'Featured Projects',
        'projects.desc': 'Some personal projects I have worked on to hone my skills.',
        'projects.code': 'Code',
        'projects.demo': 'Demo',
        'projects.loading': 'Loading projects...',

        // Contact
        'contact.title': 'Contact',
        'contact.desc': 'I am always open to new opportunities. Let\'s connect!',
        'contact.infoTitle': 'Contact Info',
        'contact.email': 'Email',
        'contact.phone': 'Phone',
        'contact.address': 'Address',
        'contact.addressText': 'Ha Noi, Viet Nam',
        'contact.formTitle': 'Send a Message',
        'contact.formName': 'Full Name',
        'contact.phName': 'Enter your name',
        'contact.formEmail': 'Email',
        'contact.phEmail': 'Enter your email',
        'contact.formMessage': 'Message',
        'contact.phMessage': 'What would you like to discuss?',
        'contact.sendBtn': 'Send Message',
        'contact.success': 'Message sent successfully!',
        'contact.error': 'An error occurred, the server might be down.',

        // Common
        'common.close': 'Close',
        'common.notice': 'Notification',
        'common.name': 'Pham Son',
        'footer.rights': 'All rights reserved.',
        'lang.toggleAria': 'Toggle language',
        'nav.openMenu': 'Open main menu',
        // 404 Not Found Page
        'notfound.errorCode': '[ ERROR_CODE: 404_PAGE_NOT_FOUND ]',
        'notfound.title': 'Page Not Found // Target Unresolved',
        'notfound.diagnostics': 'Oops! The server could not resolve the requested route path. The link may have been modified, removed, or does not exist on the hosting server.',
        'notfound.returnBtn': 'RETURN TO MAINPAGE // RET_MAIN',
    },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(() => {
        const savedLanguage = localStorage.getItem('language') as Language | null;
        return savedLanguage === 'vi' || savedLanguage === 'en' ? savedLanguage : 'en';
    });

    const toggleLanguage = () => {
        const newLanguage = language === 'vi' ? 'en' : 'vi';
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    };

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
