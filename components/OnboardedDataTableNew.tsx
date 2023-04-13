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
      <span className={styles.col15}>
        <div className={styles.tableName}>Address</div>
      </span>
      <span className={styles.col12}>
        <div className={styles.tableName}>
          DataCap
          <br />
          Allocated
        </div>
      </span>
      <span className={styles.col12}>
        <div className={styles.tableName}>
          DataCap <br />
          Available
        </div>
      </span>
      <span className={styles.col30}>
        <div className={styles.tableName}>Industry</div>
      </span>
      <span className={styles.col12}>
        <div className={styles.tableName}>
          Verified <br /> Deals
        </div>
      </span>
      <span className={styles.col10}>
        <div className={styles.tableName}>
          Links <br />
        </div>
      </span>
    </div>
  );
}

export default function OnboardedDataTableNew({ clients }) {
  return (
    <GutterContainer>
      <TableHeadings />

      {clients?.map((each, index) => {
        const dataCapAllocated = each.initialAllowance;
        const dataCapAvailable = each.allowance;

        return (
          <div className={styles.row} key={index}>
            <div className={styles.col32}>
              <div className={`${styles.left} ${styles.githubLink}`}>
                <a href={each.website} target="_blank">
                  <img src={each.logo} className={styles.imageLogo} />
                </a>
              </div>
              <div className={styles.right}>
                <div className={styles.name}>
                  <a
                    className={styles.link}
                    href={each?.website}
                    target="_blank"
                  >
                    {each.name}
                  </a>
                </div>

                <div className={styles.plan}>{each.addressId}</div>
              </div>
            </div>
            <span className={styles.col15}>
              {each.address ? <ShortAddress address={each.address} /> : "-"}
            </span>
            <span className={styles.col12}>
              {dataCapAllocated != "NaN undefined" ? dataCapAllocated : "-"}
            </span>
            <span className={styles.col12}>
              {dataCapAvailable != "NaN undefined" ? dataCapAvailable : "-"}
            </span>

            <span className={`${styles.col30} ${styles.industries}`}>
              {each.industry ?? "Other"}
            </span>
            <span className={`${styles.col12} ${styles.deals}`}>
              {each.dealCount ?? "0"}
            </span>
            <span className={`${styles.col10} ${styles.deals}`}>
              <div className={`${styles.left} ${styles.githubLink}`}>
                <a href={each.github} target="_blank">
                  <GithubSVG className={styles.image} />
                </a>
              </div>
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
