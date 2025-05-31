
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import HarvestCard from "@/components/HarvestCard";
import MintHarvestForm from "@/components/MintHarvestForm";
import CertifierDashboard from "@/components/CertifierDashboard";
import QRCodeGenerator from "@/components/QRCodeGenerator";

const Index = () => {
  const [userRole] = useState<"farmer" | "certifier">("farmer");

  const sampleHarvests = [
    {
      id: "NFT-001",
      cropType: "Organic Tomatoes",
      farmName: "Green Valley Farm",
      location: "California, USA",
      harvestDate: "2024-05-28",
      quantity: "500 kg",
      status: "certified" as const,
      certifier: "AgriCert Solutions"
    },
    {
      id: "NFT-002",
      cropType: "Lettuce",
      farmName: "Sunny Acres",
      location: "Oregon, USA",
      harvestDate: "2024-05-27",
      quantity: "200 kg",
      status: "pending" as const
    },
    {
      id: "NFT-003",
      cropType: "Carrots",
      farmName: "Heritage Farms",
      location: "Iowa, USA",
      harvestDate: "2024-05-26",
      quantity: "1.2 tons",
      status: "certified" as const,
      certifier: "Organic Validators Inc"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-farmfi-green-50 to-farmfi-earth-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-farmfi-green-700 mb-2">
            Welcome to FarmFi
          </h1>
          <p className="text-farmfi-green-600">
            Blockchain-powered harvest traceability for transparent agriculture
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-farmfi-green-100">
            <TabsTrigger value="overview" className="data-[state=active]:bg-farmfi-green-500 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="mint" className="data-[state=active]:bg-farmfi-green-500 data-[state=active]:text-white">
              Mint NFT
            </TabsTrigger>
            <TabsTrigger value="certify" className="data-[state=active]:bg-farmfi-green-500 data-[state=active]:text-white">
              Certify
            </TabsTrigger>
            <TabsTrigger value="qr" className="data-[state=active]:bg-farmfi-green-500 data-[state=active]:text-white">
              QR Codes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleHarvests.map((harvest) => (
                <div key={harvest.id} className="animate-fade-in">
                  <HarvestCard {...harvest} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mint" className="space-y-6">
            <MintHarvestForm />
          </TabsContent>

          <TabsContent value="certify" className="space-y-6">
            <CertifierDashboard />
          </TabsContent>

          <TabsContent value="qr" className="space-y-6">
            <QRCodeGenerator />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
