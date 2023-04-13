import styles from "@components/Resources.module.scss";
import GutterContainer from "./GutterContainer";
import { RESOURCES_FIXTURES } from "@root/fixtures/resources-fixtures";
import { CASE_STUDIES_FIXTURES } from "@root/fixtures/case-studies-fixtures";

export default function Resources() {
  const resources = RESOURCES_FIXTURES;
  const caseStudies = CASE_STUDIES_FIXTURES;

  return (
    <div>
      <div className={styles.containerBlue}>
        <GutterContainer>
          <h2 className={styles.heading}>Our Case Studies</h2>
          <p className={styles.caption}>
            Find out how universities, researchers and organizations are using
            Filecoin solutions to preserve their most important data.
          </p>
          <div className={`${styles.carouselRow} ${styles.paddingBottom}`}>
            {caseStudies.map((study, index) => {
              return (
                <div key={index} className={styles.carouselColumn}>
                  <a href={study?.href ?? ""} className={styles.link}>
                    <figure className={styles.imageContainer}>
                      <img
                        src={study.original}
                        className={styles.carouselImage}
                      />
                    </figure>
                    <h4 className={styles.imageCaption}>{study.text}</h4>
                    <p className={styles.carouselCaption}>{study.caption}</p>
                  </a>
                </div>
              );
            })}
          </div>
          <h2 className={styles.heading}>Our Latest Resources</h2>
          <div className={`${styles.carouselRow}`}>
            {resources.map((resource, index) => {
              return (
                <div key={index} className={styles.carouselColumn}>
                  <a href={resource?.href ?? ""} className={styles.link}>
                    <figure className={styles.imageContainer}>
                      <img
                        src={resource.original}
                        className={styles.carouselImage}
                      />
                    </figure>
                    <h4 className={styles.imageHeading}>{resource.text}</h4>
                  </a>
                </div>
              );
            })}
          </div>
        </GutterContainer>
      </div>

      <div className={styles.gradientContainer}>
        <GutterContainer>
          <h3 className={styles.heading}>Ready to learn more?</h3>
          <div className={styles.callToAction}>
            <p className={styles.caption}>
              We’re ready to help you find the right solution to solve your data
              challenges.
            </p>
            <a
              href="https://destor.io/contact/connect-with-an-expert"
              className={styles.link}
            >
              <button className={styles.button}>Get Started</button>
            </a>
          </div>
        </GutterContainer>
      </div>
    </div>
  );
}
