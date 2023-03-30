import styles from "@components/GutterContainer.module.scss";

export default function GutterContainer({ children, props }) {
  return <div className={`${styles.container} `}>{children}</div>;
}
