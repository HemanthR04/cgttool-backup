'use client'
import Link from "next/link";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import NumberTicker from "@/components/magicui/number-ticker";
import GradualSpacing from "@/components/magicui/gradual-spacing";

interface Userdata {
  firstname: string;
  lastname: string;
  email: string;
  role: string;

}
interface Application {
  _id: string;
  applicationName: string;
}

export default function Page() {
  const [fetchedData, setFetchedData] = useState<Userdata>();
  const [values, setValues] = useState<Application[]>([])


  useEffect(() => {
    fetch("http://localhost:3000/api/applications/fetchApplications")
      .then((data) => data.json())
      .then((val) => setValues(val.apps))
  }, [])




  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-center w-full">
       
      <GradualSpacing
      className="font-display text-center text-4xl font-bold tracking-[-0.1em]  text-black dark:text-white md:text-6xl md:leading-[5rem] my-8"
      text="Connectivity Grid Tool"
    />
      </div>
      <div className="flex w-full  justify-between">
      <div className="flex flex-col border-[1px] shadow-lg rounded-md p-4 w-[400px] items-center justify-center m-8">
        <p className="text-lg font-bold">Number of Applications:</p>
        <p className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white">

          <NumberTicker value={values.length} />
        </p>
      </div>
      <div className="flex flex-col border-[1px] shadow-lg rounded-md p-8 w-[400px] items-start justify-start m-8">
        <p className="text-lg font-bold py-4 my-2">Features</p>
        <ul className="flex flex-col gap-y-4">
          <li>Find Adminstrators</li>
          <li>Find Application Details</li>
          <li>Find URLs for Applications</li>
          <li>Find Clinet Interfacing Application Details</li>
        </ul>
      </div>
      </div>
      

    </ContentLayout>
  );
}
