import styles from "@components/OverviewDataGrowthNew.module.scss";
import { bytesToSize } from "@root/common/utilities";
import GutterContainer from "./GutterContainer";

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
      <video className={styles.video} autoPlay muted loop>
        <source
          src="https://user-images.githubusercontent.com/28320272/230458369-7a393957-7a5f-489c-bd16-2c2e9cf267b4.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <GutterContainer>
        <div className={styles.heroContainer}>
          <h1 className={styles.headline} className={styles.}>
            Filecoin<br></br> Client Explorer
          </h1>

          <p className={styles.caption}>
            View real-time and historical information about client data storage
            on the Filecoin Network
          </p>
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
        </div>
      </GutterContainer>
    </div>
  );
}
