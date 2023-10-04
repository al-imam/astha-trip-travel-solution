// Admin Imports
import MainDashboard from "views/admin/default";
import Profile from "views/admin/profile";
import BalanceReq from "./views/admin/BalanceReq/Index";
import Agent from "./views/admin/agent/index";
import Payment from "./views/admin/payment/Index"
import Form from './views/admin/From/Index';

// // Auth Imports
// import SignIn from "views/auth/SignIn";

// Icon Imports
import { MdHome, MdPerson } from "react-icons/md";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Agent",
    layout: "/admin",
    path: "agent",
    icon: <MaterialSymbolsPersonRaisedHand className="h-6 w-6" />,
    component: <Agent />,
    secondary: true,
  },
  {
    name: "Balance request",
    layout: "/admin",
    icon: <TablerMoneybag className="h-6 w-6" />,
    path: "balancerequest",
    component: <BalanceReq />,
  },
  {
    name: "Form Request",
    layout: "/admin",
    icon: <LineMdClipboardList className="h-6 w-6" />,
    path: "form",
    component: <Form />,
  },
  {
    name: "Payment Sheet",
    layout: "/admin",
    icon: <SolarWalletMoneyOutline className="h-6 w-6" />,
    path: "payment",
    component: <Payment />,
  },
  {
    name: "Admin",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  // {
  //   name: "Sign In",
  //   layout: "/auth",
  //   path: "sign-in",
  //   icon: <MdLock className="h-6 w-6" />,
  //   component: <SignIn />,
  // },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "rtl",
  //   icon: <MdHome className="h-6 w-6" />,
  //   component: <RTLDefault />,
  // },
];
export default routes;

export function MaterialSymbolsPersonRaisedHand(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M2 23v-2h20v2H2Zm2-3v-6q-.825-1.35-1.275-2.863t-.45-3.087q0-1.525.388-3t.912-2.9q.2-.525.65-.838t1-.312Q6 1 6.55 1.525T7 2.775L6.725 5.05q-.15 1.2.213 2.275t1.087 1.887q.725.813 1.75 1.3T12 11q1.5 0 3.013.313t2.637.887q1.125.575 1.738 1.463T20 15.85V20H10v-.925q0-.85.575-1.463T12 17h4v-2h-4q-1.675 0-2.838 1.2T8 19.075V20H4Zm8-10q-1.65 0-2.825-1.175T8 6q0-1.65 1.175-2.825T12 2q1.65 0 2.825 1.175T16 6q0 1.65-1.175 2.825T12 10Z"
      ></path>
    </svg>
  );
}

export function TablerMoneybag(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M9.5 3h5A1.5 1.5 0 0 1 16 4.5A3.5 3.5 0 0 1 12.5 8h-1A3.5 3.5 0 0 1 8 4.5A1.5 1.5 0 0 1 9.5 3z"></path>
        <path d="M4 17v-1a8 8 0 1 1 16 0v1a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"></path>
      </g>
    </svg>
  );
}


export function SolarWalletMoneyOutline(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><defs><path id="solarWalletMoneyOutline0" d="M19 14a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z"></path></defs><g fill="currentColor"><path fillRule="evenodd" d="M20.924 11.75H18.23c-1.424 0-2.481 1.059-2.481 2.25s1.057 2.25 2.48 2.25h2.718c.206-.013.295-.152.302-.236v-4.028c-.007-.084-.096-.223-.302-.235h-.024Zm-.074-1.5c.066 0 .13 0 .19.004c.87.053 1.641.71 1.706 1.628c.004.06.004.125.004.185v3.866c0 .06 0 .125-.004.185c-.065.918-.836 1.575-1.707 1.629c-.059.003-.123.003-.19.003h-2.618c-2.145 0-3.981-1.628-3.981-3.75s1.836-3.75 3.98-3.75h2.62Z" clipRule="evenodd"></path><use href="#solarWalletMoneyOutline0"></use><path fillRule="evenodd" d="M20.85 10.25a1.888 1.888 0 0 1 .835.16c-.107-1.606-.402-2.844-1.326-3.769c-.749-.748-1.698-1.08-2.87-1.238l-.042-.005a.778.778 0 0 0-.032-.023l-3.736-2.477a3.987 3.987 0 0 0-4.358 0L5.586 5.375a.773.773 0 0 0-.033.023l-.042.005c-1.172.158-2.121.49-2.87 1.238c-.748.749-1.08 1.698-1.238 2.87c-.153 1.14-.153 2.595-.153 4.433v.112c0 1.838 0 3.294.153 4.433c.158 1.172.49 2.121 1.238 2.87c.749.748 1.698 1.08 2.87 1.238c1.14.153 2.595.153 4.433.153h3.112c1.838 0 3.294 0 4.433-.153c1.172-.158 2.121-.49 2.87-1.238c.924-.925 1.219-2.163 1.326-3.77c-.202.09-.42.144-.646.158c-.059.003-.123.003-.19.003h-.681c-.114 1.341-.371 2.05-.87 2.548c-.423.423-1.003.677-2.009.812c-1.027.138-2.382.14-4.289.14h-3c-1.907 0-3.261-.002-4.29-.14c-1.005-.135-1.585-.389-2.008-.812c-.423-.423-.677-1.003-.812-2.009c-.138-1.027-.14-2.382-.14-4.289c0-1.907.002-3.261.14-4.29c.135-1.005.389-1.585.812-2.008c.423-.423 1.003-.677 2.009-.812c1.028-.138 2.382-.14 4.289-.14h3c1.907 0 3.262.002 4.29.14c1.005.135 1.585.389 2.008.812c.499.498.756 1.207.87 2.548h.682Zm-10.906-5h3.112c.517 0 1.003 0 1.46.003L12.85 4.148c-.8-.53-1.9-.53-2.7 0L8.483 5.253c.458-.003.944-.003 1.46-.003Z" clipRule="evenodd"></path><path d="M6 9.25a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5H6Z"></path><use href="#solarWalletMoneyOutline0" fillRule="evenodd" clipRule="evenodd"></use></g></svg>
  )
}


export function LineMdClipboardList(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><g strokeWidth="2"><path strokeDasharray="66" strokeDashoffset="66" d="M12 3H19V21H5V3H12Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="66;0"></animate></path><path strokeDasharray="5" strokeDashoffset="5" d="M9 10H12"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1s" dur="0.2s" values="5;0"></animate></path><path strokeDasharray="6" strokeDashoffset="6" d="M9 13H14"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.2s" dur="0.2s" values="6;0"></animate></path><path strokeDasharray="7" strokeDashoffset="7" d="M9 16H15"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.4s" dur="0.2s" values="7;0"></animate></path></g><path strokeDasharray="12" strokeDashoffset="12" d="M14.5 3.5V6.5H9.5V3.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="12;0"></animate></path></g></svg>
  )
}