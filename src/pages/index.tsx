import Head from "next/head";
import Image from "next/image";
import { Josefin_Sans } from "next/font/google";
import styles from "@/styles/Home.module.css";
import classnames from "classnames";

import meImage from "@/assets/me.png";
import logoDarkImage from "@/assets/MeLogov2Dark.png";
import logoLightImage from "@/assets/MeLogov2Light.png";

const sansFont = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Ryan Gaus</title>
        <meta
          name="description"
          content="I'm a software engineer with a specialty in developing scalable and maintainable systems for over 10 years."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={classnames(styles.page, sansFont.variable)}>
        <main className={styles.main}>
          <div className={styles.hero}>
            <Image
              src={meImage}
              role="presentation"
              alt=""
              className={styles.heroImage}
            />
            <Image
              src={logoDarkImage}
              role="presentation"
              alt=""
              className={classnames(styles.heroImage, styles.overlay)}
            />
            <h1 className={styles.heroTitle}>
              I'm <span className={styles.heroTitleInner}>Ryan</span>.
            </h1>
            <p className={styles.heroDesc}>
              I'm a software engineer with a specialty in data visualisation and near real time
              data processing.
            </p>
            <p className={styles.heroDesc}>
              I've been developing scalable and maintainable systems for over 10 years.
            </p>
            <p className={styles.heroSocial}>
              <span className={styles.heroSocialLink}>
                <a href="/Resume (Ryan Gaus).pdf" className={styles.link}>Resume</a>
              </span>
              <span className={styles.heroSocialLink}>
                <a href="mailto:rsg1egoman@gmail.com" className={styles.link}>Email</a>
              </span>
              <span className={styles.heroSocialLink}>
                <a href="https://github.com/1egoman" target="_blank" className={styles.link}>
                  Github
                </a>
              </span>
              <span className={styles.heroSocialLink}>
                <a href="https://www.youtube.com/@RyanGausMakes" target="_blank" className={styles.link}>
                  Youtube
                </a>
              </span>
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
