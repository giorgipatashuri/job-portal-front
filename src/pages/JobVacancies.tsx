import { Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { Checkbox } from "@radix-ui/react-checkbox";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import Header from "../components/Header";

interface Employment {
  fullTime: boolean;
  partTime: boolean;
  flexible: boolean;
  temporary: boolean;
  internship: boolean;
}

interface Experience {
  noExperience: boolean;
  upToYear: boolean;
  fromYear: boolean;
  fromTwoYears: boolean;
  fromThreeYears: boolean;
  fromFiveYears: boolean;
}

interface Filters {
  searchTerm: string;
  sortBy: string;
  salaryFrom: string;
  workFromHome: boolean;
  employment: Employment;
  experience: Experience;
}

interface Job {
  title: string;
  company: string;
  salary: string;
  experience: string;
  type: string;
  verified: boolean;
  date: string;
}

type FilterCategory = "employment" | "experience";

const JobVacancies = () => {
  const [filters, setFilters] = useState<Filters>({
    searchTerm: "",
    sortBy: "date",
    salaryFrom: "",
    workFromHome: false,
    employment: {
      fullTime: false,
      partTime: false,
      flexible: false,
      temporary: false,
      internship: false,
    },
    experience: {
      noExperience: false,
      upToYear: false,
      fromYear: false,
      fromTwoYears: false,
      fromThreeYears: false,
      fromFiveYears: false,
    },
  });

  const jobs: Job[] = [
    {
      title: "ანალიტიკოსი",
      company: "ა-პროჯექტი",
      salary: "50 000 - 70 000 ₾",
      experience: "2 წლიდან",
      type: "დისტანციური სამუშაო",
      verified: true,
      date: "2024-03-30",
    },
    {
      title: "ვებ-დეველოპერი",
      company: "ტექნო",
      salary: "60 000 - 80 000 ₾",
      experience: "3 წლიდან",
      type: "ოფისში მუშაობა",
      verified: false,
      date: "2024-04-15",
    },
    {
      title: "პროექტ მენეჯერი",
      company: "პრაიმ ქონსალტინგი",
      salary: "70 000 - 90 000 ₾",
      experience: "5 წლიდან",
      type: "შერეული (ოფისი/დისტანციური)",
      verified: true,
      date: "2024-05-01",
    },
    {
      title: "გრაფიკული დიზაინერი",
      company: "კრეატივ ლაბი",
      salary: "40 000 - 55 000 ₾",
      experience: "1 წლიდან",
      type: "დისტანციური სამუშაო",
      verified: false,
      date: "2024-06-20",
    },
    {
      title: "სისტემის ადმინისტრატორი",
      company: "ინოვაციური ტექნოლოგიები",
      salary: "80 000 - 100 000 ₾",
      experience: "4 წლიდან",
      type: "ოფისში მუშაობა",
      verified: true,
      date: "2024-07-10",
    },
  ];

  const handleCheckboxChange = (
    category: FilterCategory,
    field: keyof Employment | keyof Experience
  ) => {
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: !prev[category][field as keyof (typeof prev)[typeof category]],
      },
    }));
  };

  const employmentOptions: { id: keyof Employment; label: string }[] = [
    { id: "fullTime", label: "სრული" },
    { id: "partTime", label: "ნახევარი განაკვეთი" },
    { id: "flexible", label: "მცოცავი გრაფიკი" },
    // { id: "temporary", label: "Подработка" },
    { id: "internship", label: "სტაჟირება" },
  ];

  const experienceOptions: { id: keyof Experience; label: string }[] = [
    { id: "noExperience", label: "გამოცდილების გარეშე" },
    { id: "upToYear", label: "გამოცდილება 1 წლამდე" },
    { id: "fromYear", label: "გამოცდილება 1 წელზე მეტი" },
  ];

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto p-4 container">
        <h1 className=" font-semibold mb-6">ნაპოვნია {jobs.length} ვაკანსია</h1>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-72 space-y-6">
            <div>
              <h2 className="text-xl mb-4">ვაკანსიების დალაგება</h2>
              <Select
                value={filters.sortBy}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, sortBy: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="По дате (сначала новые)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">თარიღით (ჯერ ახალი)</SelectItem>
                  <SelectItem value="salary">ანაზღაურება</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* <div>
              <h2 className="text-xl mb-4">ანაზღაურება</h2>
              <Input
                type="number"
                placeholder=""
                value={filters.salaryFrom}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    salaryFrom: e.target.value,
                  }))
                }
                className="mb-4"
              />
            </div> */}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="workFromHome"
                checked={filters.workFromHome}
                onCheckedChange={(checked) =>
                  setFilters((prev: any) => ({
                    ...prev,
                    workFromHome: checked,
                  }))
                }
              />
              <label
                htmlFor="workFromHome"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                სახლიდან სამუშასო
              </label>
            </div>

            <div>
              <h2 className="text-xl mb-4">დასაქმება</h2>
              <div className="space-y-2">
                {employmentOptions.map(({ id, label }) => (
                  <div key={id} className="flex items-center space-x-2">
                    <Checkbox
                      id={id}
                      checked={filters.employment[id]}
                      onCheckedChange={() =>
                        handleCheckboxChange("employment", id)
                      }
                    />
                    <label
                      htmlFor={id}
                      className="text-sm font-medium leading-none"
                    >
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl mb-4">მუშაობის გამოცდილება</h2>
              <div className="space-y-2">
                {experienceOptions.map(({ id, label }) => (
                  <div key={id} className="flex items-center space-x-2">
                    <Checkbox
                      id={id}
                      checked={filters.experience[id]}
                      onCheckedChange={() =>
                        handleCheckboxChange("experience", id)
                      }
                    />
                    <label
                      htmlFor={id}
                      className="text-sm font-medium leading-none"
                    >
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Jobs List */}
          <div className="flex-1 space-y-4">
            {jobs.map((job, index) => (
              <Card key={index} className="relative">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-blue-600">
                    {job.title}
                  </CardTitle>
                  {/* <div className="text-2xl font-bold">{job.salary}</div> */}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{job.company}</span>
                    {job.verified && (
                      <svg
                        className="w-4 h-4 text-green-500"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    )}
                  </div>
                  <div className="text-gray-600">
                    {job.type} · {job.experience}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button className="flex-1 bg-green text-white">
                      დეტალურად
                    </Button>
                    <Button variant="outline" className="flex-1">
                      გაგზავნა
                    </Button>
                  </div>
                </CardContent>
                <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                  <Heart className="w-6 h-6" />
                </button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobVacancies;
