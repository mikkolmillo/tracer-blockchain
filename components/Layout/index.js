import React from "react";
import { Button } from "@material-ui/core";
import Header from "../header";
import styles from "../../styles/Home.module.css";
import classes from "./index.module.css";
import { useTranslation } from "next-i18next";

export default function Layout({ changeTheme, theme, children }) {
  const { t } = useTranslation("common");
  // const addNetwork = () => {
  //   window.open("https://github.com/ethereum-lists/chains", "_blank");
  // };

  // const addRpc = () => {
  //   window.open(
  //     "https://github.com/DefiLlama/chainlist/blob/main/constants/extraRpcs.json",
  //     "_blank"
  //   );
  // };

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

              <h2 className="my-10 font-bold text-2xl">
                {/* {t("help-info")} */}
                Tracer
              </h2>
              <p className="leading-relaxed text-lg font-medium mx-5 lg:mx-0">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores sint delectus molestiae, sequi corporis minima odio harum a laborum? Perferendis, tenetur illo provident sequi error quam sed iste debitis nam? Voluptatx.
                {/* {t("description")} */}
              </p>
              {/* <Button
                size="large"
                color="primary"
                variant="contained"
                className={classes.addNetworkButton}
                onClick={addNetwork}
                endIcon={<AddIcon />}
              >
                <Typography className={classes.buttonLabel}>
                  {t("add-your-network")}
                </Typography>
              </Button>
              <Button
                size="large"
                color="primary"
                variant="outlined"
                className={classes.addRpcButton}
                onClick={addRpc}
                endIcon={<AddIcon />}
              >
                <Typography className={classes.buttonLabel}>
                  {t("add-your-rpc")}
                </Typography>
              </Button> */}
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
