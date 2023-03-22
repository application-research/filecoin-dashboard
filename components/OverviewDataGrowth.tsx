import styles from "@components/OverviewDataGrowth.module.scss";
import GutterContainer from "./GutterContainer";
import { bytesToSize } from "@root/common/utilities";

export default function OverviewDataGrowth({ totalClients, allData }) {
  const totalDataOnboarded = allData.data.reduce((acc, client) => {
    const initialAllowance = BigInt(client.initialAllowance);
    const allowance = BigInt(client.allowance);
    return acc + (initialAllowance - allowance);
  }, BigInt(0));

  const totalInitialAllowance = bytesToSize(totalDataOnboarded);

  return (
    <div className={styles.body}>
      <GutterContainer>
        <div className={styles.container}>
          <div>
            <h4 className={styles.data}>{totalInitialAllowance}</h4>
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
