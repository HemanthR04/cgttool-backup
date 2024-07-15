'use client'
import PageTitle from '@/components/PageTitle'
import ManageAdmin from '@/components/forms/ManageAdmin'
import React from 'react'
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import Link from 'next/link';
import { useEffect, useState } from "react";

interface Userdata {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}

const Page = () => {
  const [fetchedData, setFetchedData] = useState<Userdata>();
  useEffect(() => {
    fetch("http://localhost:3000/api/users/profile")
      .then((data) => data.json())
      .then((val) => setFetchedData(val.data))
  }, [])
  if (fetchedData?.role !== 'primaryadmin') {
    return <>
      <div className='w-full flex h-[300px] justify-start '>
        <h1 className='text-xl p-8 m-8 font-bold '>Hey! You need to be a Primary Adminstrator to create a new Application.</h1>
      </div>

    </>;
  }
  return (
    <div>
      <ContentLayout title="Add Adminstrator">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/manage">Manage</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Add New Adminstrators</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>

        </Breadcrumb>
        <ManageAdmin/>
        </ContentLayout>
    </div>
  )
}

export default Page