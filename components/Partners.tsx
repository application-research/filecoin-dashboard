import styles from "@components/Partners.module.scss";
import GutterContainer from "./GutterContainer";

export default function Partners({ partners }) {
  return (
    <div className={styles.container}>
      <GutterContainer>
        <div style={{ display: "grid", rowGap: "var(--p-medium)" }}>
          <h3 className={styles.colorBluePurple}>
            Global Partners and Builders
          </h3>
          <div className={styles.partnerGrid}>
            {partners.map((partner) => {
              return (
                <div className={styles.partner}>
                  {partner.logo && (
                    <img src={partner.logo} className={styles.logo} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </GutterContainer>
    </div>
  );
}
