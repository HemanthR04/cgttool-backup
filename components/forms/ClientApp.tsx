"use client"

import Link from "next/link"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Toaster, toast } from "react-hot-toast";
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import axios from "axios"


interface Application {
  _id: string;
  applicationName: string;
}

interface URLdata {
  _id: string;
  link: string;

}

const FormSchema = z.object({
  applicationName: z
    .string({
      required_error: "Please select an application.",
    }),
    url: z.string().min(2).max(50),
    clientAppName: z.string().min(2).max(50),
    clientAppURL: z.string().min(2).max(50),
})

export function ClientApp() {
  const [values, setValues] = useState<Application[]>([])
  const [url, setURL] = useState<URLdata[]>([])

  useEffect(() => {
    fetch("http://localhost:3000/api/applications/fetchApplications")
      .then((data) => data.json())
      .then((val) => setValues(val.apps))
  }, [])

  function handleAppChange(e: any) {  
      fetch(`http://localhost:3000/api/urls/fetchUrl/${e}`)
        .then((data) => data.json())
        .then((val) => setURL(val))
  }

 
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await axios.post(`/api/urls/addClientApps/${data.url} `, data);

      console.log("Client App Added successfully", response.data);
      toast.success(" Client App Added successfully");
      
    } catch (error) {
      toast.error("Failed to add client application")
    }
    
  }

  return (
    <div className="w-[800px] border-2 rounded-md p-12 mt-4">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="applicationName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Name</FormLabel>
              <Select  onValueChange={(value) => {
                field.onChange(value);
                handleAppChange(value);
              }} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an application" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                {values.map((opts, i) => (
                      <SelectItem key={i} value={opts._id}>{opts.applicationName}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormDescription>
                You can add new application in{" "}
                <Link href="/manage">Manage Applications</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an URL" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                {url.map((opts, i) => (
                      <SelectItem key={i} value={opts._id}>{opts.link}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormDescription>
                You can add new application in{" "}
                <Link href="/manage">Manage Applications</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clientAppName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Application Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                This is your client application name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clientAppURL"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Application URL</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                This is your client application URL.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add</Button>
      </form>
    </Form>
    </div>
  )
}
