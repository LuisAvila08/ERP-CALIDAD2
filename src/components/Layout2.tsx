import { ReactNode } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'

interface BreadcrumbElement {
  label: string
  href?: string
}

interface PageProps {
  breadcrumbs: BreadcrumbElement[]
  children?: ReactNode
}

export default function Page ({ breadcrumbs, children }: PageProps): JSX.Element {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex items-center h-16 gap-2 shrink-0'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='h-4 mr-2' />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((item, index) => (
                  <BreadcrumbItem key={index} className='hidden md:block'>
                    {item.href
                      ? (
                        <BreadcrumbLink to={item.href}>{item.label}</BreadcrumbLink>
                        )
                      : (
                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                        )}
                    {index < breadcrumbs.length - 1 && (
                      <span className='ml-2'>/</span>
                    )}
                  </BreadcrumbItem>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className='flex flex-col flex-1 gap-4 p-4 pt-0'>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
