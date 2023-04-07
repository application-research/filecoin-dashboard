import styles from "@components/Resources.module.scss";
import GutterContainer from "./GutterContainer";

export default function Resources() {
  const resources = [
    {
      text: "Whitepapers",
      href: "https://destor.io/idc-decentralized-storage-white-paper",
      original:
        "https://user-images.githubusercontent.com/28320272/230531152-69546ac4-b6df-4a5a-aec9-192982878a97.png",
      thumbnail:
        "https://user-images.githubusercontent.com/28320272/230425368-fe2e00cd-31ac-408e-bf94-0d0f7cddd715.png",
    },
    {
      text: "Case Studies",
      href: "https://destor.io/resources/case-studies",
      original:
        "https://user-images.githubusercontent.com/28320272/230531976-93a5f39d-9654-4e54-a8e8-b0b59f0135b9.png",
      thumbnail:
        "https://user-images.githubusercontent.com/28320272/230425368-fe2e00cd-31ac-408e-bf94-0d0f7cddd715.png",
    },
    {
      text: "Events",
      href: "https://destor.io/resources/events",
      original: "https://protocol.ai/images/pl_vision.jpg",
      thumbnail:
        "https://user-images.githubusercontent.com/28320272/230425368-fe2e00cd-31ac-408e-bf94-0d0f7cddd715.png",
    },
  ];

  return (
    <div>
      <div className={styles.containerBlue}>
        <GutterContainer>
          <h2 className={styles.heading}>Our Latest Resources</h2>

          <div className={styles.carouselRow}>
            {resources.map((resource, index) => {
              return (
                <div key={index}>
                  <a href={resource?.href ?? ""} target="_blank">
                    <div className={styles.imageContainer}>
                      <img src={resource.original} className={styles.image} />
                    </div>
                    <h4 className={styles.imageCaption}>{resource.text}</h4>
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
