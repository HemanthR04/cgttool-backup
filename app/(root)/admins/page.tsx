"use client"
import FetchURLs from '@/components/FetchURLs'
import PageTitle from '@/components/PageTitle'
import React, { useEffect, useState } from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import toast, { Toaster } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
interface Application {
  _id: string;
  applicationName: string;
}

interface Userdata {
  firstname: string;
  lastname: string;
  email: string;
  role :string;


}
const FormSchema = z.object({
  id: z
    .string({
      required_error: "Please select an Application.",
    }),

})
const Page = () => {
  const [values, setValues] = useState<Application[]>([])
  const [fetchedData, setFetchedData] = useState<Userdata[]>([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/applications/fetchApplications")
      .then((data) => data.json())
      .then((val) => setValues(val.apps))
  }, [])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {

      const responseData: any = await (await fetch(`http://localhost:3000/api/applications/fetchApplications/${data.id}`)).json()
      setFetchedData(responseData.applicationDetails.admins);
    } catch (err: any) {
      console.log(err.message)
    }
  }



  return (
    <>
      <div><Toaster /></div>
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
              <BreadcrumbPage>Adminstators</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className='border-2 px-8 py-8 mt-12 rounded-md'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an Application" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {values.map((opts, i) => (
                          <SelectItem key={i} value={opts._id}>{opts.applicationName}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>

                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
          <div>
            <Table>
              <TableCaption>A list of Application Adminstrators.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Firstname</TableHead>
                  <TableHead>Lastname</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>

                </TableRow>
              </TableHeader>
              <TableBody>
                {fetchedData && fetchedData.map((user, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{user.firstname}</TableCell>
                    <TableCell>{user.lastname}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>

                  </TableRow>
                ))}
              </TableBody>

            </Table>

          </div>
        </div>
      </ContentLayout>

    </>
  )
}

export default Page