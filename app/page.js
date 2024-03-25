"use client"
import React,{useEffect,useState} from 'react'
import { Hero,Popup,Card } from '@/Components'
import {ABI,ADDRESS} from '../Components/contract/Abi'
import Web3 from "web3";
import { useStateValue } from '../stateProvider';

function page() {
  const [{providers,accounts},dispatch]=useStateValue();

  const titleData="Crowd Funding Contract";

  //donate popup model
  const [openModal,setOpenModal]=useState(false);
  const [donateComapign,setDonateCampign]=useState();

  // creating the instances to get the contract
  async function getContract(){
    const web3 = new Web3(providers);
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
    console.log("compaign",compaign)
    const {title,description,amount,deadline}=compaign
    const contract=await get();
    console.log("object",Web3.utils.toWei(amount, 'ether'))
    try{
      const transaction=await contract.methods.createCampaign(
        accounts,
        title,
        description,
        Web3.utils.toWei(amount, 'ether'),
        // ethers.utils.parseUnits(amount,18),
        new Date(deadline).getTime()
      ).send({from:accounts});

      // await transaction.wait();

      console.log("contract create successfully",transaction);

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
      description:item.description,
      target:Web3.utils.fromWei(item.target.toString(),"ether"),
      deadline:parseInt(item.deadline),
      amountCollected:Web3.utils.fromWei(item.amountCollected.toString(),"ether"),
    
      pid:i
    }))
    return parsed;
  }

  const usercampaign=async()=>{
    const res= await allcampaign();

    console.log("result",res)
    console.log(accounts)
    const a=res.filter(item=>
      item.owner.toLowerCase().toString()==accounts
    )
    return a;
  }

  const donate=async(pId,amount)=>{
    const contract=await get();

    const valueInWei = Web3.utils.toWei(amount, 'ether');

    const res = await contract.methods.donateToCompaign(pId, {
      value: valueInWei
    }).send({ from: accounts });

    await res.wait();
    console.log("donate",res)
    return res;
  }

  const getDonations=async(pId)=>{
    const contract=await get();

    const donations=await contract.methods.getDonaters(pId);

    const lengths=donations[0].length;
    const parsedDonations=[];

    for(let i=0;i<lengths;i++){
      parsedDonations.push({
        donator:donations[0][i],
        donation:Web3.utils.fromWei(donations[1][i],"ether")
      })
    }

    return parsedDonations;
  }
  return (
    <>
      <Hero titleData={titleData} createCampaign={createCampaign}/>

      <Card 
      title="All Listed Campaign"
      allcampaign={allcampaign}
      setOpenModal={setOpenModal}
      setDonate={setDonateCampign}
      />

      <Card
      title="Your Created Compaign"
      allCompaign={usercampaign}
      setOpenModal={setOpenModal}
      setDonate={setDonateCampign}
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
