import React, { useEffect, useState, useMemo, Fragment } from "react";
import {
  Typography,
  Paper,
  Button,
  Tooltip,
  withStyles,
} from "@material-ui/core";
import classes from "./chain.module.css";
import stores, { useAccount, useChain } from "../../stores/index.js";
import { ACCOUNT_CONFIGURED } from "../../stores/constants";
import Image from "next/image";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RPCList from "../RPCList";
import { addToNetwork, renderProviderText } from "../../utils";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Transaction from "../transaction";

const ExpandButton = withStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "12px",
    marginBottom: "-24px",
  },
}))(Button);

export default function Chain({ exchange, chain, buttonOnly }) {
  const { t } = useTranslation("common");
  const account = useAccount((state) => state.account);
  const setAccount = useAccount((state) => state.setAccount);

  const router = useRouter();

  useEffect(() => {
    const accountConfigure = () => {
      const accountStore = stores.accountStore.getStore("account");
      setAccount(accountStore);
    };

    stores.emitter.on(ACCOUNT_CONFIGURED, accountConfigure);

    const accountStore = stores.accountStore.getStore("account");
    setAccount(accountStore);

    return () => {
      stores.emitter.removeListener(ACCOUNT_CONFIGURED, accountConfigure);
    };
  }, []);

  // const icon = useMemo(() => {
  //   return chain.chainSlug
  //     ? `https://defillama.com/chain-icons/rsz_${chain.chainSlug}.jpg`
  //     : "/unknown-logo.png";
  // }, [chain]);

  // const chainId = useChain((state) => state.id);
  // const updateChain = useChain((state) => state.updateChain);

  // const handleClick = () => {
  //   if (chain.chainId === chainId) {
  //     updateChain(null);
  //   } else {
  //     updateChain(chain.chainId);
  //   }
  // };

  const handleClick = () => {

  };

  const [showCheck, setShowCheck] = useState(false)
  const [showVerify, setShowVerify] = useState(false)
  const [showSend, setShowSend] = useState(false)

  const handleCheckClick = () => {
    setShowCheck((prevState) => !prevState)
  }

  const handleVerifyClick = () => {
    setShowVerify((prevState) => !prevState)
  }

  const handleSendClick = () => {
    setShowSend((prevState) => !prevState)
  }

  // const showAddlInfo = chain.chainId === chainId;

  if (!exchange) {
    return <div></div>;
  }

  if (buttonOnly) {
    return (
      <Button
        variant="outlined"
        color="primary"
      // onClick={() => addToNetwork(account, chain)}
      >
        {renderProviderText(account)}
      </Button>
    );
  }

  return (
    <>
      <Paper
        elevation={1}
        className={classes.chainContainer}
        key={exchange.id}
      >
        <div className={classes.chainNameContainer}>
          <Image
            src={exchange.img_url}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/chains/unknown-logo.png";
            }}
            width={28}
            height={28}
            className={classes.avatar}
            alt={exchange.name}
          />

          <Tooltip title={exchange.name}>
            <Typography
              variant="h3"
              className={classes.name}
              noWrap
              style={{ marginLeft: "24px" }}
            >
              {exchange.name}
              {/* <Link href={`/chain/${chain.networkId}`}>{chain.name}</Link> */}
            </Typography>
          </Tooltip>
        </div>
        {/* <div className={classes.chainInfoContainer}>
          <div className={classes.dataPoint}>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              className={classes.dataPointHeader}
            >
              ChainID
            </Typography>
            <Typography variant="h5">{chain.chainId}</Typography>
          </div>
          <div className={classes.dataPoint}>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              className={classes.dataPointHeader}
            >
              {t("currency")}
            </Typography>
            <Typography variant="h5">
              {chain.nativeCurrency ? chain.nativeCurrency.symbol : "none"}
            </Typography>
          </div>
        </div> */}
        {account && account.address ? (
          <Fragment>
            <div className={classes.addButton}>
              <Button
                variant="outlined"
                color="primary"
                // onClick={() => addToNetwork(account, chain)}
                onClick={handleCheckClick}
              >
                {/* {t(renderProviderText(account))} */}
                Check
              </Button>

              <Button
                variant="outlined"
                color="primary"
                onClick={handleVerifyClick}
                // onClick={() => addToNetwork(account, chain)}
              >
                {/* {t(renderProviderText(account))} */}
                Verify
              </Button>
            </div>
            <div className="flex justify-center w-full">
              <Button
                variant="outlined"
                color="primary"
                onClick={handleSendClick}
              // onClick={() => addToNetwork(account, chain)}
              >
                {/* {t(renderProviderText(account))} */}
                Send
              </Button>
            </div>
          </Fragment>
        ) : (
          <div className="flex w-full justify-center">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => addToNetwork(account, chain)}
            >
              {t(renderProviderText(account))}
            </Button>
          </div>
        )}
        {router.pathname === "/" && (
          <ExpandButton onClick={handleClick}>
            <ExpandMoreIcon
              style={{
                transform: showVerify ? "rotate(180deg)" : 
                  showCheck ? "rotate(180deg)" : 
                  showSend ? "rotate(180deg)" : 
                  "",
                transition: "all 0.2s ease",
              }}
            />
          </ExpandButton>
        )}
      </Paper>
      {/* {showVerify && <RPCList chain={chain} />} */}
      {showSend && <Transaction />}
    </>
  );
}
