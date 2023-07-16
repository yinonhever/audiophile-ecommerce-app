import styles from "./NavDrawer.module.scss";
import { useMemo, useRef } from "react";
import useSWR from "swr";
import type { CollectionData } from "@/models/Collection";
import { fecther } from "@/lib/functions";
import FeaturedCollection from "@/components/UI/FeaturedCollection";

export default function NavDrawer({ active }: { active: boolean }) {
  const { data: collections } = useSWR(
    "/api/collections?showInPages=true",
    fecther<CollectionData[]>,
    { fallbackData: [] }
  );
  const element = useRef<HTMLElement>(null);

  const maxHeight = useMemo(
    () => (element.current && active ? `${element.current.scrollHeight}px` : 0),
    [active]
  );

  return (
    <nav className={styles.wrapper} style={{ maxHeight }} ref={element}>
      <div className={styles.container}>
        <div className={styles.list}>
          {collections.map(collection => (
            <FeaturedCollection key={collection._id} {...collection} />
          ))}
        </div>
      </div>
    </nav>
  );
}
