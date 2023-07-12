import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./Header.module.scss";
import navItems from "@/lib/util/nav-items.json";
import Logo from "../../UI/Logo";
import Link from "next/link";
import { cx } from "@/lib/functions";
import NavToggle from "../../UI/NavToggle";
import CartToggle from "../../UI/CartToggle";
import CartDrawer from "../CartDrawer";

export default function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { pathname } = useRouter();

  useEffect(() => {
    setShowMobileMenu(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? "hidden" : "initial";
  }, [showMobileMenu]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoWrapper}>
          <NavToggle
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            active={showMobileMenu}
          />
          <Logo />
        </div>
        <nav className={styles.navigation}>
          <div className={styles.navList}>
            {navItems.map(item => (
              <Link
                key={item.path}
                href={item.path}
                className={cx(
                  styles.navItem,
                  pathname === item.path && styles.active
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </nav>
        <CartToggle />
      </div>
      <CartDrawer />
    </header>
  );
}
