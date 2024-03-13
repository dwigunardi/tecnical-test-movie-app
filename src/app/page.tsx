import MainLayout from "@/components/mainLayout";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Home from "./home/page";

export default function App({
  searchParams,
}: {
  searchParams: { query?: string; page?: string, pageSeries?: string };
}) {
  const query = searchParams?.query;
  const currentPage = Number(searchParams?.page) || 1;
  const currentPageSeries = Number(searchParams?.pageSeries) || 1;
  return (
    <MainLayout currentPage={currentPage} query={query}>
      <main>
        <div className="container mx-auto">
          <Home query={query} currentPage={currentPage} currentPageSeries={currentPageSeries} />
        </div>
      </main>
    </MainLayout>
  );
}
