import { useNavigate } from "react-router-dom";

const AgentEntry = () => {
  const navigate = useNavigate();
  const backToAgentDashboard = () => {
    navigate("/agent");
  };
  return (
    <div>
      <div className="relative mb-5 w-full">
        <div className="relative w-full p-3">
          <button
            onClick={backToAgentDashboard}
            className="flex items-center rounded-md bg-brand-500 py-2 px-3 text-white"
          >
            <span className="pr-2 text-2xl">
              <MaterialSymbolsArrowLeftAltRounded />
            </span>{" "}
            Back to dashboard
          </button>
        </div>
        <div className="mx-auto mt-3 w-full max-w-[1200px] overflow-hidden rounded-md bg-brand-100/5 shadow-lg backdrop-blur-md">
          <div className="relative w-full bg-brand-400 p-2"></div>
          {/* titel  */}
          <div className="flex justify-between border-b-2 p-2">
            <div className="flex items-center justify-start text-2xl">
              <span className="pr-2 text-3xl">
                <MaterialSymbolsAddNotesOutline />
              </span>{" "}
              Entry LOI Request{" "}
              <div className="ml-5 text-[16px]">
                <select
                  name="countryName"
                  required
                  placeholder="Type Country Name Here"
                  className=" rounded-sm border-2 border-brand-100 p-2 outline-none"
                >
                  <option selected disabled value="">
                    Choose Your Country
                  </option>
                  <option value="Singapor">Singapor</option>
                  <option value="Vietnem">Vietnem</option>
                </select>
              </div>
            </div>
            <span>Remaining Balence: $2000</span>
          </div>
          {/* form  */}
          <div className="relative p-2">
            <form onSubmit={""}>
              <div className="relative mt-5 grid w-full grid-cols-3 gap-3 p-3">
                {/* name start */}
                <div className="relative col-span-2 w-full">
                  <label className="pl-px text-brand-900">Guest Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Type Guest Name Here"
                    className="w-full rounded-sm border-2 border-brand-100 p-2 outline-none"
                  />
                </div>
                <div className="relative w-full ">
                  <label className="pl-px text-brand-900">Guest Type *</label>
                  <select
                    name="guesttype"
                    required
                    placeholder="Type Guest Name Here"
                    className="w-full rounded-sm border-2 border-brand-100 p-2 outline-none"
                  >
                    <option selected disabled value="">
                      Choose Guest Type
                    </option>
                    <option value="singel">Singel</option>
                    <option value="family">Family</option>
                  </select>
                </div>
              </div>
              <div className="relative grid w-full grid-cols-1 gap-3 px-3 md:grid-cols-3">
                {/* pasport number  */}
                <div className="relative w-full">
                  <label className="pl-px text-brand-900">Passport Number *</label>
                  <input
                    type="text"
                    name="passport"
                    required
                    placeholder="Type Passport Number Here"
                    className="w-full rounded-sm border-2 border-brand-100 p-2 outline-none"
                  />
                </div>
                {/* Travel Date  */}
                <div className="relative w-full">
                  <label className="pl-px text-brand-900">Travel Date *</label>
                  <input
                    type="date"
                    required
                    name="travelDate"
                    className="w-full rounded-sm border-2 border-brand-100 p-2 outline-none"
                  />
                </div>
                {/* Hotel Name */}
                <div className="relative w-full">
                  <label className="pl-px text-brand-900">Hotel Name *</label>
                  <input
                    type="text"
                    name="hotelName"
                    required
                    placeholder="Type Hotel Name Here"
                    className="w-full rounded-sm border-2 border-brand-100 p-2 outline-none"
                  />
                </div>
              </div>
              {/* file input  */}
              <div className="relative grid w-full grid-cols-2 gap-3 p-2">
                {/* Passport photo */}
                <div className="relative w-full">
                  <label className="pl-px text-brand-900">Pasport Photo ( jpg, pdf ) *</label>
                  <input
                    type="file"
                    required
                    name="passportPhoto"
                    accept="image/jpeg,application/pdf"
                    className="w-full rounded-sm border-2 border-brand-100 p-2 outline-none"
                  />
                </div>
                <div className="relative w-full">
                  <label className="pl-px text-brand-900">Visa Photo ( jpg, pdf ) </label>
                  <input
                    type="file"
                    name="visaPhoto"
                    accept="image/jpeg,application/pdf"
                    className="w-full rounded-sm border-2 border-brand-100 p-2 outline-none"
                  />
                </div>
                {/* hotel booking docs photo */}
                <div className="relative w-full">
                  <label className="pl-px text-brand-900">
                    Hotel bokking copy ( jpg, pdf ) <span className="text-sm font-extralight italic"></span>
                  </label>

                  <input
                    type="file"
                    name="passportPhoto"
                    accept="image/jpeg,application/pdf"
                    className="w-full rounded-sm border-2 border-brand-100 p-2 outline-none"
                  />
                </div>
                {/*  Plane ticket photo */}
                <div className="relative w-full">
                  <label className="pl-px text-brand-900">Plane ticket copy ( jpg, pdf ) </label>
                  <input
                    type="file"
                    name="visaPhoto"
                    accept="image/jpeg,application/pdf"
                    className="w-full rounded-sm border-2 border-brand-100 p-2 outline-none"
                  />
                </div>
              </div>
              <div className="relative mt-3 flex w-full justify-between p-2 pl-5">
                <button
                  type="submit"
                  className="rounded-xl border-2 border-brand-300 bg-white/10 px-3 py-2 shadow-lg dark:text-brand-200"
                >
                  Add New Guest
                </button>
                <button id="reset" type="reset">
                  reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentEntry;

export function MaterialSymbolsArrowLeftAltRounded(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="m7.85 13l2.85 2.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L4.7 12.7q-.3-.3-.3-.7t.3-.7l4.575-4.575q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7L7.85 11H19q.425 0 .713.288T20 12q0 .425-.288.713T19 13H7.85Z"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsAddNotesOutline(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v6.7q-.475-.225-.975-.388T19 11.075V5H5v14h6.05q.075.55.238 1.05t.387.95H5Zm0-3v1V5v6.075V11v7Zm2-1h4.075q.075-.525.238-1.025t.362-.975H7v2Zm0-4h6.1q.8-.75 1.788-1.25T17 11.075V11H7v2Zm0-4h10V7H7v2Zm11 14q-2.075 0-3.538-1.463T13 18q0-2.075 1.463-3.538T18 13q2.075 0 3.538 1.463T23 18q0 2.075-1.463 3.538T18 23Zm-.5-2h1v-2.5H21v-1h-2.5V15h-1v2.5H15v1h2.5V21Z"
      ></path>
    </svg>
  );
}
