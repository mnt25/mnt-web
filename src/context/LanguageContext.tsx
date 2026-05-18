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
        'meta.title': 'Phạm Sơn | Lập trình viên Web',
        'meta.description': 'Phạm Sơn - Fresher phát triển ứng dụng web hiện đại và tối ưu trải nghiệm người dùng.',

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
        'hero.badge': 'Đang tìm kiếm cơ hội Fresher',
        'hero.greeting': 'Xin chào, tôi là',
        'hero.desc': 'Tốt nghiệp chuyên ngành Kỹ thuật phần mềm, đam mê xây dựng các ứng dụng web hiện đại, tối ưu trải nghiệm người dùng.',
        'hero.viewProjects': 'Xem Dự Án',
        'hero.downloadCV': 'CV',
        'hero.cvDisabled': 'Tính năng tải xuống CV tạm thời không khả dụng.\nVui lòng liên hệ trực tiếp để biết thêm thông tin.',

        // About
        'about.title': 'Về bản thân',
        'about.journeyTitle': 'Hành trình trở thành Lập trình viên',
        'about.journeyDesc1': 'Tôi là sinh viên tốt nghiệp chuyên ngành Kỹ thuật phần mềm tại',
        'about.journeyDesc1School': 'Cao Đẳng Anh Quốc BTEC FPT',
        'about.journeyDesc1End': '. Với nền tảng kiến thức vững chắc, tôi đã tự học và phát triển kỹ năng trong lĩnh vực phát triển Web.',
        'about.journeyDesc2': 'Mục tiêu của tôi là áp dụng những kiến thức đã học vào thực tế, đóng góp giá trị cho doanh nghiệp và không ngừng nâng cao trình độ chuyên môn. Tôi là người cầu tiến, ham học hỏi và luôn sẵn sàng đối mặt với thử thách mới.',
        'about.ageUnit': 'tuổi',
        'about.roleValue': 'Frontend Fresher',
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
        'meta.title': 'Pham Son | Web Developer',
        'meta.description': 'Pham Son - Fresher focused on building modern web applications and optimizing user experiences.',

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
        'hero.badge': 'Looking for a Fresher Opportunity',
        'hero.greeting': 'Hello, I am',
        'hero.desc': 'Software Engineering graduate passionate about building modern web applications and optimizing user experiences.',
        'hero.viewProjects': 'View Projects',
        'hero.downloadCV': 'CV',
        'hero.cvDisabled': 'The CV download feature is currently disabled.\nPlease contact directly for more information.',

        // About
        'about.title': 'About Me',
        'about.journeyTitle': 'My Journey to Becoming a Developer',
        'about.journeyDesc1': 'I am a Software Engineering graduate from',
        'about.journeyDesc1School': 'BTEC FPT British College',
        'about.journeyDesc1End': '. With a solid foundation, I have self-taught and developed my skills in Web Development.',
        'about.journeyDesc2': 'My goal is to apply my knowledge to real-world projects, contribute value to businesses, and continuously improve my professional skills. I am ambitious, eager to learn, and always ready to face new challenges.',
        'about.ageUnit': 'years old',
        'about.roleValue': 'Frontend Fresher',
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
