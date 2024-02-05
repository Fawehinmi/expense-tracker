"use client";
import ApButton from "@/components/Button";
import HeroSection from "@/components/Hero";
import { ApTextInput } from "@/components/TextInput";
import { useAppState } from "@/context/context";

import { Form, Formik, FormikProps } from "formik";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { setTimeout } from "timers/promises";
import * as Yup from "yup";

const FormSchema = Yup.object().shape({
  expense1: Yup.number().required("This is Required"),
  expense2: Yup.number().required("This is Required"),
  expense3: Yup.number().required("This is Required"),
  expense4: Yup.number().required("This is Required"),
  expense5: Yup.number().required("This is Required"),
  revenue1: Yup.number().required("This is Required"),
  revenue2: Yup.number().required("This is Required"),
  revenue3: Yup.number().required("This is Required"),
  revenue4: Yup.number().required("This is Required"),
  revenue5: Yup.number().required("This is Required"),
});

const fieldNames = [
  "revenue1",
  "revenue2",
  "revenue3",
  "revenue4",
  "revenue5",
  "expense1",
  "expense2",
  "expense3",
  "expense4",
  "expense5",
];
let fieldNamesObject: any = {};
fieldNames.forEach((fieldName: any) => {
  fieldNamesObject[fieldName] = "";
});

export default function Home() {
  const { formData, setFormData } = useAppState();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (values: any) => {
    setLoading(true);
    setFormData(values);
    router.push("calculation");
  };

  return (
    <main className="bg-gray-50  h-screen w-screen overflow-x-hidden">
      <HeroSection page="home" />

      <Formik
        initialValues={fieldNamesObject}
        validationSchema={FormSchema}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<any>) => (
          <Form>
            <div className="flex gap-24 w-screen justify-center">
              {["Revenue", "Expense"].map((category, index) => (
                <div key={index} className="flex flex-col gap-y-6">
                  <p className="Text-center font-bold text-3xl pb-2 pt-8">
                    {category}s
                  </p>
                  {fieldNames
                    .filter((name) =>
                      name.toLowerCase().includes(category.toLowerCase())
                    )
                    .map((fieldName, i) => (
                      <ApTextInput
                        key={fieldName}
                        name={fieldName}
                        placeHolder={`e.g $100`}
                        label={`Year ${i + 1}`}
                        type="number"
                      />
                    ))}
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8 mb-5">
              <ApButton
                title={"Calculate"}
                type="submit"
                colorScheme="teal"
                isLoading={loading}
                // className="bg-rose-500 border rounded-md p-2 text-white text-sm                                                                                                                                                                                                                                                                                                                                                                                                                                                     "
              />
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
}
