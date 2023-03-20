import styles from "@components/OnboardedDataTable.module.scss";

function TableHeadings() {
  return (
    <div className={`${styles.row} ${styles.rowHeading}`}>
      <div className={styles.col32}>
        <div className={styles.tableName}>Client ID and Name</div>
      </div>
      <span className={styles.col18}>
        <div className={styles.tableName}>Region</div>
      </span>
      <span className={styles.col18}>
        <div className={styles.tableName}>Industry</div>
      </span>
      <span className={styles.col18}>
        <div className={styles.tableName}>Deals</div>
      </span>
      <span className={styles.col18}>
        <div className={styles.tableName}>Website</div>
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
        return (
          <div className={styles.row} key={index}>
            <div className={styles.col32}>
              <div className={styles.left}>
                <img
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Solid_blue.svg/800px-Solid_blue.svg.png"
                  }
                  className={styles.image}
                />
              </div>
              <div className={styles.right}>
                <div className={styles.name}>
                  <a className={styles.link} href={each?.url} target="_blank">
                    {each.name}
                  </a>
                </div>

                <div className={styles.plan}>{each.addressId}</div>
              </div>
            </div>

            <span className={styles.col18}>{each.region ?? "-"}</span>
            <span className={styles.col18}>{each.industry ?? "-"}</span>

            <span className={styles.col18}>{each.dealCount ?? 0}</span>
            <span className={styles.col18}>
              {each.website && (
                <a href={each.website} target="_blank">
                  website
                </a>
              )}
            </span>
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
