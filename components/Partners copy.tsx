import styles from "@components/Partners.module.scss";
import GutterContainer from "./GutterContainer";
import RectangleSVG from "./svgs/RectangleSVG";

export default function Partners({ partners }) {
  return (
    <div className={styles.container}>
      <GutterContainer>
        <div className={styles.folder}>
          <RectangleSVG className={styles.folderSVG} />
        </div>
        <div className={styles.container}>
          <div style={{ display: "grid", rowGap: "var(--p-medium)" }}>
            <h3 className={` ${styles.headingTitle}`}>
              Global Partners <br></br>& Builders
            </h3>
            <div className={styles.partnerGrid}>
              {partners.map((partner, index) => {
                return (
                  <div className={styles.partner} key={index}>
                    <a
                      href={partner.link}
                      style={{ cursor: "pointer" }}
                      target="_blank"
                    >
                      {partner.logo && (
                        <img src={partner.logo} className={styles.logo} />
                      )}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </GutterContainer>
    </div>
  );
}
