import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { AuthProvider } from "../utils/auth";

export const metadata: Metadata = {
  title: "Flight Navigation Dashborad",
  description: "Flight Navigation Dashborad for Optimal path calculation",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <AuthProvider>
          <ECommerce />
        </AuthProvider>
      </DefaultLayout>
    </>
  );
}
