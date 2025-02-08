import { useEffect, useState } from "react";
import ApplicantDetails from "./ApplicantDetails";
import { Search, Filter } from "lucide-react";
import api, { apiForCompany } from "../../../lib/api";

function ApplicantsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);
  const [applicants, setApplicants] = useState<any>([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await apiForCompany.get("/api/applications/company");
      console.log("ssdd", response.data);
      if (Array.isArray(response.data)) {
        const formattedApplications = response.data.map((app) => ({
          id: app.id,
          company: app.job.company.companyName,
          user: app.user,
          cv: app.cv,
          coverLetter: app.coverLetter,
          position: app.job.jobName,
          status: app.status,
          appliedDate: new Date(app.appliedAt).toLocaleDateString(),
        }));
        setApplicants(formattedApplications);
      } else {
        console.error("Error: Response data is not an array");
        setApplicants([]);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      setApplicants([]);
    }
  };
  if (selectedApplicant !== null) {
    return (
      <ApplicantDetails
        applicant={selectedApplicant}
        onBack={() => setSelectedApplicant(null)}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">აპლიკანტები</h2>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search applicants..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
          <button className="border rounded-lg px-4 py-2 flex items-center text-gray-600 hover:bg-gray-50">
            <Filter size={20} className="mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                სახელი
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                პოზიცია
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                გაგზავნის თარიღი
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {applicants.map((applicant: any) => (
              <tr
                key={applicant.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedApplicant(applicant)}
              >
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900">
                      {applicant.user.name} {applicant.user.lastname}
                    </div>
                    <div className="text-gray-500">{applicant.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {applicant.position}
                </td>
                <td className="px-6 py-4">
                  {/* <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      statusColors[
                        applicant.status as keyof typeof statusColors
                      ]
                    }`}
                  >
                    {applicant.status}
                  </span> */}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(applicant.appliedDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ApplicantsList;
