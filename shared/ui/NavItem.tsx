"use client";

import Link from "next/link";
import { NavigationItemOption } from "@/entities/navigation/config";
import { memo, ReactNode, useEffect } from "react";
import { DropdownItem } from "@/entities/navigation";
import { useNavStore } from "@/entities/navigation/store";
import { usePathname } from "next/navigation";

type Props = {
  item: {
    id?: number;
    icon: ReactNode;
    name: string;
    path?: string;
    options?: NavigationItemOption[];
  };
};

const NavItem = memo(({ item }: Props) => {
  const activeItemId = useNavStore((state) => state.activeItemId);
  const setActiveItem = useNavStore((state) => state.setActiveItem);
  const pathname = usePathname();
  const isActive = useNavStore((state) =>
    state.activeItemId !== null
      ? state.activeItemId === item.id
      : pathname === item.path
  );

  useEffect(() => {
    if (activeItemId !== null && pathname !== item.path) {
      setActiveItem(null);
    }
  }, [pathname]);

  const styles = isActive
    ? "-translate-y-[33px] rounded-[8px] bg-active-nav-item text-active-nav-text"
    : "translate-y-0 bg-hover-nav-item text-accent-text scale-100";

  return (
    <li className="relative">
      {!item.options && item.path ? (
        <div className="relative group max-h-[33px] h-full overflow-hidden select-none">
          <div className="flex gap-1 items-center transition-all px-[8px] py-[4px] cursor-pointer text-text group-hover:scale-25 group-hover:opacity-25 duration-300 opacity-100 scale-100 h-[33px]">
            <span className="text-[20px]">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </div>
          <Link
            onClick={() => setActiveItem(item.id ?? null)}
            href={item.path}
            className={`absolute flex gap-1 items-center z-10 rounded-4xl px-[8px] py-[4px] transition-all duration-300 group-hover:-translate-y-[33px] h-[33px] group-hover:scale-90 ${styles}`}
          >
            <span className="text-[20px]">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </Link>
        </div>
      ) : (
        <DropdownItem
          id={item.id}
          icon={item.icon}
          name={item.name}
          options={item.options}
        />
      )}
    </li>
  );
});

export default NavItem;
