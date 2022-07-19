import Link from 'next/link'
import { Paper } from "@material-ui/core";
import { useEffect, useState } from "react";
import { ethers } from 'ethers';
import classes from "./index.module.css";
import { shortenAddress } from '../../../utils/shortenAddress'

const Row = ({ hash, age, value, from, to }) => {
  const formattedDate = new Date(age * 1000).toLocaleString()
  const formattedValue = ethers.utils.formatEther(value)

  return (
    <tr>
      <td>
        <Link href={'#'}>
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

const TransactionList = () => {
  const [transactionData, setTransactionData] = useState(null)

  const darkMode =
    typeof document !== "undefined" &&
    window.localStorage.getItem("yearn.finance-dark-mode") === "dark";

  useEffect(() => {
    const fetchTransaction = async () => {
      const res = await fetch('/api/etherscan')
      const data = await res.json()

      console.log(data.result);
      setTransactionData(data.result)
    }

    fetchTransaction()
  }, [])

  return (
    <Paper elevation={1} className={classes.disclosure}>
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
          {transactionData && transactionData.map((item) => (
            <Row
              key={item.blockHash}
              hash={item.hash}
              age={item.timeStamp}
              value={item.value}
              from={item.from}
              to={item.to}
            />
          ))}
        </tbody>
      </table>
    </Paper>
  )
}

export default TransactionList