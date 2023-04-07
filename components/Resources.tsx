import styles from "@components/Resources.module.scss";
import GutterContainer from "./GutterContainer";

export default function Resources() {
  const resources = [
    {
      text: "Whitepapers",
      href: "https://destor.io/idc-decentralized-storage-white-paper",
      original:
        "https://user-images.githubusercontent.com/28320272/230427956-9b34d7e8-5256-428e-b775-c00c704c3200.png",
      thumbnail:
        "https://user-images.githubusercontent.com/28320272/230425368-fe2e00cd-31ac-408e-bf94-0d0f7cddd715.png",
    },
    {
      text: "Case Studies",
      href: "https://destor.io/resources/case-studies",
      original:
        "https://user-images.githubusercontent.com/28320272/230427945-702bf35b-338a-4f65-b34f-613ea3b9e7c4.png",
      thumbnail:
        "https://user-images.githubusercontent.com/28320272/230425368-fe2e00cd-31ac-408e-bf94-0d0f7cddd715.png",
    },
    {
      text: "Events",
      href: "https://destor.io/resources/events",
      original:
        "https://user-images.githubusercontent.com/28320272/230427940-0a24acce-d026-4744-83b9-9fdee7f22722.png",
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
                  <a href={resource?.href ?? ""}>
                    <img src={resource.original} className={styles.image} />
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
            <button className={styles.button}>Get Started</button>
          </div>
        </GutterContainer>
      </div>
    </div>
  );
}
