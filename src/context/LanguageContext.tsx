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
        'meta.title': "Pham Son's Portfolio",
        'meta.description': "Pham Son's Portfolio - Lập trình viên Software & AI, chuyên phát triển hệ thống web hiện đại và tích hợp các mô hình AI.",

        'nav.about': 'Giới thiệu',
        'nav.experience': 'Kinh nghiệm',
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
        'hero.headline.part1': 'Chào mừng đến với',
        'hero.headline.part2': 'portfolio của tôi!',
        'hero.badge': 'Đang tìm kiếm cơ hội Software & AI Engineer',
        'hero.greeting': 'Xin chào, tôi là',
        'hero.desc': 'Được đào tạo chuyên sâu về Kỹ thuật phần mềm và Ứng dụng AI, đam mê xây dựng hệ thống web hiện đại, tích hợp giải pháp AI vào thực tiễn.',
        'hero.viewProjects': 'Xem Dự Án',
        'hero.downloadCV': 'CV',
        'hero.cvDisabled': 'Tính năng tải xuống CV tạm thời không khả dụng.\nVui lòng liên hệ trực tiếp để biết thêm thông tin.',

        // About
        'about.title': 'Về bản thân',
        'about.title.part1': 'Về',
        'about.title.part2': 'bản thân',
        'about.howIWork': 'Nguyên tắc làm việc',
        'about.howIWork.part1': 'Nguyên tắc',
        'about.howIWork.part2': 'làm việc',
        'about.journeyTitle': 'Hành trình phát triển',
        'about.journeyTitle.part1': 'Hành trình',
        'about.journeyTitle.part2': 'phát triển',
        'about.journeyDesc1': 'Tôi đã tốt nghiệp chuyên ngành Kỹ thuật phần mềm tại',
        'about.journeyDesc1School': 'Cao Đẳng Anh Quốc BTEC FPT',
        'about.journeyDesc1End': ' và đã hoàn thành chuyên sâu Track AI Applications tại Chương trình Đào tạo Nhân tài AI Thực chiến (VinUni & Vingroup).',
        'about.journeyDesc2': 'Với nền tảng vững chắc về phát triển Web Full-stack (React, Next.js, Node.js, FastAPI) kết hợp cùng tư duy làm chủ công nghệ Trí tuệ nhân tạo (AI Agents, LLMs, LangChain, RAG), tôi luôn chú trọng xây dựng kiến trúc hệ thống tối ưu, viết mã nguồn sạch (Clean Code) và tối ưu hóa trải nghiệm người dùng mượt mà, trực quan.',
        'about.journeyDesc3': 'Mục tiêu của tôi là kiến tạo các giải pháp phần mềm toàn diện, ứng dụng AI tiên tiến để giải quyết triệt để các bài toán thực tế và mang lại giá trị thiết thực cho doanh nghiệp. Tôi luôn giữ tinh thần cầu tiến, không ngừng học hỏi và sẵn sàng đón nhận những thử thách kỹ thuật mới.',
        'about.ageUnit': 'tuổi',
        'about.roleValue': 'Software & AI Engineer',
        'about.work.cleanCode.title': 'Clean Code',
        'about.work.cleanCode.desc': 'Viết mã nguồn rõ ràng, dễ bảo trì và có khả năng mở rộng bền vững theo thời gian.',
        'about.work.innovation.title': 'Innovation',
        'about.work.innovation.desc': 'Luôn cập nhật xu hướng công nghệ mới và ứng dụng các giải pháp AI tiên tiến.',
        'about.work.collaboration.title': 'Collaboration',
        'about.work.collaboration.desc': 'Phối hợp hiệu quả cùng đội ngũ đa chức năng để mang lại kết quả vượt trội.',
        'about.work.performance.title': 'Performance',
        'about.work.performance.desc': 'Tối ưu hóa ứng dụng về tốc độ, khả năng tiếp cận và trải nghiệm người dùng.',

        // Experience
        'experience.title': 'Hành Trình Kinh Nghiệm',
        'experience.title.part1': 'Hành Trình',
        'experience.title.part2': 'Kinh Nghiệm',

        // Skills
        'skills.title': 'Kỹ năng chuyên môn',
        'skills.title.part1': 'Kỹ năng',
        'skills.title.part2': 'chuyên môn',
        'skills.desc': 'Các công nghệ và công cụ tôi sử dụng thường xuyên trong quá trình học tập và làm việc.',
        'skills.html': 'Html5, Css & Javascript',
        'skills.htmlDesc': 'Framework web tôi thường dùng là React hoặc Next.js tùy yêu cầu.',
        'skills.net': '.Net Core, Microservice',
        'skills.netDesc': 'Ứng dụng được triển khai trên .NET, container hóa với Docker, định hướng microservice khi phù hợp quy mô.',
        'skills.db': 'MongoDB, Redis',
        'skills.dbDesc': 'Các công nghệ này đáp ứng hầu hết bài toán lưu trữ, hiệu năng và bảo mật dữ liệu.',
        'skills.os': 'Linux, Windows, Network',
        'skills.osDesc': 'Ưu tiên Linux trong triển khai, vẫn hỗ trợ Windows Server miễn có Docker.',

        // Projects
        'projects.title': 'Dự án tiêu biểu',
        'projects.title.part1': 'Dự án',
        'projects.title.part2': 'tiêu biểu',
        'projects.desc': 'Một số dự án cá nhân mà tôi đã thực hiện để rèn luyện kỹ năng.',
        'projects.code': 'Code',
        'projects.demo': 'Demo',
        'projects.loading': 'Đang tải dự án...',

        // Contact
        'contact.title': 'Thông tin liên hệ',
        'contact.title.part1': 'Thông tin',
        'contact.title.part2': 'liên hệ',
        'contact.desc': 'Tôi luôn sẵn sàng cho các cơ hội mới. Hãy kết nối với tôi!',
        'contact.infoTitle': 'Thông tin liên lạc',
        'contact.infoTitle.part1': 'Thông tin',
        'contact.infoTitle.part2': 'liên lạc',
        'contact.email': 'Email',
        'contact.phone': 'Điện thoại',
        'contact.address': 'Địa chỉ',
        'contact.addressText': 'Hà Nội, Việt Nam',
        'contact.followMe': 'Theo dõi tôi',
        'contact.formTitle': 'Gửi tin nhắn',
        'contact.formTitle.part1': 'Gửi',
        'contact.formTitle.part2': 'tin nhắn',
        'contact.formName': 'Họ và tên',
        'contact.phName': 'Nhập tên của bạn',
        'contact.formEmail': 'Email',
        'contact.phEmail': 'Nhập email của bạn',
        'contact.formMessage': 'Lời nhắn',
        'contact.phMessage': 'Bạn muốn trao đổi về vấn đề gì?',
        'contact.sendBtn': 'Gửi tin nhắn',
        'contact.success': 'Tin nhắn đã được gửi thành công!',
        'contact.error': 'Có lỗi xảy ra, có thể server chưa chạy.',
        'contact.error.nameRequired': 'Vui lòng nhập họ và tên.',
        'contact.error.emailRequired': 'Vui lòng nhập địa chỉ email.',
        'contact.error.emailInvalid': 'Địa chỉ email không hợp lệ.',
        'contact.error.messageRequired': 'Vui lòng nhập lời nhắn.',

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
        'meta.title': "Pham Son's Portfolio",
        'meta.description': "Pham Son's Portfolio - Software & AI Engineer focused on building modern web applications and integrating AI models.",

        'nav.about': 'About',
        'nav.experience': 'Experience',
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
        'hero.headline.part1': 'Welcome to my',
        'hero.headline.part2': 'portfolio!',
        'hero.badge': 'Looking for a Software & AI Engineer Opportunity',
        'hero.greeting': 'Hello, I am',
        'hero.desc': 'Trained in Software Engineering and AI Applications, passionate about building modern web systems and integrating AI solutions into practice.',
        'hero.viewProjects': 'View Projects',
        'hero.downloadCV': 'CV',
        'hero.cvDisabled': 'The CV download feature is currently disabled.\nPlease contact directly for more information.',

        // About
        'about.title': 'About Me',
        'about.title.part1': 'About',
        'about.title.part2': 'Me',
        'about.howIWork': 'How I Work',
        'about.howIWork.part1': 'How I',
        'about.howIWork.part2': 'Work',
        'about.journeyTitle': 'My Journey',
        'about.journeyTitle.part1': 'My',
        'about.journeyTitle.part2': 'Journey',
        'about.journeyDesc1': 'I graduated with a degree in Software Engineering from',
        'about.journeyDesc1School': 'BTEC FPT British College',
        'about.journeyDesc1End': ' and completed the specialized AI Applications Track at the AI Elite Program (VinUni & Vingroup).',
        'about.journeyDesc2': 'With a solid foundation in Full-stack Web development (React, Next.js, Node.js, FastAPI) combined with modern Artificial Intelligence methodologies (AI Agents, LLMs, LangChain, RAG), I focus on engineering optimal system architectures, writing clean and maintainable code, and delivering intuitive, high-performance user experiences.',
        'about.journeyDesc3': 'My goal is to architect comprehensive software solutions that harness cutting-edge AI to solve real-world industry challenges and drive measurable business impact. Driven by continuous learning and curiosity, I am always eager to embrace complex engineering challenges and collaborate on impactful projects.',
        'about.ageUnit': 'years old',
        'about.roleValue': 'Software & AI Engineer',
        'about.work.cleanCode.title': 'Clean Code',
        'about.work.cleanCode.desc': 'Writing maintainable, scalable code that stands the test of time.',
        'about.work.innovation.title': 'Innovation',
        'about.work.innovation.desc': 'Staying ahead of technology trends and implementing cutting-edge solutions.',
        'about.work.collaboration.title': 'Collaboration',
        'about.work.collaboration.desc': 'Working effectively with cross-functional teams to deliver exceptional results.',
        'about.work.performance.title': 'Performance',
        'about.work.performance.desc': 'Optimizing applications for speed, accessibility, and user experience.',

        // Experience
        'experience.title': 'Milestones Experience',
        'experience.title.part1': 'Milestones',
        'experience.title.part2': 'Experience',

        // Skills
        'skills.title': 'Technical Skills',
        'skills.title.part1': 'Technical',
        'skills.title.part2': 'Skills',
        'skills.desc': 'Technologies and tools I use frequently during my learning and work.',
        'skills.html': 'Html5, Css & Javascript',
        'skills.htmlDesc': 'My preferred web frameworks are React or Next.js depending on requirements.',
        'skills.net': '.Net Core, Microservice',
        'skills.netDesc': 'Applications deployed on .NET, containerized with Docker, microservices oriented when appropriate.',
        'skills.db': 'MongoDB, Redis',
        'skills.dbDesc': 'These technologies cover most storage, performance, and data security needs.',
        'skills.os': 'Linux, Windows, Network',
        'skills.osDesc': 'I prioritize Linux for deployment but support Windows Server if Docker is available.',

        // Projects
        'projects.title': 'Featured Projects',
        'projects.title.part1': 'Featured',
        'projects.title.part2': 'Projects',
        'projects.desc': 'Some personal projects I have worked on to hone my skills.',
        'projects.code': 'Code',
        'projects.demo': 'Demo',
        'projects.loading': 'Loading projects...',

        // Contact
        'contact.title': 'Get in Touch',
        'contact.title.part1': 'Get in',
        'contact.title.part2': 'Touch',
        'contact.desc': 'I am always open to new opportunities. Let\'s connect!',
        'contact.infoTitle': 'Contact Info',
        'contact.infoTitle.part1': 'Contact',
        'contact.infoTitle.part2': 'Info',
        'contact.email': 'Email',
        'contact.phone': 'Phone',
        'contact.address': 'Address',
        'contact.addressText': 'Ha Noi, Viet Nam',
        'contact.followMe': 'Follow Me',
        'contact.formTitle': 'Send a Message',
        'contact.formTitle.part1': 'Send a',
        'contact.formTitle.part2': 'Message',
        'contact.formName': 'Full Name',
        'contact.phName': 'Enter your name',
        'contact.formEmail': 'Email',
        'contact.phEmail': 'Enter your email',
        'contact.formMessage': 'Message',
        'contact.phMessage': 'What would you like to discuss?',
        'contact.sendBtn': 'Send Message',
        'contact.success': 'Message sent successfully!',
        'contact.error': 'An error occurred, the server might be down.',
        'contact.error.nameRequired': 'Please enter your name.',
        'contact.error.emailRequired': 'Please enter your email.',
        'contact.error.emailInvalid': 'Please enter a valid email address.',
        'contact.error.messageRequired': 'Please enter your message.',

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
