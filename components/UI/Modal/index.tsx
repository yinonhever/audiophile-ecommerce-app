import { PropsWithChildren, useState, useRef, useEffect } from "react";
import styles from "./Modal.module.scss";
import { cx } from "@/lib/functions";

export default function Modal({
  active,
  children,
  fixedHeight,
  adjustHeight
}: PropsWithChildren<{
  active: boolean;
  fixedHeight?: string;
  adjustHeight?: boolean;
}>) {
  const element = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>();

  useEffect(() => {
    if (!fixedHeight && adjustHeight !== false) {
      setHeight(
        active && element.current
          ? `${element.current.offsetHeight + 1}px`
          : undefined
      );
    }
  }, [active]);

  return (
    <div
      className={cx(styles.container, active && styles.active)}
      style={{ height: fixedHeight || height }}
      ref={element}
    >
      <div className={styles.content}>{children}</div>
    </div>
  );
}
