import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import ApplicantDetails from './ApplicantDetails';

const applicants = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    position: 'Senior Software Engineer',
    status: 'In Review',
    appliedDate: '2024-02-15',
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    position: 'Product Manager',
    status: 'Interviewed',
    appliedDate: '2024-02-14',
  },
  {
    id: 3,
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    position: 'UX Designer',
    status: 'New',
    appliedDate: '2024-02-13',
  },
];

const statusColors = {
  New: 'bg-blue-100 text-blue-800',
  'In Review': 'bg-yellow-100 text-yellow-800',
  Interviewed: 'bg-green-100 text-green-800',
};

function ApplicantsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplicantId, setSelectedApplicantId] = useState<number | null>(null);

  if (selectedApplicantId !== null) {
    return (
      <ApplicantDetails
        applicantId={selectedApplicantId}
        onBack={() => setSelectedApplicantId(null)}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Applicants</h2>
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
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applied Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {applicants.map((applicant) => (
              <tr
                key={applicant.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedApplicantId(applicant.id)}
              >
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900">
                      {applicant.name}
                    </div>
                    <div className="text-gray-500">{applicant.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500">{applicant.position}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      statusColors[applicant.status as keyof typeof statusColors]
                    }`}
                  >
                    {applicant.status}
                  </span>
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