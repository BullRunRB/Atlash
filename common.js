
// ═══════════════════════════════════════════════════════════
// ATLASH LearnEarn · Landing + DApp
// ═══════════════════════════════════════════════════════════

// ── NETWORK CONFIG ──
const NETS = {
  mainnet:{
    label:'BSC Mainnet',chainId:56,chainIdHex:'0x38',
    rpcs:['https://bsc-dataseed1.binance.org/','https://bsc-dataseed2.binance.org/','https://bsc.publicnode.com'],
    explorer:'https://bscscan.com',
    nativeCurrency:{name:'BNB',symbol:'BNB',decimals:18}
  },
  testnet:{
    label:'BSC Testnet',chainId:97,chainIdHex:'0x61',
    rpcs:[
      'https://bsc-testnet-rpc.publicnode.com',
      'https://data-seed-prebsc-1-s1.binance.org:8545/',
      'https://data-seed-prebsc-2-s1.binance.org:8545/',
      'https://data-seed-prebsc-1-s2.binance.org:8545/',
      'https://data-seed-prebsc-2-s2.binance.org:8545/',
      'https://bsc-testnet.drpc.org',
      'https://97.rpc.thirdweb.com',
    ],
    explorer:'https://testnet.bscscan.com',
    nativeCurrency:{name:'tBNB',symbol:'tBNB',decimals:18}
  }
};

// ── DEPLOY ADDRESSES ──
const DEPLOY_MAINNET = {
  usdt:       '0x55d398326f99059fF775485246999027B3197955',
  core:       '0x8158C4daCF848A92c90830f803383bb2e10EA097',
  pool:       '0xB4937207dFEA9Ced60e15D3A08F9CD7D0C91eF9B',
  rank:       '0x862d49145A0640ff4f1C9E80Dfe33BEAaDe6b39d',
  treasury:   '0x46C6180Af0FF2A4E9f11f5701A0183eb2404C344',
  slot:       '0x2e37Bc937e2aD0Aea41A20192e4112E2169AAC3e',
  rewards:    '0xFA00A1C90D25c763032280bb35163ab9c81004d8',
};

const DEPLOY_TESTNET = {
  usdt:       '0xea0b64B081c5a37ab51996b4A7e9B99559ffd782',
  core:       '0x7406f25AF83Da110fe4b048f574FA2963a6b30cf',
  pool:       '0x7E5d8B9f0e3A4198d028C121bb4f2f0C3F20139b',
  rank:       '0x8B0E6f6a6778B35C5Dd893795ED647a271Ed3D56',
  treasury:   '0x87D443FAD5a4C3d9bE193960e359c54c57a40201',
  slot:       '0xB09687A566E430643C6B7eDCfF2ec2BDb7dcfdD2',
  rewards:    '0xf524aC6B614DCC9b4A3DC22cA82De46691B942C1',
};

// Root user (company root wallet)
const COMPANY_ROOT = '0x975C1768E0213D778287cb7A3324C8152389160E';

// Hardcoded founders — bypass gate without needing contract call
const PROTOCOL_FOUNDERS = [
  '0x08637844286742617ffDF9c89C9466eA475C6a34',
  '0x975c75f0577c31b7E9F6EC2fB89FBa48BbEd8eD6',
  '0x6dF15Fb8e6601eA09acB2439119926486dDdce2A',
  '0x010d4BcaB727D1b001E39c4eE1c8B7F15a40D131',
].map(a => a.toLowerCase());

// ── ABIs ──
const CORE_ABI = [
  // View
  "function getUserStatus(address) view returns (uint8 activeFlag, uint256 validUntil, address upline, bool exists, bool frozen)",
  "function userInfo(address) view returns (bool exists, bool frozen, bool isRoot_, address upline, uint256 joinedAt, uint256 totalSlotVolume)",
  "function userCommercialInfo(address) view returns (uint8 role, address commercialPartner, address master, string reason)",
  "function commercialContextOf(address) view returns (address commercialPartner, address master)",
  "function isRoot(address) view returns (bool)",
  "function accountStatusOf(address) view returns (uint8)",
  "function totalUsers() view returns (uint256)",
  "function userAt(uint256) view returns (address)",
  "function directCount(address) view returns (uint256)",
  "function directAt(address, uint256) view returns (address)",
  "function currentMonthIndex() view returns (uint256)",
  "function paused() view returns (bool)",
  "function companyRoot() view returns (address)",
  "function owner() view returns (address)",
  "function guardian() view returns (address)",
  "function autoVolumeDepth() view returns (uint8)",
  "function slotProgram() view returns (address)",
  "function ranksModule() view returns (address)",
  "function poolsModule() view returns (address)",
  // Admin write
  "function setPaused(bool) external",
  "function setGuardian(address) external",
  "function setCompanyRoot(address) external",
  "function setModules(address, address) external",
  "function setSlotProgram(address) external",
  "function setVolumeUpdater(address) external",
  "function setAutoVolumeDepth(uint8) external",
  "function freeze(address, bool) external",
  "function setUserAccountStatus(address, uint8, string) external",
  "function adminRegisterUser(address, address, uint8, address, string) external",
  "function setCommercialPartnerRole(address, string) external",
  "function setCommercialPartnerAndMasterRole(address, string) external",
  "function setMasterRole(address, address, string) external",
  "function clearSpecialRole(address, string) external",
  "function setCommercialLineage(address, address, address, string) external"
];

const SLOT_ABI = [
  // View
  "function nextPositionId() view returns (uint256)",
  "function totalActivePrincipal() view returns (uint256)",
  "function totalRemainingLiability() view returns (uint256)",
  "function remainingLiabilityBP() view returns (uint256)",
  "function previewDynamicRateBP() view returns (uint16)",
  "function coverageBP() view returns (uint256)",
  "function minDailyRateBP() view returns (uint16)",
  "function maxDailyRateBP() view returns (uint16)",
  "function dayRateBP(uint32) view returns (uint16)",
  "function positionsOf(address) view returns (uint256[])",
  "function highestActiveSlotLevel(address) view returns (uint8)",
  "function highestActiveOrGraceSlotLevel(address) view returns (uint8)",
  "function activePositionByLevel(address, uint8) view returns (uint256)",
  "function positions(uint256) view returns (address user, uint8 slotLevel, uint256 slotAmount, uint256 paidOut, uint256 capMax, uint32 openedDay, uint32 lastSyncDay, uint32 currentStreak, uint32 bestStreak, bool rewardActive, bool completed, bool roiEnabled)",
  "function slotLevelByAmount(uint256) view returns (uint8)",
  "function slotAmountByLevel(uint8) view returns (uint256)",
  "function activationFeeByLevel(uint8) view returns (uint256)",
  "function paused() view returns (bool)",
  "function buyPaused() view returns (bool)",
  "function syncPaused() view returns (bool)",
  // User write
  "function buySlot(uint256, address) external returns (uint256)",
  "function restartSlot(uint8) external returns (uint256)",
  "function sync(uint256) external",
  // Admin write
  "function setPaused(bool) external",
  "function setBuyPaused(bool) external",
  "function setSyncPaused(bool) external",
  "function setDynamicRateBounds(uint16, uint16) external",
  "function setDailyRateForDay(uint32, uint16) external",
  "function forceMaxRateForDay(uint32) external",
  "function clearManualDailyRate(uint32) external",
  "function setForcedMaxRatePolicy(uint8, uint32) external",
  "function adminActivateCommercialSlot(address, address, uint8, uint8, address, string) external returns (uint256)",
  "function adminActivateCommercialSlots(address, address, uint8[], uint8, address, string) external returns (uint256[])"
];

const RANK_ABI = [
  // View
  "function userRank(address) view returns (uint8)",
  "function personalVolume(address) view returns (uint256)",
  "function qualifiedNetworkVolume(address) view returns (uint256)",
  "function totalNetworkVolume(address) view returns (uint256)",
  "function canAccumulateQualifiedVolume(address) view returns (bool)",
  "function rankConfig(uint256) view returns (uint256 qualifiedVolumeRequired, uint8 minSlotLevel, bool enabled)",
  "function rankPoolByMonth(uint256, uint8) view returns (uint256)",
  "function rankPoolClaimable(uint256, uint8, address) view returns (uint256)",
  "function rankPoolFinalized(uint256, uint8) view returns (bool)",
  "function rankPoolScanStarted(uint256, uint8) view returns (bool)",
  "function rankPoolScanCursor(uint256, uint8) view returns (uint256)",
  "function scannedRankPoolCandidateCount(uint256, uint8) view returns (uint256)",
  "function pendingRankPools(address, uint256) view returns (uint256)",
  "function isQualifiedForPool(address, uint8) view returns (bool)",
  "function monthlyVolumeBurnBP() view returns (uint16)",
  // User write
  "function refreshRank(address) external returns (uint8)",
  "function claimRankPool(uint256, uint8) external",
  "function claimRankPools(uint256) external",
  "function claimSelectedRankPools(uint256, uint8[]) external",
  // Admin write (scan-based only — no manual list)
  "function setRankConfig(uint8, uint256, uint8, bool) external",
  "function startRankPoolScan(uint256, uint8, bytes32) external",
  "function scanRankPoolCandidatesBatch(uint256, uint8, uint256) external",
  "function finalizeScannedRankPoolMonth(uint256, uint8) external",
  "function setMonthlyVolumeBurnBP(uint16) external",
  "function burnQualifiedVolumeForUser(uint256, address, uint16, bytes32, string) external",
  "function burnQualifiedVolumeBatch(uint256, address[], bytes32) external"
];

const POOL_ABI = [
  // View
  "function leadershipPoolByMonth(uint256) view returns (uint256)",
  "function leadershipFinalized(uint256) view returns (bool)",
  "function pendingTopFive(address, uint256) view returns (uint256)",
  "function monthlyVolume(address, uint256) view returns (uint256)",
  "function minTopFiveMonthlyVolume() view returns (uint256)",
  // User write
  "function claimTopFive(uint256) external",
  "function claimTopFiveMonths(uint256[]) external",
  // Admin write
  "function setMinTopFiveMonthlyVolume(uint256) external",
  "function setTopFiveSharesBP(uint16[5], uint16) external",
  "function finalizeTopFiveMonth(uint256, address[5], bytes32) external"
];

const REWARD_ABI = ["function availableRewardsLiquidity() view returns (uint256)"];
const ENTERPRISE_ABI = [
  // Bucket balances
  "function founderPoolBalance() view returns (uint256)",
  "function operationsBalance() view returns (uint256)",
  "function commercialPartnerPoolBalance() view returns (uint256)",
  "function activationFeeBalance() view returns (uint256)",
  "function corporateFeeReserveBalance() view returns (uint256)",
  "function masterRevenueBalance() view returns (uint256)",
  // Founders — fixed array[4] public → getter needs index
  "function founders(uint256) view returns (address)",
  "function founderSharesBP(uint256) view returns (uint16)",
  "function pendingFounderRevenue(address) view returns (uint256)",
  "function totalFounderAllocated() view returns (uint256)",
  "function totalFounderClaimed() view returns (uint256)",
  // Partners
  "function isCommercialPartner(address) view returns (bool)",
  "function commercialPartnerShareBP(address) view returns (uint16)",
  "function commercialPartnerStatus(address) view returns (uint8)",
  "function commercialPartnerStatusReason(address) view returns (string)",
  "function pendingCommercialPartnerRevenue(address) view returns (uint256)",
  "function commercialPartnerCount() view returns (uint256)",
  "function totalCommercialPartnerAllocated() view returns (uint256)",
  "function totalCommercialPartnerClaimed() view returns (uint256)",
  // Masters
  "function isMaster(address) view returns (bool)",
  "function masterStatus(address) view returns (uint8)",
  "function masterStatusReason(address) view returns (string)",
  "function masterShareBP(address) view returns (uint16)",
  "function masterAccumulatedOrganizationVolume(address) view returns (uint256)",
  "function masterPendingClaim(address) view returns (uint256)",
  "function totalMasterAllocated() view returns (uint256)",
  "function totalMasterClaimed() view returns (uint256)",
  "function totalFeesCollected() view returns (uint256)",
  // Protocol stats
  "function commercialPartnerCount() view returns (uint256)",
  "function totalOperationsWithdrawn() view returns (uint256)",
  "function totalCorporateFeesWithdrawn() view returns (uint256)",
  "function corporateFeeReserveBalance() view returns (uint256)",
  // Recovery (V16.8.2)
  "function accountedUSDTBalance() view returns (uint256)",
  "function excessUSDTBalance() view returns (uint256)",
  "function recoverExcessUSDT(address, uint256) external",
  // User write
  "function claimFounderRevenue() external",
  "function claimCommercialPartnerRevenue() external",
  "function claimMasterRevenue() external",
  // Admin write
  "function setInitialFounders(address[4], uint16[4]) external",
  "function configureCommercialPartners(address[], uint16[]) external",
  "function setCommercialPartnerStatus(address, uint8, string) external",
  "function registerMaster(address) external",
  "function removeMaster(address) external",
  "function setMasterStatus(address, uint8, string) external",
  "function withdrawOperation(address, uint256) external",
  "function withdrawCorporateFeeReserve(address, uint256) external",
];
const USDT_ABI = [
  "function approve(address,uint256) returns (bool)",
  "function allowance(address,address) view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address,uint256) returns (bool)",
  "function decimals() view returns (uint8)"
];
const ERC20_ABI = USDT_ABI; // alias

// ── STATE ──
let activeNet = null, _netKey = 'testnet';
let provider = null, signer = null, walletAddr = null;
// ── Safe connection helper ──
function _applySafeProvider(safeAddr, ethProvider) {
  walletAddr = safeAddr.toLowerCase();
  provider   = ethProvider;
  const d    = DEPLOY_MAINNET;
  contracts.core       = new ethers.Contract(d.core,     CORE_ABI,       ethProvider);
  contracts.slot       = new ethers.Contract(d.slot,     SLOT_ABI,       ethProvider);
  contracts.rank       = new ethers.Contract(d.rank,     RANK_ABI,       ethProvider);
  contracts.pool       = new ethers.Contract(d.pool,     POOL_ABI,       ethProvider);
  contracts.enterprise = new ethers.Contract(d.treasury, ENTERPRISE_ABI, ethProvider);
  contracts.reward     = new ethers.Contract(d.rewards,  REWARD_ABI,     ethProvider);
  contracts.usdt       = new ethers.Contract(d.usdt,     ERC20_ABI,      ethProvider);
  addrs = d;
  const lbl  = document.getElementById('wallet-label');
  const pill = document.getElementById('wallet-pill');
  const dot  = document.getElementById('wallet-dot');
  if(lbl)  lbl.textContent = walletAddr.slice(0,6)+'…'+walletAddr.slice(-4);
  if(pill) { pill.disabled = false; pill.classList.add('connected'); }
  if(dot)  dot.className   = 'wallet-dot connected';
}

// ── Minimal Safe Apps SDK — implemented via postMessage protocol ──
// Source: @safe-global/safe-apps-sdk v8.1.0 communication protocol
const _SafeSDK = (() => {
  const SDK_VERSION = '8.1.0';
  const callbacks   = new Map();

  const genId = () => {
    const arr = new Uint8Array(5);
    crypto.getRandomValues(arr);
    return Array.from(arr, b => b.toString(16).padStart(2,'0')).join('');
  };

  // Listen for ALL messages from Safe parent
  window.addEventListener('message', (event) => {
    if (!event.data || typeof event.data !== 'object') return;
    const { id, success, data, error } = event.data;
    if (!id || !callbacks.has(id)) return;
    const { resolve, reject } = callbacks.get(id);
    callbacks.delete(id);
    if (success === false) reject(new Error(error || 'Safe error'));
    else resolve(data);
  });

  // Send once and wait
  const sendOnce = (method, params, timeoutMs) => {
    const id  = genId();
    const msg = { id, method, params, env: { sdkVersion: SDK_VERSION } };
    const origins = ['https://app.safe.global', 'https://gnosis-safe.io', '*'];
    origins.forEach(o => { try { window.parent.postMessage(msg, o); } catch(e) {} });
    return new Promise((resolve, reject) => {
      callbacks.set(id, { resolve, reject });
      setTimeout(() => {
        if (callbacks.has(id)) { callbacks.delete(id); reject(new Error('timeout')); }
      }, timeoutMs || 3000);
    });
  };

  // Retry until success or maxAttempts reached
  const send = async (method, params) => {
    const maxAttempts = 10;
    const delayMs     = 1000;
    for (let i = 0; i < maxAttempts; i++) {
      try {
        const result = await sendOnce(method, params, 3000);
        console.log('[Safe] ' + method + ' OK on attempt ' + (i+1));
        return result;
      } catch(e) {
        console.log('[Safe] ' + method + ' attempt ' + (i+1) + ' failed: ' + e.message);
        if (i < maxAttempts - 1) await new Promise(r => setTimeout(r, delayMs));
      }
    }
    throw new Error('Safe did not respond after ' + maxAttempts + ' attempts');
  };

  return {
    getSafeInfo: ()          => send('getSafeInfo', undefined),
    rpcCall:     (call, p)   => send('rpcCall', { call, params: p }),
    sendTxs:     (txs)       => send('sendTransactions', { txs }),
  };
})();


async function tryConnectSafeApp() {
  try {
    if (window.self === window.top) return false;

    console.log('[Safe] Detected iframe context — requesting Safe info…');
    const safeInfo = await _SafeSDK.getSafeInfo().catch(e => {
      console.warn('[Safe] getSafeInfo failed:', e.message);
      return null;
    });

    if (!safeInfo?.safeAddress) {
      console.warn('[Safe] No safeAddress in response:', safeInfo);
      return false;
    }

    const safeAddr = safeInfo.safeAddress;
    console.log('[Safe] Connected as:', safeAddr);

    // Build ethers provider that routes calls through Safe's rpcCall
    const safeEIP1193 = {
      request: async ({ method, params = [] }) => {
        if (method === 'eth_accounts' || method === 'eth_requestAccounts')
          return [safeAddr];
        if (method === 'eth_chainId') return '0x38';
        if (method === 'net_version')  return '56';
        // Route RPC calls through Safe
        try {
          const result = await _SafeSDK.rpcCall(method, params);
          return result;
        } catch(e) {
          throw new Error(`RPC ${method} failed: ${e.message}`);
        }
      },
      on:             () => {},
      removeListener: () => {},
    };

    const ethProvider = new ethers.BrowserProvider(safeEIP1193);

    // For write operations, Safe handles signing via its own UI (sendTransactions)
    // We build a custom signer that routes sendTransaction through Safe
    const safeSigner = {
      provider: ethProvider,
      getAddress: async () => safeAddr,
      sendTransaction: async (tx) => {
        const safeTx = {
          to:    tx.to,
          value: tx.value?.toString() || '0',
          data:  tx.data  || '0x',
        };
        const result = await _SafeSDK.sendTxs([safeTx]);
        return { hash: result?.safeTxHash || result, wait: async () => ({}) };
      },
      // For signing typed data / messages
      signMessage:     async (msg) => { throw new Error('Use Safe UI for signing'); },
      signTypedData:   async ()    => { throw new Error('Use Safe UI for signing'); },
      connect:         () => safeSigner,
      _isSigner:       true,
    };

    // Override contract interactions to use Safe signer
    walletAddr = safeAddr.toLowerCase();
    provider   = ethProvider;
    signer     = safeSigner;

    const d = DEPLOY_MAINNET;
    contracts.core       = new ethers.Contract(d.core,     CORE_ABI,       ethProvider);
    contracts.slot       = new ethers.Contract(d.slot,     SLOT_ABI,       ethProvider);
    contracts.rank       = new ethers.Contract(d.rank,     RANK_ABI,       ethProvider);
    contracts.pool       = new ethers.Contract(d.pool,     POOL_ABI,       ethProvider);
    contracts.enterprise = new ethers.Contract(d.treasury, ENTERPRISE_ABI, ethProvider);
    contracts.reward     = new ethers.Contract(d.rewards,  REWARD_ABI,     ethProvider);
    contracts.usdt       = new ethers.Contract(d.usdt,     ERC20_ABI,      ethProvider);
    addrs = d;

    // Wire write contracts to safe signer
    contracts.core.__safeSigner       = safeSigner;
    contracts.slot.__safeSigner       = safeSigner;
    contracts.rank.__safeSigner       = safeSigner;
    contracts.pool.__safeSigner       = safeSigner;
    contracts.enterprise.__safeSigner = safeSigner;
    contracts.reward.__safeSigner     = safeSigner;
    contracts.usdt.__safeSigner       = safeSigner;

    const lbl  = document.getElementById('wallet-label');
    const pill = document.getElementById('wallet-pill');
    const dot  = document.getElementById('wallet-dot');
    if(lbl)  lbl.textContent = safeAddr.slice(0,6)+'…'+safeAddr.slice(-4);
    if(pill) { pill.disabled = false; pill.classList.add('connected'); }
    if(dot)  dot.className   = 'wallet-dot connected';

    toast('🔐 Safe Multisig conectado · '+safeAddr.slice(0,10)+'…', 'success');
    return true;

  } catch(e) {
    console.warn('[Safe auto-connect error]', e.message);
    return false;
  }
}

let currentUser = null;
let contracts = {};
let addrs = {};
let selectedSlot = 0;

const RANK_NAMES  = ['Sin rango','Rank 1','Rank 2','Rank 3','Rank 4','Rank 5','Rank 6','Rank 7'];
const SLOT_AMOUNTS_ALL = [10,20,40,80,160,320,640,1280,2560,5120,10240,20480,40960,81920];

// ── UTILS ──
const fmt18  = n => { try{ return Number(ethers.formatUnits(n,18)).toLocaleString('es-CO',{minimumFractionDigits:2,maximumFractionDigits:2}); }catch{ return '0.00'; } };
const fmt18s = n => { try{ const v=Number(ethers.formatUnits(n,18)); return v>=1000?v.toLocaleString('es-CO',{maximumFractionDigits:0}):v.toLocaleString('es-CO',{minimumFractionDigits:2,maximumFractionDigits:2}); }catch{ return '0'; } };
const short  = a => (!a||a===ethers.ZeroAddress)?'—':a.slice(0,6)+'…'+a.slice(-4);
const isAddr = v => /^0x[0-9a-fA-F]{40}$/.test((v||'').trim());
const isZero = a => !a||a===ethers.ZeroAddress||a==='0x0000000000000000000000000000000000000000';

function toast(msg,type='info'){
  const w=document.getElementById('toasts');
  const el=document.createElement('div');
  el.className='toast';
  el.innerHTML=`<div class="toast-bar toast-bar-${type}"></div><span>${msg}</span>`;
  w.appendChild(el);
  setTimeout(()=>el.remove(),4000);
}

async function copyText(t){ try{ await navigator.clipboard.writeText(t); toast('Copiado','success'); }catch{} }

// ── LANDING ↔ DAPP ──
function showLanding(){
  document.getElementById('landing').style.display='block';
  document.getElementById('dapp').style.display='none';
  document.getElementById('landing-nav').style.display='';
  document.getElementById('dapp-tabs-nav').style.display='none';
  document.getElementById('btn-enter-dapp').style.display='';
  document.getElementById('wallet-pill').style.display='none';
  document.getElementById('nav-net-pill').style.display='none';
  try { updateSidebarState(); } catch(e) {}
}

function showDapp(){
  console.log('[showDapp] provider=', !!provider, 'activeNet=', activeNet?.label);
  if(!provider){
    showNetModal();
    return;
  }
  _activateDapp();
}

function _activateDapp(){
  console.log('[_activateDapp] called');
  try { document.getElementById('landing').style.display='none'; } catch(e){}
  try { document.getElementById('dapp').style.display='block'; } catch(e){}
  try { document.getElementById('landing-nav').style.display='none'; } catch(e){}
  try { document.getElementById('dapp-tabs-nav').style.display='flex'; } catch(e){}
  try { document.getElementById('btn-enter-dapp').style.display='none'; } catch(e){}
  try { document.getElementById('wallet-pill').style.display=''; } catch(e){}
  try { document.getElementById('nav-net-pill').style.display=''; } catch(e){}
  console.log('[_activateDapp] DOM done, starting data loads...');
  console.log('[_activateDapp] contracts:', Object.keys(contracts).filter(k=>contracts[k]));
  console.log('[_activateDapp] addrs:', addrs);
  try { updateNavPill(); } catch(e){ console.error('updateNavPill',e); }
  try { loadGlobalStats(); } catch(e){ console.error('loadGlobalStats',e); }
  try { loadAllowedSlots(); } catch(e){ console.error('loadAllowedSlots',e); }
  try { updateContractsTab(); } catch(e){ console.error('updateContractsTab',e); }
  try { loadCoreStatus(); } catch(e){ console.error('loadCoreStatus',e); }
  try { loadTreasury(); } catch(e){ console.error('loadTreasury',e); }
}

function scrollToSection(selector){
  if(typeof selector !== 'string') return;
  try {
    const el = document.querySelector(selector);
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
  } catch(e) {}
}

// Scroll effect on topbar
window.addEventListener('scroll',()=>{
  document.getElementById('topbar').classList.toggle('scrolled',window.scrollY>20);
});

// ── NET MODAL ──
let _pendingNetKey='mainnet';
function showNetModal(){
  _pendingNetKey='mainnet';
  confirmNetModal();
}

function setNetModal(key){
  key='mainnet';
  _pendingNetKey=key;
  const d=key==='mainnet'?DEPLOY_MAINNET:DEPLOY_TESTNET;
  const ml=document.getElementById('nm-contracts-list');
  if(ml){
    ml.innerHTML=Object.entries({Core:d.core||'—',SlotProgram:d.slot||'—',RanksModule:d.rank||'—',PoolsModule:d.pool||'—',Rewards:d.rewards||'—',Enterprise:d.treasury||'—',USDT:d.usdt||'—'})
      .map(([k,v])=>`<div><span style="color:var(--gray-400);">${k}:</span> ${v==='—'?'<span style="color:var(--red);">No disponible</span>':v.slice(0,16)+'…'}</div>`).join('');
  }
  document.getElementById('nm-main').className=key==='mainnet'?'btn-primary':'btn-secondary';
  document.getElementById('nm-test').className=key==='testnet'?'btn-primary':'btn-secondary';
}


// Try each RPC until one responds
async function createProvider(rpcs) {
  for (const rpc of rpcs) {
    try {
      const p = new ethers.JsonRpcProvider(rpc);
      // Quick test with 3s timeout
      await Promise.race([
        p.getBlockNumber(),
        new Promise((_,rej) => setTimeout(() => rej(new Error('timeout')), 3000))
      ]);
      console.log('[createProvider] using RPC:', rpc);
      return p;
    } catch(e) {
      console.warn('[createProvider] RPC failed:', rpc, e.message.slice(0,40));
    }
  }
  // Last resort — return first anyway
  console.warn('[createProvider] all RPCs failed, using first');
  return new ethers.JsonRpcProvider(rpcs[0]);
}

async function confirmNetModal(){
  console.log('[confirmNetModal] starting, _pendingNetKey=', _pendingNetKey);
  try {
    document.getElementById('net-modal').style.display='none';
    _netKey    = 'mainnet';
    _pendingNetKey = 'mainnet';
    activeNet  = NETS['mainnet'];
    const d    = DEPLOY_MAINNET;
    addrs      = { ...d };
    provider   = await createProvider(activeNet.rpcs);

    if(addrs.core)     contracts.core       = new ethers.Contract(addrs.core,     CORE_ABI,       provider);
    if(addrs.slot)     contracts.slot       = new ethers.Contract(addrs.slot,     SLOT_ABI,       provider);
    if(addrs.rank)     contracts.rank       = new ethers.Contract(addrs.rank,     RANK_ABI,       provider);
    if(addrs.pool)     contracts.pool       = new ethers.Contract(addrs.pool,     POOL_ABI,       provider);
    if(addrs.rewards)  contracts.reward     = new ethers.Contract(addrs.rewards,  REWARD_ABI,     provider);
    if(addrs.treasury) contracts.enterprise = new ethers.Contract(addrs.treasury, ENTERPRISE_ABI, provider);
    if(addrs.usdt)     contracts.usdt       = new ethers.Contract(addrs.usdt,     USDT_ABI,       provider);

    toast('Conectado a ' + activeNet.label, 'success');
    console.log('[confirmNetModal] calling _activateDapp, contracts.core=', !!contracts.core);
    _activateDapp();
    console.log('[confirmNetModal] _activateDapp done');
  } catch(e) {
    console.error('[confirmNetModal] ERROR:', e);
    toast('Error al iniciar: ' + (e.message||String(e)).slice(0,80), 'error');
  }
}

function updateNavPill(){
  if(!activeNet) return;
  const pill=document.getElementById('nav-net-pill');
  const lbl=document.getElementById('nav-net-label');
  const pulse=document.getElementById('nav-net-pulse');
  if(lbl) lbl.textContent=activeNet.label;
  if(pill) pill.className='net-pill-sm '+(activeNet===NETS.testnet?'testnet':'mainnet');
  if(pulse) pulse.className='npulse '+(activeNet===NETS.testnet?'test':'main');
}


function clearLearnProgress() {
  const lesson = getTodayLesson();
  const key = 'learn-done-' + new Date().toISOString().slice(0,10);
  localStorage.removeItem(key);
  localStorage.removeItem(key + '-secs');
  learnState.videoUnlocked  = false;
  learnState.secondsWatched = 0;
  learnState.syncedSlots    = {};
  updateWatchUI();
  if (walletAddr && contracts.slot) loadLearnSlots();
  toast('Progreso de hoy reseteado', 'info');
}

// ── MAIN goTab (merged) ──
function goTab(name) {
  // Update tab buttons by data-tab attribute (not index — avoids misalignment)
  document.querySelectorAll('.dtab').forEach(b => {
    const isActive = b.dataset.tab === name;
    b.classList.toggle('on', isActive);
    b.style.color = isActive ? 'var(--blue)' : 'var(--gray-500)';
    b.style.borderBottomColor = isActive ? 'var(--blue)' : 'transparent';
    b.style.fontWeight = isActive ? '700' : '500';
  });
  document.querySelectorAll('.tpane').forEach(p => p.classList.toggle('on', p.id === 'tab-' + name));

  if (name === 'dashboard') loadDashboard();
  if (name === 'contracts') { updateContractsTab(); loadCoreStatus(); }
  if (name === 'admin')     loadAdminTab();
  if (name === 'ranks')     loadRanksTab(currentUser || walletAddr);
  if (name === 'founders')   loadFoundersTab();
  if (name === 'commercial') loadCommercialTab(currentUser || walletAddr);
  if (name === 'earnings')  loadEarningsTab();
  if (name === 'pools')     loadPoolsData();
  if (name === 'network')   loadNetworkTab(currentUser || walletAddr);
  if (name === 'treasury')  loadTreasury();
  if (name === 'slots' && contracts.slot) loadGlobalStats();
  if (name === 'learn')     initLearnTab();
  try { updateSidebarActive(name); } catch(e) {}
}



// ── DAPP TAB NAVIGATION ──
// goTab merged below

function switchNetTab(tab){
  ['uni','slots'].forEach(t=>{
    const btn=document.getElementById('nt-'+t+'-btn');
    const pane=document.getElementById('nt-pane-'+t);
    if(btn) btn.classList.toggle('on',t===tab);
    if(pane) pane.style.display=t===tab?'block':'none';
  });
}

// ── WALLET CONNECTION ──
function openWalletModal(){
  if(walletAddr){ disconnectWallet(); return; }
  const bg=document.createElement('div');
  bg.className='wallet-modal-bg';
  bg.innerHTML=`<div class="wallet-modal">
    <div class="wallet-modal-title">Conectar wallet</div>
    <div class="wallet-modal-sub">Selecciona tu wallet para conectarte a ${activeNet?.label||'BSC'}.</div>
    <div class="wallet-options">
      <button class="wallet-option" onclick="connectWith('metamask')">
        <div class="wallet-option-icon">🦊</div>
        <div><div class="wallet-option-name">MetaMask</div><div class="wallet-option-sub">Extensión de navegador · App móvil</div></div>
        <span class="wallet-option-badge">Popular</span>
      </button>
      <button class="wallet-option" onclick="connectWithSafe()" style="border:1.5px solid #3b82f6;">
        <div class="wallet-option-icon">🛡</div>
        <div><div class="wallet-option-name">Safe Multisig</div><div class="wallet-option-sub">app.safe.global → Apps → esta URL</div></div>
        <span class="wallet-option-badge" style="background:var(--blue-bg);color:var(--blue);">Multisig</span>
      </button>
      <button class="wallet-option" onclick="connectWith('trust')">
        <div class="wallet-option-icon">🛡️</div>
        <div><div class="wallet-option-name">Trust Wallet</div><div class="wallet-option-sub">App móvil · Oficial Binance</div></div>
      </button>
      <button class="wallet-option" onclick="connectWith('safepal')">
        <div class="wallet-option-icon">🔒</div>
        <div><div class="wallet-option-name">SafePal</div><div class="wallet-option-sub">Hardware + Software · Multi-chain</div></div>
      </button>
    </div>
    <button onclick="this.closest('.wallet-modal-bg').remove()" class="btn-outline" style="width:100%;margin-top:14px;">Cancelar</button>
  </div>`;
  document.body.appendChild(bg);
  bg.addEventListener('click',e=>{ if(e.target===bg) bg.remove(); });
}

function disconnectWallet(){
  walletAddr=null; signer=null;
  document.getElementById('wallet-label').textContent='Conectar wallet';
  document.getElementById('wallet-dot').className='wallet-dot';
  document.getElementById('wallet-pill').classList.remove('connected');
  toast('Wallet desconectada','info');
  showDappGate('gate');
  try { updateSidebarState(); closeSidebar(); } catch(e) {}
}

async function connectWith(type){
  // Close modal
  document.querySelectorAll('.wallet-modal-bg').forEach(m=>m.remove());

  if(window.location.protocol==='file:'){ showHelpModal(); return; }
  if(!window.ethereum){ showHelpModal(); return; }
  if(!activeNet){ toast('Selecciona la red primero','error'); return; }

  const prov = window.ethereum;
  const lbl  = document.getElementById('wallet-label');
  const pill = document.getElementById('wallet-pill');

  // helper to reset button state on any failure
  const reset = (msg) => {
    lbl.textContent = msg || 'Conectar wallet';
    pill.disabled = false;
  };

  lbl.textContent = 'Conectando…';
  pill.disabled = true;

  try {
    // 1. Request accounts — opens MetaMask/Trust/SafePal popup
    const accounts = await prov.request({ method: 'eth_requestAccounts' });
    if (!accounts || !accounts[0]) throw new Error('Sin cuentas');

    // 2. Check current chain
    const curHex   = await prov.request({ method: 'eth_chainId' });
    const curId    = parseInt(curHex, 16);
    const targetId = activeNet.chainId;

    // 3. Switch chain if needed — fire-and-forget style (no waiting loop)
    if (curId !== targetId) {
      toast('Cambiando a ' + activeNet.label + '…', 'info');
      try {
        await prov.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: activeNet.chainIdHex }]
        });
      } catch (se) {
        if (se.code === 4001) { toast('Cambio de red rechazado', 'error'); reset(); return; }
        // Chain not in wallet yet — add it
        try {
          await prov.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: activeNet.chainIdHex,
              chainName: activeNet.label,
              nativeCurrency: activeNet.nativeCurrency,
              rpcUrls: activeNet.rpcs,
              blockExplorerUrls: [activeNet.explorer]
            }]
          });
        } catch (ae) {
          if (ae.code === 4001) { toast('Agregar red rechazado', 'error'); }
          else { toast('No se pudo agregar la red: ' + (ae.message||'').slice(0,40), 'error'); }
          reset(); return;
        }
      }

      // Verify chain actually changed
      const newHex = await prov.request({ method: 'eth_chainId' });
      if (parseInt(newHex, 16) !== targetId) {
        toast('Cambia manualmente a ' + activeNet.label + ' en tu wallet', 'error');
        reset(); return;
      }
    }

    // 4. Build provider + signer
    const ep = new ethers.BrowserProvider(prov);
    signer     = await ep.getSigner();
    walletAddr = (await signer.getAddress()).toLowerCase();
    provider   = ep;

    // 5. Build contracts immediately — before gate check
    const d = DEPLOY_MAINNET;
    contracts.core       = new ethers.Contract(d.core,     CORE_ABI,       ep);
    contracts.slot       = new ethers.Contract(d.slot,     SLOT_ABI,       ep);
    contracts.rank       = new ethers.Contract(d.rank,     RANK_ABI,       ep);
    contracts.pool       = new ethers.Contract(d.pool,     POOL_ABI,       ep);
    contracts.enterprise = new ethers.Contract(d.treasury, ENTERPRISE_ABI, ep);
    contracts.reward     = new ethers.Contract(d.rewards,  REWARD_ABI,     ep);
    contracts.usdt       = new ethers.Contract(d.usdt,     USDT_ABI,       ep);
    addrs = d;

    // 6. Update UI
    lbl.textContent = short(walletAddr);
    pill.disabled   = false;
    pill.classList.add('connected');
    document.getElementById('wallet-dot').className = 'wallet-dot on';
    toast('✅ Conectado · ' + activeNet.label, 'success');

    // 7. Gate check — contracts are ready now
    updateRefLinkUI();
    await checkRegistrationGate();
    // Check for pending buy from landing
    const pendingAmt = sessionStorage.getItem('pending-buy-amt');
    if (pendingAmt && contracts.slot) {
      sessionStorage.removeItem('pending-buy-amt');
      const pendingSponsor = sessionStorage.getItem('pending-buy-sponsor') || '';
      sessionStorage.removeItem('pending-buy-sponsor');
      const inp = document.getElementById('lp-sponsor');
      if(inp && pendingSponsor) inp.value = pendingSponsor;
      selectLpSlot(parseInt(pendingAmt));
      toast('Continuando con tu compra…', 'info');
      setTimeout(() => landingBuySlot(), 800);
    }

  } catch(e) {
    const msg = e?.message || String(e);
    if (e?.code === 4001 || msg.includes('rejected') || msg.includes('denied')) {
      toast('Conexión rechazada', 'error');
    } else {
      toast('Error: ' + msg.slice(0, 60), 'error');
      console.error('[connectWith]', e);
    }
    reset();
  }
}

function showHelpModal(){
  const bg=document.createElement('div');
  bg.className='wallet-modal-bg';
  bg.innerHTML=`<div class="help-modal">
    <div style="font-size:28px;margin-bottom:12px;">📁</div>
    <div style="font-size:18px;font-weight:800;margin-bottom:6px;">Archivo local detectado</div>
    <div style="font-size:14px;color:var(--gray-500);margin-bottom:20px;">MetaMask no funciona en archivos locales. Sirve la DApp desde un servidor HTTP.</div>
    <div style="font-size:13px;font-weight:700;color:var(--gray-700);margin-bottom:4px;">Python</div>
    <div class="cmd-block" onclick="copyText('python -m http.server 8080')">python -m http.server 8080 <span>📋</span></div>
    <div style="font-size:13px;font-weight:700;color:var(--gray-700);margin-top:12px;margin-bottom:4px;">Node.js</div>
    <div class="cmd-block" onclick="copyText('npx serve .')">npx serve . <span>📋</span></div>
    <div class="alert alert-info" style="margin-top:14px;"><span>ℹ</span><span>Sin wallet puedes usar el dashboard en modo lectura (búsqueda de cualquier dirección).</span></div>
    <button onclick="this.closest('.wallet-modal-bg').remove()" class="btn-outline" style="width:100%;margin-top:12px;padding:10px;">Cerrar</button>
  </div>`;
  document.body.appendChild(bg);
  bg.addEventListener('click',e=>{if(e.target===bg)bg.remove();});
}

// ── SEARCH ──
document.getElementById('search-inp').addEventListener('keydown',e=>{ if(e.key==='Enter') searchUser(); });

async function searchUser(){
  const addr=(document.getElementById('search-inp').value||'').trim();
  if(!addr||!isAddr(addr)){toast('Dirección BSC inválida','error');return;}
  if(!contracts.core){toast('Configura la red primero','error');return;}
  currentUser=addr;
  await loadUserData(addr);
}

// ── USER DATA ──
async function loadUserData(addr){
  try{
    const [infoRes,dcRes]=await Promise.allSettled([
      contracts.core.userInfo(addr),
      contracts.core.directCount(addr)
    ]);
    // userInfo returns: (bool exists, bool frozen, address upline, uint32 joinedAt, uint256 totalSlotVolume, uint256 totalPoints)
    // V15 userInfo: (exists, frozen, isRoot_, upline, joinedAt, totalSlotVolume)
    let registered=false,frozen=false,upline='',directCnt=0,totalVol=0n,joinTs=0n,isUserRoot=false;
    if(infoRes.status==='fulfilled'){
      const s=infoRes.value;
      registered  = !!(s[0]||s.exists);
      frozen      = !!(s[1]||s.frozen);
      isUserRoot  = !!(s[2]||s.isRoot_);
      upline      = s[3]||s.upline||'';
      joinTs      = BigInt(s[4]||s.joinedAt||0);
      totalVol    = s[5]||s.totalSlotVolume||0n;
    }
    if(dcRes.status==='fulfilled') directCnt=Number(dcRes.value);

    renderUserCard(addr,{registered,frozen,upline,directCnt,totalVol,joinTs,isUserRoot});
    if(walletAddr && addr.toLowerCase()===walletAddr.toLowerCase()) setTimeout(()=>_fillRefLink(addr), 50);

    let netPts=0n,rank=0,personalVol=0n;
    if(contracts.rank){
      const [npR,rR,pvR]=await Promise.allSettled([
        contracts.rank.qualifiedNetworkVolume(addr),
        contracts.rank.userRank(addr),
        contracts.rank.personalVolume(addr),
      ]);
      if(npR.status==='fulfilled') netPts=npR.value;
      if(rR.status==='fulfilled')  rank=Number(rR.value);
      if(pvR.status==='fulfilled') personalVol=pvR.value;
    }

    const rankLabel = rank>0 ? 'Rank '+rank : 'Sin rango';
    const rankNext  = rank<7 ? 'Sig: Rank '+(rank+1) : 'Rango máximo';
    document.getElementById('ov-points').textContent=fmt18s(netPts);
    document.getElementById('ov-rank').textContent=rankLabel;
    document.getElementById('ov-rank-sub').textContent=rankNext;
    document.getElementById('rk-points').textContent=fmt18s(netPts);
    document.getElementById('rk-rank').textContent=rankLabel;
    document.getElementById('rk-rank-sub').textContent=rankNext;
    document.getElementById('rk-vol').textContent=fmt18s(personalVol)+' USDT';
    document.getElementById('nt-directs').textContent=directCnt;
    document.getElementById('nt-upline').textContent=!isZero(upline)?short(upline):'—';

    renderStatusBody({registered,frozen,upline,directCnt,totalVol,joinTs});
    if(contracts.slot) loadUserSlots(addr);
    loadRanksTab(addr);
    if(addr.toLowerCase() === walletAddr?.toLowerCase()) loadEarningsTab();
    loadPoolsData();
    loadNetworkTab(addr);
    loadEarningsTab();

  }catch(e){ toast('Error al cargar usuario: '+e.message.slice(0,60),'error'); }
}

function renderUserCard(addr,d){
  const wrap=document.getElementById('user-card-wrap');
  const init=addr.slice(2,4).toUpperCase();
  const exp=activeNet?activeNet.explorer:'https://bscscan.com';
  wrap.innerHTML=`<div class="user-card">
    <div class="uavatar">${init}</div>
    <div class="uinfo">
      <div class="uaddr"><span>${addr}</span><button class="copy-btn" onclick="copyText('${addr}')">📋</button><a href="${exp}/address/${addr}" target="_blank" style="color:var(--blue);font-size:11px;text-decoration:none;">↗</a></div>
      <div class="utags">
        ${d.registered?`<span class="badge ${d.frozen?'badge-red':'badge-blue'}">${d.frozen?'❄ Congelado':'✓ Registrado'}</span>`:'<span class="badge badge-red">✗ No registrado</span>'}
        ${d.isUserRoot?'<span class="badge badge-amber">👑 Root</span>':''}
        ${d.totalVol>0n?`<span class="badge badge-amber">Vol: ${fmt18s(d.totalVol)} USDT</span>`:''}
        ${!isZero(d.upline)?`<span class="badge badge-gray">Upline: ${short(d.upline)}</span>`:''}
      </div>
    </div>
    <div class="uright">
      <div class="uright-label">Directos</div>
      <div class="uright-val">${d.directCnt}</div>
      <div class="uright-sub">${d.joinTs>0n?'Desde: '+new Date(Number(d.joinTs)*1000).toLocaleDateString('es-CO'):''}</div>
    </div>
  </div>
  ${walletAddr && addr.toLowerCase()===walletAddr.toLowerCase() && d.registered ? `
  <div style="margin-top:12px;margin-bottom:4px;padding:14px 16px;background:var(--blue-bg);border:1.5px solid var(--blue);border-radius:12px;">
    <div style="font-size:11px;font-weight:700;color:var(--blue);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px;">🔗 Tu link de referido</div>
    <div style="display:flex;gap:8px;align-items:center;">
      <input id="ov-reflink-input" readonly value="" onclick="this.select()"
        style="flex:1;background:white;border:1px solid var(--blue);border-radius:8px;padding:8px 10px;font-size:11px;font-family:var(--mono);color:var(--gray-700);cursor:pointer;min-width:0;"/>
      <button onclick="copyRefLink()" class="btn-primary" style="white-space:nowrap;font-size:12px;padding:8px 14px;">📋 Copiar</button>
      <button onclick="shareRefLink()" class="btn-ghost" style="white-space:nowrap;font-size:12px;padding:8px 12px;">↗ Compartir</button>
    </div>
    <div style="font-size:11px;color:var(--blue);margin-top:6px;opacity:.7;">Quien use este link llegará directo a registrarse con tu wallet como upline</div>
  </div>` : ''}
  </div>`;
}

function _fillRefLink(addr) {
  const inp = document.getElementById('ov-reflink-input');
  if (!inp) return;
  const base = window.location.origin + window.location.pathname.replace(/\/$/, '');
  inp.value = base + '?ref=' + addr;
}

function renderStatusBody(d){
  const el=document.getElementById('ov-status-body');
  if(!el) return;
  el.innerHTML=`
    <div class="mem-row"><span class="mem-label">Estado</span><span class="mem-val" style="color:${d.registered?'var(--green)':'var(--red)'};">${d.registered?'✓ Registrado':'✗ No registrado'}</span></div>
    ${d.frozen ? '<div class="mem-row"><span class="mem-label">⚠ Estado</span><span class="mem-val" style="color:var(--red);">❄ Cuenta congelada</span></div>' : ''}
    <div class="mem-row"><span class="mem-label">Upline</span><span class="mem-val">${!isZero(d.upline)?short(d.upline):'—'}</span></div>
    <div class="mem-row"><span class="mem-label">Directos</span><span class="mem-val">${d.directCnt}</span></div>
    <div class="mem-row"><span class="mem-label">Volumen total</span><span class="mem-val" style="color:var(--blue);">${fmt18s(d.totalVol)} USDT</span></div>`;
  const tag=document.getElementById('ov-status-tag');
  if(tag) tag.innerHTML=`<span class="badge ${d.registered&&!d.frozen?'badge-blue':d.frozen?'badge-red':'badge-gray'}">${d.registered&&!d.frozen?'Activo':d.frozen?'Congelado':'Sin registro'}</span>`;
}

// Parse position tuple from V15 contract (12 fields)
// positions(id) -> (user, slotLevel, slotAmount, paidOut, capMax,
//                   openedDay, lastSyncDay, currentStreak, bestStreak,
//                   rewardActive, completed, roiEnabled)
function parsePosition(id, p) {
  return {
    id:           Number(id),
    slotLevel:    Number(p[1]),
    slotAmount:   p[2],
    paidOut:      p[3],
    capMax:       p[4],
    openedDay:    Number(p[5]),
    lastSyncDay:  Number(p[6]),
    currentStreak:Number(p[7]),
    bestStreak:   Number(p[8]),
    rewardActive: !!p[9],
    completed:    !!p[10],
    roiEnabled:   !!p[11],
  };
}

// ── V15 Activation fee table (matches activationFeeByLevel in contract) ──
// level → fee in USDT (18 decimals as BigInt)
const ACTIVATION_FEE_BY_LEVEL = {
  1:  25n * BigInt(1e17),   // 2.50 USDT
  2:  5n  * BigInt(1e18),   // 5.00 USDT
  3:  10n * BigInt(1e18),   // 10.00 USDT
  4:  20n * BigInt(1e18),   // 20.00 USDT
  5:  40n * BigInt(1e18),   // 40.00 USDT
  6:  60n * BigInt(1e18),   // 60.00 USDT
  7:  80n * BigInt(1e18),   // 80.00 USDT
  8:  100n * BigInt(1e18),  // 100.00 USDT
  9:  120n * BigInt(1e18),  // 120.00 USDT
  10: 140n * BigInt(1e18),  // 140.00 USDT
  11: 180n * BigInt(1e18),  // 180.00 USDT
  12: 220n * BigInt(1e18),  // 220.00 USDT
  13: 260n * BigInt(1e18),  // 260.00 USDT
  14: 300n * BigInt(1e18),  // 300.00 USDT
};

// Slot amount by level (10 USDT * 2^(level-1))
function slotAmountForLevel(level) {
  return 10n * BigInt(1e18) * (1n << BigInt(level - 1));
}

// Level from amount (local, no RPC)
function slotLevelFromAmount(amountWei) {
  for (let lvl = 1; lvl <= 14; lvl++) {
    if (slotAmountForLevel(lvl) === amountWei) return lvl;
  }
  return 0;
}

// Total to pay = slotAmount + activationFee
function totalToPayLocal(amountWei) {
  const level = slotLevelFromAmount(amountWei);
  const fee   = ACTIVATION_FEE_BY_LEVEL[level] || 0n;
  return { total: amountWei + fee, fee, level };
}

// ── GLOBAL STATS ──
async function loadHeroStats(){if(!contracts.slot||!contracts.core)return;try{const[u,p]=await Promise.all([contracts.core.totalUsers().catch(()=>null),contracts.slot.totalActivePrincipal().catch(()=>null)]);const uEl=document.getElementById("hero-users");const pEl=document.getElementById("hero-principal");if(uEl&&u!=null)uEl.textContent=Number(u).toLocaleString()+" usuarios";if(pEl&&p!=null)pEl.textContent=fmt18s(p)+" USDT";}catch(e){}}
async function loadGlobalStats(){
  if(!contracts.slot){ console.warn('[loadGlobalStats] no slot contract'); return; }
  console.log('[loadGlobalStats] calling totalActivePrincipal...');
  try{
    const [total,rate,liq]=await Promise.all([
      contracts.slot.totalActivePrincipal().catch(e=>{console.warn('[totalActivePrincipal]',e.message);return 0n;}),
      contracts.slot.previewDynamicRateBP().catch(e=>{console.warn('[previewDynamicRateBP]',e.message);return 0n;}),
      contracts.reward?contracts.reward.availableRewardsLiquidity().catch(e=>{console.warn('[rewardsLiq]',e.message);return 0n;}):Promise.resolve(0n),
    ]);
    console.log('[loadGlobalStats] total=',total,'rate=',rate,'liq=',liq);
    document.getElementById('sl-total-principal').textContent=fmt18s(total)+' USDT';
    document.getElementById('sl-daily-rate').textContent=(Number(rate)/100).toFixed(2)+'%';
    /* sl-liquidity removed */
    document.getElementById('ov-principal').textContent=fmt18s(total)+' USDT';
    // Coverage tooltip on rate
    const rateEl=document.getElementById('sl-daily-rate');
    if(rateEl) rateEl.title='Tasa dinámica basada en cobertura del RewardTreasury';
  }catch(e){ console.error('[loadGlobalStats]',e); }
}

async function loadLandingStats(){
  if(!contracts.core||!contracts.slot) return;
  try{
    const [total,users]=await Promise.all([
      contracts.slot.totalActivePrincipal().catch(()=>null),
      contracts.core.totalUsers().catch(()=>null),
    ]);
    if(total) document.getElementById('stat-total-p').textContent='$'+fmt18s(total);
    if(users) document.getElementById('stat-users').textContent=Number(users).toLocaleString();
  }catch{}
}

// ── ALLOWED SLOTS ──
async function loadAllowedSlots(){
  if(!contracts.slot) return;
  const allowed=[];
  for(const amt of SLOT_AMOUNTS_ALL){
    try{
      // V15: isAllowedSlot removed — use slotLevelByAmount != 0
      const level=await contracts.slot.slotLevelByAmount(ethers.parseUnits(amt.toString(),18));
      if(Number(level) > 0) allowed.push(amt);
    }catch{}
  }
  const html=allowed.map(a=>`<button class="chip" id="chip-${a}" onclick="selectSlot(${a})">${a.toLocaleString()} USDT</button>`).join('');
  ['ov-slot-amounts','buy-chips'].forEach(id=>{ const el=document.getElementById(id); if(el) el.innerHTML=html||'—'; });
}

function selectSlot(amt){
  selectedSlot=amt;
  document.querySelectorAll('[id^="chip-"]').forEach(el=>{
    el.className='chip'+(el.id===`chip-${amt}`?' sel':'');
  });
  const btn=document.getElementById('btn-buy-slot');
  if(btn){btn.textContent=`Comprar Slot ${amt.toLocaleString()} USDT`;btn.disabled=!walletAddr;}
}

// ── USER SLOTS ──