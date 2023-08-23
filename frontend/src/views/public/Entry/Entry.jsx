/* eslint-disable no-unreachable */
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ComplexTable from "./ComplexTable";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Entry = () => {
  const Navigate = useNavigate();
  const [dataList, setDataList] = useState([]);
  const [passportCopy, setpasportCopy] = useState(null);
  const [visacopy, setvisaCopy] = useState(null);
  const [hotelbokking, sethotelbokking] = useState(null);
  const [tiketCopy, settiketCopy] = useState(null);
  const [type, setType] = useState("");

  const [country, setCountry] = useState("Singapor");

  const [load, setload] = useState(false);
  const [hide, sethide] = useState(false);

  // chack auth
  const [Admin, setAdmin] = useState({});
  const [Agent, SetAgent] = useState({});
  const [Hotelname, SetHotelname] = useState("");

  const [referench, setReferench] = useState({
    fromdata: [],
    todata: [],
  });
  useEffect(() => {
    setReferench({
      fromdata: [
        "From AirPort",
        `${Hotelname} to Market`,
        `${Hotelname} to Universal`,
        `${Hotelname} to Merrina`,
        ` ${Hotelname} to AirPort`,
        `${Hotelname} to Sentosa Theme Park`,
        ` ${Hotelname}`,
      ],
      todata: [
        `Hotel ${Hotelname}`,
        "To AirPort",
        `Market to ${Hotelname}`,
        `Universal to ${Hotelname}`,
        `Merrina to ${Hotelname}`,
        `City Tour`,
        `Sentosa Theme Park to ${Hotelname}`,
      ],
    });
  }, [Hotelname]);

  useEffect(() => {
    const getData = async () => {
      console.log("helo");
      let ad = false;
      try {
        //get admin data
        try {
          const resAdmin = await axios("/api/auth/info");
          setAdmin(resAdmin.data);
          ad = true;
        } catch (error) {
          setAdmin(false);
        }
        let resAgent;
        try {
          resAgent = await axios("/api/agent/info");
        } catch (error) {
          console.log("🚀 ~ file: Entry.jsx:44 ~ getData ~ error:", error);
          resAgent = false;
        }

        if (!ad && !resAgent?.data) {
          return Navigate("/agent/login");
        }

        SetAgent(resAgent.data);
      } catch (error) {
        Navigate("/agent/login");
      }
    };
    getData();
  }, []);

  // handleFromData itenery from
  const [fromdata, setFromdata] = useState([]);
  const handleFromData = (e) => {
    e.preventDefault();
    const form = e.target;
    const date = form.date.value;
    const from = form.from.value;
    const to = form.to.value;
    const data = { id: uuidv4(), date, from, to };
    setFromdata((old) => {
      return [...old, data];
    });
  };
  // utility function
  //itenery  handleDeleteToFrom
  const handleDeleteToFrom = (id) => {
    const remain = fromdata.filter((data) => data.id !== id);
    setFromdata(remain);
  };

  // hidefrom add gust
  const guestchack = (length, types) => {
    if (length >= 9 && types === "family") {
      sethide(true);
    } else if (length > 0 && types === "singel") {
      sethide(true);
    } else {
      sethide(false);
    }
  };

  useEffect(() => {
    guestchack(dataList.length, type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataList, type]);

  // delet guest from list
  const deleteList = (id) => {
    const temp = dataList.filter((e) => {
      return e.id !== id;
    });
    setDataList(temp);
    guestchack(type);
  };

  // from data submit
  const onsubmit = async (e) => {
    e.preventDefault();

    if (!Admin) {
      let length = dataList.length;
      if (+Agent.balance <= +Agent.rate * length) {
        return toast.warn("Your balance is Low please add balance");
      }
    }
    if (load) {
      return toast.warn("wait for pending job !");
    }
    if (!type) {
      return toast.warn("please choose the type", {
        icon: "⛔",
      });
    }
    setload(true);
    try {
      let formData = new FormData();
      formData.append("imgpasport", passportCopy);
      formData.append("imgvisa", visacopy);
      formData.append("hotel", hotelbokking);
      formData.append("ticket", tiketCopy);
      let response = await toast.promise(
        axios.post("/temp/guestlist/photoupload", formData, {
          headers: {
            name: e.target.name.value,
            passport: e.target.passport.value,
          },
        }),
        {
          pending: "Photo Uploading wait ...",
          success: "added to list",
          error: {
            render({ data }) {
              if (data.response?.status === 406) {
                return <p className="text-sm">{data.response?.data}</p>;
              }
              return <h1> Something is wrong!</h1>;
            },
          },
        }
      );
      // console.log(fromdata);

      const data = {
        guestName: e.target.name.value || null,
        passportNumber: e.target.passport.value || null,
        travelDate: e.target.travelDate.value || null,
        hotelName: e.target.hotelName.value || null,
        passportPhoto: response.data.passpor.name || null,
        visaPhoto: response.data.visa.name || null,
        hotelbooking: response.data.hotelbooking.name || null,
        ticket: response.data.tiket.name || null,
        country: country,
        id: uuidv4(),
      };
      setDataList((old) => [...old, data]);
      e.target.querySelector("#reset").click();
      setload(false);
    } catch (error) {
      console.log("🚀 ~ file: Entry.jsx:159 ~ onsubmit ~ error:", error);
      setload(false);
    }
  };

  // submit all data
  const submitFullList = async () => {
    if (!Admin) {
      let length = dataList.length;
      if (+Agent.balance < +Agent.rate * length) {
        return toast.warn("Your balance is Low please add balance");
      }
    }

    if (load) {
      return toast.warn("wait for pending job!");
    }

    setload(true);

    if (!fromdata.length) {
      setload(false);
      return toast.warn("please enter tour iternary");
    }

    try {
      // eslint-disable-next-line no-unused-vars
      const respons = await toast.promise(
        axios.post("/api/loi/entry", {
          datas: [...dataList],
          iternary: JSON.stringify(fromdata),
        }),
        {
          pending: "wait for submiting",
          success: "from submited",
          error: {
            render({ data }) {
              if (data.response?.status === 501) {
                return <p className="text-sm">{data.response?.data}</p>;
              }
              return <h1> Something is wrong!</h1>;
            },
          },
        }
      );

      if (Admin) {
        Navigate("/admin/default");
      } else {
        Navigate("/agent");
      }
    } catch (error) {
      setload(false);
    }
  };

  const backtoboard = () => {
    if (dataList.length) {
      return toast.warn("You have to complite submition of guest data");
    }
    Navigate(-1);
  };

  return (
    <div className="relative mb-5 w-full">
      <div className="relative w-full p-3">
        <button
          onClick={backtoboard}
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
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                value={country}
                placeholder="Type Country Name Here"
                className=" rounded-sm border-2 border-brand-100 p-2 outline-none"
              >
                <option selected disabled value="">
                  Choose Your Country
                </option>
                <option value="Singapor">Singapor</option>
                <option disabled value="Vietnem">
                  Vietnem
                </option>
              </select>
            </div>
          </div>
          {Admin ? (
            "admin"
          ) : (
            <div>
              <span>Remaining Balence: {Agent.balance}</span>
              <br />
              <span>Submition Rate: {Agent.rate}</span>
            </div>
          )}
        </div>
        {/* form  */}
        <div className="relative p-2">
          <form onSubmit={onsubmit}>
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
                  onChange={(e) => {
                    if (e.target.value === "singel") {
                      if (dataList.length > 1) {
                        return toast.warn("you add multipale guest already !");
                      }
                    }
                    setType(e.target.value);
                  }}
                  value={type}
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
                <label className="pl-px text-brand-900">
                  Passport Number *
                </label>
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
                <select
                  name="hotelName"
                  required
                  onChange={(e) => {
                    SetHotelname(e.target.value);
                  }}
                  value={Hotelname}
                  className="w-full rounded-sm border-2 border-brand-100 p-2 outline-none"
                >
                  <option value="Hilton singapore orchard">
                    Hilton singapore orchard
                  </option>
                  <option value="Galaxy pods @ chinatown">
                    Galaxy pods @ chinatown
                  </option>
                  <option value="Holiday inn express singapor">
                    Holiday inn express singapor
                  </option>
                  <option value="Ibis singapore on bencoolen">
                    Ibis singapore on bencoolen
                  </option>
                  <option value="Swissotel the stamford">
                    Swissotel the stamford
                  </option>
                  <option value="V hotel bencoolen">V hotel bencoolen</option>
                  <option value="Parkroyal collection marina bay, singapore">
                    Parkroyal collection marina bay, singapore
                  </option>
                  <option value="Sofitel singapore sentosa resort & spa">
                    Sofitel singapore sentosa resort & spa
                  </option>
                  <option value="Sofitel singapore city centre">
                    Sofitel singapore city centre
                  </option>
                </select>
              </div>
            </div>
            {/* file input  */}
            <div className="relative grid w-full grid-cols-2 gap-3 p-2">
              {/* Passport photo */}
              <div className="relative w-full">
                <label className="pl-px text-brand-900">
                  Pasport Photo ( jpg, pdf ) *
                </label>
                <input
                  type="file"
                  required
                  name="passportPhoto"
                  // passport copy dataset in state
                  onChange={(e) => {
                    setpasportCopy(e.target.files[0]);
                  }}
                  accept="image/jpeg,application/pdf"
                  className="w-full rounded-sm border-2 border-brand-100 p-2 outline-none"
                />
              </div>
              {/* visa photo */}
              <div className="relative w-full">
                <label className="pl-px text-brand-900">
                  Visa Photo ( jpg, pdf ){" "}
                  <span className="text-sm font-extralight italic">
                    {country === "Vietnem" ? "*" : "*"}
                  </span>
                </label>
                <input
                  type="file"
                  name="visaPhoto"
                  onChange={(e) => {
                    setvisaCopy(e.target.files[0]);
                  }}
                  required
                  accept="image/jpeg,application/pdf"
                  className="w-full rounded-sm border-2 border-brand-100 p-2 outline-none"
                />
              </div>
              {/* hotel booking docs photo */}
              <div className="relative w-full">
                <label className="pl-px text-brand-900">
                  Hotel bokking copy ( jpg, pdf ){" "}
                  <span className="text-sm font-extralight italic">
                    {country === "Vietnem" ? "*" : "*"}
                  </span>
                </label>

                <input
                  type="file"
                  required
                  name="passportPhoto"
                  // passport copy dataset in state
                  onChange={(e) => {
                    sethotelbokking(e.target.files[0]);
                  }}
                  accept="image/jpeg,application/pdf"
                  className="w-full rounded-sm border-2 border-brand-100 p-2 outline-none"
                />
              </div>
              {/*  Plane ticket photo */}
              <div className="relative w-full">
                <label className="pl-px text-brand-900">
                  Plane ticket copy ( jpg, pdf ){" "}
                  <span className="text-sm font-extralight italic">
                    {country === "Vietnem" ? "*" : "*"}
                  </span>
                </label>
                <input
                  type="file"
                  name="visaPhoto"
                  required
                  onChange={(e) => {
                    settiketCopy(e.target.files[0]);
                  }}
                  accept="image/jpeg,application/pdf"
                  className="w-full rounded-sm border-2 border-brand-100 p-2 outline-none"
                />
              </div>
            </div>
            {!hide ? (
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
            ) : (
              ""
            )}
          </form>
        </div>
        {/* table */}
        <div className="relative w-full p-2">
          <ComplexTable
            columnsData={[
              {
                Header: "Guest Name",
                accessor: "guestName",
              },
              {
                Header: "Passport Number",
                accessor: "passportNumber",
              },
              {
                Header: "Travel Date",
                accessor: "travelDate",
              },
              {
                Header: "Hotel Name",
                accessor: "hotelName",
              },
              {
                Header: "Passport copy",
                accessor: "passportPhoto",
                Cell: (prop) => {
                  return prop.row.original.passportPhoto ? (
                    <button
                      title="visa copy available"
                      className="cursor-cell rounded-full border-[1px] border-brand-600/10 bg-green-50 p-1 text-xl text-green-600"
                    >
                      {" "}
                      <MaterialSymbolsDone />{" "}
                    </button>
                  ) : (
                    <button
                      title="visa copy not available"
                      className="cursor-cell rounded-full border-[1px] border-brand-600/10 bg-red-50 p-1 text-xl text-red-600"
                    >
                      {" "}
                      <IcTwotoneClose />{" "}
                    </button>
                  );
                },
              },
              {
                Header: "Visa copy",
                accessor: "visaPhoto",
                Cell: (prop) => {
                  return prop.row.original.visaPhoto ? (
                    <button
                      title="visa copy available"
                      className="cursor-cell rounded-full border-[1px] border-brand-600/10 bg-green-50 p-1 text-xl text-green-600"
                    >
                      {" "}
                      <MaterialSymbolsDone />{" "}
                    </button>
                  ) : (
                    <button
                      title="visa copy not available"
                      className="cursor-cell rounded-full border-[1px] border-brand-600/10 bg-red-50 p-1 text-xl text-red-600"
                    >
                      {" "}
                      <IcTwotoneClose />{" "}
                    </button>
                  );
                },
              },
              {
                Header: "Action",
                accessor: "action",
                Cell: (prop) => {
                  return (
                    <button
                      title="delete"
                      onClick={() => {
                        deleteList(prop.row.original.id);
                      }}
                      className="rounded-full border-[1px] border-brand-600/10 bg-brand-50 p-1 text-xl text-red-600 hover:shadow-lg"
                    >
                      {" "}
                      <MaterialSymbolsDeleteOutline />{" "}
                    </button>
                  );
                },
              },
            ]}
            tableData={dataList}
          />
        </div>

        <div className="relative w-full p-3">
          <div className="relative w-full p-3 ">
            <div className="flex w-full justify-center p-3">
              <h1 className="flex items-center justify-start text-2xl text-brand-800">
                <span>
                  <MaterialSymbolsAirplaneTicketOutlineRounded />
                </span>{" "}
                Tour Iternary Setup
              </h1>
            </div>
          </div>
          <form onSubmit={handleFromData} className="flex gap-5">
            <div className="relative col-span-2 w-full">
              <label className="pl-px text-brand-900">Date *</label>
              <input
                type="date"
                name="date"
                required
                placeholder="Type Date Here"
                className="w-full rounded-sm border-2 border-brand-100 p-2 outline-none"
              />
            </div>
            <div className="relative col-span-2 w-full">
              <label className="pl-px text-brand-900">From *</label>
              {/* <input
                type="text"
                name="from"
                required
                placeholder="Type From Here"
                className="w-full rounded-sm border-2 border-brand-100 p-2 outline-none"
              /> */}
              <select
                type="text"
                name="from"
                required
                className="w-full rounded-sm border-2 border-brand-100 p-2 outline-none"
              >
                {
                  referench.fromdata.map((e) => {
                    return (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    );
                  })
                  // <option value=""></option>
                }
              </select>
            </div>
            <div className="relative col-span-2 w-full">
              <label className="pl-px text-brand-900">To *</label>
              {/* <input
                type="text"
                name="to"
                required
                placeholder="Type to Here"
                className="w-full rounded-sm border-2 border-brand-100 p-2 outline-none"
              /> */}
              <select
                type="text"
                name="to"
                required
                className="w-full rounded-sm border-2 border-brand-100 p-2 outline-none"
              >
                {
                  referench.todata.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))
                  // <option value=""></option>
                }
              </select>
            </div>
            <button className="mt-5 rounded-xl border-2 border-brand-300 bg-white/10 px-3 py-2 shadow-lg dark:text-brand-200">
              Add
            </button>
          </form>
          <div className="my-5">
            <ComplexTable
              columnsData={[
                {
                  Header: "Date",
                  accessor: "date",
                },
                {
                  Header: "From",
                  accessor: "from",
                },
                {
                  Header: "to",
                  accessor: "to",
                },
                {
                  Header: "Action",
                  accessor: "action",
                  Cell: (prop) => {
                    return (
                      <button
                        title="delete"
                        // onClick={() => {
                        //   deleteList(prop.row.original.id);
                        // }}
                        onClick={() => handleDeleteToFrom(prop.row.original.id)}
                        className="rounded-full border-[1px] border-brand-600/10 bg-brand-50 p-1 text-xl text-red-600 hover:shadow-lg"
                      >
                        {" "}
                        <MaterialSymbolsDeleteOutline />{" "}
                      </button>
                    );
                  },
                },
              ]}
              tableData={fromdata}
            />

            <div className="relative w-full p-3 pl-5">
              <button
                onClick={submitFullList}
                className="rounded-xl border-2 border-brand-300 bg-white/10 px-3 py-2 shadow-lg dark:text-brand-200"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entry;

export function MaterialSymbolsAddNotesOutline(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v6.7q-.475-.225-.975-.388T19 11.075V5H5v14h6.05q.075.55.238 1.05t.387.95H5Zm0-3v1V5v6.075V11v7Zm2-1h4.075q.075-.525.238-1.025t.362-.975H7v2Zm0-4h6.1q.8-.75 1.788-1.25T17 11.075V11H7v2Zm0-4h10V7H7v2Zm11 14q-2.075 0-3.538-1.463T13 18q0-2.075 1.463-3.538T18 13q2.075 0 3.538 1.463T23 18q0 2.075-1.463 3.538T18 23Zm-.5-2h1v-2.5H21v-1h-2.5V15h-1v2.5H15v1h2.5V21Z"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsDeleteOutline(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsDone(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4L9.55 18Z"
      ></path>
    </svg>
  );
}

export function IcTwotoneClose(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsAirplaneTicketOutlineRounded(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="m11.8 12.9l-2.4.6l-1.075-.8q-.075-.05-.4-.1l-.125.05q-.225.05-.325.263t.025.412l1.15 2q.1.15.25.213t.325.012l8.525-2.25q.375-.1.563-.463t.087-.737q-.1-.375-.437-.562t-.713-.088l-2.45.65l-3.725-3.5q-.125-.125-.3-.162t-.35.012l-.125.025q-.35.075-.488.4t.038.625l1.95 3.4ZM4 20q-.825 0-1.413-.588T2 18v-3.375q0-.275.175-.475t.45-.25q.6-.2.988-.725T4 12q0-.65-.388-1.175t-.987-.725q-.275-.05-.45-.25T2 9.375V6q0-.825.588-1.413T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.588 1.413T20 20H4Zm0-2h16V6H4v2.55q.925.55 1.463 1.463T6 12q0 1.075-.537 1.988T4 15.45V18Zm8-6Z"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsArrowLeftAltRounded(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="m7.85 13l2.85 2.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L4.7 12.7q-.3-.3-.3-.7t.3-.7l4.575-4.575q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7L7.85 11H19q.425 0 .713.288T20 12q0 .425-.288.713T19 13H7.85Z"
      ></path>
    </svg>
  );
}
