import styles from "@components/OverviewDataGrowth.module.scss";
import { bytesToSize } from "@root/common/utilities";
import GutterContainer from "./GutterContainer";

export default function OverviewDataGrowth({
  allDataFiltered,
  totalClients,
  totalClientCount,
}) {
  const totalDataOnboarded = totalClients.reduce((acc, client) => {
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
          <div>
            <h4 className={styles.data}>{totalClientCount}</h4>
            <p className={styles.dataTitle}>Clients served</p>
          </div>

          {/* <div>
            <h4 className={styles.data}>{totalDataCapSumFormatted}</h4>
            <p className={styles.dataTitle}>Storage deals this month</p>
          </div> */}
        </div>
      </GutterContainer>
    </div>
  );
}
