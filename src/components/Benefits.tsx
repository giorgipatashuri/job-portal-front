import React from "react";

const Benefits = () => {
  return (
    <div className="bg-white p-16 px-4 py-12  mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-center">ბენეფიტები</h2>
      <div className="grid grid-cols-3 gap-8 container mx-auto">
        <div className="text-center">
          <img
            src="https://hr.myjobs.ge/icons/interface.svg"
            alt="Browser"
            className="w-24 h-24 mx-auto mb-4"
          />
          <h3 className="text-lg font-bold">მარტივი ინტერფეისი</h3>
          <p className="text-gray-500">
            გამარტივებული ნავიგაცია და ყველა საჭირო ხელსაწყო ერთ სივრცეში
          </p>
        </div>
        <div className="text-center">
          <img
            src="https://hr.myjobs.ge/icons/permission.svg"
            alt="Users"
            className="w-24 h-24 mx-auto mb-4"
          />
          <h3 className="text-lg font-bold">უფლებების განაწილება</h3>
          <p className="text-gray-500">
            ადმინ პანელის მართვა და სტატუსების განაწილება
          </p>
        </div>
        <div className="text-center">
          <img
            src="https://hr.myjobs.ge/icons/payment.svg"
            alt="Credit Card"
            className="w-24 h-24 mx-auto mb-4"
          />
          <h3 className="text-lg font-bold">მარტივი გადახდის სისტემა</h3>
          <p className="text-gray-500">
            მოსახერხებელი გადახდის მეთოდების დიდი არჩევანი
          </p>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
