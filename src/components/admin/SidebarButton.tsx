const SidebarButton = ({
  icon,
  text,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
      active
        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600"
        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
    }`}
  >
    {icon}
    <span className="ml-3">{text}</span>
  </button>
);

export default SidebarButton;
