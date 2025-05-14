import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Search, Filter, Calendar, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export const FacultyLeaveRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterClass, setFilterClass] = useState('all');
  const [activeTab, setActiveTab] = useState('pending');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [responseReason, setResponseReason] = useState('');
  const [responseType, setResponseType] = useState('');
  const { toast } = useToast();
  
  // Sample data
  const classes = [
    { id: 'cs101', name: 'CS101 - Introduction to Computer Science' },
    { id: 'cs202', name: 'CS202 - Data Structures and Algorithms' },
    { id: 'cs305', name: 'CS305 - Database Systems' }
  ];
  
  // Sample leave requests with class information
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      studentName: 'Alex Johnson',
      studentId: 'ST12345',
      class: 'cs101',
      requestDate: '2025-05-08',
      startDate: '2025-05-15',
      endDate: '2025-05-17',
      type: 'Medical',
      reason: 'Doctor appointment for regular checkup',
      status: 'pending',
      responseDate: null,
      responseReason: null
    },
    {
      id: 2,
      studentName: 'Maria Garcia',
      studentId: 'ST12346',
      class: 'cs202',
      requestDate: '2025-05-10',
      startDate: '2025-05-20',
      endDate: '2025-05-21',
      type: 'Personal',
      reason: 'Family emergency',
      status: 'pending',
      responseDate: null,
      responseReason: null
    },
    {
      id: 3,
      studentName: 'John Smith',
      studentId: 'ST12347',
      class: 'cs101',
      requestDate: '2025-05-05',
      startDate: '2025-05-12',
      endDate: '2025-05-14',
      type: 'Medical',
      reason: 'Surgery recovery',
      status: 'approved',
      responseDate: '2025-05-06',
      responseReason: 'Medical certificate verified'
    },
    {
      id: 4,
      studentName: 'Emily Chen',
      studentId: 'ST12348',
      class: 'cs305',
      requestDate: '2025-05-03',
      startDate: '2025-05-10',
      endDate: '2025-05-11',
      type: 'Personal',
      reason: 'Religious observance',
      status: 'rejected',
      responseDate: '2025-05-04',
      responseReason: 'Insufficient advance notice as per policy'
    },
    {
      id: 5,
      studentName: 'Michael Brown',
      studentId: 'ST12349',
      class: 'cs202',
      requestDate: '2025-05-12',
      startDate: '2025-05-22',
      endDate: '2025-05-24',
      type: 'Family',
      reason: 'Sister\'s wedding',
      status: 'pending',
      responseDate: null,
      responseReason: null
    },
    {
      id: 6,
      studentName: 'Sarah Wilson',
      studentId: 'ST12350',
      class: 'cs305',
      requestDate: '2025-05-01',
      startDate: '2025-05-16',
      endDate: '2025-05-18',
      type: 'Medical',
      reason: 'Dental surgery',
      status: 'approved',
      responseDate: '2025-05-02',
      responseReason: 'Medical certificate provided'
    }
  ]);

  // Filter requests based on search term, status filter, class filter, and active tab
  const filteredRequests = leaveRequests.filter(request => {
    const matchesSearch = request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         request.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || request.type === filterStatus;
    const matchesClass = filterClass === 'all' || request.class === filterClass;
    const matchesTab = activeTab === 'all' || request.status === activeTab;
    
    return matchesSearch && matchesStatus && matchesClass && matchesTab;
  });

  const handleResponseDialogOpen = (request, type) => {
    setSelectedRequest(request);
    setResponseType(type);
    setResponseReason('');
    setDialogOpen(true);
  };

  const handleSubmitResponse = () => {
    // Update the leave request with the response
    setLeaveRequests(prevRequests => 
      prevRequests.map(req => {
        if (req.id === selectedRequest.id) {
          return {
            ...req,
            status: responseType === 'approve' ? 'approved' : 'rejected',
            responseDate: new Date().toISOString().split('T')[0], // Current date
            responseReason: responseReason
          };
        }
        return req;
      })
    );
    
    const actionText = responseType === 'approve' ? 'approved' : 'rejected';
    
    toast({
      title: `Request ${actionText}`,
      description: `You have ${actionText} ${selectedRequest.studentName}'s leave request.`,
      variant: responseType === 'approve' ? 'default' : 'destructive',
    });
    
    setDialogOpen(false);
  };
  
  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setDetailsDialogOpen(true);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
          <Clock className="h-3 w-3 mr-1" /> Pending
        </Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
          <CheckCircle className="h-3 w-3 mr-1" /> Approved
        </Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
          <XCircle className="h-3 w-3 mr-1" /> Rejected
        </Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Student Leave Requests</h1>
      <p className="text-muted-foreground">Review and manage leave requests from students.</p>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Leave Requests</CardTitle>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search requests..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={filterClass} onValueChange={setFilterClass}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {classes.map(cls => (
                    <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Medical">Medical</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Family">Family</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{request.studentName}</p>
                          <p className="text-sm text-muted-foreground">{request.studentId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{classes.find(c => c.id === request.class)?.name}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{request.type}</p>
                          <p className="text-sm text-muted-foreground truncate max-w-[150px]" title={request.reason}>
                            {request.reason}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{new Date(request.startDate).toLocaleDateString()}</span>
                          {request.endDate !== request.startDate && (
                            <span> - {new Date(request.endDate).toLocaleDateString()}</span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Requested: {new Date(request.requestDate).toLocaleDateString()}
                        </p>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(request.status)}
                        {request.responseDate && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(request.responseDate).toLocaleDateString()}
                          </p>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {request.status === 'pending' ? (
                            <>
                              <Button variant="outline" size="sm" 
                                onClick={() => handleResponseDialogOpen(request, 'approve')}>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                <span>Approve</span>
                              </Button>
                              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive"
                                onClick={() => handleResponseDialogOpen(request, 'reject')}>
                                <XCircle className="h-4 w-4 mr-1" />
                                <span>Reject</span>
                              </Button>
                            </>
                          ) : (
                            <Button variant="outline" size="sm" onClick={() => handleViewDetails(request)}>
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No leave requests found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Response Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {responseType === 'approve' ? 'Approve Leave Request' : 'Reject Leave Request'}
            </DialogTitle>
            <DialogDescription>
              {selectedRequest && (
                <div className="mt-2">
                  <p><strong>Student:</strong> {selectedRequest.studentName} ({selectedRequest.studentId})</p>
                  <p><strong>Class:</strong> {classes.find(c => c.id === selectedRequest.class)?.name}</p>
                  <p><strong>Type:</strong> {selectedRequest.type}</p>
                  <p><strong>Dates:</strong> {new Date(selectedRequest.startDate).toLocaleDateString()} - {new Date(selectedRequest.endDate).toLocaleDateString()}</p>
                  <p><strong>Reason:</strong> {selectedRequest.reason}</p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="reason" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Response Reason
              </label>
              <Textarea
                id="reason"
                placeholder={`Provide a reason for ${responseType === 'approve' ? 'approving' : 'rejecting'} this request...`}
                value={responseReason}
                onChange={(e) => setResponseReason(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleSubmitResponse}
              variant={responseType === 'approve' ? 'default' : 'destructive'}
              disabled={responseReason.trim() === ''}
            >
              {responseType === 'approve' ? 'Approve Request' : 'Reject Request'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave Request Details</DialogTitle>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4 py-2">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold text-lg">{selectedRequest.studentName}</h3>
                  <p className="text-sm text-muted-foreground">{selectedRequest.studentId}</p>
                </div>
                {getStatusBadge(selectedRequest.status)}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Class</p>
                  <p>{classes.find(c => c.id === selectedRequest.class)?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p>{selectedRequest.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Request Date</p>
                  <p>{new Date(selectedRequest.requestDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Leave Dates</p>
                  <p>
                    {new Date(selectedRequest.startDate).toLocaleDateString()} - {new Date(selectedRequest.endDate).toLocaleDateString()}
                    {' '}
                    <span className="text-sm text-muted-foreground">
                      ({Math.ceil((new Date(selectedRequest.endDate).getTime() - new Date(selectedRequest.startDate).getTime()) / (1000 * 60 * 60 * 24) + 1)} days)
                    </span>
                  </p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Student's Reason</p>
                <p className="p-3 bg-muted rounded-md mt-1">{selectedRequest.reason}</p>
              </div>
              
              {selectedRequest.status !== 'pending' && (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground">Response Date</p>
                    <p>{new Date(selectedRequest.responseDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Response Reason</p>
                    <p className="p-3 bg-muted rounded-md mt-1">{selectedRequest.responseReason}</p>
                  </div>
                </>
              )}
            </div>
          )}
          
          <DialogFooter>
            {selectedRequest && selectedRequest.status === 'pending' ? (
              <>
                <Button variant="outline" onClick={() => setDetailsDialogOpen(false)}>Cancel</Button>
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    setDetailsDialogOpen(false);
                    handleResponseDialogOpen(selectedRequest, 'reject');
                  }}
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Reject
                </Button>
                <Button 
                  onClick={() => {
                    setDetailsDialogOpen(false);
                    handleResponseDialogOpen(selectedRequest, 'approve');
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve
                </Button>
              </>
            ) : (
              <Button onClick={() => setDetailsDialogOpen(false)}>Close</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FacultyLeaveRequests;
