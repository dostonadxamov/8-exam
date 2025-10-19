export default function Footer() {
  return (
    <footer className="bg-black text-white py-5 mt-auto border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-medium">KitchenApp</span>. All rights
          reserved.
        </p>

        <div className="flex items-center gap-5 text-gray-400">
          <a
            href="https://github.com/Muhammadhasanmurodov"
            target="_blank"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://t.me/murodov_MuhammadHasan_Web"
            target="_blank"
            className="hover:text-white transition-colors"
          >
            Telegram
          </a>
          <a
            href="@MuhammadHasanmurodov_070"
            className="hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
