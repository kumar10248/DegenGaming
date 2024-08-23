"use client";
import Image from "next/image";
import Item from "./components/Item";
import BoughtItem from "./components/BoughtItem";
import { useState, useEffect } from "react";
import fetchMultipleData from "./Functionality/ifpsFetch";
import { ethers } from "ethers";
// import DegenABI from "../artifacts/contracts/DegenTokenGame.sol/DegenERC20.json";
import IpfsToArray from "./Functionality/resIPFS";
import MintAndBurnInput from "./components/MintAndBurnInput";
import TransferFriend from "./components/TransferFriend";
import BurnToken from "./components/BurnToken";
import NavigationBar from "./components/NavigationBar";
// bg-gradient-to-r from-yellow-400 to-indigo-600
export default function Home() {
  const [connected, setConnected] = useState(false);
  const [showMarket, setShowMarket] = useState(false);
  const [mintAndBurnCondition, setmintAndBurnCondition] = useState(false);
  const [transferFriendCondition, setTransferFriendCondition] = useState(false);
  const [boughtCondition, setBoughtCondition] = useState(false);
  const [burnCondition, setBurnCondition] = useState(false);
  const [nftCollection, setNftCollection] = useState([]);
  const [redeemNFT, setRedeemNFT] = useState(false);
  const [boughtNFT, setBoughtNFT] = useState([]);

  // -------------------------------
  const [ethWindow, setEthWindow] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [degenContract, setDegenContract] = useState(null);
  const [bal, setBal] = useState();
  const [amount, setAmount] = useState();
  const [transferAddress, setTransferAddress] = useState();
  const [transAmount, setTransAmount] = useState();
  const [burnAmount, setBurnAmount] = useState();

  const urls = [
    "https://ipfs.io/ipfs/QmTMtjc8x6UBHeitfom4u27c2JqQTmd41jV4yX2wx7Rvty",
    "https://ipfs.io/ipfs/Qmcn7zKK6fgA3BhEiNCuJLAw6fdbw4cR1TR65HQgV6pM8j",
    "https://ipfs.io/ipfs/QmZXBFMtHSqHRLfu5jsWwBsLLRmWjT3WMwhXJ2pabdC961",
    "https://ipfs.io/ipfs/QmY3ZPzoxw83GUFMU1VB669VWTCzDWv565TdNCqhGSpPg9", // destroied city
  
  ];

 

  const contractAddress = "0x56717B5688b153bE2f7a217d3ec1dA11f7475fad";
  const DegenABI = process.env.abi;


  const initialize = async () => {
    if (window.ethereum) {
      console.log("Metamask is installed");
      setEthWindow(window.ethereum);
    }

    if (ethWindow) {
      const accountsArray = await ethWindow.request({ method: "eth_accounts" });
      setAccounts(accountsArray);
    }
    ConnectToMetamask();
  };

  const ConnectToMetamask = async () => {
    if (ethWindow) {
      const accounts = await ethWindow.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
      setConnected(true);
    }

    ConnectToContract();
  };

  const ConnectToContract = async () => {
    try {
      console.log("The Degen Abi is : " + DegenABI.abi);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const degenContract = new ethers.Contract(
        contractAddress,
        DegenABI,
        signer
      );
      console.log(degenContract);
      setDegenContract(degenContract);
      getTokenBalance();
      boughtItems();
      console.log(degenContract);
    } catch (error) {
      console.log("can't connect with the contract");
    }
  };

  const getTokenBalance = async () => {
    try {
      if (degenContract) {
        const bal = await degenContract.checkingBalance();
        setBal(parseInt(bal));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const mintTokens = async () => {
    try {
      console.log(accounts[0]);
      if (degenContract) {
        const res = await degenContract.mintTokenReward(
          accounts[0],
          parseInt(amount)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const transFriend = async () => {
    try {
      console.log(accounts[0]);
      if (degenContract) {
        const res = await degenContract.tranferTokens(
          transferAddress,
          parseInt(transAmount)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const burnMyToken = async () => {
    try {
      if (degenContract) {
        const res = await degenContract.burnToken(burnAmount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getImage = (ipfsURL) => {
    const hash = ipfsURL.split("ipfs://")[1];
    return `https://ipfs.io/ipfs/${hash}`;
  };

  function BoughtItems() {
    return (
      <div className="mt-10 col-start-1 col-end-4 bg-opacity-90 p-10 justify-center space-x-8 space-y-5">
        <hr className="col-start-1 col-end-4 w-full h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
        <div className="flex justify-center mb-5">
          <p className="text-4xl font-bold bg-gradient-to-r from-lime-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
            Gaming Items
          </p>
        </div>
        <hr className="col-start-1 col-end-4 w-full h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
        {boughtNFT.map((eachItem, index) => (
          <BoughtItem
            key={index}
            itemName={eachItem.name}
            itemDescription={eachItem.description}
            itemSrc={getImage(eachItem.image)}
            itemPrice={eachItem.price}
          />
        ))}
    
      </div>
    );
  }

  const setFunc = async (data) => {
    setNftCollection(data);
  };

  const mintAndBurnTokens = async () => {
    setTransferFriendCondition(false);
    setBoughtCondition(false);

    setmintAndBurnCondition(!mintAndBurnCondition);
  };

  const transferToFriend = async () => {
    setmintAndBurnCondition(false);
    setBurnCondition(false);
    setTransferFriendCondition(!transferFriendCondition);
  };

  const displayBoughtNFTs = async () => {
    setBoughtCondition(!boughtCondition);
  };

  const burntokenFunc = async () => {
    setTransferFriendCondition(false);
    setmintAndBurnCondition(false);
    setBurnCondition(!burnCondition);
  };

  const boughtItems = async () => {
    try {
      if (degenContract) {
        const res = await degenContract.getMintedNFT();
        const boughtNFTs = await IpfsToArray(res);
        console.log(boughtNFTs);
        setBoughtNFT(boughtNFTs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const mintNFTs = async (URI, price) => {
    console.log(`URI is ${URI} and ${price}`);
    try {
      if (degenContract) {
        const res = await degenContract.redeemTokens(URI, price);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showMarketPlace = () => {
    setRedeemNFT(true);
    setShowMarket(true);
  };

  useEffect(() => {
    async function Operation() {
      await initialize();
      await ConnectToContract();
      await boughtItems();
      await fetchMultipleData(urls, setFunc);
      await getTokenBalance();
    }
    Operation();
  }, []);

  return (
    <div className="bg-black">
      <NavigationBar
        ConnectToMetamask={ConnectToMetamask}
        accounts={accounts ? accounts[0] : "No Account Conne"}
        connected={connected}
        balance={bal}
      />
      <div className="grid grid-cols-3">
        <div className="grid col-start-1 col-end-4">
       
        </div>
      </div>
      <div className="w-full grid items-center my-10">
        <div className="grid grid-cols-4 gap-5">
          <div className="flex justify-center">
            <button
              onClick={() => mintAndBurnTokens()}
              className="bg-gradient-to-r from-yellow-400 to-indigo-600 px-8 pb-2.5 pt-3 text-xs font-medium uppercase leading-normal rounded-2xl"
            >
              Mint DGN Tokens
            </button>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => transferToFriend()}
              className="bg-gradient-to-r from-yellow-400 to-indigo-600 px-8 pb-2.5 pt-3 text-xs font-medium uppercase leading-normal rounded-2xl"
            >
              Transfer DGN Tokens
            </button>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => burntokenFunc()}
              className="bg-gradient-to-r from-yellow-400 to-indigo-600 px-8 pb-2.5 pt-3 text-xs font-medium uppercase leading-normal rounded-2xl"
            >
              Burn DGN Tokens
            </button>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => displayBoughtNFTs()}
              className="bg-gradient-to-r from-yellow-400 to-indigo-600 px-8 pb-2.5 pt-3 text-xs font-medium uppercase leading-normal rounded-2xl"
            >
              Gamming Bag
            </button>
          </div>
        </div>
      </div>
      {mintAndBurnCondition && (
        <MintAndBurnInput setAmount={setAmount} mintTokens={mintTokens} />
      )}
      {transferFriendCondition && (
        <TransferFriend
          setTransAmount={setTransAmount}
          setTransferAddress={setTransferAddress}
          transFriend={transFriend}
        />
      )}
      {burnCondition && (
        <BurnToken setBurnAmount={setBurnAmount} burnMyToken={burnMyToken} />
      )}
      {boughtCondition && <BoughtItems />}

      <hr className="col-start-1 col-end-4 w-full h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />

      {!redeemNFT && (
        <div className="">
          <div className="flex justify-center p-5">
            <button
              onClick={() => showMarketPlace()}
              className="bg-gradient-to-r from-red-600 via-blue-600 to-indigo-600 px-8 pb-3 pt-4 text-xs font-medium uppercase leading-normal rounded-2xl"
            >
              Show NFT Market Place
            </button>
          </div>
          <hr className="col-start-1 col-end-4 w-full h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
        </div>
      )}

      {redeemNFT && (
        <div className="mt-10 col-start-1 col-end-4 bg-opacity-90 p-10 justify-center space-x-8 space-y-5">
          <div className="text-2xl bolder flex justify-center mb-10 ">
            <p className="bg-gradient-to-r from-red-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent px-10 text-5xl">
              Game Inventory
            </p>
          </div>
          {showMarket &&
            nftCollection.map((eachItem, index) => (
              <Item
                key={index}
                itemName={eachItem.name}
                itemDescription={eachItem.description}
                itemSrc={getImage(eachItem.image)}
                itemPrice={eachItem.price}
                mintNFTFunction={mintNFTs}
                URI={urls[index]}
              />
            ))}
          ;
        </div>
      )}
    </div>
  );
}
