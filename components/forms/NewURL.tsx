"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Router } from "next/router"
import { useRouter } from "next/navigation"
import { Toaster, toast } from "react-hot-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "axios"

interface Userdata {
  _id: string;
  role: string;
}

interface Application {
  _id: string;
  applicationName: string;
}
interface URLdata{
  clientApps: [object];
}
const formSchema = z.object({
  application: z.string().min(2).max(50),
  type: z.string().min(2).max(10),
  link: z.string().min(2).max(50),
  environment: z.string().min(2).max(50)

})


const NewURL = () => {
  const [values, setValues] = useState<Application[]>([])
  // const [fetchedData, setFetchedData] = useState<Application[]>([])
  const [fetchedUserData, setFetchedUserData] = useState<Userdata>();

  useEffect(() => {
    fetch("http://localhost:3000/api/users/profile")
      .then((data) => data.json())
      .then((val) => {
        setFetchedUserData(val.data);
        console.log("fetchedUserData?.role ========"+val.data?.role);
        if (val.data?.role === 'secondaryadmin') {
          console.log(" Inside fetchedUserData?.role ========"+val.data?.role);
          fetch("http://localhost:3000/api/applications/fetchAdminApps?userId=" + val.data?._id)
            .then((data) => data.json())
            .then((val) => setValues(val.apps));
        } else {
          console.log("Else fetchedUserData?.role ========"+val.data?.role);
          fetch("http://localhost:3000/api/applications/fetchApplications")
            .then((data) => data.json())
            .then((val) => setValues(val.apps));
        }
      });
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      application: "",
      environment: "",
      type: "",
      link: "",
    },
  })
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      console.log(data);
      
      const response = await axios.post("/api/urls/createUrl", data);
      console.log("URL created successfully", response.data);
      toast.success(" success");
      

    } catch (error: any) {
      console.log(" failed", error.message);

      toast.error(error.message);
    } finally {
     
    }
    
  }
  return (

    <div className="w-[800px] border-2 p-4 rounded-md  mt-8">
      <div><Toaster/></div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="application"
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
          <FormField
            control={form.control}
            name="environment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Environment</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an Environment" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ETE1">ETE1</SelectItem>
                    <SelectItem value="ETE2">ETE2</SelectItem>
                    <SelectItem value="R1">R1</SelectItem>

                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL Type</FormLabel>
                <FormControl>
                  <Input placeholder="HTTP" {...field} />
                </FormControl>
                <FormDescription>
                  This is the URL Type.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /><FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL Link</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormDescription>
                  This is the URL.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add URL</Button>
        </form>
      </Form>
    </div>
  )
}

export default NewURL