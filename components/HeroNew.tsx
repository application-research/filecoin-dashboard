import styles from "@components/HeroNew.module.scss";
import GutterContainer from "./GutterContainer";

export default function HeroNew() {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div>
          <h1 className={styles.headline} style={{ paddingBottom: "1rem" }}>
            Filecoin<br></br> user explorer
          </h1>
          <p>Explore the data onboarding growth to the Filecoin Network</p>
        </div>
      </div>
    </div>
  );
}
{
  /* <div className={styles.heroImage}>
            <img
              className={styles.image}
              src="https://user-images.githubusercontent.com/28320272/226398806-1e71d832-39a5-42ec-bc57-b474206c30ba.svg"
            />
          </div> */
}
