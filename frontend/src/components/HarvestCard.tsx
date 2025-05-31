
import { useState } from "react";
import { Calendar, MapPin, CheckCircle, QrCode } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import HarvestDetailsModal from "./HarvestDetailsModal";
import QRCodeModal from "./QRCodeModal";

interface HarvestCardProps {
  id: string;
  cropType: string;
  farmName: string;
  location: string;
  harvestDate: string;
  quantity: string;
  status: "pending" | "certified" | "rejected";
  certifier?: string;
}

const HarvestCard = ({
  id,
  cropType,
  farmName,
  location,
  harvestDate,
  quantity,
  status,
  certifier
}: HarvestCardProps) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  const harvestData = {
    id,
    cropType,
    farmName,
    location,
    harvestDate,
    quantity,
    status,
    certifier
  };

  const getStatusBadge = () => {
    switch (status) {
      case "certified":
        return <Badge className="bg-farmfi-green-500 text-white">Certified</Badge>;
      case "pending":
        return <Badge variant="outline" className="border-farmfi-earth-500 text-farmfi-earth-600">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
    }
  };

  return (
    <>
      <Card className="card-hover border-farmfi-green-100">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg text-farmfi-green-700">{cropType}</CardTitle>
              <p className="text-sm text-farmfi-green-600">NFT ID: {id}</p>
            </div>
            {getStatusBadge()}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-farmfi-green-500" />
              <span className="text-gray-600">{farmName}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-farmfi-green-500" />
              <span className="text-gray-600">{harvestDate}</span>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            <p><strong>Location:</strong> {location}</p>
            <p><strong>Quantity:</strong> {quantity}</p>
            {certifier && <p><strong>Certified by:</strong> {certifier}</p>}
          </div>

          <div className="flex space-x-2 pt-2">
            {status === "certified" && (
              <Button 
                size="sm" 
                className="bg-farmfi-green-600 hover:bg-farmfi-green-700"
                onClick={() => setShowQRModal(true)}
              >
                <QrCode className="h-4 w-4 mr-1" />
                Generate QR
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              className="border-farmfi-green-200 text-farmfi-green-700"
              onClick={() => setShowDetailsModal(true)}
            >
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>

      <HarvestDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        harvest={harvestData}
      />

      {status === "certified" && (
        <QRCodeModal
          isOpen={showQRModal}
          onClose={() => setShowQRModal(false)}
          nftId={id}
          cropType={cropType}
        />
      )}
    </>
  );
};

export default HarvestCard;
