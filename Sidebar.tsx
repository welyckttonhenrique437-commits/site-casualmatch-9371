"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, MessageCircle, Image, Settings, LogOut, Flame } from "lucide-react";

interface SidebarProps {
  onLogout: () => void;
}

export default function Sidebar({ onLogout }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { href: "/painel", icon: Home, label: "Início" },
    { href: "/painel/perfil", icon: User, label: "Meu Perfil" },
    { href: "/painel/feed", icon: Flame, label: "Feed" },
    { href: "/painel/chat", icon: MessageCircle, label: "Chat" },
    { href: "/painel/galeria", icon: Image, label: "Galeria" },
    { href: "/painel/configuracoes", icon: Settings, label: "Configurações" },
  ];

  return (
    <aside className="w-64 bg-black/50 border-r border-red-900/20 backdrop-blur-sm flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-red-900/20">
        <Link href="/painel" className="flex items-center gap-2">
          <Flame className="w-8 h-8 text-red-500" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            CasualMatch
          </h1>
        </Link>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg shadow-red-500/50"
                  : "text-gray-400 hover:text-white hover:bg-red-900/20"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-red-900/20">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-red-900/20 transition-all duration-200 w-full"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </aside>
  );
}
