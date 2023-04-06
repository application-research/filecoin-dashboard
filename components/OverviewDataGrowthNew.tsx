import styles from "@components/OverviewDataGrowthNew.module.scss";
import { bytesToSize } from "@root/common/utilities";
import GutterContainer from "./GutterContainer";

import HeroNew from "./HeroNew";

export default function OverviewDataGrowthNew({
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
        <div className={styles.heroContainer}>
          <h1 className={styles.headline} style={{ paddingBottom: "1rem" }}>
            Filecoin<br></br> user explorer
          </h1>
        </div>
        <div className={styles.container}>
          <div>
            <h4 className={styles.data}>{totalInitialAllowance}</h4>
            <p className={styles.dataTitle}>Data onboarded</p>
          </div>
          <div>
            <h4 className={styles.data}>{totalClientCount}</h4>
            <p className={styles.dataTitle}>Clients served</p>
          </div>
        </div>
        <p className={styles.caption}>
          Leave rising costs, service outages and vendor lock-in behind.{" "}
        </p>
        {/* <button className={styles.button}>Learn More</button> */}
      </GutterContainer>
    </div>
  );
}
