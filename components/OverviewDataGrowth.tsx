import styles from "@components/OverviewDataGrowth.module.scss";
import GutterContainer from "./GutterContainer";

export default function OverviewDataGrowth({
  totalDataOnboarded,
  totalClients,
}) {
  return (
    <div className={styles.body}>
      <GutterContainer>
        <div className={styles.container}>
          <div>
            <h4 className={styles.data}>{totalDataOnboarded ?? "-"}</h4>
            <p className={styles.dataTitle}>Data onboarded</p>
          </div>

          {totalClients && (
            <div>
              <h4 className={styles.data}>{totalClients}</h4>
              <p className={styles.dataTitle}>Clients served</p>
            </div>
          )}

          <div>
            <h4 className={styles.data}>-</h4>
            <p className={styles.dataTitle}>Storage deals</p>
          </div>
          <div>
            <h4 className={styles.data}>-</h4>
            <p className={styles.dataTitle}>Data type covered</p>
          </div>
          <div>
            <h4 className={styles.data}>-</h4>
            <p className={styles.dataTitle}>Industry covered</p>
          </div>

          <div>
            <h4 className={styles.data}>-</h4>
            <p className={styles.dataTitle}>Total regions</p>
          </div>
        </div>
      </GutterContainer>
    </div>
  );
}
