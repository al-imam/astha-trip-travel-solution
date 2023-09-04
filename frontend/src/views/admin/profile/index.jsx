import ChangePassword from "./components/ChangePassword";
import Storage from "./components/Storage";

const ProfileOverview = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-3">
        {/* <div className="col-span-4 lg:!mb-0">
          <Banner />
        </div>

        <div className="z-0 col-span-5 lg:!mb-0">
          <Upload />
        </div> */}
        <div className="lg:!mb-0">
          <Storage />
        </div>
        <div className="col-span-2 h-full">
          <ChangePassword />
        </div>
      </div>

      {/* all project & ... */}

      {/* <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
          <Project />
        </div>
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-7">
          <General />
        </div>
      </div> */}
    </div>
  );
};

export default ProfileOverview;
