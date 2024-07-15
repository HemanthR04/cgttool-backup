"use client";

import Link from "next/link";
import { LayoutGrid, LogOut, User } from "lucide-react";
import UserIcon from '@/public/assets/user.svg'
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

interface Application {
  _id: string;
  applicationName: string;
}

interface Userdata {
  firstname: string;
  lastname: string;
  email: string;


}

export function UserNav() {
  const [fetchedData, setFetchedData] = useState<Userdata>();


  useEffect(() => {
    fetch("http://localhost:3000/api/users/profile")
      .then((data) => data.json())
      .then((val) => setFetchedData(val.data))
  }, [])

  
  console.log(fetchedData)
  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={UserIcon} alt="Avatar" />
                  <AvatarFallback className="bg-transparent">{fetchedData?.firstname[0]}{fetchedData?.lastname[0]}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{fetchedData?.firstname} {fetchedData?.lastname}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {fetchedData?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/" className="flex items-center">
              <LayoutGrid className="w-4 h-4 mr-3 text-muted-foreground" />
              Dashboard
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
       
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
