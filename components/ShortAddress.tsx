"use client";
import { useState } from "react";
import styles from "@components/ShortAddress.module.scss";
import CopySVG from "./svgs/CopySVG";

export default function ShortAddress({ address }) {
  const [copied, setCopied] = useState(false);

  const shortAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };
  return (
    <div onClick={handleCopy}>
      {!copied && (
        <div className={styles.textContainer}>
          <p>{shortAddress}</p>
          <div>
            <CopySVG className={styles.copySVG} />
          </div>
        </div>
      )}

      {copied && <span className={styles.copied}>Copied!</span>}
    </div>
  );
}
