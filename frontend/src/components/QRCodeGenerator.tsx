
import { useState } from "react";
import { QrCode, Download, Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import QRCodeLib from "qrcode";

const QRCodeGenerator = () => {
  const { toast } = useToast();
  const [nftId, setNftId] = useState("");
  const [qrGenerated, setQrGenerated] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");

  const generateQR = async () => {
    if (!nftId) {
      toast({
        title: "Error",
        description: "Please enter a valid NFT ID",
        variant: "destructive",
      });
      return;
    }

    try {
      // Generate QR code URL
      const traceUrl = `https://farmfi.trace/${nftId}`;
      setQrCodeUrl(traceUrl);
      
      // Generate actual QR code image
      const qrDataUrl = await QRCodeLib.toDataURL(traceUrl, {
        width: 192,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      
      setQrCodeDataUrl(qrDataUrl);
      setQrGenerated(true);

      toast({
        title: "QR Code Generated",
        description: "QR code for harvest traceability has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrCodeUrl);
    toast({
      title: "Copied!",
      description: "Traceability URL copied to clipboard.",
    });
  };

  const downloadQR = () => {
    if (qrCodeDataUrl) {
      const link = document.createElement('a');
      link.download = `farmfi-qr-${nftId}.png`;
      link.href = qrCodeDataUrl;
      link.click();
      
      toast({
        title: "Download Started",
        description: "QR code image download has started.",
      });
    }
  };

  return (
    <Card className="border-farmfi-green-100">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-farmfi-green-700">
          <QrCode className="h-5 w-5" />
          <span>Generate QR Code</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="nftId">Certified NFT ID</Label>
          <Input
            id="nftId"
            value={nftId}
            onChange={(e) => setNftId(e.target.value)}
            placeholder="Enter NFT ID (e.g., NFT-001)"
          />
        </div>

        <Button 
          onClick={generateQR} 
          className="w-full gradient-bg text-white hover:opacity-90"
        >
          Generate QR Code
        </Button>

        {qrGenerated && (
          <div className="space-y-4 p-4 bg-farmfi-green-50 rounded-lg border border-farmfi-green-100">
            <div className="text-center">
              <div className="inline-block p-4 bg-white border-2 border-farmfi-green-200 rounded-lg">
                <img 
                  src={qrCodeDataUrl} 
                  alt={`QR Code for ${nftId}`}
                  className="w-48 h-48"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Traceability URL</Label>
              <div className="flex space-x-2">
                <Input value={qrCodeUrl} readOnly className="text-sm" />
                <Button size="icon" variant="outline" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button 
                onClick={downloadQR} 
                className="flex-1 bg-farmfi-green-600 hover:bg-farmfi-green-700 text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Download QR Code
              </Button>
            </div>

            <div className="text-xs text-gray-600 bg-white p-3 rounded border">
              <p><strong>How to use:</strong></p>
              <p>• Print this QR code on product packaging</p>
              <p>• Customers can scan to view harvest details</p>
              <p>• Links directly to blockchain verification</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QRCodeGenerator;
