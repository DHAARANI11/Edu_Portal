
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Plus, Calendar, Clock, Check, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const StudentLeaves = () => {
  const [leaveRequests, setLeaveRequests] = useState([
    { 
      id: 1, 
      reason: 'Medical Appointment', 
      fromDate: '2025-05-20', 
      toDate: '2025-05-21', 
      status: 'Approved', 
      submittedOn: '2025-05-05'
    },
    { 
      id: 2, 
      reason: 'Family Event', 
      fromDate: '2025-06-10', 
      toDate: '2025-06-15', 
      status: 'Pending', 
      submittedOn: '2025-05-08'
    },
    { 
      id: 3, 
      reason: 'Personal Emergency', 
      fromDate: '2025-04-15', 
      toDate: '2025-04-16', 
      status: 'Rejected', 
      submittedOn: '2025-04-10',
      comment: 'Insufficient documentation provided'
    }
  ]);
  
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [showLeaveDetails, setShowLeaveDetails] = useState(false);
  const [showNewLeaveForm, setShowNewLeaveForm] = useState(false);
  
  const [newLeave, setNewLeave] = useState({
    reason: '',
    leaveType: '',
    fromDate: '',
    toDate: '',
    description: '',
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const handleViewDetails = (leave) => {
    setSelectedLeave(leave);
    setShowLeaveDetails(true);
  };
  
  const handleNewRequestOpen = () => {
    setShowNewLeaveForm(true);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLeave({
      ...newLeave,
      [name]: value
    });
  };
  
  const handleSelectChange = (value) => {
    setNewLeave({
      ...newLeave,
      leaveType: value
    });
  };

  const handleSubmitNewLeave = (e) => {
    e.preventDefault();
    
    // Add the new leave request to the list
    const newLeaveRequest = {
      id: leaveRequests.length + 1,
      reason: newLeave.reason,
      fromDate: newLeave.fromDate,
      toDate: newLeave.toDate,
      status: 'Pending',
      submittedOn: new Date().toISOString().split('T')[0],
      description: newLeave.description
    };
    
    setLeaveRequests([...leaveRequests, newLeaveRequest]);
    setShowNewLeaveForm(false);
    toast({
      title: "Leave request submitted",
      description: "Your leave request has been submitted for approval.",
    });
    
    // Reset form
    setNewLeave({
      reason: '',
      leaveType: '',
      fromDate: '',
      toDate: '',
      description: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Leave Requests</h1>
        <Button onClick={handleNewRequestOpen}>
          <Plus className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </div>
      
      <div className="space-y-4">
        {leaveRequests.map((leave) => (
          <Card key={leave.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle>{leave.reason}</CardTitle>
                <div className={`px-3 py-1 rounded-full text-sm ${getStatusBadgeClass(leave.status)}`}>
                  {leave.status}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-muted-foreground mr-1">Duration:</span>
                <span>{new Date(leave.fromDate).toLocaleDateString()} - {new Date(leave.toDate).toLocaleDateString()}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Submitted on {new Date(leave.submittedOn).toLocaleDateString()}
              </div>
              {leave.comment && (
                <div className="mt-2 p-2 bg-muted rounded-md text-sm">
                  <span className="font-medium">Comment:</span> {leave.comment}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" onClick={() => handleViewDetails(leave)}>
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* New Leave Request Form Dialog */}
      <Dialog open={showNewLeaveForm} onOpenChange={setShowNewLeaveForm}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>New Leave Request</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitNewLeave} className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="reason">Reason</Label>
              <Input 
                id="reason" 
                name="reason" 
                placeholder="Brief reason for leave" 
                value={newLeave.reason}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="leaveType">Leave Type</Label>
              <Select 
                onValueChange={handleSelectChange} 
                defaultValue={newLeave.leaveType}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="family">Family Emergency</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fromDate">From Date</Label>
                <Input 
                  id="fromDate" 
                  name="fromDate" 
                  type="date" 
                  value={newLeave.fromDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="toDate">To Date</Label>
                <Input 
                  id="toDate" 
                  name="toDate" 
                  type="date" 
                  value={newLeave.toDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                placeholder="Provide additional details about your leave request" 
                value={newLeave.description}
                onChange={handleInputChange}
                className="min-h-[100px]"
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowNewLeaveForm(false)}>Cancel</Button>
              <Button type="submit">Submit Request</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Leave Details Dialog */}
      <Dialog open={showLeaveDetails} onOpenChange={setShowLeaveDetails}>
        {selectedLeave && (
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedLeave.reason}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Status:</span>
                <div className={`px-3 py-1 rounded-full text-sm ${getStatusBadgeClass(selectedLeave.status)}`}>
                  {selectedLeave.status}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="font-medium">From:</span> 
                <span>{new Date(selectedLeave.fromDate).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="font-medium">To:</span> 
                <span>{new Date(selectedLeave.toDate).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-medium">Submitted:</span> 
                <span>{new Date(selectedLeave.submittedOn).toLocaleDateString()}</span>
              </div>
              
              {selectedLeave.comment && (
                <div className="p-3 bg-muted rounded-md">
                  <span className="font-medium block mb-1">Reviewer Comment:</span>
                  <p>{selectedLeave.comment}</p>
                </div>
              )}
              
              {selectedLeave.status === 'Pending' && (
                <div className="flex items-center gap-2 mt-2">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm text-muted-foreground">Your request is pending review. You'll be notified once it's processed.</span>
                </div>
              )}
            </div>
            
            <DialogFooter className="flex justify-between">
              {selectedLeave.status === 'Pending' && (
                <Button variant="destructive" size="sm" onClick={() => {
                  setLeaveRequests(leaveRequests.filter(leave => leave.id !== selectedLeave.id));
                  setShowLeaveDetails(false);
                  toast({
                    title: "Leave request withdrawn",
                    description: "Your leave request has been withdrawn.",
                  });
                }}>
                  <X className="h-4 w-4 mr-1" />
                  Withdraw Request
                </Button>
              )}
              <Button variant="outline" onClick={() => setShowLeaveDetails(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default StudentLeaves;
