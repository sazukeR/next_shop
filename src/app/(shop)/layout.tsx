import { TopMenu } from "../../components/ui/top-menu/TopMenu";
export default function ShopLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
  <div>
   <main className='min-h-screen'>
    <TopMenu />
    {children}
   </main>
  </div>
 );
}
