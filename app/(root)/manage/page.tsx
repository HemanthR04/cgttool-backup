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
import ManageApp from "@/components/ManageApp";
import { useEffect, useState } from "react";


interface Userdata {
  firstname: string;
  lastname: string;
  email: string;


}

export default function AccountPage() {

  const [fetchedData, setFetchedData] = useState<Userdata>();


  useEffect(() => {
    fetch("http://localhost:3000/api/users/profile")
      .then((data) => data.json())
      .then((val) => console.log(val.data))
  }, [])

  
  return (
    <ContentLayout title="Manage">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Manage</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ManageApp/>
      <div>

      
      {
        fetchedData?.lastname
      }
      </div>
    </ContentLayout>
  );
}
