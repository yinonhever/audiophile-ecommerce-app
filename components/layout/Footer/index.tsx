import Logo from "@/components/UI/Logo";
import styles from "./Footer.module.scss";
import navItems from "@/lib/util/nav-items.json";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <Logo className={styles.logo} />
        <div className={styles.navigation}>
          {navItems.map(item => (
            <Link key={item.path} className={styles.link} href={item.path}>
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.bottom}>
        <p className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <div className={styles.socials}>
          <div className={styles.icons}>
            <FontAwesomeIcon icon={faFacebookSquare} className={styles.icon} />
            <FontAwesomeIcon icon={faTwitter} className={styles.icon} />
            <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
          </div>
        </div>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()}. All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
