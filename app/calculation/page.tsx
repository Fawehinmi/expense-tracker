"use client";
import ApButton from "@/components/Button";
import HeroSection from "@/components/Hero";
import { useAppState } from "@/context/context";
import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function Calculation() {
  const { formData } = useAppState();
  const router = useRouter();

  const [showRevenueTable, setShowRevenueTable] = useState<boolean>(false);
  const [showExpenseTable, setShowExpenseTable] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (formData.length < 5) router.push("/");
  }, [[formData]]);
  console.log(formData);

  const expenses: any = [];
  const revenues: any = [];

  Object.entries(formData).forEach(([key, value]) => {
    if (key.includes("expense")) {
      expenses.push(value);
    } else if (key.includes("revenue")) {
      revenues.push(value);
    }
  });

  const revenueColumnTitles = [
    "revenues",
    "revenueChange",
    "revenueGrowth",
    "percentageRevenue",
    "percentageRevenueChange",
    "percentageRevenueGrowth",
  ];
  const expenseColumnTitles = [
    "expenses",
    "expenseChange",
    "expenseGrowth",
    "percentageExpense",
    "percentageExpenseChange",
    "percentageExpenseGrowth",
  ];

  let revenueCalculations: any = {
    revenues: [],
    revenueChange: [],
    revenueGrowth: [],
    percentageRevenue: [],
    percentageRevenueChange: [],
    percentageRevenueGrowth: [],
  };
  let expenseCalculations: any = {
    expenses: [],
    expenseChange: [],
    expenseGrowth: [],
    percentageExpense: [],
    percentageExpenseChange: [],
    percentageExpenseGrowth: [],
  };

  const handleRevenueCalc = (): any => {
    revenueCalculations.revenues = revenues;
    for (let i = 0; i < revenues.length; i++) {
      const currentRevenue = parseFloat(revenues[i]);
      const previousRevenue = i > 0 ? parseFloat(revenues[i - 1]) : 0;
      i == 0
        ? revenueCalculations.revenueChange.push(null)
        : revenueCalculations.revenueChange.push(
            currentRevenue - previousRevenue
          );

      i == 0
        ? revenueCalculations.revenueGrowth.push(null)
        : revenueCalculations.revenueGrowth.push(
            (
              (revenueCalculations.revenueChange[i] / revenues[i - 1]) * 100 ||
              0
            ).toFixed(2)
          );

      revenueCalculations.percentageRevenue.push(
        (revenues[i] / revenues[i]) * 100
      );

      const currentPercentRevenue = parseFloat(
        revenueCalculations.percentageRevenue[i]
      );

      const previousPercentRevenue =
        i > 0 ? parseFloat(revenueCalculations.percentageRevenue[i - 1]) : 0;

      i == 0
        ? revenueCalculations.percentageRevenueChange.push(null)
        : revenueCalculations.percentageRevenueChange.push(
            currentPercentRevenue - previousPercentRevenue
          );

      i == 0
        ? revenueCalculations.percentageRevenueGrowth.push(null)
        : revenueCalculations.percentageRevenueGrowth.push(
            (
              (revenueCalculations.percentageRevenueChange[i] /
                revenueCalculations.percentageRevenue[i - 1]) *
                100 || 0
            ).toFixed(2)
          );
    }

    return null;
  };

  const handleExpenseCalc = (): any => {
    expenseCalculations.expenses = expenses;
    for (let i = 0; i < expenses.length; i++) {
      const currentExpense = parseFloat(expenses[i]);
      const previousExpense = i > 0 ? parseFloat(expenses[i - 1]) : 0;
      i == 0
        ? expenseCalculations.expenseChange.push(null)
        : expenseCalculations.expenseChange.push(
            currentExpense - previousExpense
          );

      i == 0
        ? expenseCalculations.expenseGrowth.push(null)
        : expenseCalculations.expenseGrowth.push(
            (
              (expenseCalculations.expenseChange[i] / expenses[i - 1]) * 100 ||
              0
            ).toFixed(2)
          );

      expenseCalculations.percentageExpense.push(
        ((expenses[i] / revenues[i]) * 100).toFixed(2)
      );

      const currentPercentExpense = parseFloat(
        expenseCalculations.percentageExpense[i]
      );

      const previousPercentExpense =
        i > 0 ? parseFloat(expenseCalculations.percentageExpense[i - 1]) : 0;

      i == 0
        ? expenseCalculations.percentageExpenseChange.push(null)
        : expenseCalculations.percentageExpenseChange.push(
            (currentPercentExpense - previousPercentExpense).toFixed(2)
          );

      i == 0
        ? expenseCalculations.percentageExpenseGrowth.push(null)
        : expenseCalculations.percentageExpenseGrowth.push(
            (
              (expenseCalculations.percentageExpenseChange[i] /
                expenseCalculations.percentageExpense[i - 1]) *
                100 || 0
            ).toFixed(2)
          );
    }

    return null;
  };

  const handleShowTable = (type: "expense" | "revenue") => {
    type == "expense"
      ? setShowExpenseTable(!showExpenseTable)
      : setShowRevenueTable(!showRevenueTable);
  };

  handleRevenueCalc();
  handleExpenseCalc();

  return (
    <div>
      <HeroSection page="calulation" />

      <div className="px-10 py-14 flex flex-col items-center justify-center">
        <div className={`flex justify-center w-full pt-10`}>
          <div className="flex bg-gray-200 ps-4 gap-24 items-center">
            <p className="font-bold text-lg">Revenues</p>
            {/* <ApButton
          title={`${
            showTable.show && showTable.type === "revenue" ? "Close" : "Open"
          } Revenue Table`}
          onClick={() => {
            console.log("clicked");
            handleShowTable("revenue", showTable.show);
          }}
        /> */}
            <Button
              onClick={() => {
                handleShowTable("revenue");
              }}
              colorScheme="teal"
            >
              {showRevenueTable ? <FaChevronUp /> : <FaChevronDown />}
            </Button>
          </div>
        </div>
        <Table className="">
          {/* <TableCaption placement="top" className="text-7xl font-semibold">
            Revenues
          </TableCaption> */}

          <Thead>
            <Tr>
              <Th></Th>
              <Th>Year 1</Th>
              <Th>Year 2</Th>
              <Th>Year 3</Th>
              <Th>Year 4</Th>
              <Th>Year 5</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!showRevenueTable ? (
              <Tr>
                <Td>Revenues</Td>
                {revenues.map((r: any) => (
                  <Td>{r}</Td>
                ))}
              </Tr>
            ) : (
              <>
                {revenueColumnTitles.map((t: any, n: number) => (
                  <Tr key={t}>
                    <Td>
                      {revenueColumnTitles[n]
                        .replace(/([a-z])([A-Z])/g, "$1 $2")
                        .replace(/\b\w/g, (firstChar) =>
                          firstChar.toUpperCase()
                        )}
                    </Td>

                    {/* {showRevenueTable && ( */}
                    <>
                      {revenues.map((r: any, i: number) => (
                        <>
                          {t.includes("percentage") ||
                          (t.includes("Growth") &&
                            revenueCalculations[t][i] != null) ? (
                            <Td key={i}>{revenueCalculations[t][i]} %</Td>
                          ) : (
                            <Td key={i}>{revenueCalculations[t][i]}</Td>
                          )}
                        </>
                      ))}
                    </>
                    {/* )} */}
                  </Tr>
                ))}
              </>
            )}
          </Tbody>
        </Table>
        <div className={` ${showRevenueTable ? "pb-0" : "pb-80"}`}></div>
        <div className="flex justify-center w-full pt-10  ">
          <div className="flex bg-gray-200 ps-4 gap-24 items-center">
            <p className="font-bold text-lg">Expenses</p>
            <Button
              onClick={() => {
                handleShowTable("expense");
              }}
              colorScheme="teal"
            >
              {showExpenseTable ? <FaChevronUp /> : <FaChevronDown />}
            </Button>
          </div>
        </div>

        <Table>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Year 1</Th>
              <Th>Year 2</Th>
              <Th>Year 3</Th>
              <Th>Year 4</Th>
              <Th>Year 5</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!showExpenseTable ? (
              <Tr>
                <Td>Expenses</Td>
                {expenses.map((e: any) => (
                  <Td>{e}</Td>
                ))}
              </Tr>
            ) : (
              <>
                {expenseColumnTitles.map((t: any, n: number) => (
                  <Tr key={t}>
                    <Td>
                      {expenseColumnTitles[n]
                        .replace(/([a-z])([A-Z])/g, "$1 $2")
                        .replace(/\b\w/g, (firstChar) =>
                          firstChar.toUpperCase()
                        )}
                    </Td>

                    {showExpenseTable && (
                      <>
                        {expenses.map((r: any, i: number) => (
                          <>
                            {t.includes("percentage") ||
                            (t.includes("Growth") &&
                              expenseCalculations[t][i] != null) ? (
                              <Td key={i}>{expenseCalculations[t][i]} %</Td>
                            ) : (
                              <Td key={i}>{expenseCalculations[t][i]}</Td>
                            )}
                          </>
                        ))}
                      </>
                    )}
                  </Tr>
                ))}
              </>
            )}
          </Tbody>
        </Table>
      </div>
    </div>
  );
}
