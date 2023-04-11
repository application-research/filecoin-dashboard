import styles from "@components/Navbar.module.scss";
import GutterContainer from "./GutterContainer";
import FilecoinSVG from "./svgs/FilecoinSVG";
import GithubSVG from "./svgs/GithubSVG";
import TwitterSVG from "./svgs/TwitterSVG";

export default function Navbar() {
  return (
    <div className={styles.body}>
      <GutterContainer>
        <div className={styles.navContainer}>
          <div className={styles.logoContainer}>
            <a href="https://filecoin.io/" target="_blank">
              <FilecoinSVG
                style={{
                  width: "2.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </a>
            <p className={styles.filecoinLogo}>Filecoin</p>
          </div>

          <div className={styles.socialContainer}>
            <a
              className={styles.textButtonLink}
              href="https://protocol.ai/"
              target="_blank"
            >
              <button className={styles.textButton}>Protocol Labs</button>
            </a>

            <div className={styles.socialIconsRow}>
              <a
                className={styles.link}
                href="https://github.com/filecoin-project/filecoin-docs"
                target="_blank"
              >
                <GithubSVG style={{ width: "1.5rem" }} />
              </a>
              <a
                className={styles.link}
                href="https://twitter.com/filecoin"
                target="_blank"
              >
                <TwitterSVG style={{ width: "1.5rem" }} />
              </a>
            </div>
          </div>
        </div>
      </GutterContainer>
    </div>
  );
}
