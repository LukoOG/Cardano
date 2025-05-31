
import { useState } from "react";
import { Calendar, MapPin, User, Truck, CheckCircle, X, Clock, FileText, Camera, Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface HarvestReviewDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  harvest: {
    id: string;
    cropType: string;
    farmName: string;
    location: string;
    harvestDate: string;
    quantity: string;
    farmer: string;
    submittedDate: string;
  };
}

const HarvestReviewDetails = ({ isOpen, onClose, harvest }: HarvestReviewDetailsProps) => {
  const { toast } = useToast();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  // Mock detailed data for the harvest with Nigerian context
  const harvestDetails = {
    ...harvest,
    farmSize: "25 hectares",
    plantingDate: "2024-01-15",
    seedVariety: "Trinitario Cocoa - Premium Grade",
    irrigationMethod: "Rainfall dependent with supplementary irrigation",
    fertilizers: ["Organic compost", "NPK 15-15-15", "Poultry manure"],
    pesticides: "Integrated Pest Management - Black pod disease treatment",
    harvestMethod: "Selective hand-picking at optimal maturity",
    storageConditions: "Fermentation boxes, sun-dried on raised platforms",
    transportationMethod: "Covered truck transport to collection center",
    qualityGrade: "Grade A Premium Export Quality",
    moistureContent: "7.5%",
    beanCount: "95-100 beans per 100g",
    fatContent: "54%",
    certifications: ["Rainforest Alliance", "Fairtrade Certified", "Nigerian Cocoa Board Approved"],
    laborCompliance: "Fair Labor Standards Certified",
    cooperativeMembership: "Ondo State Cocoa Farmers Cooperative",
    images: [
      "/placeholder.svg",
      "/placeholder.svg", 
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    documents: [
      { name: "Cocoa Board Certificate", type: "PDF", size: "2.1 MB" },
      { name: "Soil Analysis Report", type: "PDF", size: "1.8 MB" },
      { name: "Harvest Log Book", type: "Excel", size: "0.5 MB" },
      { name: "Cooperative Membership", type: "PDF", size: "1.2 MB" }
    ]
  };

  const handleCertify = () => {
    toast({
      title: "Harvest Certified",
      description: `Harvest record ${harvest.id} has been successfully certified and is now traceable.`,
    });
    onClose();
  };

  const handleReject = () => {
    toast({
      title: "Harvest Rejected",
      description: `Harvest record ${harvest.id} has been rejected. Farmer has been notified.`,
      variant: "destructive",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl text-farmfi-green-700">
                {harvestDetails.cropType} - {harvestDetails.id}
              </DialogTitle>
              <DialogDescription className="text-lg">
                Submitted by {harvestDetails.farmer} from {harvestDetails.farmName}
              </DialogDescription>
            </div>
            <Badge variant="outline" className="border-farmfi-earth-500 text-farmfi-earth-600">
              Pending Review
            </Badge>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Basic Information */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-farmfi-green-600" />
                <span>Harvest Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-farmfi-green-500" />
                    <div>
                      <p className="font-medium text-gray-700">Location</p>
                      <p className="text-gray-600">{harvestDetails.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-farmfi-green-500" />
                    <div>
                      <p className="font-medium text-gray-700">Harvest Date</p>
                      <p className="text-gray-600">{harvestDetails.harvestDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Scale className="h-4 w-4 text-farmfi-green-500" />
                    <div>
                      <p className="font-medium text-gray-700">Quantity</p>
                      <p className="text-gray-600">{harvestDetails.quantity}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-700">Farm Size</p>
                    <p className="text-gray-600">{harvestDetails.farmSize}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Planting Date</p>
                    <p className="text-gray-600">{harvestDetails.plantingDate}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Variety</p>
                    <p className="text-gray-600">{harvestDetails.seedVariety}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-farmfi-green-600" />
                <span>Timeline</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-farmfi-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-sm">Planted</p>
                    <p className="text-xs text-gray-600">{harvestDetails.plantingDate}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-farmfi-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-sm">Harvested</p>
                    <p className="text-xs text-gray-600">{harvestDetails.harvestDate}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-farmfi-earth-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-sm">Submitted</p>
                    <p className="text-xs text-gray-600">{harvestDetails.submittedDate}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Production Details */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Production Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-700 mb-2">Irrigation Method</p>
                  <p className="text-gray-600">{harvestDetails.irrigationMethod}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-2">Harvest Method</p>
                  <p className="text-gray-600">{harvestDetails.harvestMethod}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-2">Storage & Processing</p>
                  <p className="text-gray-600">{harvestDetails.storageConditions}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-2">Transportation</p>
                  <p className="text-gray-600">{harvestDetails.transportationMethod}</p>
                </div>
              </div>
              
              <div>
                <p className="font-medium text-gray-700 mb-2">Fertilizers Used</p>
                <div className="flex flex-wrap gap-2">
                  {harvestDetails.fertilizers.map((fertilizer, index) => (
                    <Badge key={index} variant="outline" className="border-farmfi-green-200 text-farmfi-green-700">
                      {fertilizer}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="font-medium text-gray-700 mb-2">Pest Management</p>
                <p className="text-gray-600">{harvestDetails.pesticides}</p>
              </div>

              <div>
                <p className="font-medium text-gray-700 mb-2">Cooperative Membership</p>
                <p className="text-gray-600">{harvestDetails.cooperativeMembership}</p>
              </div>
            </CardContent>
          </Card>

          {/* Quality Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Quality Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium text-gray-700">Quality Grade</p>
                <p className="text-gray-600">{harvestDetails.qualityGrade}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Moisture Content</p>
                <p className="text-gray-600">{harvestDetails.moistureContent}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Bean Count</p>
                <p className="text-gray-600">{harvestDetails.beanCount}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Fat Content</p>
                <p className="text-gray-600">{harvestDetails.fatContent}</p>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="h-5 w-5 text-farmfi-green-600" />
                <span>Harvest Images</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {harvestDetails.images.map((image, index) => (
                  <div 
                    key={index} 
                    className="aspect-square bg-gray-100 rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedImages([image])}
                  >
                    <img 
                      src={image} 
                      alt={`Harvest ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certifications & Documents */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Certifications & Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-medium text-gray-700 mb-3">Current Certifications</p>
                  <div className="space-y-2">
                    {harvestDetails.certifications.map((cert, index) => (
                      <Badge key={index} className="bg-farmfi-green-100 text-farmfi-green-700 mr-2 mb-2">
                        {cert}
                      </Badge>
                    ))}
                    <Badge className="bg-blue-100 text-blue-700">
                      {harvestDetails.laborCompliance}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <p className="font-medium text-gray-700 mb-3">Supporting Documents</p>
                  <div className="space-y-2">
                    {harvestDetails.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border border-gray-200 rounded">
                        <div>
                          <p className="text-sm font-medium">{doc.name}</p>
                          <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Close Review
          </Button>
          <Button 
            variant="destructive"
            onClick={handleReject}
            className="flex items-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>Reject</span>
          </Button>
          <Button 
            onClick={handleCertify}
            className="bg-farmfi-green-600 hover:bg-farmfi-green-700 text-white flex items-center space-x-2"
          >
            <CheckCircle className="h-4 w-4" />
            <span>Certify Harvest</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HarvestReviewDetails;
