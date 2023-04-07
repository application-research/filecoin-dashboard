import styles from "@components/NavbarNew.module.scss";
import GutterContainer from "./GutterContainer";
import FilecoinSVG from "./svgs/FilecoinSVG";
import GithubBlackSVG from "./svgs/GithubBlackSVG";
import TwitterBlackSVG from "./svgs/TwitterBlackSVG";

export default function NavbarNew() {
  return (
    <div className={styles.body}>
      <GutterContainer>
        <div className={styles.navContainer}>
          <div className={styles.logoContainer}>
            <a href="https://filecoin.io/" target="_blank">
              <FilecoinSVG style={{ width: "2.5rem" }} />
            </a>
            <p className={styles.filecoinLogo}>Filecoin</p>
          </div>

          <div className={styles.socialContainer}>
            <a
              className={styles.textButtonLink}
              href="https://protocol.ai/"
              target="_blank"
            ></a>

            <div className={styles.socialIconsRow}>
              <a
                className={styles.link}
                href="https://github.com/filecoin-project/filecoin-docs"
                target="_blank"
              >
                <GithubBlackSVG
                  style={{
                    width: "1.5rem",
                    fill: "var(--color-black)",
                    color: "var(--color-black)",
                  }}
                />
              </a>
              <a
                className={styles.link}
                href="https://twitter.com/filecoin"
                target="_blank"
              >
                <TwitterBlackSVG
                  // fill="var(--color-black)"
                  style={
                    {
                      // width: "1.5rem",
                      // fill: "red",
                      // color: "var(--color-black)",
                    }
                  }
                />
              </a>
            </div>
          </div>
        </div>
      </GutterContainer>
    </div>
  );
}
