import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";

interface PersonalDetailProps {
  enabledNext: (isEnabled: boolean) => void;
}

interface FormData {
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  address?: string;
  phone?: string;
  email?: string;
}

function PersonalDetail({ enabledNext }: PersonalDetailProps) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [formData, setFormData] = useState<FormData>({
    firstName: resumeInfo?.firstName || "",
    lastName: resumeInfo?.lastName || "",
    jobTitle: resumeInfo?.jobTitle || "",
    phone: resumeInfo?.phone || "",
    email: resumeInfo?.email || "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setResumeInfo((prevResumeInfo: any) => ({
      ...prevResumeInfo,
      [name]: value,
    }));
  };

  const onSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: formData,
    };

    // Assuming GlobalApi.UpdateResumeDetail is defined elsewhere
    // GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
    //   (resp) => {
    //     console.log(resp);
    //     enabledNext(true);
    //     setLoading(false);
    //     toast("Details updated");
    //   },
    //   (error) => {
    //     setLoading(false);
    //   }
    // );
  };

  return (
    <div className="p-6 shadow-lg rounded-lg border-t-4 border-t-green-500 bg-white mt-10">
      <h2 className="font-bold text-xl mb-2 text-gray-800">
        პერსონალური ინფორმაცია
      </h2>
      <p className="text-sm text-gray-600 mb-6">შეავსე საბაზისო ინფორმაცია</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              სახელი
            </label>
            <Input
              name="firstName"
              defaultValue={resumeInfo?.firstName}
              required
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              გვარი
            </label>
            <Input
              name="lastName"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo?.lastName}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="col-span-2 mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              პოზიცია
            </label>
            <Input
              name="jobTitle"
              required
              defaultValue={resumeInfo?.jobTitle}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ტელ.ნომერი
            </label>
            <Input
              name="phone"
              required
              defaultValue={resumeInfo?.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ელ-მეილი
            </label>
            <Input
              name="email"
              required
              defaultValue={resumeInfo?.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb-20"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetail;
