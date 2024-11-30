import React from "react";
import CoverOne from "../../assets/cover/cover-01.png";
import userSix from "../../assets/users/user-06.png";
function Profile() {
  return (
    <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-md  ml-20 md:ml-34 w-lg">
    {/* Cover Section */}
    <div className="relative z-20 h-35 md:h-65">
      <img
        src={CoverOne}
        alt="profile cover"
        className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
      />
      <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
        <label htmlFor="cover" className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90 xsm:px-4">
          <input type="file" name="cover" id="cover" className="sr-only" />
          <span>Edit</span>
        </label>
      </div>
    </div>
    {/* Profile Section */}
    <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
      <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
        <div className="relative drop-shadow-2">
          <img src={userSix} alt="profile" />
          <label htmlFor="profile" className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2">
            <input type="file" name="profile" id="profile" className="sr-only" />
            <span>Edit</span>
          </label>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">Danish Heilium</h3>
      
        <p className="font-medium">Ui/Ux Designer</p>
            <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  259
                </span>
                <span className="text-sm">Posts</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  129K
                </span>
                <span className="text-sm">Followers</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  2K
                </span>
                <span className="text-sm">Following</span>
              </div>
            </div>

      </div>
      <div className="mx-auto max-w-180">
              <h4 className="font-semibold text-black dark:text-white">
                About Me
              </h4>
              <p className="mt-4.5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque posuere fermentum urna, eu condimentum mauris
                tempus ut. Donec fermentum blandit aliquet. Etiam dictum dapibus
                ultricies. Sed vel aliquet libero. Nunc a augue fermentum,
                pharetra ligula sed, aliquam lacus.
              </p>
            </div>

    </div>
  </div>
    
  );
}

export default Profile;
