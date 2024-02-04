import React from "react";
import { Button } from "@chakra-ui/react";
import Image from "next/image";

interface IProps {
  page: "calulation" | "home";
}
const HeroSection: React.FC<IProps> = ({ page }) => {
  return (
    <div className="bg-teal-500 text-white flex flex-col md:flex-row justify-center items-center px-16 py-16">
      <div className="text-center w-full md:w-1/2">
        <h1 className="text-3xl font-semibold mb-3">Expense Tracker</h1>
        <p>
          Keep track of your revenues and expenses and manage your budget with
          ease.
        </p>
        {/* <Button bg={"white"} className="mt-4">
          {page === "calulation" ? "Check Table" : "Get Started Now"}
        </Button> */}
      </div>
      {/* <Spacer /> */}
      {/* <div className="w-full md:w-1/2 px-4 md:px-8">
        <Image
          src="/pexels-karolina-grabowska-5900181.jpg"
          alt="Expense Icon"
          height={500}
          width={500}
          quality={90}
          className="w-full h-auto md:h-80 object-cover"
        />
      </div> */}
    </div>
  );
};

export default HeroSection;
