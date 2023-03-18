import styles from "@components/Hero.module.scss";
import GutterContainer from "./GutterContainer";

export default function Hero() {
  return (
    <div className={styles.body}>
      <GutterContainer>
        <h1 className={styles.headline}> Filecoin user explorer </h1>
      </GutterContainer>
    </div>
  );
}
