import React from "react";
import Header from "../header";
import styles from "../../styles/Home.module.css";
import classes from "./index.module.css";
import { SiEthereum } from 'react-icons/si'
import { BsInfoCircle } from 'react-icons/bs'
import { useTranslation } from "next-i18next";
import { shortenAddress } from '../../utils/shortenAddress'

export default function Layout({ changeTheme, theme, children }) {
  const { t } = useTranslation("common");

  // const url = '/logo.svg'

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div
          className={
            theme.palette.type === "dark"
              ? classes.containerDark
              : classes.container
          }
        >
          <div className={classes.copyContainer}>
            <div className={classes.copyCentered}>
              {/* <img style={{
                width: '360px',
                marginLeft: '-15px',
              }} src={url} alt="Chainlist logo" /> */}
              <div className={`p-3 mx-auto rounded-xl h-40 lg:h-52 w-72 sm:w-full my-5 ${classes['white-glassmorphism']} ${classes['eth-card']}`}>
                <div className="flex justify-between flex-col w-full h-full">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                      <SiEthereum fontSize={21} color='#fff' />
                    </div>
                    <BsInfoCircle fontSize={17} color='#fff' />
                  </div>
                  <div>
                    <p className="text-white font-light text-sm">
                      {shortenAddress('0xD8C42316e2bAFa294C25fc8852dD4935a18511B4')}
                    </p>
                    <p className="text-white font-semibold text-lg mt-1">
                      Ethereum
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="my-10 font-bold text-2xl">
                {/* {t("help-info")} */}
                Tracer
              </h2>
              <p className="leading-relaxed text-lg font-medium mx-5 lg:mx-0">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores sint delectus molestiae, sequi corporis minima odio harum a laborum? Perferendis, tenetur illo provident sequi error quam sed iste debitis nam? Voluptatx.
                {/* {t("description")} */}
              </p>
            </div>
          </div>
          <div
            className={
              theme.palette.type === "dark"
                ? classes.listContainerDark
                : classes.listContainer
            }
          >
            <Header changeTheme={changeTheme} />
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
