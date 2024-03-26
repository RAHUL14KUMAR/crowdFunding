"use client"
import React,{useEffect,useState} from 'react'
import { Hero,Popup,Card,CardT } from '@/Components'
import {ABI,ADDRESS} from '../Components/contract/Abi'
import Web3 from "web3";
import { useStateValue } from '../stateProvider';

function page() {
  const [{providers,accounts,id},dispatch]=useStateValue();
  const [walletAddress,setWalletAddress] = useState('');
  const [getAll,setAll]=useState([])
  const [userall,setAuserAll]=useState([])
  

  const titleData="Crowd Funding Contract";

  useEffect(()=>{
    connect()
    allcampaign()
    usercampaign()
  },[userall,getAll])
  let  provider=typeof window !== 'undefined' && window.ethereum;

    const connect=async()=>{
        // e.preventDefault();
        try{
            if(!provider){
              alert('please install metamask');
              return;
            }
      
            const accounts = await provider.request({ method: 'eth_requestAccounts' });
      
            if(accounts.length){
              setWalletAddress(accounts[0]);
              dispatch({
                type:'SET_ACCOUNT',
                account:accounts[0]
              })
            }
      
            dispatch({
              type:'SET_PROVIDER',
              providers:provider
            })

        }catch(error){
            console.log(error)
        }
    }

  //donate popup model
  const [openModal,setOpenModal]=useState(false);
  const [donateComapign,setDonateCampign]=useState(titleData);

  // creating the instances to get the contract
  async function getContract(){
    const web3 = new Web3(provider);
    return new web3.eth.Contract(ABI,ADDRESS);
  }
  async function get(){
    const contract=await getContract();
    dispatch({
      type:'SET_CONTRACT',
      contract:contract
    })
    return contract;
  }

  // after getting the instance of the contract using get() function we can get all the methods of the contract using contract.methods
  const createCampaign=async(compaign)=>{
    // console.log("compaign",compaign)
    const {title,decription,amount,deadline}=compaign
    const contract=await get();
    // console.log("object",Web3.utils.toWei(amount, 'ether'))
    try{
      const transaction=await contract.methods.createCampaign(
        accounts,
        title,
        decription,
        Web3.utils.toWei(amount, 'ether'),
        new Date(deadline).getTime()
      ).send({from:accounts});

      // await transaction.wait();

      // console.log("contract create successfully",transaction);

    }catch(error){
      console.log("cannnot reach to the contract methods call")
      console.log(error);
    }
  }

  const allcampaign=async()=>{
    const contract=await get();
    const res=await contract.methods.getCompaigns().call();
    const parsed=res.map((item,i)=>({
      owner:item.owner,
      title:item.title,
      description:item.decription,
      target:Web3.utils.fromWei(item.target.toString(),"ether"),
      deadline:parseInt(item.deadline),
      amountCollected:Web3.utils.fromWei(item.amountCollected.toString(),"ether"),
    
      pid:i
    }))
    // console.log(parsed)
    dispatch({
      type:'GET_ALL_COMPAIGN',
      get:parsed
    })
    setAll(parsed);
    return parsed;
  }

  const usercampaign=async()=>{
    const res= await allcampaign();

    // console.log("result",res)
    // console.log(accounts)
    const a=res.filter(item=>
      item.owner.toLowerCase().toString()==accounts
    )
    dispatch({
      type:'SET_USER_COMPAIGN',
      user:a
    })
    setAuserAll(a);
    return a;
  }

  const donate=async(id,amount)=>{
    const contract=await get();

    const valueInWei = Web3.utils.toWei(amount, 'ether');

    const res = await contract.methods.donateToCompaign(id, {
      value: valueInWei
    }).send({ from: accounts });

    // await res.wait();
    console.log("donate",res)
    return res;
  }

  const getDonations=async()=>{
    console.log("id",id)

    const contract=await get();

    const donations=await contract.methods.getDonaters(id).call();

    const lengths=donations[0].length;
    const parsedDonations=[];

    for(let i=0;i<lengths;i++){
      parsedDonations.push({
        donator:donations[0][i],
        donation:Web3.utils.fromWei(donations[1][i],"ether")
      })
    }
    console.log("parsed donations",parsedDonations)

    return parsedDonations;
  }
  return (
    <>
      <Hero titleData={titleData} createCampaign={createCampaign}/> 

      <Card 
      title="All Listed Campaign"
      setOpenModal={setOpenModal}
      />

      <CardT
      title="Your Created Compaign"
      setOpenModal={setOpenModal}
      />

      {
        openModal && (
          <Popup
          setOpenModal={setOpenModal}
          getDonations={getDonations}
          donate={donateComapign}
          donateFunction={donate}
          />
        )
      }
    </>
  )
}

export default page
