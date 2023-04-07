import styles from "@components/OnboardedDataTableNew.module.scss";
import ShortAddress from "./ShortAddress";
import { bytesToSize } from "@root/common/utilities";
import GithubSVG from "./svgs/GithubSVG";
import GutterContainer from "./GutterContainer";

function TableHeadings() {
  return (
    <div className={`${styles.row} ${styles.rowHeading}`}>
      <div className={styles.col32}>
        <div className={styles.tableName}>Client ID and Name</div>
      </div>
      <span className={styles.col18}>
        <div className={styles.tableName}>Address</div>
      </span>
      <span className={styles.col18}>
        <div className={styles.tableName}>DataCap Allocated</div>
      </span>
      <span className={styles.col18}>
        <div className={styles.tableName}>DataCap Available</div>
      </span>
      <span className={styles.col18}>
        <div className={styles.tableName}>Region</div>
      </span>
      <span className={styles.col18}>
        <div className={styles.tableName}>Industry</div>
      </span>

      <span className={styles.col18}>
        <div className={styles.tableName}>Verified Deals</div>
      </span>
    </div>
  );
}

export default function OnboardedDataTableNew({
  clients,
  currentPage,
  onPageChange,
  pageNumbers,
}) {
  return (
    <GutterContainer>
      <TableHeadings />

      {clients?.map((each, index) => {
        const dataCapAllocated = bytesToSize(each.initialAllowance);
        const dataCapAvailable = bytesToSize(each.allowance);

        return (
          <div className={styles.row} key={index}>
            <div className={styles.col32}>
              <div className={`${styles.left} ${styles.githubLink}`}>
                {each?.allowanceArray[0]?.auditTrail && (
                  <a href={each?.allowanceArray[0]?.auditTrail} target="_blank">
                    <GithubSVG className={styles.image} />
                  </a>
                )}
              </div>
              <div className={styles.right}>
                <div className={styles.name}>
                  <a
                    className={styles.link}
                    href={each?.allowanceArray[0]?.auditTrail}
                    target="_blank"
                  >
                    {each.name}
                  </a>
                </div>

                <div className={styles.plan}>{each.addressId}</div>
              </div>
            </div>
            <span className={styles.col18}>
              {each.address ? <ShortAddress address={each.address} /> : "-"}
            </span>
            <span className={styles.col18}>
              {dataCapAllocated != "NaN undefined" ? dataCapAllocated : "-"}
            </span>
            <span className={styles.col18}>
              {dataCapAvailable != "NaN undefined" ? dataCapAvailable : "-"}
            </span>
            <span className={`${styles.col18} ${styles.regions}`}>
              {each.region ?? "Uncategorized"}
            </span>
            <span className={`${styles.col18} ${styles.industries}`}>
              {each.industry ?? "Other"}
            </span>
            <span className={`${styles.col18} ${styles.deals}`}>
              {each.dealCount ?? "0"}
            </span>
          </div>
        );
      })}

      <a
        href="https://datacapstats.io/clients"
        target="_blank"
        className={styles.link}
      >
        <button className={styles.button}>View More</button>
      </a>
    </GutterContainer>
  );
}
