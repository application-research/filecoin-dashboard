"use client";
import styles from "@components/PartnersNew.module.scss";
import GutterContainer from "./GutterContainer";
import Marquee from "./Marquee";
import {
  ALL_PARTNERS_FIXTURE,
  PARTNERS_TWO_FIXTURE,
} from "@root/fixtures/partners-fixtures";
import { useState } from "react";

const resources = [
  {
    text: "Higher-Education",
    caption:
      "Filecoin helps universities reduce their data storage budgets by providing cost-effective storage solutions that traditional providers can’t match.",
    href: "https://destor.io/solutions/education",
    original:
      "https://user-images.githubusercontent.com/28320272/231351253-2fdd7bd1-67d3-481b-8241-70f2ee8fa955.png",
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

function Modal({ allPartners, onClose }) {
  return (
    <div className={styles.modal}>
      <h3 className={styles.modalTitle}>Clients and Builders</h3>

      <div className={styles.logoGrid}>
        {allPartners.map((partner, index) => {
          return (
            <a
              key={index}
              href={partner.link}
              style={{ cursor: "pointer" }}
              target="_blank"
            >
              {partner.logo && (
                <img src={partner.logo} className={styles.logoModal} />
              )}
            </a>
          );
        })}
      </div>

      <button className={styles.button} onClick={onClose}>
        Close
      </button>
    </div>
  );
}

export default function PartnersNew({ partners }) {
  const [showModal, setShowModal] = useState(false);
  const partnersRowTwo = PARTNERS_TWO_FIXTURE;
  const allPartners = ALL_PARTNERS_FIXTURE;

  const handleViewMoreClick = () => {
    setShowModal(true);
  };

  const handleOnCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <div style={{ display: "grid", rowGap: "var(--p-medium)" }}>
        <GutterContainer>
          <div
            style={{
              paddingBottom: "0.5rem",
              position: "relative",
            }}
          >
            <h3 className={` ${styles.headingTitle}`}>Featured Clients</h3>
          </div>
        </GutterContainer>

        <div className={styles.logoContainer}>
          {partners.map((partner, index) => {
            return (
              <div key={index} className={styles.logoItem}>
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

          {/* {partnersRowTwo.map((partner, index) => {
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
          })} */}
        </div>
        <GutterContainer>
          <div className={styles.center} style={{ paddingBottom: "6rem" }}>
            <button
              className={styles.viewMoreButton}
              onClick={handleViewMoreClick}
            >
              View More
            </button>
          </div>

          {showModal && (
            <Modal allPartners={allPartners} onClose={handleOnCloseModal} />
          )}
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
                  <div key={index} className={styles.carouselColumn}>
                    <a href={resource?.href ?? ""} className={styles.link}>
                      <figure className={styles.imageContainer}>
                        <img src={resource.original} className={styles.image} />
                      </figure>
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
