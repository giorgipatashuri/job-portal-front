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
    address: resumeInfo?.address || "",
    phone: resumeInfo?.phone || "",
    email: resumeInfo?.email || "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("---", resumeInfo);
  }, [resumeInfo]);

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
    <div className="p-5 shadow-lg rounded-lg border-t-green border-t-4 mt-10">
      <h2 className="font-bold text-lg">პერსონალური ინფორმაცია</h2>
      <p>შეავსე საბაზისო ინფორმაცია </p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">სახელი</label>
            <Input
              name="firstName"
              defaultValue={resumeInfo?.firstName}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">გვარი</label>
            <Input
              name="lastName"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo?.lastName}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">პოზიცია</label>
            <Input
              name="jobTitle"
              required
              defaultValue={resumeInfo?.jobTitle}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">მისამართი</label>
            <Input
              name="address"
              required
              defaultValue={resumeInfo?.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">ტელ.ნომერი</label>
            <Input
              name="phone"
              required
              defaultValue={resumeInfo?.phone}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">ელ-მეილი</label>
            <Input
              name="email"
              required
              defaultValue={resumeInfo?.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading} className="bg-green">
            {loading ? <LoaderCircle className="animate-spin" /> : "შენახვა"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetail;
