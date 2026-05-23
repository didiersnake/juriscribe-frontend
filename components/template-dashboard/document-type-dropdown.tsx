"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from "react"
import { DocumentFileType } from "@/lib/types"
import { ArrowDown } from "lucide-react"

export function DropdownMenuBasic({
  documentTypeList,
}: {
  documentTypeList: Array<DocumentFileType>
}) {
  const [documentType, setDocumentType] = React.useState<string>(
    documentTypeList[0]?.name
  )

  const dropdownItems = documentTypeList.map((type: DocumentFileType) => (
    <DropdownMenuItem onSelect={() => handleSelect(type?.name)} key={type?.id}>
      {type?.name}
    </DropdownMenuItem>
  ))

  const handleSelect = (event: string) => {
    setDocumentType(event)
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline">
            {documentType}
            <ArrowDown size={14} />
          </Button>
        }
      />

      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Document Types</DropdownMenuLabel>
          {dropdownItems}
        </DropdownMenuGroup>
        {/* <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
