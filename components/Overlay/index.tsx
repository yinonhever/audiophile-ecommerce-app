import styles from "./Overlay.module.scss";

export default function Overlay({
  active,
  onClick
}: {
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      className={`${styles.overlay} ${active ? styles.active : ""}`}
      onClick={onClick}
    />
  );
}
