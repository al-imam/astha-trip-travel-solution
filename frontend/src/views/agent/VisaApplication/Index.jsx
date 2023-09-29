import { Link } from "react-router-dom";
import DataPage from "./DataPage";

const Index = () => {
  return (
    <div className="relative w-full">
      <div className="relative flex w-full items-center rounded-sm  bg-brand-100/10 py-5 px-3 text-xl">
        <span className="pr-2 text-3xl text-brand-400 ">
          <QuillPaper />
        </span>{" "}
        Visa Application From
      </div>
      <div className="relative flex w-full flex-wrap justify-start md:flex-nowrap">
        <Button name={"Singapore"} link={"/entry/singapore"} icons={<TwemojiFlagForFlagSingapore />} />
        <Button name={"Thailand"} link={"/entry/thailand"} icons={<EmojioneV1FlagForThailand />} />
        <Button name={"Schengen"} link={"/entry/schengen"} icons={<TwemojiFlagEuropeanUnion />} />
      </div>
      <DataPage />
    </div>
  );
};

export default Index;

const Button = ({ name, icons, link }) => {
  return (
    <Link
      to={link}
      className="group relative m-2 flex items-center overflow-hidden rounded-md bg-brand-400/10 py-3 px-4 transition-all duration-300 hover:scale-110 hover:shadow-xl"
    >
      <span className="text-2xl text-brand-700">
        <MdiFileDocumentPlusOutline />
      </span>{" "}
      {name} Application
      <span className="absolute right-[-100px] bottom-full text-4xl opacity-20 transition duration-300 group-hover:right-0 group-hover:bottom-0  group-hover:scale-[200%]">
        {icons}
      </span>
    </Link>
  );
};

export function QuillPaper(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" {...props}>
      <g fill="none" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 9h4m-4 7h12m-12 4h12m-12 4h4m-6 5h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2Z"
        ></path>
        <circle cx="22" cy="9" r=".5" fill="currentColor"></circle>
      </g>
    </svg>
  );
}

export function EmojioneV1FlagForThailand(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 64 64" {...props}>
      <path fill="#2b3990" d="M0 22h64v20H0z"></path>
      <path
        fill="#ec1c24"
        d="M10 54h44c5.086 0 8.247-2.905 9.446-7H.554c1.199 4.095 4.36 7 9.446 7m44-44H10c-5.086 0-8.247 2.905-9.446 7h62.893c-1.2-4.095-4.361-7-9.447-7"
      ></path>
      <path
        fill="#e6e7e8"
        d="M64 42H0v1c0 1.413.19 2.759.554 4h62.893c.363-1.241.553-2.587.553-4v-1m0-21c0-1.413-.19-2.759-.554-4H.554A14.215 14.215 0 0 0 0 21v1h64v-1z"
      ></path>
    </svg>
  );
}

export function TwemojiFlagForFlagSingapore(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36" {...props}>
      <path fill="#EEE" d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v18z"></path>
      <path fill="#ED2939" d="M36 18V9a4 4 0 0 0-4-4H4a4 4 0 0 0-4 4v9h36z"></path>
      <path
        fill="#FFF"
        d="M6 11.5c0-2.585 1.624-4.748 3.81-5.336A5.498 5.498 0 0 0 8.5 6a5.5 5.5 0 1 0 0 11c.452 0 .889-.06 1.31-.164C7.624 16.248 6 14.085 6 11.5z"
      ></path>
      <path
        d="M12 7l.225.691h.726l-.588.427l.225.691L12 8.382l-.588.427l.225-.691l-.588-.427h.726zm-2 7l.225.691h.726l-.588.427l.225.691l-.588-.427l-.588.427l.225-.691l-.588-.427h.726zm4 0l.225.691h.726l-.588.427l.225.691l-.588-.427l-.588.427l.225-.691l-.588-.427h.726zm-5-4l.225.691h.726l-.588.427l.225.691L9 11.382l-.588.427l.225-.691l-.588-.427h.726zm6 0l.225.691h.726l-.588.427l.225.691l-.588-.427l-.588.427l.225-.691l-.588-.427h.726z"
        fill="#EEE"
      ></path>
    </svg>
  );
}

export function TwemojiFlagEuropeanUnion(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36" {...props}>
      <path fill="#039" d="M32 5H4a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4z"></path>
      <path
        fill="#FC0"
        d="m18.539 9.705l.849-.617h-1.049l-.325-.998l-.324.998h-1.049l.849.617l-.325.998l.849-.617l.849.617zm0 17.333l.849-.617h-1.049l-.325-.998l-.324.998h-1.049l.849.617l-.325.998l.849-.617l.849.617zm-8.666-8.667l.849-.617h-1.05l-.324-.998l-.325.998H7.974l.849.617l-.324.998l.849-.617l.849.617zm1.107-4.285l.849-.617h-1.05l-.324-.998l-.324.998h-1.05l.849.617l-.324.998l.849-.617l.849.617zm0 8.619l.849-.617h-1.05l-.324-.998l-.324.998h-1.05l.849.617l-.324.998l.849-.617l.849.617zm3.226-11.839l.849-.617h-1.05l-.324-.998l-.324.998h-1.05l.849.617l-.324.998l.849-.617l.849.617zm0 15.067l.849-.617h-1.05l-.324-.998l-.324.998h-1.05l.849.617l-.324.998l.849-.616l.849.616zm11.921-7.562l-.849-.617h1.05l.324-.998l.325.998h1.049l-.849.617l.324.998l-.849-.617l-.849.617zm-1.107-4.285l-.849-.617h1.05l.324-.998l.324.998h1.05l-.849.617l.324.998l-.849-.617l-.849.617zm0 8.619l-.849-.617h1.05l.324-.998l.324.998h1.05l-.849.617l.324.998l-.849-.617l-.849.617zm-3.226-11.839l-.849-.617h1.05l.324-.998l.324.998h1.05l-.849.617l.324.998l-.849-.617l-.849.617zm0 15.067l-.849-.617h1.05l.324-.998l.324.998h1.05l-.849.617l.324.998l-.849-.616l-.849.616z"
      ></path>
    </svg>
  );
}

export function MdiFileDocumentPlusOutline(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M23 18h-3v-3h-2v3h-3v2h3v3h2v-3h3M6 2a2 2 0 0 0-2 2v16c0 1.11.89 2 2 2h7.81c-.36-.62-.61-1.3-.73-2H6V4h7v5h5v4.08c.33-.05.67-.08 1-.08c.34 0 .67.03 1 .08V8l-6-6M8 12v2h8v-2m-8 4v2h5v-2Z"
      ></path>
    </svg>
  );
}
