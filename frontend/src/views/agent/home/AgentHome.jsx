import TotalInfo from "../totalInfo/TotalInfo";

const AgentHome = () => {
  return (
    <div>
      <div className="relative w-full">
        <img src="/asthatripbaner.jpg" className="block w-full md:hidden" alt="" />
        <img src="/longsthabaner.jpg" className="hidden w-full md:block" alt="" />
      </div>
      <TotalInfo />
    </div>
  );
};

export default AgentHome;
