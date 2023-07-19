import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import styles from "./Header.module.scss";
import navItems from "@/lib/assets/nav-items.json";
import Logo from "@/components/UI/Logo";
import Link from "next/link";
import { cx } from "@/lib/functions";
import NavToggle from "@/components/UI/NavToggle";
import CartToggle from "@/components/UI/CartToggle";
import CartDrawer from "../CartDrawer";
import { CartContext, CartContextType } from "@/lib/CartContext";
import Overlay from "@/components/UI/Overlay";
import NavDrawer from "../NavDrawer";

export default function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { showCartDrawer, toggleShowCartDrawer } = useContext(
    CartContext
  ) as CartContextType;
  const { asPath } = useRouter();

  useEffect(() => {
    setShowMobileMenu(false);
  }, [asPath]);

  useEffect(() => {
    document.documentElement.style.overflow = showMobileMenu
      ? "hidden"
      : "initial";
  }, [showMobileMenu]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1000) {
        setShowMobileMenu(false);
      }
    });
  }, []);

  const overlayClickHandler = () => {
    toggleShowCartDrawer(false);
    setShowMobileMenu(false);
  };

  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <NavToggle
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          active={showMobileMenu}
        />
        <Logo className={styles.logo} />
        <nav className={styles.navigation}>
          {navItems.map(item => (
            <Link
              key={item.path}
              href={item.path}
              className={cx(
                styles.navItem,
                asPath === item.path && item.path !== "/" && styles.active
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <CartToggle />
      </div>
      <CartDrawer />
      <NavDrawer active={showMobileMenu} />
      <Overlay
        active={showCartDrawer || showMobileMenu}
        onClick={overlayClickHandler}
        className={styles.overlay}
      />
    </header>
  );
}
