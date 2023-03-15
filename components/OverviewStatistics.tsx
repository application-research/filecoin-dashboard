import styles from "@components/OverviewStatistics.module.scss";
import GutterContainer from "./GutterContainer";

export default function OverviewStatistics({ data }) {
  // console.log(data, "data");

  return (
    <div className={styles.body}>
      <GutterContainer>
        <div className={styles.container}>
          <div>
            <h1 className={styles.data}>600 PiB</h1>
            <h4 className={styles.dataTitle}>Data onboarded</h4>
          </div>
          <div>
            <h1 className={styles.data}>3,637</h1>
            <h4 className={styles.dataTitle}>Clients Served</h4>
          </div>

          <div>
            <h1 className={styles.data}>60,000</h1>
            <h4 className={styles.dataTitle}>
              Storage deals in the last 24 hours
            </h4>
          </div>

          <div>
            <h1 className={styles.data}>3</h1>
            <h4 className={styles.dataTitle}>Data types covered</h4>
          </div>

          <div>
            <h1 className={styles.data}>14</h1>
            <h4 className={styles.dataTitle}>Industry covered</h4>
          </div>

          <div>
            <h1 className={styles.data}>50</h1>
            <h4 className={styles.dataTitle}>Total countries covered</h4>
          </div>
        </div>
      </GutterContainer>
    </div>
  );
}
