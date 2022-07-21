import Link from 'next/link'
import { Paper } from "@material-ui/core";
import { useEffect, useState } from "react";
import { ethers } from 'ethers';
import { XCircleIcon } from '@heroicons/react/solid'
import classes from "./index.module.css";
import { shortenAddress } from '../../../utils/shortenAddress'

const NoData = () => {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">No Data Found</h3>
          <div className="mt-2 text-sm text-red-700">
            <ul role="list" className="list-disc pl-5 space-y-1">
              <li>Check if you entered a correct wallet address</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

const Row = ({ network, chain, hash, age, value, from, to }) => {
  const formattedDate = new Date(age * 1000).toLocaleString()
  const formattedValue = ethers.utils.formatEther(value)

  let url = ''

  if (network === 'testnet') {
    if (chain === 'ropsten') {
      url = `https://ropsten.etherscan.io/tx/${hash}`
    } else if (chain === 'binance') {
      url = `https://testnet.bscscan.com/tx/${hash}`
    } else if (chain === 'polygon') {
      url = `https://mumbai.polygonscan.com/tx/${hash}`
    }
  }

  return (
    <tr>
      <td>
        <Link href={url}>
          <a target="_blank" className='text-blue-500'>
            {shortenAddress(hash)}
          </a>
        </Link>
      </td>
      <td>{formattedDate}</td>
      <td>{shortenAddress(from)}</td>
      <td>{shortenAddress(to)}</td>
      <td>{formattedValue}</td>
    </tr>
  );
};

const TransactionList = ({ address, chain, network }) => {
  const [transactionData, setTransactionData] = useState(null)
  const [isError, setIsError] = useState(false)

  let apiURL = ``

  if (chain === 'ropsten' || chain === 'ethereum') {
    apiURL = `/api/etherscan?address=${address}&chain=${chain}&network=${network}`
  } else if (chain === 'binance') {
    apiURL = `/api/bscscan?address=${address}&chain=${chain}&network=${network}`
  } else if (chain === 'polygon') {
    apiURL = `/api/polygonscan?address=${address}&chain=${chain}&network=${network}`
  }

  const darkMode =
    typeof document !== "undefined" &&
    window.localStorage.getItem("yearn.finance-dark-mode") === "dark";

  useEffect(() => {
    const fetchTransaction = async () => {
      const res = await fetch(apiURL)
      const data = await res.json()

      if (data.message === 'OK') {
        setTransactionData(data.result)
      } else if (data.message === 'NOTOK') {
        setIsError(true)
      }
    }

    fetchTransaction()
  }, [apiURL])

  return (
    <Paper elevation={1} className={classes.disclosure}>
      {!isError ? (
        <table
          className={classes.table}
          style={{
            "--border-color": darkMode
              ? "hsl(0deg 0% 39% / 33%)"
              : "hsl(0deg 0% 17% / 4%)",
          }}
        >
          <caption>{"Transaction List"}</caption>
          <thead>
            <tr>
              <th>Transaction Hash</th>
              <th>Date</th>
              <th>From</th>
              <th>To</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {transactionData && (
              transactionData.map((item) => (
                <Row
                  key={item.blockHash}
                  network={network}
                  chain={chain}
                  hash={item.hash}
                  age={item.timeStamp}
                  value={item.value}
                  from={item.from}
                  to={item.to}
                />
              ))
            )}
          </tbody>
        </table>
      ) : (
        <NoData />
      )}
    </Paper>
  )
}

export default TransactionList