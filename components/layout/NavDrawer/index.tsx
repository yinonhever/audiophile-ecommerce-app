import styles from "./NavDrawer.module.scss";
import { useMemo, useRef } from "react";
import useSWR from "swr";
import type { CollectionData } from "@/models/Collection";
import { fecther } from "@/lib/functions";
import FeaturedCollections from "@/components/shared/FeaturedCollections";

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
        <FeaturedCollections collections={collections} />
      </div>
    </nav>
  );
}
