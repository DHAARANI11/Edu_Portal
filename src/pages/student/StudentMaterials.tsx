
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Download, FileText, Video, BookOpen, Search, Filter, SortDesc } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const StudentMaterials = () => {
  const [materials, setMaterials] = useState([
    {
      id: 1,
      title: 'Introduction to Programming Concepts',
      course: 'CS101 - Introduction to Computer Science',
      type: 'pdf',
      size: '2.4 MB',
      uploadedOn: '2025-04-10'
    },
    {
      id: 2,
      title: 'Derivatives and Applications',
      course: 'MATH201 - Calculus I',
      type: 'pdf',
      size: '1.8 MB',
      uploadedOn: '2025-04-15'
    },
    {
      id: 3,
      title: 'Newton\'s Laws of Motion - Video Lecture',
      course: 'PHY105 - Physics for Engineers',
      type: 'video',
      size: '128 MB',
      uploadedOn: '2025-04-20'
    },
    {
      id: 4,
      title: 'Essay Writing Guidelines',
      course: 'ENG101 - English Composition',
      type: 'doc',
      size: '620 KB',
      uploadedOn: '2025-04-18'
    },
    {
      id: 5,
      title: 'Supplementary Reading Material',
      course: 'ENG101 - English Composition',
      type: 'pdf',
      size: '5.2 MB',
      uploadedOn: '2025-04-22'
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [showMaterialDetails, setShowMaterialDetails] = useState(false);

  const getFileIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video className="h-10 w-10 text-blue-500" />;
      case 'doc':
        return <FileText className="h-10 w-10 text-green-500" />;
      default:
        return <BookOpen className="h-10 w-10 text-primary" />;
    }
  };
  
  // Filter materials based on search query and file type
  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         material.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = fileTypeFilter === 'all' || material.type === fileTypeFilter;
    return matchesSearch && matchesType;
  });
  
  // Sort materials - fixed date comparisons
  const sortedMaterials = [...filteredMaterials].sort((a, b) => {
    const dateA = new Date(a.uploadedOn);
    const dateB = new Date(b.uploadedOn);
    
    if (sortOrder === 'newest') {
      return dateB.getTime() - dateA.getTime(); // Using getTime() to convert Date to number
    } else if (sortOrder === 'oldest') {
      return dateA.getTime() - dateB.getTime(); // Using getTime() to convert Date to number
    } else if (sortOrder === 'name') {
      return a.title.localeCompare(b.title);
    } else {
      return 0;
    }
  });
  
  const handleDownload = (material) => {
    toast({
      title: "Downloading file",
      description: `${material.title} is being downloaded.`,
    });
  };
  
  const handleViewDetails = (material) => {
    setSelectedMaterial(material);
    setShowMaterialDetails(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Learning Materials</h1>
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={fileTypeFilter} onValueChange={setFileTypeFilter}>
                <DropdownMenuRadioItem value="all">All Files</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="pdf">PDF Documents</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="doc">Word Documents</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="video">Video Files</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <SortDesc className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={sortOrder} onValueChange={setSortOrder}>
                <DropdownMenuRadioItem value="newest">Newest first</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="oldest">Oldest first</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="name">Name (A-Z)</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search by title or course..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="space-y-4">
        {sortedMaterials.map((material) => (
          <Card key={material.id} className="overflow-hidden hover:border-primary/40 transition-all cursor-pointer" onClick={() => handleViewDetails(material)}>
            <div className="flex items-center">
              <div className="p-4 flex-shrink-0 flex items-center justify-center">
                {getFileIcon(material.type)}
              </div>
              <CardContent className="py-4 flex-grow">
                <CardTitle className="text-lg">{material.title}</CardTitle>
                <div className="text-sm text-muted-foreground mt-1">{material.course}</div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs text-muted-foreground">
                    <span className="uppercase">{material.type}</span> • {material.size} • Uploaded on {new Date(material.uploadedOn).toLocaleDateString()}
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(material);
                    }}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
        
        {sortedMaterials.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No materials found</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
      
      <Dialog open={showMaterialDetails} onOpenChange={setShowMaterialDetails}>
        {selectedMaterial && (
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center gap-2">
                {getFileIcon(selectedMaterial.type)}
                <span>{selectedMaterial.title}</span>
              </DialogTitle>
              <DialogDescription>
                {selectedMaterial.course}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div>
                  <Label className="text-muted-foreground">File Type</Label>
                  <p className="font-medium uppercase">{selectedMaterial.type}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">File Size</Label>
                  <p className="font-medium">{selectedMaterial.size}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Upload Date</Label>
                  <p className="font-medium">{new Date(selectedMaterial.uploadedOn).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-muted-foreground">Description</Label>
                <p className="text-sm mt-1">
                  This educational material is provided as part of the course curriculum to help students 
                  understand key concepts and prepare for assessments. Please review the content and reach 
                  out to your instructor if you have any questions.
                </p>
              </div>
              
              {selectedMaterial.type === 'video' && (
                <div className="bg-muted p-4 rounded-md flex items-center justify-center h-[200px] relative">
                  <Video className="h-12 w-12 text-muted-foreground/70" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button>Play Video</Button>
                  </div>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowMaterialDetails(false)}>Close</Button>
              <Button onClick={() => {
                handleDownload(selectedMaterial);
                setShowMaterialDetails(false);
              }}>
                <Download className="h-4 w-4 mr-2" />
                Download File
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default StudentMaterials;
