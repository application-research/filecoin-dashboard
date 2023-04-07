import styles from "@components/PartnersNew.module.scss";
import GutterContainer from "./GutterContainer";
import Marquee from "./Marquee";
import { PARTNERS_TWO_FIXTURE } from "@root/fixtures/partners-fixtures";

const resources = [
  {
    text: "Higher-Education",
    caption:
      "Filecoin helps universities reduce their data storage budgets by providing cost-effective storage solutions that traditional providers can’t match.",
    href: "https://destor.io/solutions/education",
    original:
      "https://user-images.githubusercontent.com/28320272/230436431-4aad873b-28e0-403c-ac5d-e2f2de037bd0.png",
    thumbnail:
      "https://user-images.githubusercontent.com/28320272/230425368-fe2e00cd-31ac-408e-bf94-0d0f7cddd715.png",
  },
  {
    text: "Research",
    caption:
      "Filecoin provides highly scalable data storage solutions today to power tomorrow’s discoveries.",
    href: "https://destor.io/solutions/research",
    original:
      "https://user-images.githubusercontent.com/28320272/230436475-ecc1a8aa-2258-4765-ae99-11e33fd65604.png",
    thumbnail:
      "https://user-images.githubusercontent.com/28320272/230425368-fe2e00cd-31ac-408e-bf94-0d0f7cddd715.png",
  },
  {
    text: "Backup & Recovery",
    caption:
      "Filecoin backup and recovery solutions deliver secure, resilient and cost-effective cloud storage to protect your most important data.",
    href: "https://destor.io/solutions/backup",
    original:
      "https://user-images.githubusercontent.com/28320272/230436577-d0a6e0a6-8088-45d2-bcd3-99beebce548e.png",
    thumbnail:
      "https://user-images.githubusercontent.com/28320272/230425368-fe2e00cd-31ac-408e-bf94-0d0f7cddd715.png",
  },
  {
    text: "Archival",
    caption:
      "Filecoin offers archival storage solutions for long-term retention, compliance, and digital preservation.",
    href: "https://destor.io/solutions/archival",
    original:
      "https://user-images.githubusercontent.com/28320272/230436639-b95be430-7f98-4fd2-aadc-72f1494d7059.png",
    thumbnail:
      "https://user-images.githubusercontent.com/28320272/230425368-fe2e00cd-31ac-408e-bf94-0d0f7cddd715.png",
  },
];

export default function PartnersNew({ partners }) {
  const partnersRowTwo = PARTNERS_TWO_FIXTURE;
  return (
    <div className={styles.container}>
      <div style={{ display: "grid", rowGap: "var(--p-medium)" }}>
        <GutterContainer>
          <div style={{ paddingTop: "4rem", paddingBottom: "0.5rem" }}>
            <h3 className={` ${styles.headingTitle}`}>Featured Clients</h3>
          </div>
        </GutterContainer>
        <Marquee marqueeColor="transparent" direction="right">
          {partners.map((partner, index) => {
            return (
              <div key={index}>
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
        </Marquee>
        <Marquee marqueeColor="transparent" direction="left">
          {partnersRowTwo.map((partner, index) => {
            return (
              <div key={index}>
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
        </Marquee>
        <GutterContainer>
          <div className={styles.center} style={{ paddingBottom: "4rem" }}>
            <button className={styles.viewMoreButton}>View More</button>
          </div>
        </GutterContainer>

        <div className={styles.containerBlue}>
          <GutterContainer>
            <div className={styles.heading}>
              <h3 style={{ color: "var(--color-white)" }}>
                Solve your data storage challenges with Filecoin
              </h3>
            </div>

            <div className={styles.carouselRow}>
              {resources.map((resource, index) => {
                return (
                  <div key={index}>
                    <a href={resource?.href ?? ""} className={styles.link}>
                      <img src={resource.original} className={styles.image} />
                      <h4 className={styles.imageCaption}>{resource.text}</h4>
                      <p className={styles.caption}>{resource.caption}</p>
                    </a>
                  </div>
                );
              })}
            </div>
          </GutterContainer>
        </div>
      </div>
    </div>
  );
}
