import React from "react";
import {
  Megaphone,
  PenTool,
  Users,
  Code,
  Palette,
  LineChart,
  CircleDollarSign,
  Layers,
  ArrowBigRight,
} from "lucide-react";

const JobCategories = () => {
  const categories = [
    {
      title: "მარკეტინგი",
      icon: Megaphone,
    },
    {
      title: "სამდივნო/საოფისე საქმე",
      jobs: 25,
      icon: PenTool,
    },
    {
      title: "მენეჯმენტი",
      icon: Users,
    },
    {
      title: "დეველოპერი",
      icon: Code,
    },
    {
      title: "გრაფიკული დიზაინი",
      icon: Palette,
    },
    {
      title: "ანალიტიკოსი",
      icon: LineChart,
    },
    {
      title: "გაყიდვები",
      icon: CircleDollarSign,
    },
    {
      title: "ყველას ნახვა",
      icon: ArrowBigRight,
    },
  ];

  return (
    <div className=" bg-white mx-auto px-4 py-12">
      <div className=" max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            მოიძიე ვაკანსიები კატეგორიების მიხედვით
          </h2>
          <p className="text-gray-500"></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {category.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JobCategories;
