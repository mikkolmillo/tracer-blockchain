import React from 'react'

const ConnectWalletModal = ({ onClose }) => {
  return (
    <div className="bg-zinc-200 bg-opacity-30 backdrop-blur-sm fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="flex-col justify-center bg-white py-12 px-24 border-2 border-sky-400 rounded-xl">
          <div className="flex"><p>Are you sure</p></div>
          <div className="flex justify-between">
            <button onClick={onClose}>Yes</button>
            <button onClick={onClose}>No</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConnectWalletModal