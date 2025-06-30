'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, ArrowLeft, Paperclip, MoreVertical, Phone, Video, Home } from 'lucide-react';

const chatContacts = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Founder, TechVision AI",
    avatar: "https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=150",
    lastMessage: "Looking forward to discussing the partnership opportunities!",
    timestamp: "2m ago",
    unread: 2,
    online: true
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "CEO, GreenEnergy Flow",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
    lastMessage: "Thank you for your interest in our Series B round",
    timestamp: "1h ago",
    unread: 0,
    online: false
  },
  {
    id: 3,
    name: "Dr. Emily Watson",
    role: "Founder, HealthTech Pro",
    avatar: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150",
    lastMessage: "The regulatory approval process is moving forward smoothly",
    timestamp: "3h ago",
    unread: 1,
    online: true
  },
  {
    id: 4,
    name: "John Smith",
    role: "Investor",
    avatar: "",
    lastMessage: "I'd like to schedule a call to discuss the investment terms",
    timestamp: "1d ago",
    unread: 0,
    online: false
  }
];

const initialMessages = [
  {
    id: 1,
    sender: "Sarah Chen",
    content: "Hi! Thank you so much for your investment in TechVision AI. I'm excited to have you on board!",
    timestamp: "10:30 AM",
    isOwn: false
  },
  {
    id: 2,
    sender: "You",
    content: "Thank you Sarah! I'm really impressed with your AI platform. I'd love to learn more about your roadmap for the next 12 months.",
    timestamp: "10:32 AM",
    isOwn: true
  },
  {
    id: 3,
    sender: "Sarah Chen",
    content: "Absolutely! We're planning to expand our enterprise features and integrate with major cloud platforms. I can share our detailed roadmap with you.",
    timestamp: "10:35 AM",
    isOwn: false
  },
  {
    id: 4,
    sender: "Sarah Chen",
    content: "We're also looking at strategic partnerships with companies like yours. Would you be interested in exploring potential collaboration opportunities?",
    timestamp: "10:36 AM",
    isOwn: false
  },
  {
    id: 5,
    sender: "You",
    content: "That sounds very interesting! I think there could be some great synergies. Can we schedule a call this week to discuss this further?",
    timestamp: "10:40 AM",
    isOwn: true
  },
  {
    id: 6,
    sender: "Sarah Chen",
    content: "Perfect! I'm available Thursday afternoon or Friday morning. What works better for you?",
    timestamp: "10:42 AM",
    isOwn: false
  }
];

export default function ChatInterface() {
  const [selectedContact, setSelectedContact] = useState(chatContacts[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-white text-xl font-bold">Denzope</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-white/80 hover:text-white transition-colors flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link href="/investor">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-180px)]">
          {/* Contacts Sidebar */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-white">Messages</CardTitle>
              <CardDescription className="text-white/70">Your conversations</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {chatContacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`p-4 cursor-pointer transition-colors hover:bg-white/5 ${
                      selectedContact.id === contact.id ? 'bg-white/10' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={contact.avatar} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                            {contact.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {contact.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-white font-medium truncate">{contact.name}</p>
                          <span className="text-white/60 text-xs">{contact.timestamp}</span>
                        </div>
                        <p className="text-white/60 text-sm">{contact.role}</p>
                        <p className="text-white/50 text-sm truncate">{contact.lastMessage}</p>
                      </div>
                      {contact.unread > 0 && (
                        <Badge className="bg-blue-500 text-white text-xs">
                          {contact.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 lg:col-span-3 flex flex-col">
            {/* Chat Header */}
            <CardHeader className="border-b border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedContact.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      {selectedContact.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-white font-semibold">{selectedContact.name}</h3>
                    <p className="text-white/60 text-sm">{selectedContact.role}</p>
                  </div>
                  {selectedContact.online && (
                    <Badge className="bg-green-500/20 text-green-400">Online</Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isOwn
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.isOwn ? 'text-white/80' : 'text-white/60'}`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Message Input */}
            <div className="border-t border-white/20 p-4">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-white/10 border-white/30 text-white placeholder:text-white/60"
                />
                <Button 
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}