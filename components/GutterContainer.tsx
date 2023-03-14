import styles from '@components/GutterContainer.module.scss';

export default function GutterContainer({ children }) {
  return <div className={styles.container}>{children}</div>;
}
