import React from "react";
import Lottie from "lottie-react";
import animationSvg from "../assets/Animation - 1729707901983.json";

const Banner = () => {
  return (
    <div className="flex">
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20 py-14 ">
        <h1 className="text-5xl font-bold text-primary mb-3">
          იპოვე <span className="text-green">ახალი სამსახური</span> დღეს
        </h1>
        <p className="text-lg text-black/70 mb-8">
          ათასობით ვაკანსია ნებისმიერ მიმართულებაზე მხოლოდ ჩვენთან
        </p>

        <form>
          <div className="flex justify-start md:flex-row flex-col">
            <div className="flex md:rounded-md rounded shadow-sm ring-1 ring-inset  focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/2 w-full">
              <input
                type="text"
                name="title"
                id="title"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-8 outline-none text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="პოზიცია, კომპანია"
              />
              {/* <FiSearch className="absolute mt-2.5 ml-2 text-gray-400" /> */}
            </div>

            {/* <div className='flex md:rounded-s-none rounded shadow-sm ring-1 ring-inset  focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/3 w-full'>
                        <input type="text" name='title' id='title' className='block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6' placeholder='Location'
                        // value={''} 
                        />
                        <FiMapPin className='absolute mt-2.5 ml-2 text-gray-400' />

                    </div> */}

            <button
              type="submit"
              className="bg-green py-2 px-8 text-white md:rounded-s-none rounded"
            >
              ძებნა
            </button>
          </div>
        </form>
      </div>
      <div>
        <Lottie animationData={animationSvg} loop={true} />
      </div>
    </div>
  );
};
export default Banner;
