import styles from "@components/Statistics.module.scss";
import GutterContainer from "./GutterContainer";

function TableHeadings() {
  return (
    <div className={`${styles.row} ${styles.rowHeading}`}>
      <div className={styles.col32}>
        <div className={styles.tableName}>Client</div>
      </div>
      <span className={styles.col18}>
        <div className={styles.tableName}>Region</div>
      </span>
      <span className={styles.col18}>
        <div className={styles.tableName}>Industry</div>
      </span>
      <span className={styles.col18}>
        <div className={styles.tableName}>Data Onboarded</div>
      </span>
      <span className={styles.col18}>
        <div className={styles.tableName}>Website</div>
      </span>
    </div>
  );
}

export default function OnboardedDataTable({
  data,
  currentPage,
  itemsPerPage,
  setCurrentPage,
  setItemsPerPage,
}) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = data?.data?.slice(startIndex, endIndex);

  function handleLoadMore() {
    setCurrentPage(currentPage + 1); //update the page
  }

  return (
    <div>
      <TableHeadings />

      {displayedData?.map((each, index) => {
        console.log(each, "each");
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

            <span className={styles.col18}>{each.region}</span>
            <span className={styles.col18}>{each.industry}</span>

            <span className={styles.col18}>{each.dealCount}</span>
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

      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <button
          onClick={handleLoadMore}
          //   disabled={currentPage === Math.ceil}
          //   onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

//keep track of the current page number & number of items on the page
//pass down the current page number and number of items to display per page as props to the onboarded datatable
//add buttons to allow the usert to navigate between pages and update current page
