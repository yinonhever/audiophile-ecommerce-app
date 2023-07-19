import Logo from "@/components/UI/Logo";
import styles from "./Footer.module.scss";
import Link from "next/link";
import navItems from "@/lib/assets/nav-items.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className={styles.wrapper}>
      <div className={styles.top}>
        <Logo className={styles.logo} />
        <div className={styles.navigation}>
          {navItems.map(item => (
            <Link key={item.path} className={styles.navItem} href={item.path}>
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.bottom}>
        <p className={styles.text}>
          Audiophile is an all in one stop to fulfill your audio needs.
          We&apos;re a small team of music lovers and sound specialists who are
          devoted to helping you get the most out of personal audio. Come and
          visit our demo facility - we&apos;re open 7 days a week.
        </p>
        <div className={styles.socials}>
          <div className={styles.icons}>
            <Link href="https://facebook.com" target="_blank">
              <FontAwesomeIcon
                icon={faFacebookSquare}
                className={styles.icon}
              />
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <FontAwesomeIcon icon={faTwitter} className={styles.icon} />
            </Link>
            <Link href="https://instagram.com" target="_blank">
              <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
            </Link>
          </div>
        </div>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()}. All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
