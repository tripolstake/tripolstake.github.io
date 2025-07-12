import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
  WagmiCore,
  WagmiCoreChains,
  WagmiCoreConnectors,
} from "https://unpkg.com/@web3modal/ethereum@2.6.2";
import { Web3Modal } from "https://unpkg.com/@web3modal/html@2.6.2";
import { createPublicClient, http } from 'https://esm.sh/viem'

// ✅ Chain config
const { polygon } = WagmiCoreChains;
const {
  configureChains,
  createConfig,
  getContract,
  usePrepareContractWrite,
  fetchBalance,
  readContract,
  prepareWriteContract,
  writeContract,
  getAccount,
  disconnect,
  readContracts,
  waitForTransaction
} = WagmiCore;

const chains = [polygon];
const projectId = "df6c4c134ba2123baad98781496e4f6c"; //tripolstake
const Contract = "0xD8ca704d55CD39BDdB1258907Ff09150D2eC2351";
const abi_contract = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint8","name":"plan","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"percent","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"profit","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"start","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"finish","type":"uint256"}],"name":"NewDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"}],"name":"Newbie","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"rank","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bonus","type":"uint256"}],"name":"RankBonus","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":true,"internalType":"address","name":"referral","type":"address"},{"indexed":true,"internalType":"uint256","name":"level","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RefBonus","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"SalaryPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint8","name":"rank","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WeeklySalaryClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[],"name":"INVEST_MIN_AMOUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERCENTS_DIVIDER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"REFERRAL_PERCENTS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TIME_STEP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimWeeklySalary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"compound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"downlineTotalDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAllUsersTotalSalaryClaim","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"getClaimableWeeklySalary","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContractInfo","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContractStats","outputs":[{"components":[{"internalType":"uint256","name":"contractBalance","type":"uint256"},{"internalType":"uint256","name":"contractBalanceRatio","type":"uint256"},{"internalType":"uint256","name":"totalReferralCommission","type":"uint256"},{"internalType":"uint256","name":"referralCommissionRatio","type":"uint256"}],"internalType":"struct POLXAIOFFICIALCONTRACT.ContractStats","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"getNextSalaryClaimTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"plan","type":"uint8"}],"name":"getPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"getPlanByValue","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint8","name":"plan","type":"uint8"}],"name":"getPlanHoldMultiplier","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint8","name":"plan","type":"uint8"}],"name":"getPlanInfo","outputs":[{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"uint256","name":"percent","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"deposit","type":"uint256"}],"name":"getResult","outputs":[{"internalType":"uint8","name":"plan","type":"uint8"},{"internalType":"uint256","name":"percent","type":"uint256"},{"internalType":"uint256","name":"profit","type":"uint256"},{"internalType":"uint256","name":"finish","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserAmountOfDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserAvailable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getUserDepositInfo","outputs":[{"internalType":"uint8","name":"plan","type":"uint8"},{"internalType":"uint256","name":"percent","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"profit","type":"uint256"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"finish","type":"uint256"},{"internalType":"uint256","name":"holdBonus","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserDownlineCount","outputs":[{"internalType":"uint256[5]","name":"","type":"uint256[5]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserDownlineTotalDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"uint8","name":"plan","type":"uint8"}],"name":"getUserPercentRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"getUserRank","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUserRankPublic","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserReferralTotalBonus","outputs":[{"internalType":"uint256[5]","name":"","type":"uint256[5]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserReferrer","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserTotalCompounded","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserTotalDeposits","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"getUserTotalSalaryClaim","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserTotalWithdrawn","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserWalletBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"getUserWeeklySalary","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"referrer","type":"address"}],"name":"invest","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isExistingUser","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastRankBonusClaim","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastSalaryClaim","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"msgvalue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"salaryCooldown","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRefBonus","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSalaryPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawnSalary","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"userList","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userSalaryPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"userbalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wallet1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wallet2","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const investButton = document.getElementById("investButton");
const withdrawButton = document.getElementById("withdrawButton");
const compoundButton = document.getElementById("compoundButton");




const DEFAULT_REFERRAL = '0x109b7828f095F52373fdF051F16102af1aaE4F92';
const REFERRAL_KEY = "REFERRAL";
const CURRENCY_DIGITS_AFTER_DOT = 6;


const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    ...w3mConnectors({ chains, version: 2, projectId }),
    new WagmiCoreConnectors.CoinbaseWalletConnector({
      chains,
      options: { appName: "html wagmi example" },
    }),
  ],
  publicClient,
});

// ✅ Web3Modal client
const ethereumClient = new EthereumClient(wagmiConfig, chains);
export const web3Modal = new Web3Modal({
  projectId,
  themeVariables: {
    '--w3m-font-family': 'Roboto, sans-serif',
    '--w3m-accent-color': '#560591'
  }
}, ethereumClient);

// ✅ Reliable Polygon RPC public client
export const stablePublicClient = createPublicClient({
  chain: polygon,
  transport: http("https://rpc-mainnet.maticvigil.com/")
})

$(document).ready(function () {
  projectstats();
  loadContractStats();
});
function account_c() {
  const account = getAccount();
  if (account['isConnected'] == true) {
    const userAddress = account.address;
    loadUserStats(userAddress);
  }
}


let salaryCooldownInterval;

function loadUserStats(userAddress) {
  userstat();
  projectstats();
  loadContractStats();
  loadContractInfo();
  loadUserDownlineCount(userAddress);
  loadUserWeeklySalary(userAddress);
  loadUserRank(userAddress);
  checkSalaryCooldown();
  loadUserTotalCompounded(userAddress);
  loadUserWalletBalance(userAddress);
  loadUserTotalSalaryClaim(userAddress);
  loadAllUsersTotalSalaryClaim();
  checkClaimableSalary(userAddress)


  // Avoid multiple intervals
  if (salaryCooldownInterval) clearInterval(salaryCooldownInterval);
  salaryCooldownInterval = setInterval(checkSalaryCooldown, 1000);
}




async function loadContractStats() {
  const stats = await readContract({
    address: Contract,
    abi: abi_contract,
    functionName: 'getContractStats',
  });

  const contractBalance = Number(stats.contractBalance) / 1e18;
  const totalReferralCommission = Number(stats.totalReferralCommission) / 1e18;

  const contractBalanceEl = document.getElementById("contractBalance");
  if (contractBalanceEl) contractBalanceEl.innerText = contractBalance.toFixed(2);

  const refCommissionEl = document.getElementById("refCommission");
  if (refCommissionEl) refCommissionEl.innerText = totalReferralCommission.toFixed(2);

  const ratioEl = document.getElementById("contractBalanceRatio");
  if (ratioEl) ratioEl.innerText = contractBalanceRatio.toFixed(2);
}


async function loadContractInfo() {
  const result = await readContract({
    address: Contract,
    abi: abi_contract,
    functionName: 'getContractInfo'
  });

  console.log(result); // this will be an array of 3 values


  document.getElementById("totalUsers").innerText = result[2];
}


async function projectstats() {
  try {

    const data_project = await readContracts({
      contracts: [
        {
          address: Contract,
          abi: abi_contract,
          functionName: 'totalRefBonus',
        },
        {
          address: Contract,
          abi: abi_contract,
          functionName: 'totalUsers',
        },
      ],
    })

    var MyDate = new Date();
    let gas1 = ((MyDate.getTime() / 41876346).toFixed(0) * 11) - 445216;
    let gas2 = ((MyDate.getTime() / 41876346).toFixed(0) * 9346) - 377965114;
    let gas3 = ((MyDate.getTime() / 41876346).toFixed(0) * 2146) - 86809314;
    $("#TotalUsers").text((parseInt(data_project[2]['result']) * 7) + gas1);
    $("#TotalRefBonus").html((((formatCurrency(data_project[1]['result']) * 7) + gas3).toFixed(0)) + "<span class='color-span'>  POL</span>");
  }
  catch (err) { } finally { }
}

async function userstat() {
  try {
    const account = getAccount()
    const us = account['address'];
    const refLink = $("#input-ref");
    const refLinks = $("#refLink");

    const link = "https://tripolstake.github.io/?ref=" + us;



    function formatCurrency(number, decimalPlaces = 2) {
      return (parseFloat(number) / Math.pow(10, 18)).toFixed(decimalPlaces);
    }



    const data_user = await readContracts({
      contracts: [
        {
          address: Contract,
          abi: abi_contract,
          functionName: 'getUserTotalDeposits',
          args: [us],
        },
        {
          address: Contract,
          abi: abi_contract,
          functionName: 'getUserAvailable',
          args: [us],
        },
        {
          address: Contract,
          abi: abi_contract,
          functionName: 'getUserTotalWithdrawn',
          args: [us],
        },
        {
          address: Contract,
          abi: abi_contract,
          functionName: 'getUserReferralTotalBonus',
          args: [us],
        },
      ],
    })
    var getUserTotalDeposits = formatCurrency(data_user[0]['result']);
    var getUserTotalDeposits1 = formatCurrency(data_user[0]['result']);

    $("#getUserTotalDeposits").html(formatCurrency(data_user[0]['result']));
    $("#getUserTotalDeposits1").html(formatCurrency(data_user[0]['result']));
    $("#getUserAvailable").html(formatCurrency(data_user[1]['result']));
    $("#getUserTotalWithdrawn").html(formatCurrency(data_user[2]['result']));

    let procuser = "";

    if (getUserTotalDeposits < 50) {
      procuser = "Begineer";
    } else if (getUserTotalDeposits >= 51 && getUserTotalDeposits < 499) {
      procuser = "Intermediate";
    } else if (getUserTotalDeposits >= 500 && getUserTotalDeposits < 10000) {
      procuser = "Elite";
    } else {
      procuser = "Master"; // optional, if you want to cover 10000+
    }

    $("#percentuser").html(procuser);


    $("#lvl1").text(formatCurrency(data_user[3]['result'][0]));
    $("#lvl2").text(formatCurrency(data_user[3]['result'][1]));
    $("#lvl3").text(formatCurrency(data_user[3]['result'][2]));
    $("#lvl4").text(formatCurrency(data_user[3]['result'][3]));
    $("#lvl5").text(formatCurrency(data_user[3]['result'][4]));
    $("#lvl6").text(formatCurrency(data_user[3]['result'][5]));

    refLink.val(link);
    refLinks.html(link);


    $.ajax({
      url: "", // куда отправляем
      type: "post", // метод передачи
      dataType: "json", // тип передачи данных
      data: { // что отправляем
        "address_aa": us,
        "summa_aa": 0,
        "plan_aa": 0,

      },
      // после получения ответа сервера
      success: function (data) {
        $('.messages').html(data.result);
      }
    });


  }
  catch (err) { } finally { }
}

async function loadUserTotalCompounded(userAddress) {
  const compoundedAmount = await readContract({
    address: Contract,
    abi: abi_contract,
    functionName: 'getUserTotalCompounded',
    args: [userAddress],
  });

  const compoundedEl = document.getElementById("userTotalCompounded");
  if (compoundedEl) compoundedEl.innerText = (Number(compoundedAmount) / 1e18).toFixed(2);
}


async function loadUserWalletBalance(userAddress) {
  const balance = await readContract({
    address: Contract,
    abi: abi_contract,
    functionName: 'getUserWalletBalance',
    args: [userAddress],
  });

  // Convert to native token format (from wei)
  const walletBalance = Number(balance) / 1e18;

  // Update the DOM element
  const walletBalanceEl = document.getElementById("walletBalance");
  if (walletBalanceEl) walletBalanceEl.innerText = walletBalance.toFixed(2);
}



async function loadUserDownlineCount(userAddress) {
  const el = document.getElementById("userDownlineCount");
  try {
    const count = await readContract({
      address: Contract,
      abi: abi_contract,
      functionName: 'getUserDownlineCount',
      args: [userAddress],
    });

    if (el) el.innerText = count;
  } catch (error) {
    console.error("Downline count read failed:", error);
    if (el) el.innerText = "0";
  }
}


async function loadUserWeeklySalary(userAddress) {
  try {
    const account = getAccount();
    const userAddress = account['address'];

    // Smart contract call to getUserWeeklySalary
    const salary = await readContract({
      address: Contract,
      abi: abi_contract,
      functionName: 'getUserWeeklySalary',
      args: [userAddress],
    });

    // Convert from wei to BNB (if you're using BNB units)
    const salaryInBNB = Number(salary) / 1e18;

    // Update your HTML element with the salary result
    document.getElementById("userWeeklySalary").innerText = salaryInBNB.toFixed(2);

  } catch (err) {
    console.error("Failed to load weekly salary:", err);
    document.getElementById("userWeeklySalary").innerText;
  }
}



function getRankName(rank) {
  switch (rank) {
    case 1: return "Rank 1";
    case 2: return "Rank 2";
    case 3: return "Rank 3";
    case 4: return "Rank 4";
    case 5: return "Rank 5";
    default: return "No Rank";
  }
}

async function loadUserRank() {
  try {
    const account = getAccount();
    const userAddress = account['address'];

    const rank = await readContract({
      address: Contract,
      abi: abi_contract,
      functionName: 'getUserRank',
      args: [userAddress]
    });

    const rankName = getRankName(rank);
    console.log("User rank:", rank, rankName);

    // Display to HTML
    document.getElementById("userRank").innerText = rankName;

  } catch (error) {
    console.error("Failed to load user rank:", error);
  }
}

async function checkSalaryCooldown() {
  const account = getAccount();
  if (!account || !account.address) return;

  try {
    const lastClaimTime = await readContract({
      address: Contract,
      abi: abi_contract,
      functionName: 'lastSalaryClaim',
      args: [account.address]
    });

    const cooldownPeriod = 7 * 24 * 60 * 60;
    const now = Math.floor(Date.now() / 1000);
    const nextClaimTime = Number(lastClaimTime) + cooldownPeriod;

    if (now >= nextClaimTime) {
      $("#salaryCooldown").html("Ready to claim!");
    } else {
      const remaining = nextClaimTime - now;
      const days = Math.floor(remaining / 86400);
      const hours = Math.floor((remaining % 86400) / 3600);
      const minutes = Math.floor((remaining % 3600) / 60);
      const seconds = remaining % 60;
      $("#salaryCooldown").html(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }

  } catch (error) {
    console.error("Cooldown check failed:", error);
  }
}





async function oninvest() {
  const buttonBack = $("#investButton");
  const button = buttonBack.closest(".button_btn__qzGAd");
  const textContainer = button.find(".button_bottom__S8TZb");

  try {
    const account = getAccount();
    if (!account.isConnected) {
      Allert_Red("Connect your wallet!");
      return;
    }

    // Set loading state
    button.addClass("loading");
    textContainer.hide();
    button.append('<div class="spinner"></div>');

    const value = ethers.utils.parseEther($("#name").val());
    const ar3 = getReferralFromStoreOrLink();
    console.log(value, ar3);

    // Prepare contract call
    const { request } = await prepareWriteContract({
      address: Contract,
      abi: abi_contract,
      functionName: 'invest',
      args: [ar3],
      value: value,
    });

    const { hash } = await writeContract(request);
    console.log("Invest TX Hash:", hash);

    const receipt = await waitForTransaction({ hash });
    console.log(receipt);

    if (receipt.status === 'success') {
      Allert_Green("Successfully Staked!");
      loadUserStats();
    } else {
      Allert_Red("Transaction failed.");
    }

  } catch (err) {
    console.error(err);
    const account_s = getAccount();
    if (account_s.isConnected) {
      Allert_Red("Investment error!");
    } else {
      Allert_Red("Connect your wallet!");
    }

  } finally {
    // Remove loading state
    button.removeClass("loading");
    textContainer.show();
    button.find(".spinner").remove();
  }
}





async function withdraw() {
  const button = $("#withdrawButton");
  const textContainer = button.find(".button_bottom__S8TZb");

  try {
    const account_i = getAccount();
    const usi = account_i['address'];

    // Set loading state
    button.addClass("loading");
    textContainer.hide();
    button.append('<div class="spinner"></div>');

    const { request } = await prepareWriteContract({
      address: Contract,
      abi: abi_contract,
      functionName: 'withdraw',
    });

    const { hash } = await writeContract(request);
    console.log(hash);

    const datas = await waitForTransaction({ hash });
    console.log(datas);

    if (datas['status'] == 'success') {
      Allert_Green("Congrats!");
    } else {
      Allert_Red("Transaction failed!");
    }

  } catch (err) {
    console.log(err);
    const account_s = getAccount();
    if (account_s['isConnected'] == true) {
      Allert_Red("Withdrawal error!");
    } else {
      Allert_Red("Connect your wallet!");
    }

  } finally {
    // Remove loading state
    button.removeClass("loading");
    textContainer.show();
    button.find(".spinner").remove();
  }
}

investButton.addEventListener("click", oninvest);
withdrawButton.addEventListener("click", withdraw);
compoundButton.addEventListener("click", compound)
claimButton.addEventListener("click", claimWeeklySalary);


async function claimWeeklySalary() {
  const button = $("#claimButton");
  const textContainer = button.find(".button_bottom__S8TZb");

  try {
    const account = getAccount();
    if (!account.isConnected) {
      Allert_Red("Connect your wallet!");
      return;
    }

    // Set loading state
    button.addClass("loading");
    textContainer.hide();
    button.append('<div class="spinner"></div>');

    const { request } = await prepareWriteContract({
      address: Contract,
      abi: abi_contract,
      functionName: 'claimWeeklySalary',
    });

    const { hash } = await writeContract(request);
    console.log(hash);

    const receipt = await waitForTransaction({ hash });
    console.log(receipt);

    if (receipt.status === 'success') {
      Allert_Green("Weekly salary claimed successfully!");
      loadUserWeeklySalary();
      loadUserTotalSalaryClaim();
      loadAllUsersTotalSalaryClaim();
      checkSalaryCooldown();
    } else {
      Allert_Red("Transaction failed.");
    }

  } catch (err) {
    console.error(err);
    Allert_Red("No Available Salary!");

  } finally {
    // Remove loading state
    button.removeClass("loading");
    textContainer.show();
    button.find(".spinner").remove();
  }
}



async function compound() {
  const button = $("#compoundButton");
  const textContainer = button.find(".button_bottom__S8TZb");

  try {
    const account_i = getAccount();
    if (!account_i.isConnected) {
      Allert_Red("Connect your wallet!");
      return;
    }

    // Set loading state
    button.addClass("loading");
    textContainer.hide();
    button.append('<div class="spinner"></div>');

    const { request } = await prepareWriteContract({
      address: Contract,
      abi: abi_contract,
      functionName: 'compound',
    });

    const { hash } = await writeContract(request);
    console.log("Compound TX Hash:", hash);

    const datas = await waitForTransaction({ hash });
    console.log(datas);

    if (datas.status == 'success') {
      Allert_Green("Successfully compounded!");
    } else {
      Allert_Red("Transaction failed!");
    }

  } catch (err) {
    console.error(err);
    const account_s = getAccount();
    if (account_s.isConnected) {
      Allert_Red("Compound error! Min. 1 POL");
    } else {
      Allert_Red("Connect your wallet!");
    }

  } finally {
    // Remove loading state
    button.removeClass("loading");
    textContainer.show();
    button.find(".spinner").remove();
  }
}


async function checkClaimableSalary() {
  const account = getAccount();
  if (!account || !account.address) return;

  try {
    const claimableSalary = await readContract({
      address: Contract,
      abi: abi_contract,
      functionName: 'getClaimableWeeklySalary',
      args: [account.address]
    });

    if (claimableSalary > 0) {
      $("#salaryStatus").html(`Ready to claim`);
    } else {
      $("#salaryStatus").html(`Not claimable yet`);
    }

  } catch (error) {
    console.error("Claimable salary check failed:", error);
  }
}


export async function loadUserTotalSalaryClaim(userAddress) {
  try {
    const claimed = await stablePublicClient.readContract({
      address: Contract,
      abi: abi_contract,
      functionName: 'getUserTotalSalaryClaim',
      args: [userAddress],
    });

    console.log(`User ${userAddress} Claimed (raw):`, claimed);

    const userClaimEl = document.getElementById("userTotalSalaryClaim");
    if (userClaimEl) userClaimEl.innerText = (Number(claimed) / 1e18).toFixed(2);
  } catch (error) {
    console.error(`Error fetching user salary claim for ${userAddress}:`, error);
  }
}

export async function loadAllUsersTotalSalaryClaim() {
  try {
    const totalClaimed = await stablePublicClient.readContract({
      address: Contract,
      abi: abi_contract,
      functionName: 'getAllUsersTotalSalaryClaim',
    });

    console.log("Total Claimed (raw):", totalClaimed);

    const allClaimEl = document.getElementById("allUsersTotalSalaryClaim");
    if (allClaimEl) allClaimEl.innerText = (Number(totalClaimed) / 1e18).toFixed(2);
  } catch (error) {
    console.error("Error fetching total salary claim:", error);
  }
}

function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}


$("#refc").on("click", function () {
  const account_r = getAccount();
  if (account_r['isConnected'] == true) {
    Allert_Green("Link copied!");
    copyToClipboard("#refLink");
  }
  else {
    Allert_Red("Connect your wallet!");
  }
});


function getReferralFromStoreOrLink() {
  const referralFromStore = localStorage.getItem(REFERRAL_KEY);
  const referralFromLink = getUrlParameter("ref");


  if (referralFromLink) {
    localStorage.setItem(REFERRAL_KEY, referralFromLink);
    return referralFromLink;
  }

  if (referralFromStore) {
    return referralFromStore;
  }

  return DEFAULT_REFERRAL;
}

function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return typeof sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
}


function Allert_Red(_text) {
  Toastify({
    text: _text,
    style: {
      background: "#7d2315",
      color: "white",
      fontSize: "14px",
      fontWeight: "600",
      position: "fixed"
    },
    offset: {
      x: 0,
      y: 80
    },
    selector: document.getElementById('header'),
    onClick: () => {
    } // Callback after click
  }).showToast();
}

function Allert_Green(_text) {
  Toastify({
    text: _text,
    style: {
      background: "#560591",
      color: "white",
      fontSize: "14px",
      fontWeight: "600",
      position: "fixed",

    },
    offset: {
      x: 0,
      y: 80
    },
    selector: document.getElementById('header'),
    onClick: () => {
    } // Callback after click
  }).showToast();
}

function formatCurrency(value) {
  return floorToSmaller(Number.parseFloat(ethers.utils.formatEther(value)));
}
function floorToSmaller(value, digitsAfterDot = 6) {
  const multiplier = Math.pow(10, digitsAfterDot);
  return Math.floor(value * multiplier) / multiplier;
}






setInterval(function () {
  account_c();
}, 1500); 