import * as React from "react";
import { Logo } from "./components/Logo";
import { NavLink } from "./components/NavLink";
import { SearchInput } from "./components/SearchInput";

const navLinks = [
  { text: "Find Jobs", href: "/jobs" },
  { text: "Browse Companies", href: "/companies" },
];

const popularSearches = ["UI Designer", "UX Researcher", "Android", "Admin"];

export const JobSearch: React.FC = () => {
  return (
    <div>
      <div className="w-96 h-96 relative bg-white  overflow-hidden">
        <div className="w-96 h-32 left-0 top-0 absolute bg-white" />
        <div className="w-96 h-14 left-[120px] top-[33px] absolute">
          <div className="w-96 h-3.5 left-[294.48px] top-[21px] absolute">
            <div className="left-0 top-0 absolute text-[#6300b3] text-sm font-semibold font-['Poppins'] leading-none">
              Home
            </div>
            <div className="left-[201.44px] top-[-0px] absolute text-[#303030] text-sm font-medium font-['Poppins'] leading-none">
              Employers
            </div>
            <div className="left-[320.38px] top-[-0px] absolute text-[#303030] text-sm font-medium font-['Poppins'] leading-none">
              Admin
            </div>
            <div className="left-[89.21px] top-[-0px] absolute text-[#303030] text-sm font-medium font-['Poppins'] leading-none">
              Find Jobs
            </div>
            <div className="left-[413.43px] top-[-0px] absolute text-[#303030] text-sm font-medium font-['Poppins'] leading-none">
              About Us
            </div>
          </div>
          <div className="w-36 h-14 px-14 py-5 left-[1056.12px] top-0 absolute bg-[#6300b3] rounded justify-center items-center gap-2.5 inline-flex">
            <div className="text-white text-base font-semibold font-['Poppins'] leading-none">
              Login
            </div>
          </div>
          <div className="w-36 h-14 px-10 py-5 left-[895.92px] top-[-0px] absolute rounded border border-[#6300b3] justify-center items-center gap-2.5 inline-flex">
            <div className="text-[#6300b3] text-base font-semibold font-['Poppins'] leading-none">
              Contact Us
            </div>
          </div>
          <div className="w-44 h-6 left-0 top-[16px] absolute">
            <div className="left-[30.27px] top-[-0px] absolute text-[#6300b3] text-2xl font-bold font-['Nunito'] leading-snug">
              AlwaysApply
            </div>
            <div className="w-6 h-6 left-0 top-0 absolute"></div>
          </div>
        </div>
        <div className="w-96 h-96 left-0 top-[123px] absolute">
          <div className="w-96 h-96 left-0 top-0 absolute bg-gradient-to-r from-[#c599e5] via-[#c599e5] to-[#e2ccf2]" />
          <div className="w-96 h-96 left-[120px] top-[19px] absolute">
            <img
              className="w-96 h-96 left-[665.47px] top-0 absolute"
              src="https://via.placeholder.com/535x557"
            />
            <div className="w-96 h-80 left-0 top-[97px] absolute flex-col justify-start items-start gap-16 inline-flex">
              <div className="flex-col justify-start items-start gap-6 flex">
                <div className="w-96 text-[#303030] text-5xl font-medium font-['Poppins'] leading-10">
                  Find a job that aligns with your interests and skills
                </div>
                <div className="text-[#5e6670] text-lg font-normal font-['Poppins'] leading-none">
                  Thousands of jobs in all the leading sector are waiting for
                  you.
                </div>
              </div>
              <div className="flex-col justify-start items-start gap-6 flex">
                <div className="p-3 bg-white rounded-lg shadow-[0px_12px_40px_0px_rgba(0,44,109,0.04)] border border-[#e4e5e8] justify-start items-center gap-3 inline-flex">
                  <div className="justify-center items-center flex">
                    <div className="pl-4 pr-20 py-4 bg-white rounded justify-start items-center gap-3 flex">
                      <div className="w-6 h-6 relative flex-col justify-start items-start flex overflow-hidden" />
                      <div className="text-[#9199a3] text-base font-normal font-['Poppins'] leading-none">
                        Job tittle, Keyword...
                      </div>
                    </div>
                    <div className="w-8 h-px origin-top-left rotate-90 border border-[#e4e5e8]"></div>
                    <div className="w-56 h-14 relative bg-white rounded">
                      <div className="left-[54px] top-[18px] absolute text-[#9199a3] text-base font-normal font-['Poppins'] leading-none">
                        Location
                      </div>
                      <div className="w-6 h-6 left-[18px] top-[16px] absolute  overflow-hidden" />
                    </div>
                  </div>
                  <div className="px-8 py-4 bg-[#6300b3] rounded justify-center items-center gap-3 flex">
                    <div className="text-white text-base font-semibold font-['Poppins'] capitalize leading-none">
                      Find Job
                    </div>
                  </div>
                </div>
                <div className="justify-start items-start inline-flex">
                  <div className="text-center text-[#9199a3] text-sm font-normal font-['Poppins'] leading-none">
                    Suggestion:
                  </div>
                  <div className="text-center text-[#474c54] text-sm font-normal font-['Poppins'] leading-none">
                    {" "}
                    UI/UX Designer,
                  </div>
                  <div className="text-center text-[#474c54] text-sm font-normal font-['Poppins'] leading-none">
                    {" "}
                    Programing,
                  </div>
                  <div className="text-center text-[#6300b3] text-sm font-medium font-['Poppins'] leading-none">
                    {" "}
                    Digital Marketing,
                  </div>
                  <div className="text-center text-[#474c54] text-sm font-normal font-['Poppins'] leading-none">
                    {" "}
                    Video,
                  </div>
                  <div className="text-center text-[#474c54] text-sm font-normal font-['Poppins'] leading-none">
                    {" "}
                    Animation.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-40 left-[120px] top-[1534px] absolute">
          <div className="w-96 h-5 left-0 top-0 absolute">
            <div className="left-[441px] top-0 absolute text-center text-[#5e6670] text-2xl font-normal font-['Poppins'] leading-snug">
              Top companies hiring now
            </div>
            <div className="w-96 h-px left-[407px] top-[11px] absolute origin-top-left -rotate-180 border border-[#abb1b9]/40"></div>
            <div className="w-96 h-px left-[1200px] top-[11px] absolute origin-top-left -rotate-180 border border-[#abb1b9]/40"></div>
          </div>
          <div className="w-96 h-24 left-0 top-[67px] absolute">
            <img
              className="w-32 h-24 left-0 top-0 absolute"
              src="https://via.placeholder.com/122x90"
            />
            <img
              className="w-36 h-16 left-[258.22px] top-[11px] absolute"
              src="https://via.placeholder.com/150x62"
            />
            <img
              className="w-40 h-10 left-[544.45px] top-[22px] absolute"
              src="https://via.placeholder.com/155x41"
            />
            <img
              className="w-28 h-12 left-[835.70px] top-[18px] absolute"
              src="https://via.placeholder.com/108x46"
            />
            <img
              className="w-32 h-16 left-[1079.90px] top-[5px] absolute"
              src="https://via.placeholder.com/120x63"
            />
          </div>
        </div>
        <div className="w-96 h-96 left-0 top-[1772px] absolute">
          <div className="w-96 h-96 left-0 top-0 absolute bg-gradient-to-r from-[#c599e5] via-[#c599e5] to-[#e2ccf2]" />
          <div className="w-96 h-72 left-[120px] top-[122px] absolute">
            <div className="w-32 h-5 left-[988px] top-[256px] absolute">
              <div className="w-5 h-5 left-[30px] top-0 absolute flex-col justify-start items-start inline-flex overflow-hidden" />
              <div className="w-5 h-5 left-[70px] top-0 absolute flex-col justify-start items-start inline-flex overflow-hidden" />
              <div className="w-5 h-5 py-0.5 left-[110px] top-0 absolute justify-center items-center inline-flex overflow-hidden" />
            </div>
            <div className="w-96 h-44 left-[31px] top-0 absolute">
              <div className="w-44 h-6 left-0 top-[8px] absolute">
                <div className="left-[30.27px] top-0 absolute text-[#6300b3] text-2xl font-bold font-['Nunito'] leading-snug">
                  AlwaysApply
                </div>
                <div className="w-6 h-6 left-0 top-0 absolute"></div>
              </div>
              <div className="w-56 h-7 left-0 top-[66px] absolute">
                <div className="left-0 top-[5px] absolute text-[#5e6670] text-lg font-normal font-['Poppins'] leading-none">
                  Call now:
                </div>
                <div className="left-[78px] top-[5px] absolute text-[#ae71db] text-lg font-medium font-['Poppins'] leading-none">
                  {" "}
                  +91 9591776078
                </div>
              </div>
              <div className="w-56 left-0 top-[106px] absolute text-[#767f8c] text-sm font-normal font-['Poppins'] leading-tight">
                456 Chandni Chowk Street, Near Red Fort, Old Delhi, New Delhi,
                Delhi 110006, India
              </div>
              <div className="h-40 left-[331px] top-0 absolute flex-col justify-start items-start gap-4 inline-flex">
                <div className="w-48 text-[#6300b3] text-xl font-medium font-['Poppins'] leading-tight">
                  Quick Link
                </div>
                <div className="flex-col justify-start items-start gap-1 flex">
                  <div className="py-1.5 justify-start items-center gap-1 inline-flex">
                    <div className="text-center text-[#9199a3] text-base font-normal font-['Poppins'] leading-none">
                      About
                    </div>
                  </div>
                  <div className="py-1.5 justify-start items-center gap-1.5 inline-flex">
                    <div className="text-center text-[#ae70da] text-base font-medium font-['Poppins'] leading-none">
                      Contact
                    </div>
                  </div>
                  <div className="py-1.5 justify-start items-center gap-1 inline-flex">
                    <div className="text-center text-[#9199a3] text-base font-normal font-['Poppins'] leading-none">
                      Admin
                    </div>
                  </div>
                  <div className="py-1.5 justify-start items-center gap-1 inline-flex" />
                </div>
              </div>
              <div className="h-40 left-[630px] top-0 absolute flex-col justify-start items-start gap-4 inline-flex">
                <div className="w-48 text-[#6300b3] text-xl font-medium font-['Poppins'] leading-tight">
                  Candidate
                </div>
                <div className="flex-col justify-start items-start gap-1 flex">
                  <div className="py-1.5 justify-start items-center gap-1 inline-flex">
                    <div className="text-center text-[#9199a3] text-base font-normal font-['Poppins'] leading-none">
                      Browse Jobs
                    </div>
                  </div>
                  <div className="py-1.5 justify-start items-center gap-1 inline-flex">
                    <div className="text-center text-[#9199a3] text-base font-normal font-['Poppins'] leading-none">
                      Browse Employers
                    </div>
                  </div>
                  <div className="py-1.5 justify-start items-center gap-1 inline-flex">
                    <div className="text-center text-[#9199a3] text-base font-normal font-['Poppins'] leading-none">
                      Candidate Dashboard
                    </div>
                  </div>
                  <div className="py-1.5 justify-start items-center gap-1 inline-flex">
                    <div className="text-center text-[#9199a3] text-base font-normal font-['Poppins'] leading-none">
                      Saved Jobs
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-40 left-[945px] top-0 absolute flex-col justify-start items-start gap-4 inline-flex">
                <div className="w-48 text-[#6300b3] text-xl font-medium font-['Poppins'] leading-tight">
                  Employers
                </div>
                <div className="flex-col justify-start items-start gap-1 flex">
                  <div className="py-1.5 justify-start items-center gap-1 inline-flex">
                    <div className="text-center text-[#9199a3] text-base font-normal font-['Poppins'] leading-none">
                      Post a Job
                    </div>
                  </div>
                  <div className="py-1.5 justify-start items-center gap-1 inline-flex">
                    <div className="text-center text-[#9199a3] text-base font-normal font-['Poppins'] leading-none">
                      Browse Candidates
                    </div>
                  </div>
                  <div className="py-1.5 justify-start items-center gap-1 inline-flex">
                    <div className="text-center text-[#9199a3] text-base font-normal font-['Poppins'] leading-none">
                      Employers Dashboard
                    </div>
                  </div>
                  <div className="py-1.5 justify-start items-center gap-1 inline-flex">
                    <div className="text-center text-[#9199a3] text-base font-normal font-['Poppins'] leading-none">
                      Applications
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="left-[31px] top-[259px] absolute text-[#b781df] text-sm font-normal font-['Poppins'] leading-none">
              @ 2022 AlwaysApply - Job Portal. All rights Reserved
            </div>
            <div className="w-96 h-px left-0 top-[217px] absolute border border-[#767f8c]/50"></div>
          </div>
        </div>
        <div className="h-96 left-[120px] top-[869px] absolute">
          <div className="w-96 h-96 left-0 top-0 absolute">
            <div className="w-96 h-72 left-0 top-[147px] absolute">
              <div className="w-96 h-72 left-0 top-0 absolute">
                <div className="w-96 h-72 left-0 top-0 absolute bg-[#f8f2fc] rounded-lg shadow-[0px_4px_40px_0px_rgba(0,0,0,0.10)] border border-[#efe1f8]" />
                <div className="w-64 h-5 left-[17.18px] top-[29.14px] absolute" />
                <div className="w-32 h-10 left-[73.92px] top-[101.07px] absolute">
                  <div className="w-24 left-[2.79px] top-0 absolute text-[#303030] text-base font-medium font-['Poppins'] leading-none">
                    Google Inc.
                  </div>
                  <div className="w-5 h-4 left-0 top-[24px] absolute justify-center items-center inline-flex">
                    <div className="w-5 h-4 relative"></div>
                  </div>
                  <div className="w-28 left-[22.20px] top-[26px] absolute text-[#767f8c] text-sm font-normal font-['Poppins'] leading-none">
                    New Delhi, India
                  </div>
                </div>
                <div className="w-8 h-6 left-[325.99px] top-[18px] absolute justify-center items-center inline-flex">
                  <div className="w-8 h-6 relative"></div>
                </div>
                <div className="w-80 h-64 left-[17.16px] top-[26px] absolute">
                  <div className="w-80 h-9 pr-8 pb-3 left-0 top-[24px] absolute justify-start items-center inline-flex">
                    <div className="self-stretch px-2 py-1 bg-[#e7f6ea] rounded-sm justify-start items-start gap-2.5 inline-flex">
                      <div className="text-[#0ba02c] text-sm font-semibold font-['Poppins'] uppercase leading-none">
                        Part-time
                      </div>
                    </div>
                    <div className="text-[#767f8c] text-sm font-normal font-['Poppins'] leading-none">
                      Salary: 20,000 INR - 25,000 INR
                    </div>
                  </div>
                  <div className="w-64 left-0 top-0 absolute text-[#18191c] text-lg font-medium font-['Poppins'] leading-none">
                    Technical Support Specialist
                  </div>
                  <div className="w-48 h-12 pl-3 pr-36 pt-2 pb-1.5 left-0 top-[66.92px] absolute justify-start items-center inline-flex">
                    <div className="w-9 h-9 relative flex-col justify-start items-start flex overflow-hidden" />
                  </div>
                  <div className="w-36 h-5 left-0 top-[153.28px] absolute">
                    <div className="w-12 h-5 left-0 top-0 absolute">
                      <img
                        className="w-5 h-5 left-0 top-0 absolute rounded-full border border-[#6300b3]"
                        src="https://via.placeholder.com/18x21"
                      />
                      <img
                        className="w-5 h-5 left-[14.26px] top-0 absolute rounded-full border border-[#6300b3]"
                        src="https://via.placeholder.com/18x21"
                      />
                      <img
                        className="w-5 h-5 left-[28.53px] top-0 absolute rounded-full border border-[#6300b3]"
                        src="https://via.placeholder.com/18x21"
                      />
                    </div>
                    <div className="w-24 h-3 left-[56.84px] top-[4.72px] absolute text-[#303030] text-xs font-medium font-['Poppins'] leading-3">
                      10+ applicants
                    </div>
                  </div>
                  <div className="w-80 h-10 left-[13.84px] top-[211px] absolute">
                    <div className="w-36 h-10 px-14 py-5 left-[167.43px] top-0 absolute bg-[#6300b3] rounded justify-center items-center gap-2.5 inline-flex">
                      <div className="text-white text-sm font-semibold font-['Poppins'] leading-none">
                        Apply now
                      </div>
                    </div>
                    <div className="w-36 h-10 px-14 py-5 left-0 top-0 absolute rounded border border-[#6300b3] justify-center items-center gap-2.5 inline-flex">
                      <div className="text-[#303030] text-sm font-semibold font-['Poppins'] leading-none">
                        View details
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-96 h-72 left-[417px] top-0 absolute">
                <div className="w-96 h-72 left-0 top-0 absolute bg-[#f8f2fc] rounded-lg shadow-[0px_4px_40px_0px_rgba(0,0,0,0.10)] border border-[#efe1f8]" />
                <div className="w-64 h-5 left-[17.46px] top-[29.14px] absolute flex-col justify-end items-start gap-1.5 inline-flex">
                  <div className="text-[#18191c] text-lg font-medium font-['Poppins'] leading-none">
                    Senior UI/UX Designer
                  </div>
                  <div className="self-stretch h-9 pr-14 pb-3 justify-start items-center gap-1 inline-flex">
                    <div className="self-stretch px-2 py-1 bg-[#f1e0ff] rounded-sm justify-start items-start gap-2.5 inline-flex">
                      <div className="text-[#6300b3] text-sm font-semibold font-['Poppins'] uppercase leading-none">
                        Full-time
                      </div>
                    </div>
                    <div className="text-[#767f8c] text-sm font-normal font-['Poppins'] leading-none">
                      Salary: $30,000 - $55,000
                    </div>
                  </div>
                </div>
                <div className="w-48 h-12 pl-2 pr-7 pt-1.5 pb-0.5 left-[13.95px] top-[96px] absolute justify-start items-start gap-3 inline-flex">
                  <img
                    className="w-10 h-10"
                    src="https://via.placeholder.com/40x40"
                  />
                  <div className="w-24 h-10 relative">
                    <div className="left-[2.76px] top-0 absolute text-[#303030] text-base font-medium font-['Poppins'] leading-none">
                      Apple
                    </div>
                    <div className="w-4 h-4 left-0 top-[24px] absolute justify-center items-center inline-flex">
                      <div className="w-4 h-4 relative"></div>
                    </div>
                    <div className="left-[22px] top-[26px] absolute text-[#767f8c] text-sm font-normal font-['Poppins'] leading-none">
                      Boston, USA
                    </div>
                  </div>
                </div>
                <div className="w-36 h-5 left-[16.98px] top-[182.42px] absolute">
                  <div className="w-12 h-5 left-0 top-0 absolute">
                    <img
                      className="w-5 h-5 left-0 top-0 absolute rounded-full border border-[#6300b3]"
                      src="https://via.placeholder.com/18x21"
                    />
                    <img
                      className="w-5 h-5 left-[14.26px] top-0 absolute rounded-full border border-[#6300b3]"
                      src="https://via.placeholder.com/18x21"
                    />
                    <img
                      className="w-5 h-5 left-[28.53px] top-0 absolute rounded-full border border-[#6300b3]"
                      src="https://via.placeholder.com/18x21"
                    />
                  </div>
                  <div className="w-20 h-3 left-[56.02px] top-[4.58px] absolute text-[#303030] text-xs font-medium font-['Poppins'] leading-3">
                    9+ applicants
                  </div>
                </div>
                <div className="w-80 h-10 left-[31px] top-[237px] absolute">
                  <div className="w-36 h-10 px-14 py-5 left-[167.43px] top-0 absolute bg-[#6300b3] rounded justify-center items-center gap-2.5 inline-flex">
                    <div className="text-white text-sm font-semibold font-['Poppins'] leading-none">
                      Apply now
                    </div>
                  </div>
                  <div className="w-36 h-10 px-14 py-5 left-0 top-0 absolute rounded border border-[#6300b3] justify-center items-center gap-2.5 inline-flex">
                    <div className="text-[#303030] text-sm font-semibold font-['Poppins'] leading-none">
                      View details
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-96 h-72 left-[834px] top-0 absolute">
                <div className="w-96 h-72 left-0 top-0 absolute bg-[#f8f2fc] rounded-lg shadow-[0px_4px_40px_0px_rgba(0,0,0,0.10)] border border-[#efe1f8]" />
                <div className="w-64 h-5 pl-px left-[16.73px] top-[29.14px] absolute flex-col justify-end items-start gap-1.5 inline-flex">
                  <div className="text-[#18191c] text-lg font-medium font-['Poppins'] leading-none">
                    Marketing Officer
                  </div>
                  <div className="self-stretch h-9 pr-7 pb-3 justify-start items-center inline-flex">
                    <div className="self-stretch px-2 py-1 bg-[#f1e0ff] rounded-sm justify-start items-start gap-2.5 inline-flex">
                      <div className="text-[#6300b3] text-sm font-semibold font-['Poppins'] uppercase leading-none">
                        Part-time
                      </div>
                    </div>
                    <div className="text-[#767f8c] text-sm font-normal font-['Poppins'] leading-none">
                      Salary: 15,000 INR - 35,000 INR
                    </div>
                  </div>
                </div>
                <div className="w-48 h-10 left-[17.66px] top-[101px] absolute">
                  <div className="w-12 h-9 left-0 top-[3px] absolute"></div>
                  <div className="w-20 left-[64.50px] top-0 absolute text-[#303030] text-base font-medium font-['Poppins'] leading-none">
                    Intel Corp
                  </div>
                  <div className="w-5 h-4 left-[61.72px] top-[24px] absolute justify-center items-center inline-flex">
                    <div className="w-5 h-4 relative"></div>
                  </div>
                  <div className="w-28 left-[83.92px] top-[26px] absolute text-[#767f8c] text-sm font-normal font-['Poppins'] leading-none">
                    Bangalore, India
                  </div>
                </div>
                <div className="w-36 h-5 left-[16.80px] top-[182.42px] absolute">
                  <div className="w-12 h-5 left-0 top-0 absolute">
                    <img
                      className="w-5 h-5 left-0 top-0 absolute rounded-full border border-[#6300b3]"
                      src="https://via.placeholder.com/18x21"
                    />
                    <img
                      className="w-5 h-5 left-[14.26px] top-0 absolute rounded-full border border-[#6300b3]"
                      src="https://via.placeholder.com/18x21"
                    />
                    <img
                      className="w-5 h-5 left-[28.53px] top-0 absolute rounded-full border border-[#6300b3]"
                      src="https://via.placeholder.com/18x21"
                    />
                  </div>
                  <div className="w-24 h-3 left-[57.80px] top-[4.32px] absolute text-[#303030] text-xs font-medium font-['Poppins'] leading-3">
                    30+ applicants
                  </div>
                </div>
                <div className="w-80 h-10 left-[30px] top-[237px] absolute">
                  <div className="w-36 h-10 px-14 py-5 left-[167.43px] top-0 absolute bg-[#6300b3] rounded justify-center items-center gap-2.5 inline-flex">
                    <div className="text-white text-sm font-semibold font-['Poppins'] leading-none">
                      Apply now
                    </div>
                  </div>
                  <div className="w-36 h-10 px-14 py-5 left-0 top-0 absolute rounded border border-[#6300b3] justify-center items-center gap-2.5 inline-flex">
                    <div className="text-[#303030] text-sm font-semibold font-['Poppins'] leading-none">
                      View details
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-96 h-20 left-[253px] top-0 absolute">
              <div className="left-[171px] top-0 absolute text-center text-[#303030] text-5xl font-semibold font-['Poppins'] leading-10">
                Featured Jobs
              </div>
              <div className="left-0 top-[65px] absolute text-center text-[#5e6670] text-xl font-normal font-['Poppins'] leading-snug">
                Choose jobs from the top employers and apply for the same.
              </div>
            </div>
          </div>
          <div className="left-[554px] top-[491px] absolute text-[#6300b3] text-2xl font-medium font-['Poppins'] underline leading-normal">
            View all
          </div>
        </div>
        <div className="w-7 h-6 left-[852px] top-[1038px] absolute justify-center items-center inline-flex">
          <div className="w-7 h-6 relative"></div>
        </div>
        <div className="w-7 h-6 left-[1260px] top-[1038px] absolute justify-center items-center inline-flex">
          <div className="w-7 h-6 relative"></div>
        </div>
      </div>
    </div>
  );
};
