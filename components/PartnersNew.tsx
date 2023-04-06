import styles from "@components/PartnersNew.module.scss";
import GutterContainer from "./GutterContainer";

const resources = [
  {
    text: "Higher-Education",
    href: "",
    original:
      "https://user-images.githubusercontent.com/28320272/230436431-4aad873b-28e0-403c-ac5d-e2f2de037bd0.png",
    thumbnail:
      "https://user-images.githubusercontent.com/28320272/230425368-fe2e00cd-31ac-408e-bf94-0d0f7cddd715.png",
  },
  {
    text: "Research",
    href: "",
    original:
      "https://user-images.githubusercontent.com/28320272/230436475-ecc1a8aa-2258-4765-ae99-11e33fd65604.png",
    thumbnail:
      "https://user-images.githubusercontent.com/28320272/230425368-fe2e00cd-31ac-408e-bf94-0d0f7cddd715.png",
  },
  {
    text: "Backup & Recovery",
    href: "",
    original:
      "https://user-images.githubusercontent.com/28320272/230436577-d0a6e0a6-8088-45d2-bcd3-99beebce548e.png",
    thumbnail:
      "https://user-images.githubusercontent.com/28320272/230425368-fe2e00cd-31ac-408e-bf94-0d0f7cddd715.png",
  },
  {
    text: "Archival",
    href: "",
    original:
      "https://user-images.githubusercontent.com/28320272/230436639-b95be430-7f98-4fd2-aadc-72f1494d7059.png",
    thumbnail:
      "https://user-images.githubusercontent.com/28320272/230425368-fe2e00cd-31ac-408e-bf94-0d0f7cddd715.png",
  },
];

export default function PartnersNew({ partners }) {
  return (
    <div className={styles.container}>
      <GutterContainer>
        <div className={styles.container}>
          <div style={{ display: "grid", rowGap: "var(--p-medium)" }}>
            <h3 className={` ${styles.headingTitle}`}>
              Global Partners & Builders
            </h3>
            <div className={styles.partnerGrid}>
              {partners.map((partner, index) => {
                return (
                  <div className={styles.partner} key={index}>
                    <a href={partner.link} style={{ cursor: "pointer" }}>
                      {partner.logo && (
                        <img src={partner.logo} className={styles.logo} />
                      )}
                    </a>
                  </div>
                );
              })}
            </div>
            <div className={styles.center}>
              <button className={styles.viewMoreButton}>View More</button>
            </div>
            <div className={styles.heading}>
              <h3>Solve your data storage challenges with Filecoin</h3>
              <p className={styles.caption}>
                You know the story – more data, more problems. Filecoin provides
                compelling cloud storage solutions for a variety of use cases.
              </p>
            </div>

            <div className={styles.carouselRow}>
              {resources.map((resource, index) => {
                return (
                  <div key={index}>
                    <a href={resource?.href ?? ""}>
                      <img src={resource.original} className={styles.image} />
                      <h4 className={styles.imageCaption}>{resource.text}</h4>
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
