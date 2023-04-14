import styles from "@components/OnboardedDataTable.module.scss";
import ShortAddress from "./ShortAddress";
import { bytesToSize } from "@root/common/utilities";
import GithubSVG from "./svgs/GithubSVG";

function TableHeadings() {
  return (
    <div className={`${styles.row} ${styles.rowHeading}`}>
      <div className={styles.col32}>
        <div className={styles.tableName}>Client ID and Name</div>
      </div>
      <span className={styles.col18}>
        <div className={styles.tableName}>
          Filecoin <br />
          Address
        </div>
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

export default function OnboardedDataTable({
  clients,
  currentPage,
  onPageChange,
  pageNumbers,
}) {
  return (
    <div>
      <TableHeadings />

      {clients?.map((each, index) => {
        const dataCapAllocated = bytesToSize(each.initialAllowance);
        const dataCapAvailable = bytesToSize(each.allowance);

        return (
          <div className={styles.row} key={index}>
            <div className={styles.col32}>
              <div className={styles.left}>
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
            <span className={styles.col18}>
              {each.region ?? "Uncategorized"}
            </span>
            <span className={styles.col18}>{each.industry ?? "Other"}</span>
            <span className={styles.col18}>{each.dealCount ?? "0"}</span>
          </div>
        );
      })}

      <div className={styles.pagination} style={{ paddingTop: "1rem" }}>
        {pageNumbers.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              aria-label={`Page Number ${pageNumber}`}
              className={
                pageNumber === currentPage ? styles.active : styles.notActive
              }
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
}
